import { NextResponse } from "next/server";
import { getContentVersion } from "@/lib/live-sync";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const version = getContentVersion();
  return NextResponse.json(
    { version, timestamp: Date.now() },
    {
      headers: {
        // Protect serverless quotas by caching globally at Vercel/Cloudflare CDN edge for 15s with 45s SWR
        "Cache-Control": "public, s-maxage=15, stale-while-revalidate=45",
      },
    }
  );
}
