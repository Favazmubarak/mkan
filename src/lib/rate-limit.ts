import "server-only";
import { createHmac, randomBytes } from "node:crypto";
import { connectToDatabase } from "@/lib/db";
import { RateLimitBucket } from "@/lib/models/RateLimitBucket";

export interface RateLimitResult {
  allowed: boolean;
  available: boolean;
  retryAfterSeconds: number;
}

interface MemoryBucket {
  count: number;
  expiresAt: number;
}

declare global {
  var mkanRateLimitBuckets: Map<string, MemoryBucket> | undefined;
}

const memoryBuckets =
  globalThis.mkanRateLimitBuckets ??
  (globalThis.mkanRateLimitBuckets = new Map<string, MemoryBucket>());
const processHashSecret = randomBytes(32);

function hashIdentity(identity: string): string {
  const configuredSecret = process.env.RATE_LIMIT_HASH_SECRET || process.env.MONGODB_URI;
  const secret = configuredSecret || processHashSecret;
  return createHmac("sha256", secret).update(identity).digest("hex");
}

function consumeMemoryBucket(
  key: string,
  limit: number,
  expiresAt: number,
  now: number,
  retryAfterSeconds: number
): RateLimitResult {
  for (const [bucketKey, bucket] of memoryBuckets) {
    if (bucket.expiresAt <= now) memoryBuckets.delete(bucketKey);
  }

  const bucket = memoryBuckets.get(key);
  const count = (bucket?.expiresAt && bucket.expiresAt > now ? bucket.count : 0) + 1;
  if (!bucket && memoryBuckets.size >= 10_000) {
    const oldestKey = memoryBuckets.keys().next().value;
    if (oldestKey) memoryBuckets.delete(oldestKey);
  }
  memoryBuckets.set(key, { count, expiresAt });

  return { allowed: count <= limit, available: true, retryAfterSeconds };
}

/**
 * Consume one request from a MongoDB-backed fixed-window bucket.
 * The identity is hashed before it is stored, and TTL cleanup removes old buckets.
 */
export async function consumeRateLimit(
  scope: string,
  identity: string,
  limit: number,
  windowMs: number,
  allowMemoryFallback = false
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const expiresAt = new Date(windowStart + windowMs);
  const retryAfterSeconds = Math.max(1, Math.ceil((expiresAt.getTime() - now) / 1000));

  try {
    const identityHash = hashIdentity(identity);
    const key = `${scope}:${identityHash}:${windowStart}`;
    const db = await connectToDatabase();
    if (!db) {
      return allowMemoryFallback
        ? consumeMemoryBucket(key, limit, expiresAt.getTime(), now, retryAfterSeconds)
        : { allowed: false, available: false, retryAfterSeconds };
    }

    let bucket;

    try {
      bucket = await RateLimitBucket.findOneAndUpdate(
        { key },
        { $inc: { count: 1 }, $setOnInsert: { scope, expiresAt } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch (error) {
      // Concurrent first requests can race on the unique key; retry as an update.
      if (
        typeof error !== "object" ||
        error === null ||
        !("code" in error) ||
        error.code !== 11000
      ) {
        throw error;
      }
      bucket = await RateLimitBucket.findOneAndUpdate(
        { key },
        { $inc: { count: 1 } },
        { new: true }
      );
    }

    if (!bucket) return { allowed: false, available: false, retryAfterSeconds };
    return {
      allowed: bucket.count <= limit,
      available: true,
      retryAfterSeconds,
    };
  } catch (error) {
    console.error(`[Rate Limit Error: ${scope}]`, error);
    if (allowMemoryFallback) {
      const identityHash = hashIdentity(identity);
      const key = `${scope}:${identityHash}:${windowStart}`;
      return consumeMemoryBucket(key, limit, expiresAt.getTime(), now, retryAfterSeconds);
    }
    return { allowed: false, available: false, retryAfterSeconds };
  }
}

export function getClientIdentity(requestHeaders: Headers): string {
  const trustedIp =
    requestHeaders.get("cf-connecting-ip") ||
    requestHeaders.get("x-real-ip") ||
    requestHeaders.get("x-forwarded-for")?.split(",")[0];

  return trustedIp?.trim() || "unknown-client";
}
