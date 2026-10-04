/**
 * migrate-local-to-r2.mjs
 *
 * Migrates ALL local upload files (public/uploads/*.webp) to Cloudflare R2,
 * then updates every matching MongoDB MediaAsset record to use the R2 URL.
 *
 * Safe to run multiple times — skips files already uploaded to R2.
 * Run with:  node --env-file=.env.local scripts/migrate-local-to-r2.mjs
 */

import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import mongoose from "mongoose";

// ── Config from environment ──────────────────────────────────────────────────

const {
  MONGODB_URI,
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
  R2_ENDPOINT,
  R2_PUBLIC_DOMAIN,
} = process.env;

const REQUIRED = { MONGODB_URI, R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_ENDPOINT, R2_PUBLIC_DOMAIN };
for (const [k, v] of Object.entries(REQUIRED)) {
  if (!v) { console.error(`❌ Missing env var: ${k}`); process.exit(1); }
}

const UPLOADS_DIR = resolve("public/uploads");
const R2_PREFIX   = "uploads/";

// ── S3 / R2 Client ───────────────────────────────────────────────────────────

const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
});

// ── Helpers ──────────────────────────────────────────────────────────────────

async function objectExistsInR2(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function uploadToR2(filename, buffer) {
  const key = `${R2_PREFIX}${filename}`;
  await s3.send(new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: "image/webp",
    CacheControl: "public, max-age=31536000, immutable",
  }));
  return `${R2_PUBLIC_DOMAIN}/${key}`;
}

// ── MongoDB schema (minimal) ─────────────────────────────────────────────────

const MediaAssetSchema = new mongoose.Schema({
  slotKey:         String,
  filename:        String,
  url:             String,
  storageProvider: String,
  width:           Number,
  height:          Number,
  blurDataURL:     String,
  size:            Number,
  mimeType:        String,
  altText:         String,
  uploadedAt:      Date,
  updatedAt:       Date,
}, { collection: "mediaassets", strict: false });

const MediaAsset = mongoose.models.MediaAsset || mongoose.model("MediaAsset", MediaAssetSchema);

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🚀 MKAN R2 Migration Script\n");

  // 1. Connect to MongoDB
  console.log("📡 Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected.\n");

  // 2. Read all local upload files
  const localFiles = (await readdir(UPLOADS_DIR)).filter(f => f !== ".gitkeep" && f.endsWith(".webp"));
  console.log(`📂 Found ${localFiles.length} local file(s) in public/uploads/\n`);

  // 3. Upload each file to R2
  const uploadedMap = new Map(); // filename → r2Url

  for (const filename of localFiles) {
    const r2Key = `${R2_PREFIX}${filename}`;
    const r2Url = `${R2_PUBLIC_DOMAIN}/${r2Key}`;

    process.stdout.write(`  ⬆️  ${filename} … `);

    const alreadyExists = await objectExistsInR2(r2Key);
    if (alreadyExists) {
      console.log("already in R2, skipping.");
      uploadedMap.set(filename, r2Url);
      continue;
    }

    const buffer = await readFile(join(UPLOADS_DIR, filename));
    await uploadToR2(filename, buffer);
    uploadedMap.set(filename, r2Url);
    console.log(`uploaded ✅`);
  }

  console.log(`\n✅ R2 upload phase complete (${uploadedMap.size} files).\n`);

  // 4. Update MongoDB records
  console.log("🔄 Updating MongoDB records…\n");
  const allAssets = await MediaAsset.find({});
  let updated = 0;
  let alreadyR2 = 0;
  let noMatch = 0;

  for (const asset of allAssets) {
    if (asset.storageProvider === "r2") {
      // Check if this R2 URL is actually accessible — if not, see if we have the file locally
      const filename = asset.filename;
      if (filename && uploadedMap.has(filename)) {
        const correctUrl = uploadedMap.get(filename);
        if (asset.url !== correctUrl) {
          await MediaAsset.updateOne(
            { _id: asset._id },
            { $set: { url: correctUrl, storageProvider: "r2", updatedAt: new Date() } }
          );
          console.log(`  🔧 Fixed R2 URL mismatch: ${asset.slotKey}`);
          updated++;
        } else {
          alreadyR2++;
        }
      } else {
        console.log(`  ℹ️  ${asset.slotKey}: r2 record, file not in local uploads — keeping as-is`);
        alreadyR2++;
      }
      continue;
    }

    // storageProvider === "local"
    const filename = asset.filename;
    if (!filename || !uploadedMap.has(filename)) {
      console.log(`  ⚠️  ${asset.slotKey}: no matching local file found (${filename})`);
      noMatch++;
      continue;
    }

    const r2Url = uploadedMap.get(filename);
    await MediaAsset.updateOne(
      { _id: asset._id },
      { $set: { url: r2Url, storageProvider: "r2", updatedAt: new Date() } }
    );
    console.log(`  ✅ Migrated: ${asset.slotKey} → R2`);
    updated++;
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📊 Migration Summary
  ─────────────────────────────────
  Updated to R2:      ${updated}
  Already on R2:      ${alreadyR2}
  No local file:      ${noMatch}
  Total assets:       ${allAssets.length}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

  // 5. Final state verification
  console.log("🔍 Final MongoDB state:\n");
  const finalAssets = await MediaAsset.find({});
  for (const a of finalAssets) {
    const icon = a.storageProvider === "r2" ? "☁️ " : "💾";
    console.log(`  ${icon} [${a.storageProvider}] ${a.slotKey}: ${a.url}`);
  }

  await mongoose.disconnect();
  console.log("\n✅ Migration complete. MongoDB connection closed.\n");
}

main().catch(err => {
  console.error("\n❌ Migration failed:", err);
  process.exit(1);
});
