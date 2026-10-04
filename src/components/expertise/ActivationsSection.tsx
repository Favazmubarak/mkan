"use client";

import { useState } from "react";
import Image from "next/image";
import { Zap, ShoppingBag, Store } from "lucide-react";

interface ActivationsSectionProps {
  imageSrc?: string;
  secondaryImageSrc?: string;
}

export function ActivationsSection({
  imageSrc = "/images/2.2.png",
  secondaryImageSrc = "/images/1.4.png",
}: ActivationsSectionProps) {
  const [activePanel, setActivePanel] = useState(0);

  const categories = [
    {
      number: "01",
      title: "LUXURY BRAND ACTIVATIONS",
      icon: Zap,
      tag: "IMMERSIVE BRAND WORLDS",
      description:
        "Retail pop-ups and immersive brand environments aligned with commercial objectives and elevated positioning.",
      impact: "High dwell time & VIP engagement",
      metrics: "Custom lighting columns · Multisensory displays · Exclusive client journey",
    },
    {
      number: "02",
      title: "MALL ACTIVATIONS",
      icon: ShoppingBag,
      tag: "HIGH-FOOTFALL SCENOGRAPHY",
      description:
        "Structured experiential concepts designed to drive footfall, engagement and dwell time across premier UAE retail destinations.",
      impact: "Maximized organic foot-traffic conversion",
      metrics: "360° walk-around structures · Live product demonstration · High-throughput flow",
    },
    {
      number: "03",
      title: "RETAIL POP-UPS",
      icon: Store,
      tag: "EPHEMERAL BRAND HUBS",
      description:
        "Short-term curated spaces focused on visibility, interaction and brand exposure.",
      impact: "Immediate commercial lift & social reach",
      metrics: "Rapid modular deployment · Turnkey inventory integration · Social-first visual backdrops",
    },
  ];

  return (
    <section
      id="activations"
      className="relative bg-[#14020A] text-[#F5EEE6] px-6 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-36 overflow-hidden border-t border-[#DDB78A]/15"
    >
      {/* Dynamic Lighting Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,_rgba(221,183,138,0.08)_0%,_transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1440px] relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#DDB78A]/20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[0.72rem] font-sans font-semibold tracking-[0.3em] uppercase text-[#DDB78A]">
                04 / EXPERTISE DOMAIN
              </span>
              <span className="h-px w-8 bg-[#DDB78A]/40" aria-hidden="true" />
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF1E8] uppercase leading-[1.05]">
              BRAND ACTIVATIONS & POP-UPS
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base font-light text-[#EAE0D5]/75 leading-relaxed max-w-md">
            Constructing dynamic, high-energy experiential spaces that command attention, provoke emotional connection, and accelerate brand equity.
          </p>
        </div>

        {/* 3 Interactive Horizontal Category Panels */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = activePanel === idx;

            return (
              <div
                key={cat.number}
                onClick={() => setActivePanel(idx)}
                className={`p-7 sm:p-8 rounded-sm border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#250715] border-[#DDB78A] shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_20px_rgba(221,183,138,0.15)] -translate-y-1.5"
                    : "bg-[#1C0511]/70 border-[#DDB78A]/20 hover:border-[#DDB78A]/50 hover:bg-[#1C0511]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-3xl font-light text-[#EAD0B3]">
                      {cat.number}
                    </span>
                    <span className="p-2 rounded-full border border-[#DDB78A]/30 bg-[#DDB78A]/10 text-[#DDB78A]">
                      <Icon size={16} />
                    </span>
                  </div>

                  <span className="block text-[0.62rem] font-sans font-medium tracking-[0.2em] uppercase text-[#DDB78A] mb-1.5">
                    {cat.tag}
                  </span>

                  <h3 className="font-display text-xl sm:text-2xl font-normal tracking-[0.06em] text-[#FAF1E8] uppercase mb-3">
                    {cat.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm font-light text-[#EAE0D5]/80 leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DDB78A]/15 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#DDB78A] font-medium">
                    <span>Core Objective</span>
                    <span className="text-[0.65rem] tracking-wider uppercase">{cat.impact}</span>
                  </div>
                  <p className="text-[0.7rem] text-[#EAE0D5]/60 font-light">
                    {cat.metrics}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dual Cinematic Visual Stage */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Primary High-Impact Visual */}
          <div className="lg:col-span-8 relative h-[360px] sm:h-[460px] lg:h-[520px] overflow-hidden rounded-sm border border-[#DDB78A]/25 bg-[#16030c] group">
            <Image
              src={imageSrc}
              alt="Luxury Brand Activation with Illuminated Columns by MKAN Concept"
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover object-center brightness-95 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14020A]/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between p-4 rounded bg-[#14020A]/85 backdrop-blur-md border border-[#DDB78A]/20">
              <div>
                <span className="block text-[0.62rem] font-sans tracking-[0.2em] uppercase text-[#DDB78A]">
                  Immersive Pop-Up Structure
                </span>
                <span className="font-display text-sm sm:text-base text-[#FAF1E8]">
                  Illuminated Kinetic Columns & Luxury Retail Activation
                </span>
              </div>
              <span className="text-[0.65rem] font-sans tracking-[0.2em] uppercase text-[#DDB78A] px-2.5 py-1 rounded bg-[#DDB78A]/10 border border-[#DDB78A]/30">
                Experiential Retail
              </span>
            </div>
          </div>

          {/* Secondary Detail Visual */}
          <div className="lg:col-span-4 relative h-[300px] lg:h-[520px] overflow-hidden rounded-sm border border-[#DDB78A]/25 bg-[#16030c] group">
            <Image
              src={secondaryImageSrc}
              alt="Retail Pop-up and Showcase Detail"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover object-center brightness-90 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14020A]/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#14020A]/85 backdrop-blur-md border border-[#DDB78A]/20">
              <span className="block text-[0.62rem] font-sans tracking-[0.2em] uppercase text-[#DDB78A]">
                Tactile Engagement
              </span>
              <span className="font-display text-xs sm:text-sm text-[#FAF1E8]">
                Curated Product Displays
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
