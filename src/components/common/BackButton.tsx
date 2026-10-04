"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  fallbackHref?: string;
  label?: string;
  className?: string;
}

export function BackButton({
  fallbackHref = "/",
  label = "HOME",
  className = "",
}: BackButtonProps) {
  const router = useRouter();
  const [showFixedPill, setShowFixedPill] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Find the Hero section (the very first section on the page)
      const heroEl = document.querySelector("section");
      const contactEl = document.getElementById("contact");

      let pastHero = false;
      let beforeContact = true;

      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        // Only active when the dark hero has scrolled past the top (i.e. white background is active)
        if (heroRect.bottom <= 50) {
          pastHero = true;
        }
      } else {
        // Fallback if heroEl is not found
        pastHero = window.scrollY > 400;
      }

      if (contactEl) {
        const contactRect = contactEl.getBoundingClientRect();
        // Hide when contact section arrives near top of viewport
        if (contactRect.top <= 100) {
          beforeContact = false;
        }
      }

      setShowFixedPill(pastHero && beforeContact);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleGoHome = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(fallbackHref);
  };

  return (
    <>
      {/* 1. In-flow Hero Eyebrow Pill (Always sits calmly in hero header) */}
      <button
        type="button"
        onClick={handleGoHome}
        className={`group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#DDB78A]/35 bg-[#2A0512]/80 backdrop-blur-md text-[#DDB78A] transition-all duration-300 hover:border-[#DDB78A] hover:bg-[#38081A] hover:text-[#FAF3EE] hover:shadow-[0_4px_16px_rgba(221,183,138,0.15)] cursor-pointer select-none ${className}`}
        aria-label={label}
      >
        <span className="font-sans text-[0.66rem] sm:text-[0.7rem] font-semibold tracking-[0.25em] uppercase">
          {label}
        </span>
        {/* Return curved arrow icon */}
        <svg
          className="w-3.5 h-3.5 text-[#DDB78A] transition-transform duration-300 group-hover:-translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 14L4 9l5-5" />
          <path d="M4 9h11a6 6 0 0 1 6 6v1" />
        </svg>
      </button>

      {/* 2. Floating Fixed Top-Left Capsule (ONLY visible when white background is active on screen) */}
      <div
        className={`fixed top-5 left-5 sm:top-7 sm:left-8 z-50 transition-all duration-500 ease-out ${
          showFixedPill
            ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
            : "opacity-0 -translate-y-4 pointer-events-none scale-95"
        }`}
      >
        <button
          type="button"
          onClick={handleGoHome}
          className="group flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-[#DDB78A]/50 bg-[#1E030C]/92 backdrop-blur-xl text-[#DDB78A] shadow-[0_10px_35px_rgba(0,0,0,0.65)] transition-all duration-300 hover:border-[#DDB78A] hover:bg-[#2F0615] hover:text-[#FAF3EE] hover:scale-105 active:scale-95 cursor-pointer select-none"
          aria-label="Return to Homepage"
        >
          <svg
            className="w-3.5 h-3.5 text-[#DDB78A] transition-transform duration-300 group-hover:-translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 14L4 9l5-5" />
            <path d="M4 9h11a6 6 0 0 1 6 6v1" />
          </svg>
          <span className="font-sans text-[0.66rem] sm:text-[0.7rem] font-semibold tracking-[0.25em] uppercase">
            {label}
          </span>
        </button>
      </div>
    </>
  );
}
