"use client";

import { useState } from "react";
import Image from "next/image";
import { Compass, Layers, Users, Sparkles } from "lucide-react";

interface ExhibitionsSectionProps {
  imageSrc?: string;
  supportingImageSrc?: string;
}

export function ExhibitionsSection({
  imageSrc = "/images/2.1.png",
}: ExhibitionsSectionProps) {
  const [activeSpatialTab, setActiveSpatialTab] = useState(0);

  const categories = [
    {
      number: "01",
      title: "RAMADAN FAIR",
      tag: "FLAGSHIP EXHIBITION PLATFORM",
      description:
        "A curated multi-day seasonal exhibition integrating structured programming, premium vendor selection, and disciplined execution.",
      points: [
        "Multi-day seasonal pavilions in landmark UAE venues",
        "Strict artisanal & luxury brand curation criteria",
        "Immersive hospitality, live music, and evening activations",
        "High-density footfall with extended visitor dwell time",
      ],
    },
    {
      number: "02",
      title: "SEASONAL FAIRS / TRADE & PUBLIC EXHIBITIONS",
      tag: "COMMERCIAL & PUBLIC PLATFORMS",
      description:
        "Strategically organized platforms connecting brands with clearly defined audiences.",
      points: [
        "Thematic cultural platforms celebrating regional heritage",
        "Turnkey vendor infrastructure & spatial modularity",
        "Direct-to-consumer commercial monetization systems",
        "Comprehensive VIP host and concierge operations",
      ],
    },
    {
      number: "03",
      title: "EXHIBITION STRATEGY & PLANNING",
      tag: "MASTER PLANNING & TRAFFIC FLOW",
      description:
        "Structuring layouts, vendor mix and visitor flow to maximize engagement and commercial performance.",
      points: [
        "Dynamic visitor journey & architectural zoning",
        "Optimized sightlines and focal activation hubs",
        "Commercial concession mix & tenant placement strategy",
        "Post-exhibition audit & footfall density analytics",
      ],
    },
  ];

  const spatialFlowNodes = [
    {
      title: "Grand Arrival Portal",
      desc: "Architectural monumental entry with ambient lighting and concierge registration.",
      icon: Sparkles,
      zone: "Zone A · Arrival Scenography",
    },
    {
      title: "Curated Brand Pavilions",
      desc: "Modular luxury booths with custom stone finishes and brand-aligned lighting.",
      icon: Layers,
      zone: "Zone B · Commercial Promenade",
    },
    {
      title: "Central Cultural Courtyard",
      desc: "Sensory activation square with communal seating, live artisanal crafts, and hospitality.",
      icon: Compass,
      zone: "Zone C · Engagement Hub",
    },
    {
      title: "VIP Majlis & Private Lounge",
      desc: "Dedicated sanctuary with bespoke protocol catering and executive networking.",
      icon: Users,
      zone: "Zone D · Private Protocol",
    },
  ];

  return (
    <section
      id="exhibitions"
      className="relative bg-[#16030C] text-[#F5EEE6] px-6 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-36 overflow-hidden border-t border-[#DDB78A]/15"
    >
      {/* Background Subtle Architectural Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#DDB78A_1px,_transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1440px] relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#DDB78A]/20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[0.72rem] font-sans font-semibold tracking-[0.3em] uppercase text-[#DDB78A]">
                02 / EXPERTISE DOMAIN
              </span>
              <span className="h-px w-8 bg-[#DDB78A]/40" aria-hidden="true" />
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF1E8] uppercase leading-[1.05]">
              CURATED EXHIBITIONS
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base font-light text-[#EAE0D5]/75 leading-relaxed max-w-md">
            Architecting world-class public and trade exhibitions that transform open venues into high-performing commercial, cultural, and community platforms.
          </p>
        </div>

        {/* 3 Categories Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.number}
              className="flex flex-col justify-between p-7 sm:p-8 rounded-sm border border-[#DDB78A]/20 bg-[#1D0610] transition-all duration-300 hover:border-[#DDB78A]/60 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-3xl font-light text-[#EAD0B3]">
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
                  {cat.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-light text-[#EAE0D5]/75">
                      <span className="h-1 w-1 rounded-full bg-[#DDB78A] mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Matrix & Interactive Spatial Flow Visual */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual */}
          <div className="lg:col-span-7 relative h-[380px] sm:h-[460px] lg:h-[500px] overflow-hidden rounded-sm border border-[#DDB78A]/25 bg-[#16030c] group">
            <Image
              src={imageSrc}
              alt="Ramadan Fair Architectural Pavilion by MKAN Concept"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center brightness-95 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#16030c]/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between p-4 rounded bg-[#16030C]/80 backdrop-blur-md border border-[#DDB78A]/20">
              <span className="font-display text-sm sm:text-base text-[#FAF1E8] tracking-wider">
                Flagship Pavilion Architecture & Illuminated Arches
              </span>
              <span className="text-[0.62rem] font-sans tracking-[0.2em] uppercase text-[#DDB78A]">
                Spatial Design
              </span>
            </div>
          </div>

          {/* Interactive Spatial Flow Matrix */}
          <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-8 rounded-sm border border-[#DDB78A]/20 bg-[#220811]/70 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[0.68rem] font-sans font-medium tracking-[0.25em] uppercase text-[#DDB78A]">
                SPATIAL FLOW ARCHITECTURE
              </span>
              <Layers size={15} className="text-[#DDB78A]" />
            </div>

            <h4 className="font-display text-xl sm:text-2xl text-[#FAF1E8] uppercase mb-4">
              Visitor Journey Blueprint
            </h4>

            <p className="text-xs sm:text-[0.8125rem] font-sans font-light text-[#EAE0D5]/75 leading-relaxed mb-6">
              Our exhibition blueprints optimize human circulation, ensuring high engagement across all curated brand zones.
            </p>

            {/* Interactive Node Selector */}
            <div className="space-y-3">
              {spatialFlowNodes.map((node, idx) => {
                const Icon = node.icon;
                const isActive = activeSpatialTab === idx;

                return (
                  <button
                    key={node.title}
                    onClick={() => setActiveSpatialTab(idx)}
                    className={`w-full text-left p-3.5 rounded transition-all duration-300 flex items-start gap-3.5 border cursor-pointer ${
                      isActive
                        ? "bg-[#DDB78A]/15 border-[#DDB78A] shadow-[0_0_15px_rgba(221,183,138,0.15)]"
                        : "bg-transparent border-[#DDB78A]/10 hover:border-[#DDB78A]/30 hover:bg-[#DDB78A]/5"
                    }`}
                  >
                    <span className={`p-2 rounded-full border shrink-0 ${
                      isActive ? "border-[#DDB78A] bg-[#DDB78A] text-[#16030c]" : "border-[#DDB78A]/30 text-[#DDB78A]"
                    }`}>
                      <Icon size={14} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-sans font-medium text-[#FAF1E8]">
                          {node.title}
                        </span>
                        <span className="text-[0.62rem] font-sans tracking-[0.15em] text-[#DDB78A]/80 uppercase">
                          {node.zone}
                        </span>
                      </div>
                      <p className="text-[0.72rem] font-light text-[#EAE0D5]/70 mt-1 leading-relaxed">
                        {node.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
