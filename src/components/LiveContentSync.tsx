"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, RefreshCw, Check } from "lucide-react";

export function LiveContentSync() {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const currentVersionRef = useRef<number | null>(null);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    // 1. Fetch initial version on mount
    let isMounted = true;

    async function initVersion() {
      try {
        const res = await fetch("/api/content-version", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && typeof data.version === "number") {
          currentVersionRef.current = data.version;
        }
      } catch {
        // Silently ignore network hiccup
      }
    }

    initVersion();

    // 2. Cross-tab instantaneous sync via BroadcastChannel
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel("mkan_live_sync");
        channel.onmessage = (event) => {
          if (event.data && (event.data.type === "CONTENT_UPDATED" || event.data.version)) {
            triggerLiveUpdate(event.data.version || Date.now());
          }
        };
      }
    } catch {
      // BroadcastChannel not available
    }

    // 3. Trigger live update routine with luxury notification UI
    function triggerLiveUpdate(newVersion: number) {
      if (isUpdatingRef.current) return;
      if (currentVersionRef.current && newVersion <= currentVersionRef.current) return;

      currentVersionRef.current = newVersion;
      isUpdatingRef.current = true;
      setIsUpdating(true);
      setUpdateSuccess(false);

      // Perform Next.js server-component revalidation
      router.refresh();

      // Show luxury feedback, then fade away
      setTimeout(() => {
        setIsUpdating(false);
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
          isUpdatingRef.current = false;
        }, 2200);
      }, 1200);
    }

    // 4. Polling check for remote updates across devices (every 3.5s when active)
    const interval = setInterval(async () => {
      if (document.hidden) return; // Don't poll aggressively when tab is in background
      try {
        const res = await fetch("/api/content-version", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (
          typeof data.version === "number" &&
          currentVersionRef.current !== null &&
          data.version > currentVersionRef.current
        ) {
          triggerLiveUpdate(data.version);
        } else if (currentVersionRef.current === null && typeof data.version === "number") {
          currentVersionRef.current = data.version;
        }
      } catch {
        // Ignore background polling errors
      }
    }, 3500);

    // 5. Check immediately when user switches back to this tab
    const handleVisibilityChange = async () => {
      if (!document.hidden) {
        try {
          const res = await fetch("/api/content-version", { cache: "no-store" });
          if (!res.ok) return;
          const data = await res.json();
          if (
            typeof data.version === "number" &&
            currentVersionRef.current !== null &&
            data.version > currentVersionRef.current
          ) {
            triggerLiveUpdate(data.version);
          }
        } catch {
          // Ignore
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isMounted = false;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (channel) channel.close();
    };
  }, [router]);

  if (!isUpdating && !updateSuccess) return null;

  return (
    <aside
      aria-label="MKAN Live Experience Synchronizer"
      className="fixed bottom-6 right-6 z-[9999] pointer-events-none transition-all duration-500 transform animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex items-center gap-3 rounded-full bg-[#18040d]/95 backdrop-blur-xl border border-[#DDB78A]/40 px-5 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(221,183,138,0.2)] text-[#F5EEE6]">
        {isUpdating ? (
          <>
            <RefreshCw className="h-4 w-4 text-[#DDB78A] animate-spin shrink-0" />
            <div className="flex flex-col">
              <span className="text-[0.62rem] font-bold tracking-[0.24em] uppercase text-[#DDB78A]">
                STUDIO LIVE SYNC
              </span>
              <span className="text-[0.74rem] font-sans font-medium text-[#FAF1E8]">
                Admin updating experience...
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="h-5 w-5 rounded-full bg-[#DDB78A]/20 border border-[#DDB78A] flex items-center justify-center shrink-0">
              <Check className="h-3 w-3 text-[#DDB78A]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[0.62rem] font-bold tracking-[0.24em] uppercase text-[#DDB78A]">
                EXPERIENCE UPDATED
              </span>
              <span className="text-[0.74rem] font-sans font-medium text-[#FAF1E8]">
                Latest content is live
              </span>
            </div>
            <Sparkles className="h-3.5 w-3.5 text-[#DDB78A]/70 ml-1 animate-pulse" />
          </>
        )}
      </div>
    </aside>
  );
}
