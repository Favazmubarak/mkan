import Image from "next/image";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";

interface HeroProps {
  data?: typeof homeContent.hero;
  assets?: typeof defaultAssets;
}

export function Hero({ data = homeContent.hero, assets = defaultAssets }: HeroProps) {
  const hero = data;
  const heroBg = assets.heroBg;

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-plum-950">
      {/* Background image */}
      <Image
        src={heroBg.src}
        alt={heroBg.alt}
        fill
        priority
        fetchPriority="high"
        className="object-cover object-center"
        sizes="100vw"
        quality={90}
        {...(("blurDataURL" in heroBg && typeof heroBg.blurDataURL === "string")
          ? { placeholder: "blur" as const, blurDataURL: heroBg.blurDataURL }
          : {})}
      />

      {/* Dark gradient overlay — heavier on the left for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-plum-950/90 via-plum-950/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-plum-950/70 via-transparent to-plum-950/40" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-8 pb-8 pt-36 lg:px-12 lg:pt-44 lg:pb-10">
        {/* Main hero text */}
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="mb-5 font-sans text-[0.7rem] tracking-[0.3em] uppercase text-gold lg:text-[0.75rem]">
            {hero.eyebrow}
          </p>

          {/* Main heading */}
          <h1 className="font-display text-[2.8rem] leading-[1.05] font-normal text-cream sm:text-[3.5rem] lg:text-[4.5rem]">
            {(Array.isArray(hero.headingLines) ? hero.headingLines : [hero.headingLines]).map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-md font-sans text-[0.95rem] leading-relaxed text-cream/80 lg:text-[1.05rem]">
            {hero.subtitle}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {/* Primary — filled gold */}
            <a
              href={hero.ctaPrimary.href}
              className="inline-flex items-center gap-2.5 bg-gold px-6 py-3 text-[0.7rem] font-sans font-medium tracking-[0.2em] uppercase text-plum-950 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              {hero.ctaPrimary.label}
              <span aria-hidden="true">→</span>
            </a>

            {/* Secondary — outline */}
            <a
              href={hero.ctaSecondary.href}
              className="inline-flex items-center gap-2 border border-cream/40 px-6 py-3 text-[0.7rem] font-sans font-medium tracking-[0.2em] uppercase text-cream transition-all duration-200 hover:border-cream hover:scale-[1.03] active:scale-[0.97]"
            >
              {hero.ctaSecondary.label}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-end justify-between">
          {/* Location */}
          <p className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-cream/60 lg:text-[0.7rem]">
            {hero.locationLabel}
          </p>

          {/* Scroll indicator */}
          <a
            href={hero.scrollTarget}
            className="group flex items-center gap-2 font-sans text-[0.65rem] tracking-[0.25em] uppercase text-cream/60 transition-colors hover:text-cream lg:text-[0.7rem]"
          >
            <span>{hero.scrollLabel}</span>
            <span
              aria-hidden="true"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-cream/30 text-xs transition-transform duration-200 group-hover:translate-y-0.5 group-hover:border-cream"
            >
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
