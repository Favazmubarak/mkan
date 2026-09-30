import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { assets } from "@/config/assets";

export function PhilosophyBanner() {
  const { philosophy } = homeContent;

  return (
    <section className="relative w-full py-24 sm:py-32 overflow-hidden bg-plum-950 text-cream">
      {/* Background Image */}
      <Image
        src={assets.philosophyBg.src}
        alt={assets.philosophyBg.alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark Luxury Vignette Overlay */}
      <div className="absolute inset-0 bg-plum-950/80 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-plum-950/90 via-plum-950/70 to-plum-950/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <p className="font-sans text-[0.7rem] sm:text-[0.75rem] font-medium tracking-[0.3em] uppercase text-gold/90 mb-4">
            {philosophy.eyebrow}
          </p>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.1] text-cream tracking-tight">
            {philosophy.heading}
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base font-light text-cream/80 leading-relaxed">
            {philosophy.subheading}
          </p>

          <div className="mt-8">
            <Link
              href={philosophy.cta.href}
              className="inline-flex items-center gap-2.5 bg-gold px-6 py-3 text-[0.7rem] font-sans font-medium tracking-[0.2em] uppercase text-plum-950 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>{philosophy.cta.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
