"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { BackButton } from "@/components/common/BackButton";

export function ExperiencesHero() {
  const scrollToWork = () => {
    const el = document.getElementById("portfolio-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[65vh] sm:min-h-[75vh] lg:min-h-[82vh] flex flex-col justify-end bg-[#20040D] text-[#FAF3EE] px-6 sm:px-10 lg:px-16 pt-32 pb-16 sm:pb-20 overflow-hidden select-none">
      {/* Cinematic visual overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="relative w-full h-full lux-hero-img">
          <Image
            src="/images/2.1.png"
            alt="Selected Experiences"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Ambient Dark Cherry Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#20040D] via-[#20040D]/85 to-[#20040D]/40" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#DDB78A]/8 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Top and bottom hairlines */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#DDB78A]/20 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <div className="max-w-4xl">
          {/* Eyebrow badge with GO BACK button */}
          <div className="flex flex-wrap items-center gap-4 mb-5 lux-hero-eyebrow">
            <BackButton fallbackHref="/" />
            <span className="hidden sm:inline-block h-3 w-px bg-[#DDB78A]/40" aria-hidden="true" />
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 bg-[#DDB78A]/70" aria-hidden="true" />
              <p className="font-sans text-[0.68rem] sm:text-[0.74rem] font-semibold tracking-[0.35em] uppercase text-[#DDB78A]">
                PORTFOLIO & CURATED ARCHIVE
              </p>
            </div>
          </div>

          {/* Master Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-normal tracking-[-0.01em] uppercase text-[#FAF3EE] leading-[1.04] lux-hero-title">
            SELECTED <span className="font-serif italic font-light text-[#DDB78A]">EXPERIENCES</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 font-sans text-sm sm:text-base lg:text-lg font-light text-[#F3E7DF]/85 leading-relaxed max-w-2xl lux-hero-desc">
            A curated portfolio of flagship exhibitions, experiential retail activations, high-level corporate platforms, and VIP protocols delivered across the UAE.
          </p>

          {/* Key Metrics Bar */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 border-y border-[#DDB78A]/15 py-5 max-w-3xl lux-hero-metrics">
            <div>
              <span className="font-display text-2xl sm:text-3xl text-[#DDB78A] block">2017</span>
              <span className="text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.25em] text-[#F3E7DF]/60 font-sans mt-0.5 block">Established</span>
            </div>
            <div>
              <span className="font-display text-2xl sm:text-3xl text-[#DDB78A] block">100+</span>
              <span className="text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.25em] text-[#F3E7DF]/60 font-sans mt-0.5 block">Delivered Projects</span>
            </div>
            <div>
              <span className="font-display text-2xl sm:text-3xl text-[#DDB78A] block">100%</span>
              <span className="text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.25em] text-[#F3E7DF]/60 font-sans mt-0.5 block">Emirati Owned</span>
            </div>
            <div>
              <span className="font-display text-2xl sm:text-3xl text-[#DDB78A] block">Dubai</span>
              <span className="text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.25em] text-[#F3E7DF]/60 font-sans mt-0.5 block">Atelier Base</span>
            </div>
          </div>

          {/* Refined Scroll Prompt */}
          <button
            onClick={scrollToWork}
            className="mt-8 inline-flex items-center gap-2 text-xs font-sans tracking-[0.3em] uppercase text-[#DDB78A]/80 hover:text-[#DDB78A] transition-colors cursor-pointer lux-hero-metrics"
          >
            <span>EXPLORE ARCHIVE</span>
            <ArrowDown size={13} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
