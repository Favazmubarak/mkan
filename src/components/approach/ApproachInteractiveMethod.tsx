"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Layers, ChevronRight } from "lucide-react";

const PHASES = [
  {
    number: "01",
    name: "CONCEPT",
    subtitle: "Discovery & Positioning",
    tagline: "Phase I · Market Alignment",
    summary: "Strategic foundation and commercial alignment before physical production.",
    description:
      "Every project commences with rigorous brand vetting, spatial purpose definition, and economic feasibility mapping to ensure strategic clarity.",
    deliverables: [
      "Strategic concept validation & positioning",
      "Audience demographic & VIP profiling",
      "Commercial feasibility & ROI roadmap",
      "Venue masterplanning & regulatory vetting",
    ],
    imageSrc: "/images/method-concept.jpg",
    metrics: "100% Concept Validation",
  },
  {
    number: "02",
    name: "DEVELOPMENT",
    subtitle: "Design & Scenography",
    tagline: "Phase II · Spatial Architecture",
    summary: "From strategic ideation to bespoke 3D renders and material boards.",
    description:
      "Transforming validated narratives into three-dimensional architectural environments, custom lighting schemes, and sensory guest journeys.",
    deliverables: [
      "Photorealistic 3D spatial scenography",
      "Tactile material boards & acoustic palettes",
      "Dynamic guest circulation & VIP protocol flow",
      "Turnkey technical engineering blueprints",
    ],
    imageSrc: "/images/method-development.jpg",
    metrics: "Millimeter-Precision Blueprints",
  },
  {
    number: "03",
    name: "CURATION",
    subtitle: "Partner Orchestration",
    tagline: "Phase III · Partner Governance",
    summary: "Artisanal vendor selection, creative direction, and partner management.",
    description:
      "Sourcing and vetting premier regional and global artisans, master craftsmen, culinary leaders, and bespoke production specialists.",
    deliverables: [
      "Vetted luxury vendor procurement",
      "Artisanal culinary & masterclass partners",
      "Strict SLA quality & aesthetic compliance",
      "Comprehensive partner timeline governance",
    ],
    imageSrc: "/images/method-curation.jpg",
    metrics: "Tier-1 Curated Partners",
  },
  {
    number: "04",
    name: "PRODUCTION",
    subtitle: "Turnkey Execution",
    tagline: "Phase IV · Live Operations",
    summary: "On-site logistics, staffing, precision build execution, and quality control.",
    description:
      "Flawless real-time build supervision, high-precision AV and stage engineering, and diplomatic protocol leadership on the ground in Dubai.",
    deliverables: [
      "24/7 on-site technical build supervision",
      "Live 8K broadcast & acoustic engineering",
      "Bilingual VIP protocol & concierge leadership",
      "Real-time contingency & crowd governance",
    ],
    imageSrc: "/images/method-production.jpg",
    metrics: "Zero-Latency On-Site Delivery",
  },
  {
    number: "05",
    name: "REPORTING",
    subtitle: "Impact & Intelligence",
    tagline: "Phase V · Scalability Dossier",
    summary: "Performance evaluation, dwell analytics, and strategic recommendations.",
    description:
      "Closing every platform with quantitative footfall analytics, dwell telemetry, executive summary dossiers, and future scalability advisory.",
    deliverables: [
      "Executive impact & footfall intelligence",
      "High-resolution media & cinema archive",
      "Vendor performance assessment index",
      "Future scalability & multi-year roadmap",
    ],
    imageSrc: "/images/method-reporting.jpg",
    metrics: "Comprehensive Intelligence",
  },
];

export function ApproachInteractiveMethod() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [expandedDetail, setExpandedDetail] = useState(false);

  const handleSelectPhase = (idx: number) => {
    if (idx === activeIdx) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setIsTransitioning(false);
    }, 180);
  };

  const current = PHASES[activeIdx];

  return (
    <section className="relative bg-[#FAF3EE] text-[#24040F] px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-32 overflow-hidden select-none">
      {/* Top Ambient Hairline */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#24040F]/15 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1400px]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-8 sm:pb-10 border-b border-[#24040F]/10">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="h-px w-6 bg-[#B88E5E]" aria-hidden="true" />
              <span className="text-[0.68rem] font-sans font-semibold tracking-[0.3em] uppercase text-[#B88E5E]">
                EXECUTION FRAMEWORK
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal tracking-tight uppercase text-[#24040F] leading-tight">
              THE FIVE-STAGE METHOD
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-sans text-[#24040F]/60">
              Interactive Phase Navigator
            </span>
            <div className="flex items-center gap-1.5">
              {PHASES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectPhase(i)}
                  aria-label={`Go to phase ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIdx === i ? "w-7 bg-[#24040F]" : "w-2 bg-[#24040F]/20 hover:bg-[#24040F]/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 5-Stage Interactive Grid */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: 5 Interactive Phase Cards */}
          <div className="lg:col-span-5 flex flex-col space-y-3 justify-center">
            {PHASES.map((phase, idx) => {
              const isActive = activeIdx === idx;

              return (
                <button
                  key={phase.number}
                  type="button"
                  onClick={() => handleSelectPhase(idx)}
                  className={`group relative w-full text-left p-4 sm:p-5 rounded-sm border transition-all duration-400 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-[#24040F] text-[#FAF3EE] border-[#24040F] shadow-[0_16px_36px_rgba(36,4,15,0.22)] -translate-y-0.5"
                      : "bg-white/80 text-[#24040F] border-[#24040F]/10 hover:border-[#B88E5E]/50 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                    <span
                      className={`font-display text-2xl sm:text-3xl font-light transition-colors ${
                        isActive ? "text-[#DDB78A]" : "text-[#24040F]/40 group-hover:text-[#B88E5E]"
                      }`}
                    >
                      {phase.number}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-base sm:text-lg font-medium tracking-wide uppercase truncate">
                          {phase.name}
                        </h3>
                        <span
                          className={`text-[0.62rem] font-sans tracking-[0.15em] uppercase hidden sm:inline-block ${
                            isActive ? "text-[#DDB78A]" : "text-[#24040F]/50"
                          }`}
                        >
                          · {phase.subtitle}
                        </span>
                      </div>
                      <p
                        className={`text-xs font-sans font-light mt-0.5 truncate max-w-xs sm:max-w-sm ${
                          isActive ? "text-[#F3E7DF]/80" : "text-[#24040F]/65"
                        }`}
                      >
                        {phase.summary}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className={`shrink-0 ml-2 transition-transform duration-300 ${
                      isActive
                        ? "text-[#DDB78A] translate-x-0.5 -translate-y-0.5"
                        : "text-[#24040F]/30 group-hover:text-[#B88E5E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Large Dynamic Visual & Animated Detail Card */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 lg:p-9 rounded-sm bg-[#24040F] text-[#FAF3EE] border border-[#24040F] shadow-[0_24px_50px_rgba(36,4,15,0.28)]">
            <div
              className={`transition-all duration-300 ease-out ${
                isTransitioning ? "opacity-0 scale-[0.98] translate-y-1" : "opacity-100 scale-100 translate-y-0"
              }`}
            >
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DDB78A]/20 text-[#DDB78A]">
                    <Layers size={11} />
                  </span>
                  <span className="text-[0.68rem] font-sans font-medium tracking-[0.25em] uppercase text-[#DDB78A]">
                    {current.tagline}
                  </span>
                </div>
                <span className="font-display text-2xl font-light text-[#DDB78A]">
                  {current.number} / 05
                </span>
              </div>

              {/* Stage Image Visual with Crossfade */}
              <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden border border-white/10 bg-[#16030C] mb-6">
                <Image
                  src={current.imageSrc}
                  alt={current.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center brightness-95 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24040F]/85 via-[#24040F]/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-display text-lg sm:text-2xl text-[#FAF3EE] uppercase tracking-wide">
                    {current.name}
                  </span>
                  <span className="text-[0.62rem] font-sans tracking-[0.2em] uppercase text-[#DDB78A] bg-[#24040F]/85 px-3 py-1 rounded border border-[#DDB78A]/30 backdrop-blur-sm">
                    {current.metrics}
                  </span>
                </div>
              </div>

              {/* Detailed Description */}
              <p className="font-sans text-xs sm:text-sm font-light text-[#F3E7DF]/85 leading-relaxed mb-6">
                {current.description}
              </p>

              {/* Deliverables List */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[0.65rem] font-sans font-semibold tracking-[0.2em] uppercase text-[#DDB78A]">
                    Documented Key Deliverables
                  </span>
                  <button
                    type="button"
                    onClick={() => setExpandedDetail(!expandedDetail)}
                    className="text-[0.62rem] font-sans text-[#DDB78A]/80 hover:text-[#DDB78A] tracking-wider uppercase inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{expandedDetail ? "Show Less" : "Explore Full Scope"}</span>
                    <ChevronRight size={11} className={`transition-transform duration-300 ${expandedDetail ? "rotate-90" : ""}`} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.deliverables.slice(0, expandedDetail ? current.deliverables.length : 4).map((deliv, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-sm border border-white/10 bg-white/5 text-[0.74rem] font-sans font-light text-[#F3E7DF]/90 leading-snug flex items-start gap-2 transition-colors hover:bg-white/10"
                    >
                      <CheckCircle2 size={12} className="text-[#DDB78A] shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-sans text-[#F3E7DF]/60">
                Stage {current.number} of our unified Dubai execution methodology.
              </span>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 rounded-sm bg-[#FAF3EE] text-[#24040F] hover:bg-white text-xs font-sans font-semibold tracking-[0.2em] uppercase transition-colors shrink-0 cursor-pointer"
              >
                DISCUSS THIS METHOD →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
