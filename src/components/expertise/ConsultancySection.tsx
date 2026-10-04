"use client";

import Image from "next/image";
import { Compass, TrendingUp, Sparkles, Target, BarChart3, Rocket } from "lucide-react";

interface ConsultancySectionProps {
  imageSrc?: string;
}

export function ConsultancySection({
  imageSrc = "/images/1.5.png",
}: ConsultancySectionProps) {
  const pillars = [
    {
      number: "01",
      icon: Target,
      title: "CONCEPT DEVELOPMENT & POSITIONING",
      description: "Defining concepts aligned with market demand, demographic nuances, and target audience expectations.",
    },
    {
      number: "02",
      icon: Compass,
      title: "CUSTOMER EXPERIENCE & JOURNEY",
      description: "Enhancing ambiance, spatial flow, touchpoint sequencing, and emotional guest interaction.",
    },
    {
      number: "03",
      icon: Sparkles,
      title: "MENU & BRAND ALIGNMENT",
      description: "Ensuring holistic consistency between culinary offering, sensory presentation, and institutional identity.",
    },
    {
      number: "04",
      icon: TrendingUp,
      title: "ACTIVATION & FOOTFALL STRATEGY",
      description: "Creating in-venue curated programming and experiential catalysts to drive sustained footfall.",
    },
    {
      number: "05",
      icon: BarChart3,
      title: "MARKET & COMPETITOR ANALYSIS",
      description: "Identifying market opportunities, positioning gaps, and competitive differentiators across the GCC.",
    },
    {
      number: "06",
      icon: Rocket,
      title: "LAUNCH & REPOSITIONING STRATEGY",
      description: "Supporting new brand openings, luxury concept refreshes, and legacy institutional transformations.",
    },
  ];

  return (
    <section
      id="consultancy"
      className="relative bg-[#1A040E] text-[#F5EEE6] px-6 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-36 overflow-hidden border-t border-[#DDB78A]/15"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#DDB78A]/20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[0.72rem] font-sans font-semibold tracking-[0.3em] uppercase text-[#DDB78A]">
                05 / EXPERTISE DOMAIN
              </span>
              <span className="h-px w-8 bg-[#DDB78A]/40" aria-hidden="true" />
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF1E8] uppercase leading-[1.05]">
              STRATEGIC CONSULTANCY
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base font-light text-[#EAE0D5]/75 leading-relaxed max-w-md">
            Providing senior strategic counsel, commercial market validation, and end-to-end concept frameworks that protect investment capital and elevate brand value.
          </p>
        </div>

        {/* 6 Strategic Pillars Grid + Architectural Strategy Visual */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* 6 Strategy Cards Grid (7 Cols on Desktop) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="p-6 rounded-sm border border-[#DDB78A]/20 bg-[#220811]/60 backdrop-blur-sm transition-all duration-300 hover:border-[#DDB78A]/60 hover:bg-[#220811]/90 hover:-translate-y-1 group"
                >
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="font-display text-2xl font-light text-[#EAD0B3]">
                      {pillar.number}
                    </span>
                    <span className="p-2 rounded-full border border-[#DDB78A]/25 bg-[#DDB78A]/5 text-[#DDB78A] group-hover:bg-[#DDB78A] group-hover:text-[#16030C] transition-colors">
                      <Icon size={14} />
                    </span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-medium tracking-[0.06em] text-[#FAF1E8] uppercase mb-2">
                    {pillar.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-[0.8125rem] font-light text-[#EAE0D5]/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Strategy Visual & Advisory Overview (5 Cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative h-[340px] sm:h-[400px] lg:h-[460px] w-full overflow-hidden rounded-sm border border-[#DDB78A]/25 bg-[#16030c] shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
              <Image
                src={imageSrc}
                alt="MKAN Concept Strategic Consultancy and Advisory Environment"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center brightness-95 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16030c]/90 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#16030C]/85 backdrop-blur-md border border-[#DDB78A]/20">
                <span className="block text-[0.62rem] font-sans tracking-[0.2em] uppercase text-[#DDB78A]">
                  Executive Advisory
                </span>
                <span className="text-sm font-display text-[#FAF1E8] tracking-wider">
                  Concept Blueprints & Strategic Roadmaps
                </span>
              </div>
            </div>

            {/* Strategic Value Callout */}
            <div className="p-6 rounded-sm border border-[#DDB78A]/20 bg-[#220811]/80 backdrop-blur-sm">
              <h4 className="font-display text-lg text-[#FAF1E8] uppercase mb-2">
                Why Strategic Advisory Precedes Design
              </h4>
              <p className="text-xs sm:text-[0.8125rem] font-sans font-light text-[#EAE0D5]/80 leading-relaxed">
                Before physical fabrication begins, our consultancy framework tests commercial viability, ensures alignment with municipal protocols, and engineers an undeniable competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
