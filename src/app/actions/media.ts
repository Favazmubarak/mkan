"use server";

import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { MediaAsset } from "@/lib/models/MediaAsset";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/tiff",
];
const MAX_FILE_SIZE = 4 * 1024 * 1024; // Leave room for Server Action multipart overhead under Vercel's 4.5 MB request cap.
const SLOT_KEY_PATTERN = /^[a-zA-Z0-9_.-]{1,120}$/;

function isValidSlotKey(value: unknown): value is string {
  return typeof value === "string" && SLOT_KEY_PATTERN.test(value);
}

export interface MediaActionResponse {
  success: boolean;
  message: string;
  asset?: {
    slotKey: string;
    url: string;
    altText: string;
    width: number;
    height: number;
    fileSize: number;
  };
}

/**
 * Handles image upload with high-fidelity Sharp compression:
 * - Accepts optimized images up to 4MB after browser-side compression
 * - Automatically auto-orients based on camera EXIF
 * - If image exceeds 4K dimensions (>2880px), scales proportionally with lanczos3 interpolation
 * - Encodes to optimized WebP at quality 90 with smart subsampling for pristine luxury quality
 * - Generates micro blur placeholder for zero-CLS image loading
 * - Uses local disk storage only during development when Cloudflare R2 is not configured
 */
export async function uploadMediaAction(
  formData: FormData
): Promise<MediaActionResponse> {
  try {
    await requireAdmin();
    const db = await connectToDatabase();
    if (!db) {
      return { success: false, message: "Media uploads require an available MongoDB connection." };
    }

    const hasR2Configuration = Boolean(
      process.env.R2_BUCKET_NAME &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_ENDPOINT &&
      process.env.R2_PUBLIC_DOMAIN
    );
    if (process.env.NODE_ENV === "production" && !hasR2Configuration) {
      return {
        success: false,
        message: "Configure Cloudflare R2 storage before uploading media in production.",
      };
    }

    const fileEntry = formData.get("file");
    const slotEntry = formData.get("slotKey");
    const altEntry = formData.get("altText");
    const file = typeof File !== "undefined" && fileEntry instanceof File ? fileEntry : null;
    const slotKey = typeof slotEntry === "string" ? slotEntry.trim() : "";
    const altText = typeof altEntry === "string" ? altEntry.trim() : "";

    if (!file || !(file instanceof File) || file.size === 0) {
      return { success: false, message: "Please select an image file to upload." };
    }

    if (!isValidSlotKey(slotKey)) {
      return { success: false, message: "Choose a valid target asset slot." };
    }
    if (altText.length > 300) {
      return { success: false, message: "Image alt text must be 300 characters or fewer." };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        message: `Optimized image exceeds the 4MB upload limit (${(file.size / (1024 * 1024)).toFixed(1)}MB). Compress it and try again.`,
      };
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        success: false,
        message: "Invalid file type. Supported formats: JPG, PNG, WebP, AVIF, TIFF.",
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Initial inspection via Sharp
    const probe = sharp(inputBuffer).rotate();
    const metadata = await probe.metadata();

    if (!metadata.width || !metadata.height) {
      return { success: false, message: "Unable to parse image dimensions." };
    }

    // Smart sizing: Cap ultra-massive images at 2880px (Retina 4K) to maintain razor-sharp quality while keeping load fast
    const maxWidth = 2880;
    const needsResize = metadata.width > maxWidth;

    let pipeline = sharp(inputBuffer).rotate();

    if (needsResize) {
      pipeline = pipeline.resize({
        width: maxWidth,
        withoutEnlargement: true,
        fit: "inside",
        kernel: sharp.kernel.lanczos3,
      });
    }

    // Pristine high-fidelity WebP compression (Quality: 90, Effort: 6, Smart Subsampling)
    const outputBuffer = await pipeline
      .webp({
        quality: 90,
        effort: 6,
        smartSubsample: true,
        nearLossless: false,
      })
      .toBuffer();

    // Re-read final dimensions
    const finalMeta = await sharp(outputBuffer).metadata();

    // Micro blur-up placeholder (16x16) for instant perceived loading
    const blurBuffer = await sharp(inputBuffer)
      .resize(16, 16, { fit: "inside" })
      .webp({ quality: 20 })
      .toBuffer();
    const blurDataURL = `data:image/webp;base64,${blurBuffer.toString("base64")}`;

    const randomName = `${slotKey.replace(/[^a-zA-Z0-9]/g, "-")}-${crypto.randomBytes(8).toString("hex")}.webp`;

    let finalUrl = "";
    let storageProvider: "local" | "r2" = "local";

    // Check if Cloudflare R2 credentials are provided
    if (
      process.env.R2_BUCKET_NAME &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_ENDPOINT &&
      process.env.R2_PUBLIC_DOMAIN
    ) {
      const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");
      const s3 = new S3Client({
        region: "auto",
        endpoint: process.env.R2_ENDPOINT,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
      });

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: `uploads/${randomName}`,
          Body: outputBuffer,
          ContentType: "image/webp",
          CacheControl: "public, max-age=31536000, immutable",
        })
      );

      finalUrl = `${process.env.R2_PUBLIC_DOMAIN.replace(/\/$/, "")}/uploads/${randomName}`;
      storageProvider = "r2";
    } else {
      // Development-only fallback into /public/uploads/
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });
      const filePath = path.join(uploadsDir, randomName);
      await fs.writeFile(filePath, outputBuffer);
      finalUrl = `/uploads/${randomName}`;
      storageProvider = "local";
    }

    // Persist media record in MongoDB
    const savedAsset = await MediaAsset.findOneAndUpdate(
      { slotKey },
      {
        slotKey,
        filename: randomName,
        url: finalUrl,
        altText: altText || `${slotKey} visual`,
        width: finalMeta.width || metadata.width,
        height: finalMeta.height || metadata.height,
        blurDataURL,
        fileSize: outputBuffer.length,
        mimeType: "image/webp",
        storageProvider,
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    // On-demand Instant ISR Cache revalidation
    revalidatePath("/");

    return {
      success: true,
      message: `Image for "${slotKey}" processed and published! (${(outputBuffer.length / 1024).toFixed(0)} KB WebP)`,
      asset: {
        slotKey: savedAsset.slotKey,
        url: savedAsset.url,
        altText: savedAsset.altText,
        width: savedAsset.width,
        height: savedAsset.height,
        fileSize: savedAsset.fileSize,
      },
    };
  } catch (error: unknown) {
    console.error("[Media Upload Error]", error);
    return {
      success: false,
      message: "Failed to process and upload image.",
    };
  }
}

/**
 * Restores a slot to its default theme seed image asset.
 */
export async function resetSlotToDefaultAction(
  slotKey: string
): Promise<MediaActionResponse> {
  try {
    await requireAdmin();
    if (!isValidSlotKey(slotKey)) {
      return { success: false, message: "Choose a valid target asset slot." };
    }
    const db = await connectToDatabase();
    if (!db) return { success: false, message: "Media storage is temporarily unavailable." };

    await MediaAsset.findOneAndDelete({ slotKey });
    revalidatePath("/");

    return {
      success: true,
      message: `Slot "${slotKey}" has been restored to default theme imagery.`,
    };
  } catch (error: unknown) {
    console.error("[Media Reset Error]", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to restore default asset.",
    };
  }
}

/**
 * Updates the alt text description for an existing media slot.
 */
export async function updateMediaAltAction(
  slotKey: string,
  altText: string
): Promise<MediaActionResponse> {
  try {
    await requireAdmin();
    if (!isValidSlotKey(slotKey) || typeof altText !== "string" || altText.length > 300) {
      return { success: false, message: "Provide a valid media slot and alt text under 300 characters." };
    }
    const db = await connectToDatabase();
    if (!db) return { success: false, message: "Media storage is temporarily unavailable." };

    await MediaAsset.findOneAndUpdate(
      { slotKey },
      { $set: { altText: altText.trim(), updatedAt: new Date() } },
      { upsert: true }
    );

    revalidatePath("/");

    return {
      success: true,
      message: "Alt text updated successfully.",
    };
  } catch (error: unknown) {
    console.error("[Media Alt Update Error]", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update alt text.",
    };
  }
}
