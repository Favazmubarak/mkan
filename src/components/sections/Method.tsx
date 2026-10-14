"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";

interface MethodProps {
  data?: typeof homeContent.method;
  assets?: typeof defaultAssets;
}

/**
 * Minimalist luxury vector glyphs in MKAN's signature velvet plum palette
 */
function StepIcon({ index }: { index: number }) {
  switch (index) {
    case 0: // Concept — Minimal ideation spark (flag/beacon)
      return (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" fill="currentColor" fillOpacity="0.12" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      );
    case 1: // Development — Spatial 3D wireframe volume
      return (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case 2: // Curation — Curatorial gem facet
      return (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
          <path d="M2 9h20M12 21L8 9l4-6 4 6-4 12z" />
        </svg>
      );
    case 3: // Production — Precision live technical beacon
      return (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.15" />
          <circle cx="12" cy="12" r="8" />
          <line x1="12" y1="1" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="23" />
          <line x1="1" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="23" y2="12" />
        </svg>
      );
    case 4: // Reporting — Strategic analytics & telemetry
      return (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    default:
      return null;
  }
}

export function Method({
  data = homeContent.method,
}: MethodProps) {
  const method = data;
  const steps = method.steps || [];

  const methodCtaHref = "/approach";
  const methodCtaLabel = method.cta?.label || "OUR APPROACH";

  const [activeStage, setActiveStage] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const pathRef = useRef<SVGPathElement>(null);
  const mobileSpineRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  // =========================================================================
  // Majestic Continuous Progression Bar Animation Loop (requestAnimationFrame)
  // Gentle, cinematic timing with soft bloom transitions (zero sudden pops)
  // =========================================================================
  useEffect(() => {
    const CYCLE_DURATION = 7500; // 7.5s cycle for a relaxed, cinematic pace
    const DRAW_DURATION = 5600;  // 5.6s to glide smoothly across 01 to 05

    let isRunning = true;

    const animate = (timestamp: number) => {
      if (!isRunning) return;

      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      // If user is not currently hovering, advance the continuous progression
      if (hoveredStep === null) {
        const elapsed = (timestamp - startTimeRef.current) % CYCLE_DURATION;

        let strokeOffset = 100;
        let currentStage = 0;

        if (elapsed <= DRAW_DURATION) {
          // Continuous draw progress (0.0 to 1.0)
          const p = elapsed / DRAW_DURATION;
          strokeOffset = 100 * (1 - p);

          // Synchronized milestone illumination points
          if (p >= 0.94) currentStage = 4;
          else if (p >= 0.72) currentStage = 3;
          else if (p >= 0.50) currentStage = 2;
          else if (p >= 0.27) currentStage = 1;
          else currentStage = 0;
        } else if (elapsed <= 6800) {
          // Hold all 5 milestones illuminated in full constellation
          strokeOffset = 0;
          currentStage = 4;
        } else {
          // Soft 700ms reset
          const resetProgress = (elapsed - 6800) / (CYCLE_DURATION - 6800);
          strokeOffset = 100 * resetProgress;
          currentStage = 4;
        }

        // Directly update the SVG progress path for silky 60fps/120fps motion
        if (pathRef.current) {
          pathRef.current.style.strokeDashoffset = `${strokeOffset}`;
        }

        // Directly update mobile vertical spine
        if (mobileSpineRef.current) {
          const mobilePercent = elapsed <= DRAW_DURATION ? (elapsed / DRAW_DURATION) * 100 : 100;
          mobileSpineRef.current.style.height = `${mobilePercent}%`;
        }

        setActiveStage(currentStage);
      } else {
        // When hovering a specific step, reflect that step in the line
        if (pathRef.current) {
          const hoverOffsets = [88, 68, 46, 24, 0];
          pathRef.current.style.strokeDashoffset = `${hoverOffsets[hoveredStep]}`;
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [hoveredStep]);

  const currentDisplayStage = hoveredStep !== null ? hoveredStep : activeStage;

  return (
    <section
      id="method"
      aria-label="The MKAN Method"
      className="relative bg-[#FAF7F2] text-[#1A060E] px-6 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20 overflow-hidden border-y border-[#4F1C30]/10"
    >
      <div className="mx-auto max-w-[1520px]">
        {/* ========================================================================= */}
        {/* Section Header: Minimal, Refined Editorial Alignment                     */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-7 sm:pb-8 border-b border-[#4F1C30]/15">
          <div>
            <p className="font-sans text-[0.68rem] sm:text-[0.72rem] font-bold tracking-[0.24em] text-[#4F1C30]/75 uppercase mb-1.5">
              EXECUTION METHODOLOGY
            </p>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-[2.85rem] text-[#4F1C30] tracking-[0.03em] uppercase leading-tight">
              {method.title || "THE MKAN METHOD"}
            </h2>
            <p className="font-sans text-[0.7rem] sm:text-[0.76rem] font-medium tracking-[0.16em] text-[#7A6B68] uppercase mt-1">
              {method.subtitle || "FROM STRATEGY TO EXTRAORDINARY EXPERIENCES."}
            </p>
          </div>

          <Link
            href={methodCtaHref}
            className="group inline-flex items-center gap-2 font-sans text-[0.68rem] sm:text-[0.72rem] font-bold tracking-[0.24em] uppercase text-[#4F1C30] transition-colors duration-300 hover:text-[#7A2243]"
          >
            <span>{methodCtaLabel}</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-bold text-[#4F1C30]"
            >
              →
            </span>
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP VIEWPORT: Pure Progression Bar Continuous Thread Wave              */}
        {/* Side-by-Side: Heading & Description on Left, Big Bold Number on Right      */}
        {/* ========================================================================= */}
        <div
          onMouseLeave={() => setHoveredStep(null)}
          className="hidden lg:block relative mt-10 xl:mt-12 select-none"
        >
          {/* Continuous Hand-Drawn Wave SVG Ribbon */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 240"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Authentic MKAN Theme Imperial Velvet Plum & Wine Gradient */}
                <linearGradient id="mkanProgressPlumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F1C30" />
                  <stop offset="30%" stopColor="#7A2243" />
                  <stop offset="60%" stopColor="#8A254B" />
                  <stop offset="85%" stopColor="#6A1736" />
                  <stop offset="100%" stopColor="#4F1C30" />
                </linearGradient>

                {/* Delicate subtle satin glow filter for the wave path */}
                <filter id="mkanProgressGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 1. Underlying Delicate Architectural Pencil Trace Line */}
              <path
                d="M 20 125 L 120 125 C 220 125, 260 50, 360 50 C 460 50, 500 125, 600 125 C 700 125, 740 50, 840 50 C 940 50, 980 125, 1080 125 L 1180 125"
                stroke="#4F1C30"
                strokeOpacity="0.10"
                strokeWidth="1.2"
                strokeDasharray="4 6"
              />

              {/* 2. Fluid Theme-Plum Continuous Progression Thread Spline */}
              <path
                ref={pathRef}
                d="M 20 119 L 120 119 C 220 119, 260 44, 360 44 C 460 44, 500 119, 600 119 C 700 119, 740 44, 840 44 C 940 44, 980 119, 1080 119 L 1180 119"
                stroke="url(#mkanProgressPlumGradient)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#mkanProgressGlow)"
                pathLength={100}
                strokeDasharray={100}
                style={{
                  strokeDashoffset: 100,
                  willChange: "stroke-dashoffset",
                }}
              />
            </svg>
          </div>

          {/* 5-Column Interlocking Nodes & Texts */}
          <div className="relative z-10 grid grid-cols-5 items-center w-full gap-4 xl:gap-6">
            {steps.map((step, idx) => {
              // Alternating rhythm: Steps 0, 2, 4 have text ABOVE; Steps 1, 3 have text BELOW
              const isTopText = idx % 2 === 0;
              const isHighlighted = currentDisplayStage >= idx;

              return (
                <div
                  key={step.number}
                  onMouseEnter={() => setHoveredStep(idx)}
                  className="group relative flex flex-col items-center justify-between h-[240px] px-1 cursor-pointer transition-all duration-500"
                >
                  {isTopText ? (
                    <>
                      {/* Text on TOP (Above Valley Node): Heading on Left, Number on Right */}
                      <div className="h-[95px] w-full flex items-start justify-between gap-3 text-left">
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`font-sans font-bold text-sm xl:text-[0.95rem] tracking-tight transition-colors duration-800 ease-out ${
                              isHighlighted ? "text-[#4F1C30]" : "text-[#1A060E]"
                            }`}
                          >
                            {step.name}
                          </h3>
                          <p className="font-sans text-[0.72rem] xl:text-[0.76rem] text-[#5A4B46] leading-relaxed mt-1 line-clamp-3">
                            {step.description}
                          </p>
                        </div>

                        {/* Large, High-Fashion Visible Number to the Right (Smooth, Graceful Bloom) */}
                        <span
                          className={`font-sans font-extrabold text-4xl xl:text-[2.85rem] leading-none shrink-0 select-none transition-all duration-1000 ease-out ${
                            isHighlighted
                              ? "text-[#4F1C30]/60 scale-[1.03]"
                              : "text-[#4F1C30]/22 scale-100"
                          }`}
                        >
                          {step.number}
                        </span>
                      </div>

                      {/* Milestone Node (Valley: Y=119px) */}
                      <div className="relative group/node my-auto">
                        {/* Ultra-Minimal Ambient Shadow Whisper (Zero Muddy Smudge) */}
                        <div
                          className={`absolute -inset-1.5 rounded-xl bg-[#4F1C30]/8 blur-md pointer-events-none -z-10 transition-opacity duration-1000 ease-out ${
                            isHighlighted ? "opacity-100" : "opacity-0"
                          }`}
                        />

                        {/* Clean Architectural Node Card Badge */}
                        <div
                          className={`w-11 h-11 xl:w-12 xl:h-12 rounded-xl flex items-center justify-center bg-white border transition-all duration-1000 ease-out ${
                            isHighlighted
                              ? "border-[#4F1C30]/35 text-[#4F1C30] shadow-[0_6px_20px_rgba(79,28,48,0.12)] -translate-y-0.5"
                              : "border-[#4F1C30]/15 text-[#4F1C30]/35 shadow-[0_2px_8px_rgba(79,28,48,0.04)]"
                          } group-hover:-translate-y-1 group-hover:border-[#4F1C30]/60 group-hover:text-[#4F1C30] group-hover:shadow-[0_8px_24px_rgba(79,28,48,0.2)]`}
                        >
                          <StepIcon index={idx} />
                        </div>
                      </div>

                      {/* Bottom Balance Spacer */}
                      <div className="h-[95px] w-full pointer-events-none" />
                    </>
                  ) : (
                    <>
                      {/* Top Balance Spacer */}
                      <div className="h-[20px] w-full pointer-events-none" />

                      {/* Milestone Node (Peak: Y=44px) */}
                      <div className="relative group/node my-auto">
                        {/* Ultra-Minimal Ambient Shadow Whisper (Zero Muddy Smudge) */}
                        <div
                          className={`absolute -inset-1.5 rounded-xl bg-[#4F1C30]/8 blur-md pointer-events-none -z-10 transition-opacity duration-1000 ease-out ${
                            isHighlighted ? "opacity-100" : "opacity-0"
                          }`}
                        />

                        {/* Clean Architectural Node Card Badge */}
                        <div
                          className={`w-11 h-11 xl:w-12 xl:h-12 rounded-xl flex items-center justify-center bg-white border transition-all duration-1000 ease-out ${
                            isHighlighted
                              ? "border-[#4F1C30]/35 text-[#4F1C30] shadow-[0_6px_20px_rgba(79,28,48,0.12)] -translate-y-0.5"
                              : "border-[#4F1C30]/15 text-[#4F1C30]/35 shadow-[0_2px_8px_rgba(79,28,48,0.04)]"
                          } group-hover:-translate-y-1 group-hover:border-[#4F1C30]/60 group-hover:text-[#4F1C30] group-hover:shadow-[0_8px_24px_rgba(79,28,48,0.2)]`}
                        >
                          <StepIcon index={idx} />
                        </div>
                      </div>

                      {/* Text on BOTTOM (Below Peak Node): Heading on Left, Number on Right */}
                      <div className="h-[95px] w-full flex items-start justify-between gap-3 text-left pt-2">
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`font-sans font-bold text-sm xl:text-[0.95rem] tracking-tight transition-colors duration-800 ease-out ${
                              isHighlighted ? "text-[#4F1C30]" : "text-[#1A060E]"
                            }`}
                          >
                            {step.name}
                          </h3>
                          <p className="font-sans text-[0.72rem] xl:text-[0.76rem] text-[#5A4B46] leading-relaxed mt-1 line-clamp-3">
                            {step.description}
                          </p>
                        </div>

                        {/* Large, High-Fashion Visible Number to the Right (Smooth, Graceful Bloom) */}
                        <span
                          className={`font-sans font-extrabold text-4xl xl:text-[2.85rem] leading-none shrink-0 select-none transition-all duration-1000 ease-out ${
                            isHighlighted
                              ? "text-[#4F1C30]/60 scale-[1.03]"
                              : "text-[#4F1C30]/22 scale-100"
                          }`}
                        >
                          {step.number}
                        </span>
                      </div>

                      {/* Bottom Balance Spacer */}
                      <div className="h-[75px] w-full pointer-events-none" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET VIEWPORT: Sleek Vertical Ribbon Flow                      */}
        {/* ========================================================================= */}
        <div className="lg:hidden relative mt-10 sm:mt-12 pl-6 sm:pl-8">
          {/* Vertical Guide Spine with continuous progression bar */}
          <div className="absolute left-6 sm:left-8 top-3 bottom-6 w-[1.5px] bg-[#4F1C30]/15">
            <div
              ref={mobileSpineRef}
              className="w-full bg-gradient-to-b from-[#4F1C30] via-[#7A2243] to-[#4F1C30] transition-all duration-100"
              style={{ height: "0%" }}
            />
          </div>

          <div className="space-y-8 sm:space-y-10 relative z-10">
            {steps.map((step, idx) => {
              const isHighlighted = currentDisplayStage >= idx;

              return (
                <div
                  key={step.number}
                  onClick={() => setHoveredStep(idx)}
                  className="relative flex items-start gap-4 sm:gap-6 cursor-pointer"
                >
                  {/* Milestone Node on Vertical Spine */}
                  <div className="relative -ml-[21px] sm:-ml-[23px] shrink-0">
                    <div
                      className={`absolute -inset-1.5 rounded-xl bg-[#4F1C30]/8 blur-md pointer-events-none -z-10 transition-opacity duration-800 ${
                        isHighlighted ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center bg-white border transition-all duration-800 ${
                        isHighlighted
                          ? "border-[#4F1C30]/40 text-[#4F1C30] shadow-[0_4px_16px_rgba(79,28,48,0.14)]"
                          : "border-[#4F1C30]/15 text-[#4F1C30]/35 shadow-sm"
                      }`}
                    >
                      <StepIcon index={idx} />
                    </div>
                  </div>

                  {/* Step Content: Left Heading/Text, Right Number */}
                  <div className="flex-1 pt-0.5 flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-sans font-bold text-sm sm:text-base tracking-tight transition-colors duration-800 ${
                          isHighlighted ? "text-[#4F1C30]" : "text-[#1A060E]"
                        }`}
                      >
                        {step.name}
                      </h3>
                      <p className="font-sans text-xs sm:text-[0.82rem] text-[#5A4B46] leading-relaxed mt-1 max-w-md">
                        {step.description}
                      </p>
                    </div>

                    <span
                      className={`font-sans font-extrabold text-3xl sm:text-4xl leading-none shrink-0 transition-colors duration-1000 ${
                        isHighlighted ? "text-[#4F1C30]/60" : "text-[#4F1C30]/22"
                      }`}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}