"use client";

import Image from "next/image";
import { BackButton } from "@/components/common/BackButton";

interface ApproachHeroProps {
  imageSrc?: string;
}

export function ApproachHero({
  imageSrc = "/images/1.png",
}: ApproachHeroProps) {
  return (
    <section className="relative min-h-[55vh] sm:min-h-[65vh] lg:min-h-[72vh] w-full flex flex-col justify-end overflow-hidden bg-[#24040F] px-6 sm:px-10 lg:px-16 pt-32 pb-14 sm:pb-20 select-none">
      {/* Background Cinematic Visual with Dark Cherry Radial Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="relative w-full h-full lux-hero-img">
          <Image
            src={imageSrc}
            alt="The MKAN Method"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Dark Cherry Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#24040F] via-[#24040F]/80 to-[#24040F]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(221,183,138,0.15)_0%,_transparent_75%)]" />
      </div>

      {/* Top Champagne Hairline */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DDB78A]/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <div className="max-w-3xl">
          {/* Eyebrow with GO BACK button */}
          <div className="flex flex-wrap items-center gap-4 mb-5 lux-hero-eyebrow">
            <BackButton fallbackHref="/" />
            <span className="hidden sm:inline-block h-3 w-px bg-[#DDB78A]/40" aria-hidden="true" />
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 bg-[#DDB78A]/70" aria-hidden="true" />
              <p className="font-sans text-[0.68rem] sm:text-[0.74rem] font-semibold tracking-[0.35em] uppercase text-[#DDB78A]">
                THE MKAN METHOD
              </p>
            </div>
          </div>

          {/* Master Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.75rem] font-normal tracking-[0.02em] uppercase text-[#FAF3EE] leading-[1.05] lux-hero-title">
            FROM STRATEGY TO EXTRAORDINARY EXPERIENCES.
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 font-sans text-sm sm:text-base lg:text-lg font-light text-[#F3E7DF]/85 leading-relaxed max-w-xl lux-hero-desc">
            A disciplined five-stage execution framework engineered to transform ambitious creative concepts into seamless reality.
          </p>
        </div>
      </div>
    </section>
  );
}
