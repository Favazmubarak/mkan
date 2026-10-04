"use client";

import { useState } from "react";
import { Compass, Target, ShieldCheck } from "lucide-react";

export function ExperiencePhilosophy() {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  const pillars = [
    {
      id: "purpose",
      title: "PURPOSE",
      icon: Compass,
      eyebrow: "FOUNDATION",
      statement: "Understanding the reason behind the experience.",
      description:
        "Every activation begins by defining its true commercial, cultural, or institutional objective, ensuring spatial design serves a distinct narrative purpose rather than surface spectacle.",
    },
    {
      id: "precision",
      title: "PRECISION",
      icon: Target,
      eyebrow: "DISCIPLINE",
      statement: "Every detail is considered and executed with discipline.",
      description:
        "From millimeter-accurate architectural millwork to diplomatic protocol timing, our production standards adhere to uncompromising operational rigor.",
    },
    {
      id: "strategy",
      title: "STRATEGY",
      icon: ShieldCheck,
      eyebrow: "ALIGNMENT",
      statement: "Every concept is aligned with objectives and positioning.",
      description:
        "We engineer experiences that build long-term brand equity, stimulate high-value guest dwell time, and produce measurable institutional resonance.",
    },
  ];

  return (
    <section className="relative bg-[#FAF6F0] text-[#20040D] px-6 sm:px-10 lg:px-16 py-20 sm:py-24 overflow-hidden border-t border-[#20040D]/10">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Section Header */}
        <div className="max-w-3xl pb-12 sm:pb-14 border-b border-[#20040D]/10">
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="h-px w-6 bg-[#8A1435]" aria-hidden="true" />
            <span className="text-[0.66rem] font-sans font-semibold tracking-[0.28em] uppercase text-[#8A1435]">
              THE MKAN APPROACH
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.8rem] font-light uppercase tracking-tight text-[#20040D] leading-[1.05]">
            WE DON&apos;T SIMPLY <br />
            <span className="text-[#8A1435]">ORGANIZE EVENTS.</span>
          </h2>

          <p className="mt-5 font-display text-lg sm:text-xl lg:text-2xl font-light text-[#20040D]/85 leading-snug">
            WE DEVELOP CONCEPTS WITH{" "}
            <span className="font-semibold text-[#8A1435] underline decoration-[#8A1435]/30 underline-offset-4">
              PURPOSE
            </span>
            ,{" "}
            <span className="font-semibold text-[#8A1435] underline decoration-[#8A1435]/30 underline-offset-4">
              PRECISION
            </span>{" "}
            AND{" "}
            <span className="font-semibold text-[#8A1435] underline decoration-[#8A1435]/30 underline-offset-4">
              STRATEGY
            </span>
            .
          </p>
        </div>

        {/* 3 Architectural Columns — Clean Porcelain Materiality & Tactile Physics */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isHovered = hoveredCol === idx;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setHoveredCol(idx)}
                onMouseLeave={() => setHoveredCol(null)}
                className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                  isHovered
                    ? "border-[#8A1435]/40 shadow-[0_24px_50px_-15px_rgba(32,4,13,0.09)] -translate-y-2"
                    : "border-[#20040D]/[0.08] shadow-[0_2px_12px_rgba(32,4,13,0.02)] hover:border-[#8A1435]/25 hover:-translate-y-1"
                }`}
              >
                <div>
                  {/* Top Eyebrow & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[0.66rem] font-mono font-semibold tracking-[0.25em] uppercase text-[#8A1435]">
                      {pillar.eyebrow}
                    </span>
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                        isHovered
                          ? "bg-[#8A1435] text-white shadow-sm"
                          : "bg-[#FAF6F0] text-[#20040D]/70 group-hover:bg-[#FAF6F0] group-hover:text-[#8A1435]"
                      }`}
                    >
                      <Icon size={16} strokeWidth={1.5} />
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl sm:text-2xl font-medium tracking-wide uppercase text-[#20040D]">
                    {pillar.title}
                  </h3>

                  {/* Underline */}
                  <div
                    className={`h-0.5 mt-2 mb-4 rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isHovered ? "w-14 bg-[#8A1435]" : "w-6 bg-[#8A1435]/25"
                    }`}
                  />

                  {/* Thesis Quote */}
                  <p className="font-serif italic text-sm sm:text-[0.92rem] leading-snug text-[#8A1435] mb-3.5">
                    &ldquo;{pillar.statement}&rdquo;
                  </p>

                  {/* Body Narrative — Crystal-clear legibility */}
                  <p className="font-sans text-xs sm:text-[0.85rem] font-normal leading-relaxed text-[#20040D]/75">
                    {pillar.description}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="mt-8 pt-4 border-t border-[#20040D]/[0.07] flex items-center justify-between text-[0.62rem] font-mono tracking-widest uppercase text-[#20040D]/45">
                  <span>MKAN DISCIPLINE</span>
                  <span className={`transition-colors duration-200 ${isHovered ? "text-[#8A1435] font-semibold" : ""}`}>
                    0{idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
