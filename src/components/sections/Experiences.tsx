"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";

interface ExperiencesProps {
  data?: typeof homeContent.experiences;
  assets?: typeof defaultAssets;
}

export function Experiences({ data = homeContent.experiences, assets = defaultAssets }: ExperiencesProps) {
  const experiences = data;
  const [activeFilter, setActiveFilter] = useState("all");

  const getImageSrc = (key: string) => {
    switch (key) {
      case "ramadanFair":
        return assets.experiences?.ramadanFair?.src || assets.heroBg.src;
      case "corporateEvents":
        return assets.experiences?.corporateEvents?.src || assets.heroBg.src;
      case "luxuryActivation":
        return assets.experiences?.luxuryActivation?.src || assets.heroBg.src;
      case "privateEngagement":
        return assets.experiences?.privateEngagement?.src || assets.heroBg.src;
      default:
        return assets.heroBg.src;
    }
  };

  const items = experiences.items || [];
  const filteredItems =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
    <section
      id="experiences"
      className="bg-plum-900 text-cream px-6 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-10">
          <div>
            <p className="font-sans text-[0.7rem] sm:text-[0.75rem] font-medium tracking-[0.3em] uppercase text-gold/80 mb-2">
              {experiences.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-cream tracking-tight">
              {experiences.title}
            </h2>
          </div>

          <Link
            href={experiences.viewAllCta?.href || "#experiences"}
            className="group inline-flex items-center gap-2 text-[0.72rem] font-sans font-medium tracking-[0.2em] uppercase text-cream/80 transition-colors duration-300 hover:text-gold"
          >
            <span className="relative">
              {experiences.viewAllCta?.label || "View All Projects"}
              <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-gold origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pb-12">
          {(experiences.filters || []).map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                type="button"
                className={`px-4 py-2 text-[0.68rem] sm:text-[0.72rem] font-sans font-medium tracking-[0.2em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
                  isActive
                    ? "bg-cream text-plum-950 shadow-sm"
                    : "border border-cream/20 text-cream/75 hover:border-cream/50 hover:text-cream"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* 2x2 Interactive Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={item.href || "#contact"}
              className="group relative flex flex-col justify-end aspect-[4/3] sm:aspect-[16/11] p-6 sm:p-8 border border-cream/15 overflow-hidden transition-all duration-500 hover:border-gold/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              {/* Background Image with Ambient Zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={getImageSrc(item.imageKey)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-plum-950 via-plum-950/60 to-plum-950/15" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 flex items-end justify-between w-full">
                <div>
                  <h3 className="font-sans text-base sm:text-lg font-semibold tracking-[0.16em] uppercase text-cream mb-1">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs font-light text-cream/75 tracking-wider">
                    {item.subtitle}
                  </p>
                </div>

                {/* Circular Outlined Arrow Button */}
                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/30 text-xs text-cream transition-all duration-300 group-hover:border-gold group-hover:text-gold group-hover:scale-110 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
