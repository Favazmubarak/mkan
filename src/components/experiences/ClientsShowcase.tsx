"use client";

import { useState } from "react";
import Image from "next/image";

type ClientType = {
  name: string;
  logo: string;
  width: number;
  height: number;
  aspectRatio: number;
  category: "gov" | "luxury" | "enterprise";
};

const CLIENTS_DATA: ClientType[] = [
  { name: "Abu Dhabi Business Women Council", logo: "/images/logo/abudhabi-business-women-council.png", width: 800, height: 172, aspectRatio: 4.65, category: "gov" },
  { name: "Dubai Ladies Club", logo: "/images/logo/dubai-ladies-club.png", width: 463, height: 324, aspectRatio: 1.43, category: "gov" },
  { name: "Chalhoub Group", logo: "/images/logo/chalhoub.png", width: 432, height: 379, aspectRatio: 1.14, category: "luxury" },
  { name: "Emirates Steel", logo: "/images/logo/emirates-steel.png", width: 654, height: 200, aspectRatio: 3.27, category: "enterprise" },
  { name: "Galeries Lafayette", logo: "/images/logo/gallaries.png", width: 603, height: 315, aspectRatio: 1.91, category: "luxury" },
  { name: "Dubai Health Authority", logo: "/images/logo/health-authotirty.png", width: 241, height: 220, aspectRatio: 1.1, category: "gov" },
  { name: "HSBC", logo: "/images/logo/hsbc.png", width: 213, height: 157, aspectRatio: 1.36, category: "enterprise" },
  { name: "Kaya Skin Clinic", logo: "/images/logo/kaya.png", width: 796, height: 305, aspectRatio: 2.61, category: "luxury" },
  { name: "KIZAD", logo: "/images/logo/kizad.png", width: 575, height: 189, aspectRatio: 3.04, category: "gov" },
  { name: "SEHA", logo: "/images/logo/seha.png", width: 179, height: 155, aspectRatio: 1.15, category: "gov" },
  { name: "Alta Pleat", logo: "/images/logo/alta-pleat.png", width: 206, height: 186, aspectRatio: 1.11, category: "luxury" },
  { name: "Aisha's", logo: "/images/logo/aishas.png", width: 165, height: 133, aspectRatio: 1.24, category: "luxury" },
  { name: "EIC", logo: "/images/logo/eic.png", width: 345, height: 218, aspectRatio: 1.58, category: "enterprise" },
  { name: "Fabula Jewels", logo: "/images/logo/fabula.png", width: 391, height: 109, aspectRatio: 3.59, category: "luxury" },
  { name: "Fiz", logo: "/images/logo/fiz.png", width: 229, height: 260, aspectRatio: 0.88, category: "luxury" },
  { name: "Homa Q", logo: "/images/logo/homaq.png", width: 379, height: 130, aspectRatio: 2.92, category: "luxury" },
  { name: "Selsela", logo: "/images/logo/selsela.png", width: 190, height: 106, aspectRatio: 1.79, category: "luxury" },
];

export function ClientsShowcase() {
  const [filter, setFilter] = useState<"all" | "gov" | "luxury" | "enterprise">("all");

  const categories = [
    { key: "all" as const, label: "ALL PARTNERS" },
    { key: "gov" as const, label: "GOVERNMENT & INSTITUTIONS" },
    { key: "luxury" as const, label: "LUXURY & RETAIL" },
    { key: "enterprise" as const, label: "ENTERPRISE & HEALTHCARE" },
  ];

  const filteredClients = filter === "all"
    ? CLIENTS_DATA
    : CLIENTS_DATA.filter((c) => c.category === filter);

  return (
    <section id="clients" className="relative bg-[#20040D] text-[#FAF3EE] px-6 sm:px-10 lg:px-16 py-24 sm:py-32 overflow-hidden border-t border-[#DDB78A]/20 select-none">
      {/* Top Hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DDB78A]/30 to-transparent" />

      {/* Subtle Background Lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#DDB78A]/5 blur-[140px] rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="mx-auto w-full max-w-[1300px] relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#DDB78A]/15">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="h-px w-8 bg-[#DDB78A]" aria-hidden="true" />
              <span className="font-sans text-[0.68rem] font-semibold tracking-[0.35em] uppercase text-[#DDB78A]">
                INSTITUTIONAL TRUST
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal uppercase tracking-[-0.01em] text-[#FAF3EE]">
              OUR CLIENTS & PARTNERS
            </h2>
            <p className="mt-3 font-sans text-xs sm:text-sm font-light text-[#F3E7DF]/70 max-w-xl">
              Collaborating with government entities, sovereign authorities, and leading luxury houses across the UAE.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = filter === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setFilter(cat.key)}
                  className={`px-3.5 py-1.5 rounded-sm text-[0.65rem] sm:text-[0.7rem] font-sans font-medium tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#DDB78A] text-[#20040D] font-semibold shadow-sm"
                      : "bg-[#2A0512] text-[#F3E7DF]/60 hover:text-[#FAF3EE] hover:bg-[#38081A]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mt-12">
          {filteredClients.map((client) => (
            <div
              key={client.name}
              className="group relative flex flex-col items-center justify-center p-6 h-32 rounded-sm border border-[#DDB78A]/10 bg-[#250510]/50 hover:bg-[#2F0716] hover:border-[#DDB78A]/35 transition-all duration-300"
            >
              <div className="relative w-full h-12 flex items-center justify-center">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  className="max-h-12 w-auto object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <span className="mt-3 text-[0.6rem] font-sans tracking-[0.15em] text-center text-[#F3E7DF]/40 group-hover:text-[#DDB78A] transition-colors line-clamp-1 uppercase">
                {client.name}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Trust Assurance */}
        <div className="mt-16 pt-8 border-t border-[#DDB78A]/10 text-center">
          <p className="font-sans text-xs text-[#F3E7DF]/50 uppercase tracking-[0.25em]">
            GOVERNMENT PROTOCOL COMPLIANT · STRICT NDA & DISCRETION ASSURED
          </p>
        </div>
      </div>
    </section>
  );
}
