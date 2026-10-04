"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Eye, Clock, Award, HeartHandshake, TrendingUp } from "lucide-react";

interface Pillar {
  id: string;
  title: string;
  number: string;
  icon: typeof Eye;
  definition: string;
  depth: string;
}

const PILLARS: Pillar[] = [
  {
    id: "engagement",
    title: "ENGAGEMENT",
    number: "01",
    icon: Eye,
    definition: "Immersive guest dwell time and active participation.",
    depth: "Crafting spatial choreography where guests choose to linger, observe, and connect with high intentionality.",
  },
  {
    id: "recall",
    title: "RECALL",
    number: "02",
    icon: Clock,
    definition: "Sensory and architectural memory that endures.",
    depth: "Spatial geometry and signature atmosphere remain vividly associated with your brand long after execution.",
  },
  {
    id: "positioning",
    title: "POSITIONING",
    number: "03",
    icon: Award,
    definition: "Elevation of institutional stature and cultural authority.",
    depth: "Aligning physical execution with sovereign market authority, reinforcing leadership across the UAE.",
  },
  {
    id: "connection",
    title: "CONNECTION",
    number: "04",
    icon: HeartHandshake,
    definition: "Genuine bonds forged between brand and stakeholder.",
    depth: "Human-centric environments that facilitate authentic dialogue, strategic partnerships, and community trust.",
  },
  {
    id: "impact",
    title: "IMPACT",
    number: "05",
    icon: TrendingUp,
    definition: "Measurable commercial and cultural dividends.",
    depth: "Delivering quantifiable returns on strategic intent through post-event debriefs and ongoing brand loyalty.",
  },
];

const AUTO_INTERVAL_MS = 4800;

export function ExperienceBeyond() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const activeIdx = hoveredIdx !== null ? hoveredIdx : currentIdx;

  const nextPillar = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % PILLARS.length);
    setProgress(0);
    startTimeRef.current = typeof performance !== "undefined" ? performance.now() : 0;
  }, []);

  const selectPillar = useCallback((idx: number) => {
    setCurrentIdx(idx);
    setProgress(0);
    startTimeRef.current = typeof performance !== "undefined" ? performance.now() : 0;
  }, []);

  // High-precision continuous smooth progress animation
  useEffect(() => {
    const baseNow = performance.now();
    startTimeRef.current = baseNow - (progress / 100) * AUTO_INTERVAL_MS;

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const currentProgress = Math.min(100, (elapsed / AUTO_INTERVAL_MS) * 100);
      setProgress(currentProgress);

      if (elapsed >= AUTO_INTERVAL_MS) {
        nextPillar();
      } else {
        animationFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [nextPillar, currentIdx, progress]);

  return (
    <section className="relative bg-[#FAF6F0] text-[#20040D] px-6 sm:px-10 lg:px-16 py-20 sm:py-24 overflow-hidden border-t border-[#20040D]/10">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Section Heading & Ambient Rhythm Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-14 border-b border-[#20040D]/10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="h-px w-6 bg-[#8A1435]" aria-hidden="true" />
              <span className="text-[0.66rem] font-sans font-semibold tracking-[0.28em] uppercase text-[#8A1435]">
                STRATEGIC HORIZON
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.8rem] font-light uppercase tracking-tight text-[#20040D] leading-[1.05]">
              BEYOND THE <br />
              <span className="font-serif italic font-light text-[#8A1435]">
                EVENT.
              </span>
            </h2>

            <p className="mt-4 font-sans text-sm sm:text-[0.92rem] font-normal text-[#20040D]/75 leading-relaxed max-w-xl">
              True experiential value is measured by the lasting cultural and institutional resonance left in its wake.
            </p>
          </div>

          {/* Minimalist 5-Pillar Rhythm Indicator (Always running continuously) */}
          <div className="flex items-center gap-2">
            {PILLARS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => selectPillar(i)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activeIdx === i
                    ? "w-8 bg-[#8A1435]"
                    : "w-2 bg-[#20040D]/15 hover:bg-[#20040D]/30"
                }`}
                aria-label={`Jump to Pillar 0${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 5 Architectural Pillars — Continuous Smooth Liquid Rhythm & Bespoke Dark Velvet Highlight */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isActive = activeIdx === idx;

            return (
              <div
                key={pillar.id}
                onClick={() => selectPillar(idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-br from-[#24040F] via-[#1B030C] to-[#120107] text-[#FAF3EE] border-[#DDB78A]/50 shadow-[0_24px_50px_-12px_rgba(20,2,8,0.45)] -translate-y-2.5 ring-1 ring-inset ring-white/[0.08]"
                    : "bg-white text-[#20040D] border-[#20040D]/[0.08] shadow-[0_2px_12px_rgba(32,4,13,0.02)] translate-y-0 opacity-90 hover:opacity-100 hover:border-[#8A1435]/30 hover:-translate-y-1"
                }`}
              >
                {/* Top Smooth Progress Hairline (Clean luxury gold progress bar — zero AI glow/neon) */}
                <div className="absolute top-0 inset-x-0 h-[2.5px] bg-[#20040D]/[0.06] overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-[#B88E5E] via-[#DDB78A] to-[#FAF3EE] transition-all ${
                      isActive ? "opacity-100 ease-linear" : "opacity-0 duration-300"
                    }`}
                    style={{
                      width: isActive ? `${progress}%` : "0%",
                    }}
                  />
                </div>

                <div>
                  {/* Top Header: Pillar Number & Tactile Icon Capsule */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`font-mono text-[0.72rem] font-semibold tracking-widest transition-colors duration-400 ${
                        isActive ? "text-[#DDB78A]" : "text-[#8A1435]"
                      }`}
                    >
                      {pillar.number}
                    </span>

                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive
                          ? "bg-[#DDB78A]/15 border-[#DDB78A]/40 text-[#DDB78A] scale-105"
                          : "bg-[#FAF6F0] border-[#20040D]/[0.06] text-[#20040D]/70 group-hover:text-[#8A1435]"
                      }`}
                    >
                      <Icon size={15} strokeWidth={1.5} />
                    </span>
                  </div>

                  {/* Pillar Title */}
                  <h3
                    className={`font-display text-base sm:text-lg font-medium tracking-wide uppercase transition-colors duration-400 ${
                      isActive ? "text-[#FAF3EE]" : "text-[#20040D]"
                    }`}
                  >
                    {pillar.title}
                  </h3>

                  {/* Elegant Expanding Underline */}
                  <div
                    className={`h-[1.5px] mt-2 mb-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "w-12 bg-[#DDB78A]" : "w-5 bg-[#8A1435]/25"
                    }`}
                  />

                  {/* Core Statement Quote */}
                  <p
                    className={`font-serif italic text-[0.82rem] leading-snug mb-3 transition-colors duration-400 ${
                      isActive ? "text-[#DDB78A]" : "text-[#8A1435]"
                    }`}
                  >
                    &ldquo;{pillar.definition}&rdquo;
                  </p>

                  {/* Deep Narrative Description — Crystal-clear legibility in both states */}
                  <p
                    className={`font-sans text-[0.8rem] font-normal leading-relaxed transition-colors duration-400 ${
                      isActive ? "text-[#F3E7DF]/90 font-light" : "text-[#20040D]/75"
                    }`}
                  >
                    {pillar.depth}
                  </p>
                </div>

                {/* Bottom Card Metadata */}
                <div
                  className={`mt-8 pt-4 border-t flex items-center justify-between text-[0.62rem] font-mono tracking-widest uppercase transition-colors duration-400 ${
                    isActive
                      ? "border-white/10 text-[#FAF3EE]/60"
                      : "border-[#20040D]/[0.07] text-[#20040D]/45"
                  }`}
                >
                  <span>OUTCOME PILLAR</span>
                  <span
                    className={`transition-colors duration-400 font-semibold ${
                      isActive ? "text-[#DDB78A]" : ""
                    }`}
                  >
                    P.{pillar.number}
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
