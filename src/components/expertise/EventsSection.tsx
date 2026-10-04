"use client";

import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

interface EventsSectionProps {
  mainImageSrc?: string;
  galleryImages?: string[];
}

export function EventsSection({
  mainImageSrc = "/images/2.3.png",
  galleryImages = ["/images/1.1.png", "/images/2.4.png"],
}: EventsSectionProps) {
  const categories = [
    {
      number: "01",
      title: "INSTITUTIONAL & GOVERNMENT EVENTS",
      description:
        "Conferences, gala dinners, and national programs delivered with strategic planning and operational precision.",
      deliverables: [
        "High-level protocol & VIP guest management",
        "Stage scenography & custom lighting architecture",
        "Multi-stakeholder institutional governance",
        "Live broadcast & executive keynote environments",
      ],
    },
    {
      number: "02",
      title: "CORPORATE ENGAGEMENT PLATFORMS",
      description:
        "Private launches, recognition events, and curated experiences aligned with organizational objectives.",
      deliverables: [
        "Executive leadership retreats & annual summits",
        "Strategic stakeholder networking formats",
        "Bespoke culinary curation & tablescaping",
        "End-to-end guest journey orchestration",
      ],
    },
    {
      number: "03",
      title: "PRODUCT LAUNCHES",
      description:
        "Structured launch environments designed for impact, positioning and audience engagement.",
      deliverables: [
        "Immersive spatial unveilings & reveal sequences",
        "Interactive media & digital display integration",
        "Targeted press & influencer journey design",
        "Measurable brand sentiment tracking",
      ],
    },
  ];

  return (
    <section
      id="events"
      className="relative bg-[#1A060E] text-[#F5EEE6] px-6 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-36 overflow-hidden border-t border-[#DDB78A]/15"
    >
      {/* Ambient Radial Accent */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(221,183,138,0.07)_0%,_transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#DDB78A]/20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[0.72rem] font-sans font-semibold tracking-[0.3em] uppercase text-[#DDB78A]">
                01 / EXPERTISE DOMAIN
              </span>
              <span className="h-px w-8 bg-[#DDB78A]/40" aria-hidden="true" />
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF1E8] uppercase leading-[1.05]">
              CORPORATE & INSTITUTIONAL EVENTS
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base font-light text-[#EAE0D5]/75 leading-relaxed max-w-md">
            Delivering high-stakes summits, government galas, and bespoke corporate platforms that balance diplomatic protocol with visionary aesthetic design.
          </p>
        </div>

        {/* Hero Visual & Narrative Grid */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Main Hero Visual with Arched Editorial Crop */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-[380px] sm:h-[480px] lg:h-[560px] w-full overflow-hidden rounded-sm border border-[#DDB78A]/25 bg-[#16030c] shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
              <Image
                src={mainImageSrc}
                alt="Corporate Gala Dinner and Institutional Summit by MKAN Concept Dubai"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center brightness-[0.95] contrast-[1.05] transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16030c] via-transparent to-transparent opacity-80" />

              {/* Bottom Floating Visual Label */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between p-4 rounded bg-[#1A060E]/85 backdrop-blur-md border border-[#DDB78A]/20">
                <div>
                  <span className="block text-[0.62rem] font-sans tracking-[0.2em] uppercase text-[#DDB78A]">
                    Gala & Institutional Scenography
                  </span>
                  <span className="text-xs sm:text-sm font-display text-[#FAF1E8] tracking-wider">
                    Executive Gala Dinner · Dubai Venue
                  </span>
                </div>
                <span className="text-[0.65rem] font-sans tracking-[0.2em] uppercase text-[#EAD0B3]/80 px-2.5 py-1 rounded bg-[#DDB78A]/10 border border-[#DDB78A]/30">
                  UAE
                </span>
              </div>
            </div>

            {/* Supporting Image Strip */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              {galleryImages.map((src, i) => (
                <div
                  key={i}
                  className="relative h-40 sm:h-48 overflow-hidden rounded-sm border border-[#DDB78A]/15 bg-[#16030c] group"
                >
                  <Image
                    src={src}
                    alt={`Event Production Detail ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover object-center brightness-90 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#16030c]/30 group-hover:opacity-0 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* 3 Structured Categories from Company Profile */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {categories.map((cat) => (
              <div
                key={cat.number}
                className="p-6 sm:p-7 rounded-sm border border-[#DDB78A]/20 bg-[#220811]/60 backdrop-blur-sm transition-all duration-300 hover:border-[#DDB78A]/50 hover:bg-[#220811]/90"
              >
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-display text-2xl font-light text-[#EAD0B3]">
                    {cat.number}
                  </span>
                  <ArrowUpRight size={16} className="text-[#DDB78A]/60" />
                </div>

                <h3 className="font-display text-lg sm:text-xl font-medium tracking-[0.08em] text-[#FAF1E8] uppercase mb-2.5">
                  {cat.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm font-light text-[#EAE0D5]/80 leading-relaxed mb-4">
                  {cat.description}
                </p>

                {/* Key Deliverables Bullet Points */}
                <div className="pt-4 border-t border-[#DDB78A]/15 space-y-2">
                  {cat.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-[0.74rem] sm:text-[0.78rem] text-[#EAE0D5]/70 font-light">
                      <CheckCircle2 size={13} className="text-[#DDB78A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
