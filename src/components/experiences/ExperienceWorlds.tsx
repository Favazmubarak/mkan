"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2, Sparkles, GraduationCap, Flame, Compass, ChevronRight, Check } from "lucide-react";

interface CapabilityDomain {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: typeof Building2;
  highlights: string[];
  signatureBadge?: string;
}

const WORLDS: CapabilityDomain[] = [
  {
    id: "corporate",
    number: "01",
    category: "EXECUTIVE & PROTOCOL",
    title: "Corporate & Institutional",
    subtitle: "High-level summits, royal protocols & institutional assemblies",
    description:
      "Choreographing dignified environments where policy, commerce, and leadership converge. From state-level diplomatic delegations to Fortune 500 summits and institutional galas across Dubai.",
    image: "/images/1.1.png",
    icon: Building2,
    highlights: [
      "Institutional & Government Assemblies",
      "Executive Gala Dinners & Award Evenings",
      "Bespoke VIP Engagements & Delegations",
      "Corporate Product & Strategy Launches",
    ],
  },
  {
    id: "exhibitions",
    number: "02",
    category: "SPATIAL MASTERPLANNING",
    title: "Curated Exhibitions",
    subtitle: "Cultural fairs, pavilion architecture & public exhibitions",
    description:
      "Transforming expansive halls and bespoke venues into curated sensory journeys. We engineer circulation, architectural flow, and thematic pavilions that captivate both regional and global visitors.",
    image: "/images/1.2.png",
    icon: Sparkles,
    signatureBadge: "FEATURED: THE RAMADAN FAIR",
    highlights: [
      "Signature Seasonal & Cultural Fairs",
      "The MKAN Ramadan Fair (Annual Flagship)",
      "Trade & Public Cultural Exhibitions",
      "Spatial Curation, Booths & Pavilion Flow",
    ],
  },
  {
    id: "workshops",
    number: "03",
    category: "INTELLECTUAL PLATFORMS",
    title: "Workshops & Masterclasses",
    subtitle: "Interactive learning platforms & guided masterclasses",
    description:
      "Designing immersive educational spaces that foster dialogue, creativity, and technical mastery. We structure intimate environments where ideas are shared with clarity and resonance.",
    image: "/images/1.3.png",
    icon: GraduationCap,
    highlights: [
      "Creative Learning & Innovation Labs",
      "Themed Executive Masterclasses",
      "Artisanal, Culinary & Craft Sessions",
      "Guided Cohort & Youth Development",
    ],
  },
  {
    id: "activations",
    number: "04",
    category: "COMMERCIAL IMMERSION",
    title: "Activations & Experiences",
    subtitle: "Luxury brand pop-ups & high-dwell commercial pavilions",
    description:
      "Engineering dynamic spatial touchpoints that stop foot traffic and generate cultural conversation. Built for luxury maisons, retail destinations, and flagship urban venues.",
    image: "/images/1.4.png",
    icon: Flame,
    highlights: [
      "Luxury Maison & Fashion Pop-Ups",
      "Mall Atrium Architectural Activations",
      "Interactive Sensory Pavilions",
      "High-Conversion Retail Showcases",
    ],
  },
  {
    id: "consultancy",
    number: "05",
    category: "STRATEGIC ADVISORY",
    title: "Consultancy & Masterplanning",
    subtitle: "6 Core Strategic Pillars from Inception to Blueprint",
    description:
      "Providing institutional leadership and creative advisory before physical production begins. We structure the strategic framework, financial feasibility, and aesthetic DNA of signature projects.",
    image: "/images/1.5.png",
    icon: Compass,
    highlights: [
      "1. Concept Ideation & Thesis Development",
      "2. Strategy & Thematic Narrative Planning",
      "3. Spatial, Floor & Circulation Blueprints",
      "4. Brand Positioning & Cultural Resonance",
      "5. Vendor Sourcing & Artisan Curation",
      "6. Operational Masterplanning & Rigor",
    ],
  },
];

export function ExperienceWorlds() {
  const [activeTab, setActiveTab] = useState(0);
  const currentWorld = WORLDS[activeTab];
  const Icon = currentWorld.icon;

  return (
    <section className="relative bg-[#1A030A] text-[#FAF3EE] px-6 sm:px-10 lg:px-16 py-24 sm:py-32 overflow-hidden select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#8A1435]/12 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#DDB78A]/6 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px]">
        {/* Editorial Section Header */}
        <div className="max-w-4xl pb-16 border-b border-[#DDB78A]/15">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#DDB78A]" aria-hidden="true" />
            <span className="text-[0.66rem] font-sans font-semibold tracking-[0.35em] uppercase text-[#DDB78A]">
              CAPABILITIES · FIVE DOMAINS
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light uppercase tracking-tight text-[#FAF3EE] leading-[1.02]">
            FROM BOARDROOMS TO <br />
            <span className="font-serif italic font-light text-[#DDB78A]">
              EXHIBITION FLOORS.
            </span>
          </h2>

          <p className="mt-6 font-sans text-sm sm:text-base lg:text-[1.05rem] font-light text-[#F3E7DF]/80 max-w-2xl leading-relaxed">
            MKAN choreographs distinct spatial realities across corporate, cultural, commercial, and educational environments in Dubai and across the Emirates.
          </p>
        </div>

        {/* 5 Domain Navigation Tabs */}
        <div className="mt-12 flex flex-wrap gap-2.5 sm:gap-3 border-b border-[#DDB78A]/15 pb-6">
          {WORLDS.map((world, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={world.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`group inline-flex items-center gap-2.5 px-4 sm:px-6 py-2.5 rounded-full border text-xs sm:text-sm font-sans tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#DDB78A] text-[#1A030A] border-[#DDB78A] font-medium shadow-[0_6px_20px_rgba(221,183,138,0.25)]"
                    : "bg-[#250510]/60 text-[#F3E7DF]/80 border-[#DDB78A]/20 hover:border-[#DDB78A]/60 hover:text-[#FAF3EE]"
                }`}
              >
                <span className="font-mono text-[0.66rem] opacity-75">{world.number}</span>
                <span>{world.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Domain Feature Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Domain Visual Showcase */}
          <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/12] rounded-sm overflow-hidden border border-[#DDB78A]/25 bg-[#140208] group">
            <Image
              key={currentWorld.image}
              src={currentWorld.image}
              alt={currentWorld.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center brightness-[0.84] contrast-[1.08] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A030A] via-[#1A030A]/30 to-transparent" />

            {/* Signature Badge */}
            {currentWorld.signatureBadge && (
              <div className="absolute top-4 left-4 bg-[#8A1435]/90 backdrop-blur-md border border-[#DDB78A]/40 px-3.5 py-1.5 rounded-sm">
                <span className="font-mono text-[0.66rem] tracking-[0.2em] font-semibold text-[#DDB78A] uppercase">
                  {currentWorld.signatureBadge}
                </span>
              </div>
            )}

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#FAF3EE]">
              <div>
                <span className="text-[0.62rem] font-sans font-semibold tracking-[0.3em] uppercase text-[#DDB78A]">
                  {currentWorld.category}
                </span>
                <p className="font-display text-xl sm:text-2xl font-light uppercase mt-1">
                  {currentWorld.title}
                </p>
              </div>
              <span className="font-mono text-xs text-[#DDB78A]/80 tracking-widest">
                MKAN / {currentWorld.number}
              </span>
            </div>
          </div>

          {/* Domain Narrative & Highlights */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-full bg-[#DDB78A]/10 border border-[#DDB78A]/30 text-[#DDB78A]">
                  <Icon size={16} />
                </span>
                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#DDB78A] uppercase">
                  DOMAIN {currentWorld.number} · {currentWorld.category}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl font-normal uppercase text-[#FAF3EE] leading-tight">
                {currentWorld.title}
              </h3>

              <p className="mt-3 font-serif italic text-base sm:text-lg text-[#DDB78A] leading-snug">
                &ldquo;{currentWorld.subtitle}&rdquo;
              </p>

              <p className="mt-5 font-sans text-sm sm:text-base font-light text-[#F3E7DF]/85 leading-relaxed">
                {currentWorld.description}
              </p>

              {/* Core Execution Highlights */}
              <div className="mt-8 pt-6 border-t border-[#DDB78A]/15">
                <h4 className="text-[0.66rem] font-sans font-semibold tracking-[0.25em] uppercase text-[#DDB78A] mb-4">
                  CORE SPECIALIZATION &amp; SCOPE
                </h4>
                <div className="space-y-3">
                  {currentWorld.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 h-4 w-4 rounded-full bg-[#DDB78A]/10 border border-[#DDB78A]/40 flex items-center justify-center text-[#DDB78A] shrink-0">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <span className="font-sans text-xs sm:text-sm text-[#F3E7DF]/90 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Section Switcher */}
            <div className="mt-10 pt-6 border-t border-[#DDB78A]/15 flex items-center justify-between">
              <span className="text-[0.62rem] font-mono tracking-[0.2em] uppercase text-[#F3E7DF]/50">
                EXPLORE ALL 5 CAPABILITY DOMAINS
              </span>
              <button
                type="button"
                onClick={() => setActiveTab((prev) => (prev + 1) % WORLDS.length)}
                className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.2em] uppercase text-[#DDB78A] hover:text-[#FAF3EE] transition-colors cursor-pointer"
              >
                <span>NEXT DOMAIN</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
