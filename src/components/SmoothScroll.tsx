"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { scrollToElementCenter } from "@/lib/cinematic-scroll";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
      });

      // Expose to window for cinematic scroll coordinate sync
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    }

    // Global click listener to intercept all navigation anchor links
    // and execute slow, cinematic smooth scroll centered in the viewport
    const handleGlobalClick = (event: MouseEvent) => {
      // Don't intercept clicks with modifier keys (new tab, etc.)
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const hashIdx = href.indexOf("#");
      if (hashIdx === -1) return;

      const path = href.slice(0, hashIdx);
      if (path && path !== "/" && path !== window.location.pathname) return;

      const hash = href.slice(hashIdx);
      if (hash === "#" || hash === "#home" || hash === "#top") {
        event.preventDefault();
        event.stopPropagation();
        scrollToElementCenter("#home", 1400, " ");
        return;
      }

      const targetId = hash.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        event.preventDefault();
        event.stopPropagation();
        scrollToElementCenter(element, 1400, hash);
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
