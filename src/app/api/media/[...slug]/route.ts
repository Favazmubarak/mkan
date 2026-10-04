import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

/**
 * Enterprise Media Gateway & Edge Streamer:
 * - Streams images from Cloudflare R2 using verified S3 API credentials
 * - Automatically falls back to local disk during local development
 * - Adds immutable Edge CDN caching headers for sub-millisecond global delivery
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await context.params;
    if (!slug || slug.length === 0) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const joinedKey = slug.join("/");
    // Sanitize key against directory traversal
    const cleanKey = joinedKey.replace(/(\.\.[\/\\])+/g, "").replace(/^\/+/, "");
    const r2Key = cleanKey.startsWith("uploads/") ? cleanKey : `uploads/${cleanKey}`;

    // 1. If Cloudflare R2 credentials exist, stream securely using authenticated S3 API
    if (
      process.env.R2_BUCKET_NAME &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_ENDPOINT
    ) {
      const s3 = new S3Client({
        region: "auto",
        endpoint: process.env.R2_ENDPOINT,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
      });

      try {
        const response = await s3.send(
          new GetObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: r2Key,
          })
        );

        if (!response.Body) {
          return new NextResponse("Image Not Found", { status: 404 });
        }

        // Convert AWS SDK stream to Web ReadableStream
        const stream = response.Body.transformToWebStream();

        const headers = new Headers();
        headers.set("Content-Type", response.ContentType || "image/webp");
        headers.set("Cache-Control", "public, max-age=31536000, immutable");
        if (response.ContentLength) {
          headers.set("Content-Length", String(response.ContentLength));
        }
        if (response.ETag) {
          headers.set("ETag", response.ETag);
        }

        return new NextResponse(stream, {
          status: 200,
          headers,
        });
      } catch (r2Err: unknown) {
        console.warn(`[Media Proxy R2 Lookup] Object not found on R2 (${r2Key}):`, r2Err);
      }
    }

    // 2. Local disk fallback
    const localFilePath = path.join(process.cwd(), "public", cleanKey.startsWith("uploads") ? cleanKey : `uploads/${cleanKey}`);
    try {
      const fileBuffer = await fs.readFile(localFilePath);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "image/webp",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch {
      return new NextResponse("File Not Found", { status: 404 });
    }
  } catch (error: unknown) {
    console.error("[Media Proxy Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
