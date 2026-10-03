"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Studio Admin Error]", error);
  }, [error]);

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md rounded-2xl border border-[#E8E4DF] bg-white p-8 shadow-sm">
        <h2 className="text-lg font-bold text-[#111827]">Studio Session Disruption</h2>
        <p className="mt-2 text-xs text-[#6B7280]">
          An unexpected error occurred while processing Studio data.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-[#1A060E] px-4 py-2 text-xs font-bold text-[#DDB78A] hover:bg-[#2A0A17] cursor-pointer"
          >
            Retry Action
          </button>
          <Link
            href="/admin"
            className="rounded-lg border border-[#E5E7EB] px-4 py-2 text-xs font-medium text-[#374151] hover:bg-[#F9FAFB]"
          >
            Refresh Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
