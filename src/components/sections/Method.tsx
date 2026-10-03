"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";

interface MethodProps {
  data?: typeof homeContent.method;
  assets?: typeof defaultAssets;
}

export function Method({
  data = homeContent.method,
  assets = defaultAssets,
}: MethodProps) {
  const method = data;
  const steps = method.steps || [];

  const approachIsSelfLink = String(method.cta?.href) === "#method";
  const methodCtaHref = approachIsSelfLink ? "#contact" : method.cta?.href || "#contact";
  const methodCtaLabel = method.cta?.label || "OUR APPROACH";

  // Active step: -1 means resting at zero (no lines filled)
  const [activeStep, setActiveStep] = useState<number>(-1);

  // Helper to map assets
  const getStepImage = (key: string) => {
    switch (key) {
      case "concept":     return assets.method?.concept?.src     || "/images/method-concept.jpg";
      case "development": return assets.method?.development?.src || "/images/method-development.jpg";
      case "curation":    return assets.method?.curation?.src    || "/images/method-curation.jpg";
      case "production":  return assets.method?.production?.src  || "/images/method-production.jpg";
      case "reporting":   return assets.method?.reporting?.src   || "/images/method-reporting.jpg";
      default:            return "/images/method-concept.jpg";
    }
  };

  const handleStepHover = useCallback((targetIndex: number) => {
    setActiveStep(targetIndex);
  }, []);

  // When mouse leaves the pipeline, progression bar drains smoothly back to ZERO
  const handlePipelineLeave = useCallback(() => {
    setActiveStep(-1);
  }, []);

  return (
    <section
      id="method"
      className="relative bg-[#F9F6F0] text-[#1A060E] px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-16 xl:py-20 overflow-hidden border-t border-[#1A060E]/5"
    >
      <div className="mx-auto max-w-[1550px]">
        {/* Header: Title + Subtitle on Left, Approach Link on Right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-7 sm:pb-8 lg:pb-9 border-b border-[#1A060E]/10">
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[3.25rem] text-[#4f1c30] tracking-[0.025em] leading-[1.08] uppercase">
              {method.title || "THE MKAN METHOD"}
            </h2>
            <p className="font-sans text-[0.68rem] sm:text-[0.74rem] font-bold tracking-[0.2em] text-[#7A6B68] uppercase mt-2.5">
              {method.subtitle || "FROM STRATEGY TO EXTRAORDINARY EXPERIENCES."}
            </p>
          </div>

          <Link
            href={methodCtaHref}
            className="group inline-flex items-center gap-2 font-sans text-[0.7rem] sm:text-[0.74rem] font-bold tracking-[0.22em] uppercase text-[#1A060E] transition-colors duration-300 hover:text-[#925B00]"
          >
            <span>{methodCtaLabel}</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-bold"
            >
              →
            </span>
          </Link>
        </div>

        {/* 5-Step Horizontal Pipeline */}
        <div
          onMouseLeave={handlePipelineLeave}
          className="mt-8 sm:mt-10 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-7 lg:gap-5 xl:gap-7 items-start"
        >
          {steps.map((step, idx) => {
            const isActive = idx === activeStep;
            // Progressed if activeStep >= 0 and idx <= activeStep
            const isProgressed = activeStep >= 0 && idx <= activeStep;
            const isLast = idx === steps.length - 1;

            return (
              <div
                key={step.number}
                onMouseEnter={() => handleStepHover(idx)}
                onClick={() => handleStepHover(idx)}
                className="group flex flex-col cursor-pointer select-none transition-all duration-500"
              >
                {/* 1. Top Row: Step Number & Horizontal Progression Bar */}
                <div className="flex items-center gap-3 w-full h-11 relative mb-1.5">
                  {/* Number with Soft Luxury Ambient Halo */}
                  <div className="relative flex items-center justify-center shrink-0 w-11 h-11">
                    {/* Glowing Circular Ambient Halo */}
                    <div
                      className={`absolute inset-0 rounded-full bg-[#EADCCB]/90 -z-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive
                          ? "scale-110 opacity-100 shadow-[0_0_20px_rgba(221,183,138,0.45)]"
                          : "scale-75 opacity-0"
                      }`}
                    />

                    <span
                      className={`font-display text-3xl sm:text-4xl lg:text-[2.55rem] leading-none font-normal transition-all duration-500 ${
                        isActive ? "text-[#1A060E] font-medium scale-105" : "text-[#1A060E]/80"
                      }`}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Horizontal Track with Apple-Grade Luminous Fluid Flow into Arrow Head */}
                  <div className="flex-1 flex items-center relative pl-1.5 pr-1 h-6">
                    {/* Layer 1: Muted Base Pipeline (Line + Arrow Head / Star) */}
                    <div className="w-full flex items-center relative text-[#1A060E]/15">
                      <div className="h-[2px] flex-1 bg-current rounded-full" />
                      {!isLast ? (
                        <svg
                          className="w-4 h-4 shrink-0 -ml-1 text-current"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.5 3.5L10.5 8L4.5 12.5"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        /* Step 5 (After Reports): Muted Diamond Star */
                        <div className="relative shrink-0 flex items-center justify-center -ml-1 w-4 h-4 text-current">
                          <svg
                            className="w-4 h-4 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 1.5C12 7.2 16.8 12 22.5 12C16.8 12 12 16.8 12 22.5C12 16.8 7.2 12 1.5 12C7.2 12 12 7.2 12 1.5Z"
                              fill="currentColor"
                            />
                            <path
                              d="M12 6.5L13.8 10.2L17.5 12L13.8 13.8L12 17.5L10.2 13.8L6.5 12L10.2 10.2L12 6.5Z"
                              fill="currentColor"
                              opacity="0.8"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Layer 2: Apple-Grade Radiant Liquid Gold Stream (Flows continuously into arrow/star) */}
                    <div
                      className="absolute inset-0 pl-1.5 pr-1 flex items-center text-[#B88E5E] pointer-events-none"
                      style={{
                        clipPath: isProgressed ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                        transitionProperty: "clip-path",
                        transitionDuration: isProgressed ? "500ms" : "280ms",
                        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                        transitionDelay: isProgressed ? `${idx * 105}ms` : "0ms",
                      }}
                    >
                      {/* Liquid Gold Line with Specular Photon Gradient */}
                      <div className="h-[2px] flex-1 bg-gradient-to-r from-[#8C5D28] via-[#B88E5E] via-65% to-[#FFE2B8] rounded-full shadow-[0_0_10px_rgba(221,183,138,0.5)]" />

                      {/* Liquid Gold Arrow Head (Water flows smoothly right into it!) */}
                      {!isLast ? (
                        <svg
                          className="w-4 h-4 shrink-0 -ml-1 text-[#A37844] drop-shadow-[0_0_8px_rgba(201,162,112,0.7)]"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.5 3.5L10.5 8L4.5 12.5"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        /* Step 5: Liquid Gold Diamond Star (Water flows smoothly right into it!) */
                        <div className="relative shrink-0 flex items-center justify-center -ml-1 w-4 h-4 text-[#B88E5E]">
                          <svg
                            className="w-4 h-4 shrink-0 drop-shadow-[0_0_10px_rgba(201,162,112,0.85)]"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 1.5C12 7.2 16.8 12 22.5 12C16.8 12 12 16.8 12 22.5C12 16.8 7.2 12 1.5 12C7.2 12 12 7.2 12 1.5Z"
                              fill="currentColor"
                            />
                            <path
                              d="M12 6.5L13.8 10.2L17.5 12L13.8 13.8L12 17.5L10.2 13.8L6.5 12L10.2 10.2L12 6.5Z"
                              fill="currentColor"
                              opacity="0.8"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Step Title */}
                <h3 className="font-sans text-xs sm:text-[0.82rem] font-extrabold tracking-[0.16em] uppercase text-[#1A060E] mt-3 mb-2.5 transition-colors duration-300 group-hover:text-[#925B00]">
                  {step.name}
                </h3>

                {/* 3. Premium Cinematic Floating Image Card */}
                <div className="relative mt-0.5 group/card">
                  {/* Atmospheric Levitation Shadow & Ambient Underglow */}
                  <div
                    className={`absolute -inset-1.5 rounded-md bg-gradient-to-b from-[#B88E5E]/25 via-[#DDB78A]/20 to-[#1A060E]/30 blur-xl transition-all duration-800 ease-out pointer-events-none -z-10 translate-y-3 ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                    }`}
                  />

                  {/* Floating Card Frame */}
                  <div
                    className={`relative aspect-[16/9.5] w-full overflow-hidden rounded-sm border bg-[#EFE9DF] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? "-translate-y-2 border-[#B88E5E] shadow-[0_24px_48px_-12px_rgba(26,6,14,0.22),0_8px_24px_-4px_rgba(184,142,94,0.25)]"
                        : "border-[#1A060E]/12 translate-y-0 shadow-[0_4px_12px_rgba(26,6,14,0.04)] group-hover:-translate-y-2 group-hover:border-[#B88E5E] group-hover:shadow-[0_24px_48px_-12px_rgba(26,6,14,0.22),0_8px_24px_-4px_rgba(184,142,94,0.25)]"
                    }`}
                  >
                    {/* Cinematic 35mm Parallax Slow Camera Push */}
                    <div
                      className={`relative w-full h-full transition-transform duration-1000 ease-out ${
                        isActive ? "scale-[1.04]" : "scale-100 group-hover:scale-[1.04]"
                      }`}
                    >
                      <Image
                        src={getStepImage(step.imageKey)}
                        alt={step.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="object-cover object-center transition-all duration-700 ease-out brightness-[0.98] contrast-[0.98] group-hover:brightness-[1.04] group-hover:contrast-[1.03] group-hover:saturate-[1.05]"
                      />
                    </div>

                    {/* Cinematic Anamorphic Specular Light Sweep */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[130%] group-hover:translate-x-[130%] transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
                    />

                    {/* Film Chiaroscuro Vignette */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#1A060E]/35 via-transparent to-transparent transition-opacity duration-700 pointer-events-none ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />

                    {/* Ethereal Chamfer Rim Light */}
                    <div
                      className={`absolute inset-0 border transition-colors duration-500 pointer-events-none ${
                        isActive ? "border-white/30" : "border-white/0 group-hover:border-white/30"
                      }`}
                    />
                  </div>
                </div>

                {/* 4. Step Description */}
                <p className="font-sans text-[0.74rem] sm:text-[0.78rem] text-[#5A4B46] leading-[1.6] mt-3 transition-colors duration-300 group-hover:text-[#1A060E]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}