"use client";

import { useState } from "react";
import Image from "next/image";
import { scrollToElementCenter } from "@/lib/cinematic-scroll";

interface NavCardData {
  number: string;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  targetId: string;
}

const DEFAULT_CARDS: NavCardData[] = [
  {
    number: "01",
    title: "EVENTS",
    category: "Corporate & Institutional",
    description: "Conferences, gala dinners, and state engagement platforms delivered with strategic rigor.",
    imageSrc: "/images/1.1.png",
    targetId: "events",
  },
  {
    number: "02",
    title: "EXHIBITIONS",
    category: "Curated Cultural Platforms",
    description: "Flagship seasonal fairs, trade pavilions, and multi-day experiential exhibitions.",
    imageSrc: "/images/1.2.png",
    targetId: "exhibitions",
  },
  {
    number: "03",
    title: "WORKSHOPS",
    category: "Interactive Masterclasses",
    description: "Creative learning platforms and curated masterclasses aligned with brand objectives.",
    imageSrc: "/images/1.3.png",
    targetId: "workshops",
  },
  {
    number: "04",
    title: "ACTIVATIONS",
    category: "Brand & Experiential Retail",
    description: "Immersive pop-ups and structured mall environments driving footfall and dwell time.",
    imageSrc: "/images/1.4.png",
    targetId: "activations",
  },
  {
    number: "05",
    title: "CONSULTANCY",
    category: "Strategic Direction",
    description: "Concept development, customer journeys, brand alignment, and repositioning.",
    imageSrc: "/images/1.5.png",
    targetId: "consultancy",
  },
];

export function ExpertiseNavCards({
  cards = DEFAULT_CARDS,
}: {
  cards?: NavCardData[];
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollToElementCenter(`#${targetId}`, 1200, `#${targetId}`);
  };

  return (
    <section className="relative bg-[#16030C] text-cream px-4 sm:px-6 lg:px-10 xl:px-14 py-20 sm:py-24 lg:py-28 overflow-hidden select-none">
      {/* Top Section Hairline */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DDB78A]/25 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1600px]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-8 sm:pb-10 border-b border-[#DDB78A]/20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-6 bg-[#DDB78A]/60" aria-hidden="true" />
              <span className="text-[0.68rem] font-sans font-medium tracking-[0.3em] uppercase text-[#DDB78A]">
                CAPABILITIES OVERVIEW
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.8rem] font-normal tracking-[0.1em] text-[#FAF1E8] uppercase leading-none">
              THE FIVE EXPERTISE AREAS
            </h2>
          </div>

          <p className="text-xs sm:text-[0.82rem] font-sans font-light text-[#EAE0D5]/70 max-w-sm">
            Select any architectural domain to explore detailed frameworks, capabilities, and deliverables.
          </p>
        </div>

        {/* 5 Physical Architectural Panels */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3.5 xl:gap-5 items-stretch">
          {cards.map((card, idx) => {
            const isHovered = hoveredIndex === idx;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== idx;

            return (
              <a
                key={card.number}
                href={`#${card.targetId}`}
                onClick={(e) => handleCardClick(e, card.targetId)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative flex flex-col justify-end h-[480px] sm:h-[520px] lg:h-[calc(100vh-220px)] lg:min-h-[480px] lg:max-h-[600px] xl:max-h-[650px] overflow-hidden rounded-sm border bg-[#110108] cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isHovered
                    ? "border-[#DDB78A]/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),_0_0_30px_rgba(221,183,138,0.2)] -translate-y-2 z-20"
                    : isOtherHovered
                    ? "border-[#DDB78A]/10 opacity-60 scale-[0.985] z-0"
                    : "border-[#DDB78A]/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10"
                }`}
              >
                {/* Background Image Layer with Cinematic Scaled Reveal */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <div
                    className={`relative w-full h-full will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isHovered ? "scale-106" : "scale-100"
                    }`}
                  >
                    <Image
                      src={card.imageSrc}
                      alt={`MKAN Concept ${card.title}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover object-center brightness-[0.9] contrast-[1.05]"
                    />
                  </div>

                  {/* Dark Multi-Layer Gradient Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-[#110108] via-[#110108]/90 via-45% to-transparent pointer-events-none" />
                </div>

                {/* Editorial Content Overlay */}
                <div className="relative z-10 flex flex-col justify-end p-5 sm:p-6 lg:p-5 xl:p-7 h-full w-full pointer-events-none">
                  <div className="mt-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {/* Number */}
                    <span className="block font-display text-4xl sm:text-5xl lg:text-[2.6rem] xl:text-[3rem] font-light text-[#EAD0B3] leading-none mb-3 tracking-tight">
                      {card.number}
                    </span>

                    {/* Category Eyebrow */}
                    <span className="block text-[0.62rem] sm:text-[0.66rem] font-sans font-medium tracking-[0.2em] uppercase text-[#DDB78A] mb-1.5">
                      {card.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-display text-lg sm:text-xl lg:text-[1.3rem] xl:text-[1.45rem] font-medium tracking-[0.14em] uppercase text-[#FAF1E8] mb-3 leading-snug">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-[0.7rem] sm:text-[0.74rem] lg:text-[0.72rem] xl:text-[0.78rem] leading-[1.65] font-light text-[#EAE0D5]/75 line-clamp-3 max-w-[95%] transition-colors duration-500 group-hover:text-[#FAF1E8]">
                      {card.description}
                    </p>
                  </div>

                  {/* Explore Link at Bottom */}
                  <div className="mt-6 sm:mt-7 flex items-center gap-2 font-sans text-[0.66rem] sm:text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#DDB78A] transition-colors duration-300 group-hover:text-[#FAF1E8]">
                    <span className="relative">
                      EXPLORE SERVICE
                      <span
                        className={`absolute -bottom-0.5 left-0 h-[1px] bg-[#DDB78A] transition-all duration-300 ${
                          isHovered ? "w-full" : "w-0"
                        }`}
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className={`inline-block transition-transform duration-300 ${
                        isHovered ? "translate-x-1.5" : "translate-x-0"
                      }`}
                    >
                      →
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
