"use client";

import Image from "next/image";
import { InnerContact } from "@/components/common/InnerContact";
import { BackButton } from "@/components/common/BackButton";
import { site as defaultSite } from "@/content/site";
import { assets as defaultAssets } from "@/config/assets";

interface ExpertisePageClientProps {
  site?: typeof defaultSite;
  assets?: typeof defaultAssets;
}

const SERVICES = [
  {
    number: "01",
    id: "events",
    title: "CORPORATE & INSTITUTIONAL EVENTS",
    tagline: "High-level summits, gala dinners & state programs",
    description:
      "Conferences, gala dinners, and private launch platforms delivered with strategic planning, protocol management, and operational precision.",
    items: [
      "Institutional & government programs",
      "Corporate engagement & recognition events",
      "Product launch environments",
    ],
    imageKey: "events",
  },
  {
    number: "02",
    id: "exhibitions",
    title: "CURATED EXHIBITIONS",
    tagline: "Flagship seasonal fairs & trade pavilions",
    description:
      "Multi-day seasonal exhibitions integrating structured programming, premium vendor selection, and visitor journey architecture.",
    items: [
      "Ramadan Fair flagship platforms",
      "Seasonal cultural & trade exhibitions",
      "Exhibition strategy, layout & visitor flow",
    ],
    imageKey: "exhibitions",
  },
  {
    number: "03",
    id: "workshops",
    title: "WORKSHOPS & MASTERCLASSES",
    tagline: "Creative learning & guided sessions",
    description:
      "Strategically designed creative learning platforms and masterclasses aligned with brand narratives and seasonal environments.",
    items: [
      "Creative learning platforms",
      "Themed masterclasses & guided sessions",
      "Interactive material & sensory workshops",
    ],
    imageKey: "workshops",
  },
  {
    number: "04",
    id: "activations",
    title: "BRAND ACTIVATIONS & POP-UPS",
    tagline: "Immersive retail & experiential environments",
    description:
      "Structured experiential concepts designed to drive footfall, engagement, and dwell time across premier destinations.",
    items: [
      "Luxury brand activations",
      "High-footfall mall activations",
      "Curated retail pop-ups",
    ],
    imageKey: "activations",
  },
  {
    number: "05",
    id: "consultancy",
    title: "STRATEGIC CONSULTANCY",
    tagline: "Concept development & advisory",
    description:
      "Strategic counsel, concept validation, and customer journey frameworks ensuring commercial alignment before execution.",
    items: [
      "Concept development & positioning",
      "Customer experience & journey mapping",
      "Launch & repositioning strategy",
    ],
    imageKey: "consultancy",
  },
];

export function ExpertisePageClient({
  site = defaultSite,
  assets = defaultAssets,
}: ExpertisePageClientProps) {
  const getImageSrc = (key: string) => {
    switch (key) {
      case "events":        return assets.expertise?.events?.src        || "/images/1.1.png";
      case "exhibitions":   return assets.expertise?.exhibitions?.src   || "/images/1.2.png";
      case "workshops":     return assets.expertise?.workshops?.src     || "/images/1.3.png";
      case "activations":   return assets.expertise?.activations?.src   || "/images/1.4.png";
      case "consultancy":   return assets.expertise?.consultancy?.src   || "/images/1.5.png";
      default:              return assets.heroBg?.src                   || "/images/Hero1.png";
    }
  };

  return (
    <div className="bg-[#24040F] text-[#FAF3EE] min-h-screen selection:bg-[#DDB78A] selection:text-[#24040F]">
      {/* 01: Dark Cherry Hero Section with Silk-Smooth Editorial Bloom */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[68vh] w-full flex flex-col justify-end overflow-hidden px-6 sm:px-10 lg:px-16 pt-32 pb-14 select-none">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="relative w-full h-full lux-hero-img">
            <Image
              src="/images/Hero1.png"
              alt="Our Expertise"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#24040F] via-[#24040F]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px]">
          <div className="flex flex-wrap items-center gap-4 mb-5 lux-hero-eyebrow">
            <BackButton fallbackHref="/" />
            <span className="hidden sm:inline-block h-3 w-px bg-[#DDB78A]/40" aria-hidden="true" />
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 bg-[#DDB78A]/70" aria-hidden="true" />
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.35em] uppercase text-[#DDB78A]">
                MKAN CONCEPT / SERVICES
              </p>
            </div>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[0.02em] uppercase text-[#FAF3EE] leading-[1.05] lux-hero-title">
            OUR EXPERTISE
          </h1>
          <p className="mt-3 font-sans text-sm sm:text-base font-light text-[#F3E7DF]/85 leading-relaxed max-w-xl lux-hero-desc">
            Curated experiences, exhibitions, activations and strategic solutions designed with purpose, precision and impact.
          </p>
        </div>
      </section>

      {/* 02: Light Cherry Alabaster Section with 5 Dark Cherry Service Cards */}
      <section className="relative bg-[#FAF3EE] text-[#24040F] px-6 sm:px-10 lg:px-16 py-16 sm:py-24 overflow-hidden border-t border-[#24040F]/10">
        <div className="mx-auto max-w-[1400px] space-y-16 sm:space-y-24">
          {SERVICES.map((srv, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={srv.id}
                id={srv.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pt-8 border-t border-[#24040F]/10 first:border-0 first:pt-0"
              >
                {/* Text Content */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="font-display text-3xl font-light text-[#B88E5E]">
                      {srv.number}
                    </span>
                    <span className="text-[0.65rem] font-sans font-medium tracking-[0.2em] uppercase text-[#24040F]/60">
                      {srv.tagline}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-4xl text-[#24040F] uppercase tracking-wide leading-tight mb-4">
                    {srv.title}
                  </h2>

                  <p className="font-sans text-sm sm:text-base font-light text-[#24040F]/80 leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  <ul className="space-y-2.5 border-l-2 border-[#B88E5E] pl-4 text-xs sm:text-sm font-sans font-light text-[#24040F]/90">
                    {srv.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Image Frame with Dark Cherry Border and Soft Shadow */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-[#24040F]/15 bg-[#24040F] shadow-[0_16px_40px_rgba(36,4,15,0.12)]">
                    <Image
                      src={getImageSrc(srv.imageKey)}
                      alt={srv.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center brightness-95 transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 03: Dark Cherry & Light Alabaster Inner Contact */}
      <InnerContact
        site={site}
        title="LET'S CREATE SOMETHING EXCEPTIONAL."
        subtitle="Tell us about your next event, exhibition, activation or concept."
      />
    </div>
  );
}
