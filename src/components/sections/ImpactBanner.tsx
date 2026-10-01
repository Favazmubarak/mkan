import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";

interface ImpactBannerProps {
  data?: any;
  assets?: any;
}

export function ImpactBanner({ data = homeContent.impactBanner, assets = defaultAssets }: ImpactBannerProps) {
  const impactBanner = data;
  const impactBg = assets.impactBg;

  return (
    <section className="relative w-full py-24 sm:py-32 overflow-hidden bg-plum-950 text-cream">
      {/* Background Image */}
      <Image
        src={impactBg.src}
        alt={impactBg.alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        {...(impactBg.blurDataURL
          ? { placeholder: "blur" as const, blurDataURL: impactBg.blurDataURL }
          : {})}
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-plum-950/80 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-plum-950/90 via-plum-950/70 to-plum-950/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.1] text-cream tracking-tight">
            {impactBanner.heading}
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base font-light text-cream/80 leading-relaxed">
            {impactBanner.paragraph}
          </p>

          <div className="mt-8">
            <Link
              href={impactBanner.cta?.href || "#contact"}
              className="inline-flex items-center gap-2.5 border border-gold px-6 py-3 text-[0.7rem] font-sans font-medium tracking-[0.2em] uppercase text-cream transition-all duration-200 hover:bg-gold/10 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>{impactBanner.cta?.label || "Let's Talk"}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
