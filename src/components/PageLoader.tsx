"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Logo } from "@/components/Logo";

/**
 * PageLoader — Cinema-grade 3-second luxury intro sequence (Apple / Nike style).
 *
 * Sequence breakdown:
 *   1. [0.0s - 1.5s] Full-screen deep plum canvas (#1A060E).
 *      - MKAN CONCEPT typography smoothly ascends & scales in with warm gold glow.
 *      - Elegant gold progress line draws across (0% -> 100%).
 *      - Brand logo glides up and dissolves out.
 *   2. [1.5s - 2.3s] The curtain slides smoothly upward using Apple-grade luxury easing,
 *      revealing the high-res hero background image underneath.
 *   3. [1.9s - 2.7s] Hero content (.hero-animate) cascades smoothly into place with luxury stagger.
 *   4. [2.4s - 3.0s] The navigation header floats smoothly down from above.
 *   5. [3.0s+] Complete cleanup, unmounting the overlay so normal interaction takes over.
 */
export function PageLoader() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      const timer = window.setTimeout(() => setDone(true), 0);
      return () => window.clearTimeout(timer);
    }

    const curtain = curtainRef.current;
    const logo = logoWrapperRef.current;
    const progress = progressBarRef.current;
    const headerEl = document.querySelector("header");
    const heroElements = document.querySelectorAll(".hero-animate");

    // Luxury physics curves
    const luxuryEase = "cubic-bezier(0.22, 1, 0.36, 1)";
    const smoothEase = "power2.inOut";

    // Set initial hidden states for the page targets before animation begins
    if (headerEl) {
      gsap.set(headerEl, { opacity: 0, y: -50 });
    }
    if (heroElements.length > 0) {
      gsap.set(heroElements, { opacity: 0, y: 35 });
    }

    // Set initial curtain state
    if (curtain) {
      gsap.set(curtain, { yPercent: 0, opacity: 1 });
    }

    const tl = gsap.timeline({
      defaults: { ease: luxuryEase },
      onComplete: () => {
        // Strip all inline styles cleanly once animation concludes
        if (headerEl) gsap.set(headerEl, { clearProps: "all" });
        if (heroElements.length > 0) gsap.set(heroElements, { clearProps: "all" });
        setDone(true);
      },
    });

    // 1. Brand Logo & Gold Progress Line (0.0s - 1.5s)
    if (logo) {
      tl.fromTo(
        logo,
        { opacity: 0, y: 24, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: luxuryEase }
      );
    }

    if (progress) {
      tl.fromTo(
        progress,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.0, ease: smoothEase },
        "-=0.5"
      );
    }

    if (logo) {
      tl.to(
        logo,
        { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" },
        "+=0.15"
      );
    }

    // 2. Plum curtain slides up cleanly (1.5s - 2.3s)
    if (curtain) {
      tl.to(
        curtain,
        {
          yPercent: -100,
          duration: 0.9,
          ease: luxuryEase,
        },
        "-=0.1"
      );
    }

    // 3. Hero content reveals in staggered cascade (1.9s - 2.7s)
    if (heroElements.length > 0) {
      tl.to(
        heroElements,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: luxuryEase,
        },
        "-=0.65"
      );
    }

    // 4. Navigation header drops in (2.4s - 3.0s)
    if (headerEl) {
      tl.to(
        headerEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: luxuryEase,
        },
        "-=0.5"
      );
    }

    return () => {
      tl.kill();
      if (headerEl) gsap.set(headerEl, { clearProps: "all" });
      if (heroElements.length > 0) gsap.set(heroElements, { clearProps: "all" });
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={curtainRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-plum-950 will-change-transform select-none"
    >
      <div
        ref={logoWrapperRef}
        className="flex flex-col items-center justify-center text-center px-4"
      >
        <Logo className="h-14 sm:h-18 md:h-20 w-auto" />

        {/* Minimal luxury loading progress bar */}
        <div className="mt-8 h-[1.5px] w-36 sm:w-48 overflow-hidden rounded-full bg-cream/10">
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left bg-gradient-to-r from-gold/50 via-gold to-gold/90 shadow-[0_0_12px_rgba(221,183,138,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}
