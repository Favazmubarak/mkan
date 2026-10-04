"use client";

import Image from "next/image";
import { Sparkles, Palette, Award, CheckCircle } from "lucide-react";

interface WorkshopsSectionProps {
  imageSrc?: string;
}

export function WorkshopsSection({
  imageSrc = "/images/1.3.png",
}: WorkshopsSectionProps) {
  const categories = [
    {
      number: "01",
      title: "CREATIVE LEARNING PLATFORMS",
      tag: "STRATEGIC EDUCATION",
      description:
        "Strategically designed workshop experiences integrating hands-on discovery with brand storytelling and cultural depth.",
      features: [
        "Interactive sensory workstations & artisanal materials",
        "Master facilitators and subject matter specialists",
        "Tailored corporate team cohesion & creative thinking modules",
        "Executive takeaway kits and personalized memorabilia",
      ],
    },
    {
      number: "02",
      title: "THEMED MASTERCLASSES & GUIDED SESSIONS",
      tag: "SEASONAL & EXHIBITION ALIGNMENT",
      description:
        "Strategically designed workshop experiences aligned with seasonal concepts, cultural calendars, and exhibition environments.",
      features: [
        "Curated programming for Ramadan, Eid, and National Day",
        "Luxury lifestyle masterclasses (perfumery, calligraphy, design)",
        "Seamless integration within large-scale public exhibitions",
        "VIP guest intimacy with dedicated tablescaping and hospitality",
      ],
    },
  ];

  const highlights = [
    { icon: Palette, title: "Artisanal Materials", desc: "Premium organic, cultural, and tactile design elements." },
    { icon: Sparkles, title: "Curated Ambiance", desc: "Sensory lighting, bespoke acoustics, and intimate seating." },
    { icon: Award, title: "Certified Facilitation", desc: "Leading regional practitioners and creative directors." },
  ];

  return (
    <section
      id="workshops"
      className="relative bg-[#1A060E] text-[#F5EEE6] px-6 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-36 overflow-hidden border-t border-[#DDB78A]/15"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#DDB78A]/20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[0.72rem] font-sans font-semibold tracking-[0.3em] uppercase text-[#DDB78A]">
                03 / EXPERTISE DOMAIN
              </span>
              <span className="h-px w-8 bg-[#DDB78A]/40" aria-hidden="true" />
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF1E8] uppercase leading-[1.05]">
              WORKSHOPS & MASTERCLASSES
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base font-light text-[#EAE0D5]/75 leading-relaxed max-w-md">
            Designing immersive creative sessions where participants engage with heritage crafts, visionary concepts, and high-touch brand narratives.
          </p>
        </div>

        {/* Masterclass Experience Showcase */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Workshop Visual Layer */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[420px] sm:h-[500px] lg:h-[540px] w-full overflow-hidden rounded-sm border border-[#DDB78A]/25 bg-[#16030c] shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
              <Image
                src={imageSrc}
                alt="MKAN Concept Creative Masterclass and Learning Platform"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center brightness-95 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16030c]/90 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#16030C]/85 backdrop-blur-md border border-[#DDB78A]/20">
                <span className="block text-[0.62rem] font-sans tracking-[0.2em] uppercase text-[#DDB78A]">
                  Curated Workshop Environment
                </span>
                <span className="text-sm font-display text-[#FAF1E8] tracking-wider">
                  Interactive Masterclass & Material Scenography
                </span>
              </div>
            </div>

            {/* 3 Pillar Highlights below visual */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div key={i} className="p-3.5 rounded border border-[#DDB78A]/15 bg-[#220811]/40">
                    <Icon size={14} className="text-[#DDB78A] mb-1.5" />
                    <span className="block text-[0.7rem] font-sans font-medium text-[#FAF1E8]">
                      {h.title}
                    </span>
                    <span className="text-[0.62rem] font-light text-[#EAE0D5]/60 mt-0.5 line-clamp-2">
                      {h.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2 Workshop Formats */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {categories.map((cat) => (
              <div
                key={cat.number}
                className="p-7 sm:p-8 rounded-sm border border-[#DDB78A]/20 bg-[#220811]/60 backdrop-blur-sm transition-all duration-300 hover:border-[#DDB78A]/50 hover:bg-[#220811]/90"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-2xl sm:text-3xl font-light text-[#EAD0B3]">
                    {cat.number}
                  </span>
                  <span className="text-[0.62rem] font-sans font-medium tracking-[0.2em] uppercase text-[#DDB78A] px-2.5 py-1 rounded bg-[#DDB78A]/10 border border-[#DDB78A]/20">
                    {cat.tag}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-normal tracking-[0.06em] text-[#FAF1E8] uppercase mb-3">
                  {cat.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm font-light text-[#EAE0D5]/80 leading-relaxed mb-6">
                  {cat.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-[#DDB78A]/15">
                  {cat.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[0.8125rem] text-[#EAE0D5]/75 font-light">
                      <CheckCircle size={14} className="text-[#DDB78A] shrink-0 mt-0.5" />
                      <span>{feat}</span>
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
