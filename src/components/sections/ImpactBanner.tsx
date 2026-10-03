import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";

interface ImpactBannerProps {
  data?: typeof homeContent.impactBanner;
  assets?: typeof defaultAssets;
}

export function ImpactBanner({
  data = homeContent.impactBanner,
  assets = defaultAssets,
}: ImpactBannerProps) {
  const impactBanner = data;
  const impactBg = assets.impactBg;

  return (
    <section className="relative w-full overflow-hidden bg-black text-white min-h-[300px] sm:min-h-[350px] md:min-h-[390px] lg:min-h-[430px] xl:min-h-[460px] flex items-center">
      {/* Background Image (/images/impact.png) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src={impactBg?.src || "/images/impact.png"}
          alt={
            impactBg?.alt ||
            "Illuminated architectural portal and lantern-lit promenade framing evening skyline"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.98] contrast-[1.02]"
        />

        {/* Soft Left Vignette Gradient matching reference */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 via-32% to-transparent pointer-events-none" />
      </div>

      {/* Content Container — Left-aligned within panoramic frame */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-10 sm:py-12 md:py-14 lg:py-16">
        <div className="w-full max-w-2xl lg:max-w-3xl">
          {/* Strict Two-Line Display Headline — Cormorant Garamond Serif */}
          <h2 className="font-display text-[clamp(1.25rem,2.8vw,2.75rem)] font-normal leading-[1.14] text-white tracking-[0.02em] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            <span className="block whitespace-nowrap">MEANINGFUL EXPERIENCES.</span>
            <span className="block whitespace-nowrap mt-1 sm:mt-1.5">REAL IMPACT.</span>
          </h2>

          {/* Two-Line Description matching reference layout */}
          <p className="mt-3.5 sm:mt-4.5 font-sans text-xs sm:text-[0.82rem] md:text-[0.86rem] lg:text-[0.9rem] font-light leading-[1.62] text-white/80 max-w-[460px] sm:max-w-[490px]">
            <span className="sm:block">We collaborate with brands, institutions and communities to deliver experiences that </span>
            <span className="sm:block">inspire, engage and create lasting value.</span>
          </p>

          {/* Sleek Outlined Box Button matching media_1791064263613.png */}
          <div className="mt-5 sm:mt-6">
            <Link
              href={impactBanner.cta?.href || "#contact"}
              className="group inline-flex items-center gap-2.5 border border-white/25 bg-black/20 backdrop-blur-sm px-4 sm:px-5 py-2 sm:py-2.5 text-[0.64rem] sm:text-[0.68rem] lg:text-[0.72rem] font-sans font-medium tracking-[0.22em] uppercase text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:bg-black/50 hover:border-white/50 active:scale-95"
            >
              <span>{impactBanner.cta?.label || "LET'S TALK"}</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 font-bold text-xs"
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
