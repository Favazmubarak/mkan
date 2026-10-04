"use client";

import { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

interface WhyMkanPillar {
  number: string;
  headline: string;
  subheading: string;
  description: string;
  proof: string;
}

const PILLARS: WhyMkanPillar[] = [
  {
    number: "01",
    headline: "REFINED AESTHETICS",
    subheading: "Luxury architectural sensitivity & spatial harmony",
    description:
      "We fuse contemporary Middle Eastern spatial design with international luxury aesthetics, ensuring every material, light tone, and surface texture reflects superior craftsmanship.",
    proof: "Hand-selected materials · Bespoke custom furniture · Layered architectural illumination",
  },
  {
    number: "02",
    headline: "DISCIPLINED EXECUTION",
    subheading: "Uncompromising project governance & timeline fidelity",
    description:
      "From protocol-sensitive government galas to high-traffic retail pop-ups, our operational standards ensure zero-defect delivery, rigorous safety compliance, and flawless timing.",
    proof: "Dedicated production directors · Redundant technical systems · Real-time status reporting",
  },
  {
    number: "03",
    headline: "STRATEGIC THINKING",
    subheading: "Positioning experiences to advance commercial objectives",
    description:
      "We design experiential environments not merely as visual spectacles, but as calculated instruments that build brand equity, deepen stakeholder loyalty, and open commercial opportunities.",
    proof: "Audience demographic profiling · Commercial zoning blueprints · Brand identity alignment",
  },
  {
    number: "04",
    headline: "STRUCTURED DELIVERY",
    subheading: "Seamless end-to-end framework from ideation to handover",
    description:
      "Our proprietary 5-stage MKAN Method provides clients with total transparency, structured milestones, and institutional accountability at every stage of the lifecycle.",
    proof: "Clear milestone checkpoints · Complete vendor consolidation · Single point of executive accountability",
  },
  {
    number: "05",
    headline: "MEASURABLE IMPACT",
    subheading: "Quantifiable engagement, footfall dwell, and brand recall",
    description:
      "We evaluate every project with post-event intelligence and footfall metrics, delivering measurable return on investment and clear pathways for recurring scalability.",
    proof: "Post-event analytics dossier · Visitor dwell benchmarks · Press & sentiment evaluation",
  },
];

export function WhyMkan() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section
      id="why-mkan"
      className="relative bg-[#1A040E] text-[#F5EEE6] px-6 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-36 overflow-hidden border-t border-[#DDB78A]/15"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#DDB78A]/20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[0.72rem] font-sans font-semibold tracking-[0.3em] uppercase text-[#DDB78A]">
                STRATEGIC ADVANTAGE
              </span>
              <span className="h-px w-8 bg-[#DDB78A]/40" aria-hidden="true" />
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF1E8] uppercase leading-[1.05]">
              WHY MKAN CONCEPT
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base font-light text-[#EAE0D5]/75 leading-relaxed max-w-md">
            The distinct pillars that position MKAN as the partner of choice for visionary UAE brands and institutions.
          </p>
        </div>

        {/* 5 Editorial Interactive Rows */}
        <div className="mt-12 divide-y divide-[#DDB78A]/15">
          {PILLARS.map((pillar, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={pillar.number}
                onMouseEnter={() => setHoveredIndex(idx)}
                onClick={() => setHoveredIndex(isHovered ? null : idx)}
                className={`py-8 sm:py-10 transition-all duration-500 cursor-pointer ${
                  isHovered ? "bg-[#250715]/40 px-4 sm:px-6 rounded" : "hover:bg-[#250715]/20 px-2 sm:px-4"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Number & Main Display Headline */}
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span
                      className={`font-display text-2xl sm:text-3xl font-light transition-colors duration-300 ${
                        isHovered ? "text-[#DDB78A]" : "text-[#EAD0B3]/50"
                      }`}
                    >
                      {pillar.number}
                    </span>

                    <div>
                      <h3
                        className={`font-display text-2xl sm:text-3xl lg:text-4xl font-normal tracking-wide uppercase transition-colors duration-300 ${
                          isHovered ? "text-[#FAF1E8]" : "text-[#EAE0D5]/80"
                        }`}
                      >
                        {pillar.headline}
                      </h3>
                      <span className="block text-xs sm:text-sm font-sans font-light text-[#DDB78A]/80 mt-1">
                        {pillar.subheading}
                      </span>
                    </div>
                  </div>

                  {/* Right: Expand Indicator */}
                  <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
                    <span className="hidden sm:inline-block text-[0.65rem] font-sans tracking-[0.2em] uppercase text-[#DDB78A]/60">
                      {isHovered ? "Active Pillar" : "Hover to Expand"}
                    </span>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                        isHovered
                          ? "border-[#DDB78A] bg-[#DDB78A] text-[#16030C]"
                          : "border-[#DDB78A]/25 text-[#DDB78A]"
                      }`}
                    >
                      {isHovered ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </div>
                </div>

                {/* Expanded Description & Proof Points */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isHovered ? "max-h-60 opacity-100 mt-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-0 sm:pl-16 lg:pl-20 max-w-4xl pt-2">
                    <p className="font-sans text-sm sm:text-base font-light text-[#EAE0D5]/85 leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-sans text-[#DDB78A] font-medium">
                      <ArrowUpRight size={13} />
                      <span>{pillar.proof}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
