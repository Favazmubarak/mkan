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
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}
