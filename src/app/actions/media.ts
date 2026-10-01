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
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB limit

export interface MediaActionResponse {
  success: boolean;
  message: string;
  asset?: any;
}

/**
 * Handles image upload with high-fidelity Sharp compression:
 * - Accepts images up to 15MB
 * - Automatically auto-orients based on camera EXIF
 * - If image exceeds 4K dimensions (>2880px), scales proportionally with lanczos3 interpolation
 * - Encodes to optimized WebP at quality 90 with smart subsampling for pristine luxury quality
 * - Generates micro blur placeholder for zero-CLS image loading
 * - Falls back to local disk storage if Cloudflare R2 credentials are not set
 */
export async function uploadMediaAction(
  formData: FormData
): Promise<MediaActionResponse> {
  try {
    await requireAdmin();
    await connectToDatabase();

    const file = formData.get("file") as File | null;
    const slotKey = (formData.get("slotKey") as string)?.trim();
    const altText = (formData.get("altText") as string)?.trim() || "";

    if (!file || !(file instanceof File) || file.size === 0) {
      return { success: false, message: "Please select an image file to upload." };
    }

    if (!slotKey) {
      return { success: false, message: "Target asset slot is required." };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        message: `File size exceeds the 15MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
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
      // Local storage fallback into /public/uploads/
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
  } catch (error: any) {
    console.error("[Media Upload Error]", error);
    return {
      success: false,
      message: error.message || "Failed to process and upload image.",
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
    await connectToDatabase();

    await MediaAsset.findOneAndDelete({ slotKey });
    revalidatePath("/");

    return {
      success: true,
      message: `Slot "${slotKey}" has been restored to default theme imagery.`,
    };
  } catch (error: any) {
    console.error("[Media Reset Error]", error);
    return {
      success: false,
      message: error.message || "Failed to restore default asset.",
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
    await connectToDatabase();

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
  } catch (error: any) {
    console.error("[Media Alt Update Error]", error);
    return {
      success: false,
      message: error.message || "Failed to update alt text.",
    };
  }
}
