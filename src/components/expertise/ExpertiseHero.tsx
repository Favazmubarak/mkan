"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

interface ExpertiseHeroProps {
  imageSrc?: string;
  onScrollClick?: () => void;
}

export function ExpertiseHero({
  imageSrc = "/images/Hero1.png",
  onScrollClick,
}: ExpertiseHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onScrollClick) {
      onScrollClick();
    } else {
      const el = document.getElementById("intro");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#16030C] px-6 sm:px-8 lg:px-12 pt-32 sm:pt-36 lg:pt-44 pb-12 sm:pb-16 select-none">
      {/* Background Cinematic Visual with Ultra-Slow Reveal & Dark Negative Space */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className={`relative w-full h-full transition-all duration-[2200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isLoaded
              ? "scale-100 opacity-40 blur-0"
              : "scale-108 opacity-0 blur-md"
          }`}
        >
          <Image
            src={imageSrc}
            alt="MKAN Concept Luxury Architectural Environment"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.7] contrast-[1.1]"
          />
        </div>

        {/* Ambient Multi-Layer Vignettes & Deep Wine Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16030C] via-[#16030C]/80 via-50% to-[#16030C]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(221,183,138,0.1)_0%,_transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#16030C] to-transparent" />
      </div>

      {/* Top Hairline Accent */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DDB78A]/30 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] my-auto">
        <div className="max-w-4xl">
          {/* Eyebrow: Appears First */}
          <div
            className={`flex items-center gap-3.5 mb-5 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <span className="h-px w-10 bg-[#DDB78A]/60" aria-hidden="true" />
            <p className="font-sans text-[0.68rem] sm:text-[0.74rem] font-medium tracking-[0.35em] uppercase text-[#DDB78A]">
              MKAN CONCEPT / EXPERTISE
            </p>
          </div>

          {/* Master Display Headline: Appears Second */}
          <h1
            className={`font-display text-4xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-normal tracking-[0.08em] sm:tracking-[0.12em] uppercase text-[#FAF1E8] leading-[1.05] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            OUR EXPERTISE
          </h1>

          {/* Supporting Statement: Appears Third */}
          <p
            className={`mt-6 sm:mt-8 font-sans text-base sm:text-lg lg:text-xl font-light text-[#EAE0D5]/80 leading-relaxed max-w-2xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-500 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Curated experiences, exhibitions, activations and strategic solutions designed with purpose, precision and impact.
          </p>

          {/* Quick Sub-Navigation Pills */}
          <div
            className={`mt-8 sm:mt-10 flex flex-wrap items-center gap-2 sm:gap-3 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-700 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {[
              { label: "01 Events", href: "#events" },
              { label: "02 Exhibitions", href: "#exhibitions" },
              { label: "03 Workshops", href: "#workshops" },
              { label: "04 Activations", href: "#activations" },
              { label: "05 Consultancy", href: "#consultancy" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-[#DDB78A]/25 bg-[#16030C]/60 text-[0.65rem] sm:text-[0.7rem] font-sans font-medium tracking-[0.2em] uppercase text-[#EAD0B3] hover:border-[#DDB78A] hover:bg-[#DDB78A]/10 hover:text-white transition-all duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator: Appears Last */}
      <div
        className={`relative z-10 mx-auto w-full max-w-[1440px] pt-8 flex items-center justify-between border-t border-[#DDB78A]/15 text-[#EAE0D5]/60 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-900 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <span className="text-[0.65rem] sm:text-[0.7rem] font-sans tracking-[0.25em] uppercase text-[#DDB78A]/80">
          DUBAI · EST. 2017
        </span>

        <button
          onClick={handleScroll}
          className="group inline-flex items-center gap-2.5 text-[0.68rem] font-sans font-medium tracking-[0.25em] uppercase text-[#EAD0B3] hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll to introduction"
        >
          <span>EXPLORE CAPABILITIES</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#DDB78A]/30 text-[#DDB78A] transition-all duration-300 group-hover:border-[#DDB78A] group-hover:bg-[#DDB78A]/10 group-hover:translate-y-0.5">
            <ArrowDown size={13} />
          </span>
        </button>
      </div>
    </section>
  );
}
