import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { aboutContent } from "@/content/about";
import { assets } from "@/config/assets";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutContent.header.subtitle,
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-plum-950 text-cream">
        {/* Header Hero Band */}
        <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-24 px-6 sm:px-8 lg:px-12 overflow-hidden border-b border-cream/10">
          <div className="absolute inset-0 z-0">
            <Image
              src={assets.heroBg.src}
              alt="MKAN Concept Architecture"
              fill
              priority
              className="object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum-950 via-plum-950/80 to-plum-950/90" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1440px]">
            <div className="flex items-start gap-6 max-w-3xl">
              {/* Thin Vertical Accent Line on Left */}
              <div className="w-[1px] h-24 sm:h-28 bg-gold shrink-0 mt-2" />

              <div>
                <p className="font-sans text-[0.7rem] sm:text-[0.75rem] font-medium tracking-[0.3em] uppercase text-gold mb-3">
                  {aboutContent.header.eyebrow}
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-cream tracking-tight">
                  {aboutContent.header.title}
                </h1>
                <p className="mt-4 text-sm sm:text-base font-sans font-light text-cream/80 leading-relaxed">
                  {aboutContent.header.subtitle}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Split Editorial Layout Section */}
        <section className="bg-cream text-ink px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
              {/* Left Column — Tall Architectural Photograph */}
              <div className="lg:col-span-6">
                <div className="relative h-full min-h-[480px] sm:min-h-[580px] w-full overflow-hidden bg-plum-950/10 shadow-sm">
                  <Image
                    src={assets.aboutUsSplit.src}
                    alt="Atmospheric gallery interior with arched stone portal"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              {/* Right Column — 3 Editorial Text Blocks */}
              <div className="lg:col-span-6 flex flex-col justify-center space-y-10">
                {aboutContent.splitContent.blocks.map((block, i) => (
                  <div
                    key={block.heading}
                    className={`pb-8 ${
                      i < aboutContent.splitContent.blocks.length - 1
                        ? "border-b border-plum-900/15"
                        : ""
                    }`}
                  >
                    <h2 className="font-display text-2xl sm:text-3xl font-normal text-plum-900 tracking-wide mb-3">
                      {block.heading}
                    </h2>
                    <p className="font-sans text-sm sm:text-base font-light text-plum-950/80 leading-relaxed">
                      {block.paragraph}
                    </p>
                  </div>
                ))}

                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 bg-plum-900 px-6 py-3.5 text-xs font-sans font-medium tracking-[0.2em] uppercase text-cream transition-all duration-300 hover:bg-plum-950 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Collaborate With Us</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Strip */}
            <div className="mt-20 pt-10 border-t border-plum-900/15">
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-plum-900/15 text-center">
                {aboutContent.stats.map((stat) => (
                  <div key={stat.label} className="py-4 sm:py-0 sm:px-6">
                    <p className="font-display text-3xl sm:text-4xl font-normal text-plum-900 tracking-wide">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[0.65rem] sm:text-[0.7rem] font-sans font-medium tracking-[0.25em] uppercase text-plum-900/70">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
