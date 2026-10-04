"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Layers } from "lucide-react";

interface MethodStage {
  number: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  deliverables: string[];
}

const STAGES: MethodStage[] = [
  {
    number: "01",
    title: "MKAN Concept",
    tagline: "Strategic Vision & Cultural Context",
    description:
      "Every project begins with a deep exploration of purpose, audience psychology, and spatial context. We define the overarching experiential thesis before a single sketch is drawn.",
    image: "/images/method-concept.jpg",
    deliverables: [
      "Experiential Objective Matrix",
      "Brand & Cultural Alignment",
      "Core Narrative Development",
      "Preliminary Spatial Feasibility",
    ],
  },
  {
    number: "02",
    title: "Concept Development",
    tagline: "Architectural 3D & Narrative Blueprints",
    description:
      "Translating strategy into concrete spatial experiences. We craft full 3D spatial renderings, circulation pathways, tactile material palettes, and sensory lighting schemes.",
    image: "/images/method-development.jpg",
    deliverables: [
      "3D Spatial & Floor Blueprints",
      "Material, Finishes & Lighting Moods",
      "Guest Journey & Circulation Flows",
      "Comprehensive Thematic Framework",
    ],
  },
  {
    number: "03",
    title: "Curation & Vendor Management",
    tagline: "Bespoke Procurement & Master Craftsmen",
    description:
      "Precision sourcing from our vetted network of elite fabricators, artisans, audiovisual engineers, and culinary directors across Dubai and the international luxury circuit.",
    image: "/images/method-curation.jpg",
    deliverables: [
      "Bespoke Artisan & Vendor Selection",
      "Material Quality Verification",
      "Contractual & Timeline Governance",
      "Budget Allocation & Cost Engineering",
    ],
  },
  {
    number: "04",
    title: "Production & Operations",
    tagline: "On-Site Choreography & Flawless Execution",
    description:
      "Millimeter-accurate installation managed by our senior production leaders. We control structural integrity, lighting calibration, VIP protocol, and operational logistics with military precision.",
    image: "/images/method-production.jpg",
    deliverables: [
      "Turnkey On-Site Fitout & Staging",
      "Live Operational Protocol Control",
      "Audio-Visual & Acoustic Tuning",
      "Safety, Permitting & Technical Compliance",
    ],
  },
  {
    number: "05",
    title: "Post-Event Reporting",
    tagline: "Quantitative Analytics & Enduring Impact",
    description:
      "True luxury demands accountability. We deliver comprehensive debriefs analyzing guest dwell times, institutional resonance, media engagement, and strategic return on objective.",
    image: "/images/method-reporting.jpg",
    deliverables: [
      "Comprehensive Operational Debrief",
      "Guest Engagement & Recall Insights",
      "Photographic & Media Archiving",
      "Long-Term Value Assessment",
    ],
  },
];

const AUTO_INTERVAL_MS = 6000;

export function ExperienceMethodFlow() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const activeStage = STAGES[activeIdx];
  const startTimeRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number | null>(null);

  const transitionTo = useCallback((nextIdx: number) => {
    setIsFading(true);
    setTimeout(() => {
      setActiveIdx(nextIdx);
      setIsFading(false);
    }, 180);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const nextStage = useCallback(() => {
    const next = (activeIdx + 1) % STAGES.length;
    transitionTo(next);
  }, [activeIdx, transitionTo]);

  const prevStage = useCallback(() => {
    const prev = (activeIdx - 1 + STAGES.length) % STAGES.length;
    transitionTo(prev);
  }, [activeIdx, transitionTo]);

  const selectStage = (idx: number) => {
    if (idx === activeIdx) return;
    transitionTo(idx);
  };

  // High-precision continuous smooth progress bar tick (always running smoothly)
  useEffect(() => {
    startTimeRef.current = Date.now() - (progress / 100) * AUTO_INTERVAL_MS;

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min(100, (elapsed / AUTO_INTERVAL_MS) * 100);
      setProgress(currentProgress);

      if (elapsed >= AUTO_INTERVAL_MS) {
        nextStage();
      } else {
        animationFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [nextStage, activeIdx, progress]);

  return (
    <section
      id="method-flow"
      className="relative bg-[#FAF6F0] text-[#20040D] px-6 sm:px-10 lg:px-16 py-20 sm:py-24 overflow-hidden border-t border-[#20040D]/10"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-14 border-b border-[#20040D]/10">
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <Layers size={14} className="text-[#8A1435]" />
              <span className="text-[0.66rem] font-sans font-semibold tracking-[0.28em] uppercase text-[#8A1435]">
                METHODOLOGY · 05 STAGES
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.8rem] font-light uppercase tracking-tight text-[#20040D] leading-[1.05]">
              THE MKAN METHOD
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-sm font-normal text-[#20040D]/75 leading-relaxed">
              A disciplined, proprietary five-phase methodology ensuring creative audacity is matched by rigorous operational execution.
            </p>
          </div>
        </div>

        {/* Architectural Showcase Container (Apple-grade clean porcelain) */}
        <div className="mt-12 sm:mt-14 bg-white rounded-2xl border border-[#20040D]/10 overflow-hidden shadow-[0_4px_24px_rgba(32,4,13,0.03)]">
          {/* Top 5-Stage Segmented Tabs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-[#20040D]/[0.08] border-b border-[#20040D]/[0.08]">
            {STAGES.map((stage, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={stage.number}
                  type="button"
                  onClick={() => selectStage(idx)}
                  className={`group relative text-left p-5 sm:p-6 transition-colors duration-300 cursor-pointer ${
                    isActive ? "bg-white" : "bg-[#FAF8F5]/60 hover:bg-white"
                  }`}
                >
                  {/* Clean 2px Active Indicator Bar (Apple Style: zero blur, pure precision) */}
                  <div className="absolute top-0 inset-x-0 h-[2.5px] bg-[#20040D]/[0.06] overflow-hidden">
                    {isActive && (
                      <div
                        className="h-full bg-[#8A1435] transition-all ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className={`font-mono text-[0.68rem] font-semibold tracking-wider transition-colors duration-200 ${
                        isActive ? "text-[#8A1435]" : "text-[#20040D]/50 group-hover:text-[#8A1435]"
                      }`}
                    >
                      STAGE {stage.number}
                    </span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        isActive ? "bg-[#8A1435] scale-125" : "bg-[#20040D]/15"
                      }`}
                    />
                  </div>

                  <h3
                    className={`font-display text-xs sm:text-sm uppercase leading-snug tracking-tight transition-colors duration-200 ${
                      isActive ? "text-[#20040D] font-medium" : "text-[#20040D]/70 group-hover:text-[#20040D]"
                    }`}
                  >
                    {stage.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Active Stage Showcase Panel */}
          <div className="p-7 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white">
            {/* Left Detail Column — Rock-solid height, zero bounce, buttery crossfade */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full min-h-[340px]">
              <div
                className={`transition-opacity duration-200 ease-out ${
                  isFading ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="flex items-center gap-3 mb-3.5">
                  <span className="font-mono text-[0.7rem] font-bold tracking-[0.25em] text-[#8A1435] uppercase">
                    PHASE {activeStage.number} OF 05
                  </span>
                  <span className="h-px w-5 bg-[#8A1435]/30" />
                  <span className="text-[0.7rem] font-sans text-[#20040D]/60 uppercase tracking-widest">
                    {activeStage.tagline}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.3rem] font-light uppercase tracking-tight text-[#20040D] leading-tight">
                  {activeStage.title}
                </h3>

                <p className="mt-4 font-sans text-xs sm:text-sm font-normal text-[#20040D]/75 leading-relaxed">
                  {activeStage.description}
                </p>

                {/* Core Deliverables & Rigor */}
                <div className="mt-8 pt-6 border-t border-[#20040D]/[0.08]">
                  <h4 className="text-[0.66rem] font-sans font-semibold tracking-[0.25em] uppercase text-[#8A1435] mb-3.5">
                    CORE DELIVERABLES &amp; RIGOR
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeStage.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[0.82rem] font-sans text-[#20040D]/80">
                        <span className="text-[#8A1435] font-mono font-bold mt-0.5">—</span>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Navigation Controls (Clean Minimalist Stage Stepper) */}
              <div className="mt-10 pt-5 border-t border-[#20040D]/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[0.62rem] font-mono tracking-widest text-[#20040D]/50 uppercase">
                    CONTINUOUS PROGRESSION
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevStage}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#20040D]/15 bg-white text-[#20040D] hover:bg-[#8A1435] hover:text-white hover:border-[#8A1435] transition-all cursor-pointer"
                    aria-label="Previous Stage"
                  >
                    <ArrowLeft size={13} />
                  </button>
                  <span className="font-mono text-xs font-medium text-[#20040D]/60 px-2.5">
                    0{activeIdx + 1} / 05
                  </span>
                  <button
                    type="button"
                    onClick={nextStage}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#20040D]/15 bg-white text-[#20040D] hover:bg-[#8A1435] hover:text-white hover:border-[#8A1435] transition-all cursor-pointer"
                    aria-label="Next Stage"
                  >
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Architectural Imagery Column — Silky Ken Burns Stack */}
            <div className="lg:col-span-6 relative aspect-[16/11] rounded-xl overflow-hidden border border-[#20040D]/10 bg-[#180209]">
              {STAGES.map((stage, idx) => {
                const isCurrent = activeIdx === idx;
                return (
                  <div
                    key={stage.number}
                    className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isCurrent
                        ? "opacity-100 scale-100 z-10"
                        : "opacity-0 scale-95 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={stage.image}
                      alt={stage.title}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center brightness-[0.96] contrast-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#180209]/75 via-[#180209]/15 to-transparent pointer-events-none" />
                  </div>
                );
              })}

              {/* Minimalist Floating Spec Badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-[#FAF3EE] pointer-events-none">
                <span className="font-mono text-[0.66rem] tracking-widest uppercase bg-[#180209]/85 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10">
                  STAGE {activeStage.number} SPECIFICATION
                </span>
                <span className="text-[0.62rem] font-sans tracking-[0.2em] uppercase text-[#DDB78A]">
                  DUBAI ATELIER
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
