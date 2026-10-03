"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";
import { SpotlightLink } from "@/components/SpotlightLink";

type ExperienceItem = {
  id: string;
  title: string;
  subtitle: string;
  category: "events" | "exhibitions" | "workshops" | "activations";
  imageKey: string;
  href: string;
  imageUrl?: string;
  altText?: string;
};

type ExperiencesData = Omit<typeof homeContent.experiences, "items"> & {
  items: readonly ExperienceItem[];
};

interface ExperiencesProps {
  data?: ExperiencesData;
  assets?: typeof defaultAssets;
}

export function Experiences({ data = homeContent.experiences, assets = defaultAssets }: ExperiencesProps) {
  const experiences = data;
  const viewAllIsSelfLink = String(experiences.viewAllCta?.href) === "#experiences";
  const viewAllHref = viewAllIsSelfLink ? "#contact" : experiences.viewAllCta?.href || "#contact";
  const viewAllLabel = viewAllIsSelfLink ? "Start a Project" : experiences.viewAllCta?.label || "Start a Project";
  const [activeFilter, setActiveFilter] = useState("all");

  const getImageSrc = (key: string, imageUrl?: string) => {
    if (imageUrl) return imageUrl;

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
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-cream tracking-normal">
              {experiences.title}
            </h2>
          </div>

          <Link
            href={viewAllHref}
            className="group inline-flex items-center gap-2 text-[0.72rem] font-sans font-medium tracking-[0.2em] uppercase text-cream/80 transition-colors duration-300 hover:text-gold"
          >
            <span className="relative">
              {viewAllLabel}
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
                aria-pressed={isActive}
                className={`px-4 py-2 text-[0.68rem] sm:text-[0.72rem] font-sans font-medium tracking-[0.2em] uppercase transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
                  isActive
                    ? "bg-cream text-plum-950 shadow-[0_8px_24px_-10px_rgba(221,183,138,0.55)]"
                    : "border border-cream/20 text-cream/75 hover:border-gold/60 hover:text-gold"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* 2x2 Showcase Cards */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {filteredItems.map((item, index) => (
              // key includes the filter so cards re-mount and replay the staggered entrance
              <div
                key={`${activeFilter}-${item.id}`}
                className="lux-enter"
                style={{ "--i": index } as CSSProperties}
              >
                <SpotlightLink
                  href={item.href || "#contact"}
                  tilt={2.5}
                  className="group lux-card relative flex aspect-[4/3] sm:aspect-[16/11] flex-col justify-end overflow-hidden border border-cream/15 p-6 sm:p-8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  {/* Image layer */}
                  <div className="absolute inset-0 z-0 overflow-hidden img-shimmer-wrapper">
                    <Image
                      src={getImageSrc(item.imageKey, item.imageUrl)}
                      alt={item.altText || item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="lux-img object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum-950 via-plum-950/55 to-plum-950/10 transition-opacity duration-700 group-hover:opacity-80" />
                  </div>

                  {/* Top meta: category + index */}
                  <div className="absolute inset-x-6 top-6 z-10 flex items-start justify-between sm:inset-x-8 sm:top-8">
                    <span className="inline-flex items-center gap-3 font-sans text-[0.62rem] font-medium uppercase tracking-[0.3em] text-gold-light">
                      <span aria-hidden="true" className="lux-tag-line" />
                      {item.category}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-display text-2xl font-light text-cream/60 transition-colors duration-500 group-hover:text-gold"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="lux-lift-text relative z-10 flex w-full items-end justify-between gap-4">
                    <div>
                      <h3 className="font-sans text-base sm:text-lg font-semibold tracking-[0.16em] uppercase text-cream">
                        {item.title}
                      </h3>
                      <span aria-hidden="true" className="lux-rule my-3" />
                      <p className="font-sans text-xs font-normal tracking-wider text-cream/75 transition-colors duration-500 group-hover:text-cream">
                        {item.subtitle}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/30 text-xs text-cream transition-all duration-500 group-hover:-rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-plum-950"
                    >
                      →
                    </span>
                  </div>

                  {/* Cursor-following disc (mouse devices only) */}
                  <span aria-hidden="true" className="lux-cursor font-sans">
                    View
                  </span>
                </SpotlightLink>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-cream/15 bg-plum-950/30 px-6 py-10 sm:px-8 sm:py-12">
            <h3 className="font-display text-2xl font-normal text-cream sm:text-3xl">
              More experiences are on the way.
            </h3>
            <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-cream/75">
              There are no featured projects in this category yet. Tell us what you have in mind and we can shape it together.
            </p>
            <Link
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-xs font-sans font-medium tracking-[0.18em] uppercase text-gold hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Discuss a project <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}