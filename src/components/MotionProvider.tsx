"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // Desktop luxury motion choreography (>= 1024px)
    mm.add("(min-width: 1024px)", () => {
      // Hero entrance is handled by PageLoader (src/components/PageLoader.tsx).
      // MotionProvider owns only the scroll-triggered section animations below.

      // 1. Expertise cards staggered entrance
      gsap.fromTo(
        "#services .grid > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#services",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // 3. Method steps sequence
      gsap.fromTo(
        "#method .grid > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#method",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // 4. Selected Experiences cards stagger
      gsap.fromTo(
        "#experiences .grid > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#experiences",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
