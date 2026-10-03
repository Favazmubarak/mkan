"use client";

import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";
import { scrollToElementCenter } from "@/lib/cinematic-scroll";

interface BuiltForBrandsProps {
  data?: typeof homeContent.builtForBrands;
  assets?: typeof defaultAssets;
}

export function BuiltForBrands({
  data = homeContent.builtForBrands,
  assets = defaultAssets,
}: BuiltForBrandsProps) {
  const builtForBrands = data;
  const imageSrc = "/images/1.png";

  const rawHeading =
    builtForBrands.heading || "BUILT FOR BRANDS, INSTITUTIONS & COMMUNITIES.";
  const parts = rawHeading.includes("INSTITUTIONS")
    ? rawHeading.split("INSTITUTIONS")
    : [rawHeading];

  const ctaLabel = builtForBrands.cta?.label || "OUR CLIENTS";

  // Cinematic slow smooth scroll to dead center of the client animation section
  const handleScrollToClients = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToElementCenter("#clients", 1400, "#clients");
  };

  return (
    <section className="relative overflow-hidden min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] xl:min-h-[720px] flex items-center bg-[#F7F2EA]">
      {/* Full-Bleed Architectural Environment Photo Layer (/images/1.png) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={imageSrc}
          alt={
            assets.builtForBrands?.alt ||
            "Minimalist stone courtyard with arched portal framing an olive tree and warm sunlit wall"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_center] sm:object-[center_right] lg:object-center brightness-[0.99] contrast-[1.01]"
        />
        {/* Soft atmospheric gradient on mobile/tablet for crystal-clear text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F6F1EA]/95 via-[#F6F1EA]/75 via-45% to-transparent sm:via-[#F6F1EA]/30 sm:from-[#F6F1EA]/60 lg:hidden pointer-events-none" />
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 mx-auto max-w-[1600px] w-full px-6 sm:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-24">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Main Display Headline — Cormorant Garamond Serif matching reference image */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.85rem] font-medium leading-[1.12] text-[#240612] tracking-tight uppercase">
            {parts.length > 1 ? (
              <>
                <span>{parts[0]}</span>
                <br className="hidden sm:inline" />
                <span>INSTITUTIONS{parts[1]}</span>
              </>
            ) : (
              rawHeading
            )}
          </h2>

          {/* Subtitle / Paragraph */}
          <p className="mt-6 sm:mt-8 text-sm sm:text-base lg:text-[1.05rem] font-sans font-normal leading-[1.68] text-[#4A3C35] max-w-[480px]">
            {builtForBrands.paragraph}
          </p>

          {/* Outlined Rectangular Button with Cream Filling, Inverting to Cherry Noir on Hover */}
          <div className="mt-8 sm:mt-10">
            <Link
              href="#clients"
              onClick={handleScrollToClients}
              className="group inline-flex items-center gap-3.5 border border-[#D4B996] bg-[#F5EEE6] px-7 py-3.5 text-xs sm:text-[0.76rem] font-sans font-bold tracking-[0.24em] uppercase text-[#240612] shadow-[0_2px_12px_rgba(36,6,18,0.06)] transition-all duration-300 ease-out hover:bg-[#1A060E] hover:text-[#DDB78A] hover:border-[#1A060E] hover:shadow-[0_12px_28px_-6px_rgba(26,6,14,0.35)] active:scale-95"
            >
              <span>{ctaLabel}</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 font-bold"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
