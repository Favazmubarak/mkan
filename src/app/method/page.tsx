import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { methodContent } from "@/content/method";
import { assets } from "@/config/assets";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "The MKAN Method",
  description: methodContent.header.subtitle,
};

export default function MethodPage() {
  const getStepImage = (key: string) => {
    switch (key) {
      case "concept":
        return assets.method.concept.src;
      case "development":
        return assets.method.development.src;
      case "curation":
        return assets.method.curation.src;
      case "production":
        return assets.method.production.src;
      case "reporting":
        return assets.method.reporting.src;
      default:
        return assets.heroBg.src;
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-plum-950 text-cream pt-32 pb-24 sm:pt-40 sm:pb-32 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Header */}
          <div className="max-w-3xl pb-16 border-b border-cream/10">
            <p className="font-sans text-[0.7rem] sm:text-[0.75rem] font-medium tracking-[0.3em] uppercase text-gold mb-3">
              {methodContent.header.eyebrow}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-cream tracking-tight">
              {methodContent.header.title}
            </h1>
            <p className="mt-3 font-sans text-xs sm:text-sm font-medium tracking-[0.18em] uppercase text-cream/70">
              {methodContent.header.subtitle}
            </p>
            <p className="mt-6 text-sm sm:text-base font-sans font-light leading-relaxed text-cream/80 max-w-2xl">
              {methodContent.header.intro}
            </p>
          </div>

          {/* 5-Step Connected Framework Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 relative">
            {methodContent.steps.map((step, index) => (
              <div key={step.number} className="flex flex-col relative group">
                {/* Node with Circular Badge and Connecting Axis Line */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-plum-900 text-gold font-sans text-xs font-semibold tracking-wider transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-plum-950">
                    {step.number}
                  </div>

                  {/* Connecting Line-Arrow on Desktop */}
                  {index < methodContent.steps.length - 1 && (
                    <div className="hidden lg:flex items-center flex-1 h-[1px] bg-cream/20 relative">
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-cream/40">
                        →
                      </span>
                    </div>
                  )}
                </div>

                {/* Step Thumbnail Photo */}
                <div className="relative aspect-[4/3] w-full overflow-hidden mb-5 bg-plum-900/40 border border-cream/10">
                  <Image
                    src={getStepImage(step.imageKey)}
                    alt={step.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-plum-950/20" />
                </div>

                {/* Step Name (Semi-bold uppercase) */}
                <h3 className="font-sans text-sm font-semibold tracking-[0.18em] uppercase text-cream mb-1">
                  {step.name}
                </h3>
                <p className="font-sans text-xs text-gold/80 mb-3 tracking-wide">
                  {step.tagline}
                </p>

                {/* Description */}
                <p className="font-sans text-xs font-light leading-relaxed text-cream/75 mb-4">
                  {step.description}
                </p>

                {/* Deliverables Bullet Points */}
                <ul className="mt-auto pt-3 border-t border-cream/10 space-y-1.5">
                  {step.deliverables.map((item) => (
                    <li
                      key={item}
                      className="text-[0.68rem] font-sans text-cream/60 flex items-start gap-1.5"
                    >
                      <span className="text-gold/70 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-24 p-8 sm:p-12 border border-cream/15 bg-plum-900/50 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-normal text-cream">
                Ready to engineer your next experience?
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-sans font-light text-cream/75">
                Discover how our strategic execution framework transforms concepts into reality.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-gold px-6 py-3 text-[0.7rem] font-sans font-medium tracking-[0.2em] uppercase text-plum-950 shrink-0 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>Initiate Strategy Call</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
