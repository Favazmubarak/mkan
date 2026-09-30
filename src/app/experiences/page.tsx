"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { experiencesContent } from "@/content/experiences";
import { assets } from "@/config/assets";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function ExperiencesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const getImageSrc = (key: string) => {
    switch (key) {
      case "ramadanFair":
        return assets.experiences.ramadanFair.src;
      case "corporateEvents":
        return assets.experiences.corporateEvents.src;
      case "luxuryActivation":
        return assets.experiences.luxuryActivation.src;
      case "privateEngagement":
        return assets.experiences.privateEngagement.src;
      case "expertise.workshops":
        return assets.expertise.workshops.src;
      case "expertise.exhibitions":
        return assets.expertise.exhibitions.src;
      default:
        return assets.heroBg.src;
    }
  };

  const filteredProjects =
    activeCategory === "all"
      ? experiencesContent.projects
      : experiencesContent.projects.filter(
          (item) => item.category === activeCategory
        );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-plum-950 text-cream pt-32 pb-24 sm:pt-40 sm:pb-32 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Header */}
          <div className="max-w-3xl pb-14 border-b border-cream/10">
            <p className="font-sans text-[0.7rem] sm:text-[0.75rem] font-medium tracking-[0.3em] uppercase text-gold mb-3">
              {experiencesContent.header.eyebrow}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-cream tracking-tight">
              {experiencesContent.header.title}
            </h1>
            <p className="mt-3 font-sans text-xs sm:text-sm font-medium tracking-[0.18em] uppercase text-cream/70">
              {experiencesContent.header.subtitle}
            </p>
            <p className="mt-4 text-sm sm:text-base font-sans font-light leading-relaxed text-cream/80 max-w-2xl">
              {experiencesContent.header.intro}
            </p>
          </div>

          {/* Filter Navigation Tabs */}
          <div className="mt-12 flex flex-wrap items-center gap-3 sm:gap-4 pb-12">
            {experiencesContent.categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  type="button"
                  className={`px-5 py-2.5 text-[0.68rem] sm:text-[0.72rem] font-sans font-medium tracking-[0.2em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer ${
                    isActive
                      ? "bg-cream text-plum-950 shadow-md font-semibold"
                      : "border border-cream/20 text-cream/75 hover:border-cream/50 hover:text-cream"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Showcase Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col justify-end aspect-[4/3] sm:aspect-[16/12] p-6 sm:p-8 border border-cream/15 overflow-hidden transition-all duration-500 hover:border-gold/60"
              >
                {/* Background Image with Hover Zoom */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={getImageSrc(project.imageKey)}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-950 via-plum-950/65 to-plum-950/20" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex items-end justify-between w-full">
                  <div>
                    <span className="text-[0.65rem] font-sans font-medium tracking-[0.2em] uppercase text-gold mb-1 block">
                      {project.categoryLabel} &ensp;•&ensp; {project.year}
                    </span>
                    <h2 className="font-sans text-base sm:text-lg font-semibold tracking-[0.16em] uppercase text-cream mb-1">
                      {project.title}
                    </h2>
                    <p className="font-sans text-xs font-light text-cream/75 tracking-wider">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Circular Outlined Arrow Button */}
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/30 text-xs text-cream transition-all duration-300 group-hover:border-gold group-hover:text-gold group-hover:scale-110"
                  >
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-20 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-gold/70 px-8 py-3.5 text-xs font-sans font-medium tracking-[0.2em] uppercase text-cream transition-all duration-300 hover:bg-gold/10 hover:border-gold hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>Discuss a Custom Experience</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ExperiencesPage;
