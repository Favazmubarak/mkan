"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { BackButton } from "@/components/common/BackButton";
import { ExperienceNumbers } from "./ExperienceNumbers";

export function ExperienceHero() {
  const scrollToContent = () => {
    const el = document.getElementById("experience-gallery");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-between bg-[#140207] text-[#FAF3EE] overflow-hidden select-none">
      {/* Background Architectural Image (Unified Full-Screen Canvas) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="relative w-full h-full lux-hero-img">
          <Image
            src="/images/2.1.png"
            alt="MKAN Experiential Architecture"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.52] contrast-[1.14]"
          />
        </div>

        {/* Cinematic Vignette Layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0105] via-[#140207]/80 to-[#140207]/45" />
      </div>

      {/* Top Header & Navigation Zone */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 lg:pt-32">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="flex flex-wrap items-center gap-3 lux-hero-eyebrow">
            <BackButton fallbackHref="/" />
            <span className="hidden sm:inline-block h-3 w-px bg-[#DDB78A]/35" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <span className="h-px w-5 bg-[#DDB78A]/70" aria-hidden="true" />
              <p className="font-sans text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.3em] uppercase text-[#DDB78A]">
                EXPERIENCE
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Center Editorial Title & Narrative Zone (Architecturally Proportionate) */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 my-auto py-4 sm:py-6 lg:py-4">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="max-w-3xl">
            {/* Headline */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.6rem] font-light tracking-[0.02em] uppercase text-[#FAF3EE] leading-[1.04] lux-hero-title">
              EXPERIENCE, <br />
              <span className="font-serif italic font-light text-[#DDB78A] tracking-normal">
                CURATED WITH PURPOSE.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-3 sm:mt-4 font-sans text-xs sm:text-sm lg:text-[0.92rem] font-light text-[#F3E7DF]/85 leading-relaxed max-w-xl lux-hero-desc">
              Since 2017, MKAN has been creating curated experiences where strategic thinking, refined aesthetics and disciplined execution come together.
            </p>

            {/* Minimalist Explore Prompt */}
            <div className="mt-5 sm:mt-6 flex items-center gap-4 lux-hero-metrics">
              <button
                onClick={scrollToContent}
                type="button"
                className="group inline-flex items-center gap-2.5 text-[0.66rem] sm:text-xs font-sans font-medium tracking-[0.24em] uppercase text-[#DDB78A]/80 hover:text-[#DDB78A] transition-colors cursor-pointer"
              >
                <span>EXPLORE THE DOSSIER</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#DDB78A]/30 bg-[#DDB78A]/5 transition-transform duration-300 group-hover:translate-y-0.5">
                  <ArrowDown size={10} className="text-[#DDB78A]" />
                </span>
              </button>
              <div className="hidden sm:block h-px w-16 bg-gradient-to-r from-[#DDB78A]/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Integrated Numbers Bar (Single-Page View Dock) */}
      <div className="relative z-10 w-full">
        <ExperienceNumbers embedded />
      </div>
    </section>
  );
}
