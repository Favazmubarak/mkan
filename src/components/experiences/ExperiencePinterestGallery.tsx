"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  X,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
  Eye,
} from "lucide-react";
import {
  type PortraitPin as PinterestPin,
  DEFAULT_PORTRAIT_PINS,
} from "@/content/portrait-gallery";

export type { PinterestPin };

interface ExperiencePinterestGalleryProps {
  initialPins?: PinterestPin[];
}

export function ExperiencePinterestGallery({
  initialPins,
}: ExperiencePinterestGalleryProps = {}) {
  const [pins, setPins] = useState<PinterestPin[]>(
    initialPins && initialPins.length > 0 ? initialPins : DEFAULT_PORTRAIT_PINS
  );
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPin, setSelectedPin] = useState<PinterestPin | null>(null);

  // Live real-time sync with Admin Studio updates
  useEffect(() => {
    if (typeof window === "undefined" || !("BroadcastChannel" in window)) return;
    const channel = new BroadcastChannel("mkan_live_sync");
    const handleMessage = async (event: MessageEvent) => {
      if (event.data?.type === "CONTENT_UPDATED") {
        try {
          const { getPortraitPinsAction } = await import(
            "@/app/actions/portrait-gallery"
          );
          const freshPins = await getPortraitPinsAction();
          if (freshPins && freshPins.length > 0) {
            setPins(freshPins);
          }
        } catch {
          // ignore sync fetch errors
        }
      }
    };
    channel.addEventListener("message", handleMessage);
    return () => {
      channel.removeEventListener("message", handleMessage);
      channel.close();
    };
  }, []);

  const categories = [
    { key: "all", label: "ALL WORKS" },
    { key: "exhibitions", label: "EXHIBITIONS" },
    { key: "activations", label: "ACTIVATIONS" },
    { key: "corporate", label: "CORPORATE & GOV" },
    { key: "workshops", label: "WORKSHOPS" },
    { key: "consultancy", label: "CONSULTANCY" },
  ];

  const filteredPins = useMemo(() => {
    if (activeCategory === "all") return pins;
    return pins.filter((pin) => pin.category === activeCategory);
  }, [pins, activeCategory]);

  const getAspectClass = (aspect: PinterestPin["aspect"]) => {
    switch (aspect) {
      case "tall":
        return "aspect-[3/4.2]";
      case "portrait":
        return "aspect-[4/5.2]";
      case "wide":
        return "aspect-[16/11]";
      case "square":
        return "aspect-square";
      case "cinema":
        return "aspect-[16/9]";
      default:
        return "aspect-[4/5]";
    }
  };

  return (
    <section id="experience-gallery" className="relative bg-[#FAF6F0] text-[#24040F] px-6 sm:px-10 lg:px-16 py-16 sm:py-20 select-none border-b border-[#24040F]/10">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Pinterest Gallery Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#24040F]/10">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="h-px w-6 bg-[#8A1435]" aria-hidden="true" />
              <span className="font-sans text-[0.64rem] font-semibold tracking-[0.3em] uppercase text-[#8A1435]">
                CURATED VISUAL DOSSIER
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-[2.8rem] font-light uppercase tracking-tight text-[#24040F] leading-[1.04]">
              EXPERIENTIAL <br />
              <span className="font-serif italic font-light text-[#8A1435]">
                GALLERY &amp; ARCHIVE.
              </span>
            </h2>
          </div>

          {/* Filter Pills — Pinterest Style */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <div className="hidden sm:flex items-center gap-2 mr-2 text-[#24040F]/50 text-xs font-sans">
              <SlidersHorizontal size={13} />
              <span className="text-[0.66rem] font-mono tracking-widest uppercase">FILTER:</span>
            </div>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-[0.66rem] sm:text-xs font-sans font-medium tracking-[0.16em] uppercase transition-colors duration-250 cursor-pointer ${
                    isActive
                      ? "bg-[#20040D] text-[#FAF3EE] shadow-sm"
                      : "bg-[#EFE8DF] text-[#24040F]/75 hover:bg-[#E4DCCE] hover:text-[#20040D]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pinterest Masonry Columns Grid */}
        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredPins.map((pin) => (
            <div
              key={pin.id}
              onClick={() => setSelectedPin(pin)}
              className="break-inside-avoid group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-[#20040D]/[0.08] shadow-[0_2px_12px_rgba(32,4,13,0.03)] hover:border-[#8A1435]/35 hover:shadow-[0_20px_45px_-12px_rgba(32,4,13,0.09)] hover:-translate-y-1.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
            >
              {/* Photo Frame with Pinterest Aspect */}
              <div className={`relative w-full overflow-hidden bg-[#180209] ${getAspectClass(pin.aspect)}`}>
                <Image
                  src={pin.image}
                  alt={pin.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
                  className="object-cover object-center brightness-[0.96] contrast-[1.04] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-105"
                />

                {/* Ambient Soft Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#20040D]/90 via-[#20040D]/25 to-transparent opacity-75 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

                {/* Top Category Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#180209]/85 backdrop-blur-md text-[0.6rem] font-sans font-semibold tracking-[0.22em] uppercase text-[#DDB78A] border border-white/10">
                    {pin.categoryLabel}
                  </span>
                </div>

                {/* Top Right Quick-Action View Eye Button */}
                <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF3EE]/95 backdrop-blur-md text-[#20040D] shadow-md hover:scale-110 transition-transform">
                    <Eye size={13} />
                  </span>
                </div>

                {/* Floating Content Inside Photo (Pinterest Card Style) */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-[#FAF3EE] pointer-events-none z-10">
                  <span className="text-[0.62rem] font-sans tracking-[0.2em] text-[#DDB78A] uppercase block mb-1">
                    {pin.client}
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-medium uppercase tracking-tight text-[#FAF3EE] leading-snug drop-shadow-sm group-hover:text-[#FAF3EE] transition-colors">
                    {pin.title}
                  </h3>
                  <p className="font-serif italic text-xs text-[#EAD0B3]/90 mt-1 line-clamp-1">
                    {pin.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom Details & Tags Block */}
              <div className="p-4 sm:p-4.5 bg-white flex flex-col justify-between">
                {/* Micro Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(pin.tags || []).slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-sm bg-[#FAF6F0] border border-[#24040F]/8 text-[0.6rem] font-sans font-medium text-[#24040F]/70 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Bar */}
                <div className="pt-2.5 border-t border-[#24040F]/8 flex items-center justify-between text-xs text-[#24040F]/75">
                  <div className="flex items-center gap-1.5 text-[0.65rem] font-sans text-[#24040F]/60">
                    <MapPin size={11} className="text-[#8A1435]" />
                    <span>{pin.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[0.66rem] font-sans font-semibold tracking-wider text-[#8A1435] uppercase group-hover:translate-x-0.5 transition-transform">
                    <span>DOSSIER</span>
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Case Study Modal (High-End Luxury Drawer) */}
      {selectedPin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={() => setSelectedPin(null)}
        >
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FAF3EE] text-[#24040F] rounded-xl border border-[#8A1435]/30 shadow-2xl p-6 sm:p-10 lg:p-12 transition-all duration-300"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPin(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#EFE8DF] text-[#24040F] hover:bg-[#20040D] hover:text-[#FAF3EE] transition-all cursor-pointer"
              aria-label="Close project modal"
            >
              <X size={18} />
            </button>

            {/* Category & Client Header */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#20040D] text-[#FAF3EE] text-[0.62rem] font-sans font-semibold tracking-[0.25em] uppercase">
                {selectedPin.categoryLabel}
              </span>
              <span className="text-xs font-sans text-[#8A1435] font-semibold tracking-wider uppercase">
                {selectedPin.client}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-light uppercase text-[#24040F] leading-tight">
              {selectedPin.title}
            </h2>
            <p className="mt-2 font-serif italic text-base sm:text-lg text-[#8A1435]">
              &ldquo;{selectedPin.subtitle}&rdquo;
            </p>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 py-4 border-y border-[#24040F]/10 text-xs font-sans">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#8A1435]" />
                <span>Year: <strong className="font-semibold">{selectedPin.year}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#8A1435]" />
                <span>Location: <strong className="font-semibold">{selectedPin.location}</strong></span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Layers size={14} className="text-[#8A1435]" />
                <span>Discipline: <strong className="font-semibold">{selectedPin.categoryLabel}</strong></span>
              </div>
            </div>

            {/* Image Showcase Frame */}
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden my-6 border border-[#24040F]/15 bg-[#180209]">
              <Image
                src={selectedPin.image}
                alt={selectedPin.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Detailed Executive Overview */}
            <div className="space-y-6 mt-6">
              <div>
                <h4 className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#8A1435] mb-2">
                  EXECUTIVE OVERVIEW
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#24040F]/85 leading-relaxed font-light">
                  {selectedPin.overview}
                </p>
              </div>

              {/* Key Deliverables */}
              <div>
                <h4 className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#8A1435] mb-3">
                  KEY SCOPE &amp; DELIVERABLES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(selectedPin.deliverables || []).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs font-sans text-[#24040F]/80">
                      <CheckCircle2 size={13} className="text-[#8A1435] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Measurable Impact */}
              <div className="p-4 sm:p-5 rounded-lg bg-[#EFE8DF]/80 border-l-2 border-[#8A1435]">
                <h4 className="flex items-center gap-2 text-[0.68rem] font-sans font-semibold tracking-[0.25em] uppercase text-[#24040F] mb-1">
                  <Sparkles size={13} className="text-[#8A1435]" />
                  MEASURABLE IMPACT
                </h4>
                <p className="font-sans text-xs sm:text-[0.84rem] text-[#24040F]/85">
                  {selectedPin.impact}
                </p>
              </div>
            </div>

            {/* Bottom Modal CTA */}
            <div className="mt-8 pt-6 border-t border-[#24040F]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-sans text-[#24040F]/60 text-center sm:text-left">
                Schedule a consultation or request the private atelier project lookbook.
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedPin(null);
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-full bg-[#20040D] text-[#FAF3EE] hover:bg-[#3A081A] text-xs font-sans font-semibold tracking-[0.2em] uppercase transition-colors shrink-0 cursor-pointer shadow-md"
              >
                INQUIRE ABOUT THIS PROJECT →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
