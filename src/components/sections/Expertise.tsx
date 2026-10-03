"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";

interface ExpertiseProps {
  data?: typeof homeContent.expertise;
  assets?: typeof defaultAssets;
}

interface CardItem {
  number: string;
  title: string;
  description: string;
  items?: readonly string[] | string[];
  cta?: { label: string; href: string };
  imageKey: string;
  videoUrl?: string;
}

/**
 * Editorial Full-box Luxury Expertise Card:
 * - Tall, elegant aspect ratio matching the editorial reference.
 * - Crystal clear upper image (no fog or overlays on the top half).
 * - Refined smoky dark wine gradient covering strictly the lower typography area.
 * - Bold serif numbers & titles with stacked service items.
 * - Ultra-smooth 60fps continuous hover physics.
 */
function ExpertiseCardItem({
  card,
  index,
  isHovered,
  imageSrc,
  onHoverStart,
  onHoverEnd,
}: {
  card: CardItem;
  index: number;
  isHovered: boolean;
  imageSrc: string;
  onHoverStart: (idx: number) => void;
  onHoverEnd: () => void;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Smooth, subtle mouse parallax on the image layer
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const cardEl = cardRef.current;
    const imgEl = imgWrapperRef.current;
    if (!cardEl || !imgEl) return;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const rect = cardEl.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      // Subtle 4px maximum shift for depth
      const tx = (normX * -4).toFixed(2);
      const ty = (normY * -4).toFixed(2);

      imgEl.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
      imgEl.style.transform = `scale(1.04) translate3d(${tx}px, ${ty}px, 0)`;
    });
  }, []);

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      onHoverStart(index);
      if (e.pointerType === "mouse" && imgWrapperRef.current) {
        // Slow, elegant cinematic zoom-in
        imgWrapperRef.current.style.transition = "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)";
        imgWrapperRef.current.style.transform = "scale(1.04) translate3d(0, 0, 0)";
      }
    },
    [index, onHoverStart]
  );

  const handlePointerLeave = useCallback(() => {
    onHoverEnd();
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (imgWrapperRef.current) {
      // Slow, smooth return
      imgWrapperRef.current.style.transition = "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)";
      imgWrapperRef.current.style.transform = "scale(1.0) translate3d(0, 0, 0)";
    }
  }, [onHoverEnd]);

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Split lines if items is not explicitly provided
  const itemLines = card.items && card.items.length > 0
    ? card.items
    : card.description.split("\n").filter(Boolean);

  // Card container inline styles for smooth continuous transition
  const cardStyle: React.CSSProperties = {
    transition:
      "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.75s ease, box-shadow 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
    transform: isHovered ? "translateY(-8px)" : "translateY(0px)",
    borderColor: isHovered ? "rgba(221, 183, 138, 0.55)" : "rgba(245, 238, 230, 0.14)",
    boxShadow: isHovered
      ? "0 26px 60px -12px rgba(0,0,0,0.8), 0 0 30px -4px rgba(221,183,138,0.14)"
      : "0 8px 24px -8px rgba(0,0,0,0.4)",
  };

  return (
    <Link
      ref={cardRef}
      href={card.cta?.href || "#contact"}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group relative flex flex-col justify-end min-h-[540px] sm:min-h-[580px] lg:min-h-[530px] xl:min-h-[575px] overflow-hidden border bg-[#14030B] select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
      style={cardStyle}
    >
      {/* ──────────────── 1. Full-Canvas Crystal Clear Background Image ──────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={imgWrapperRef}
          className="relative w-full h-full will-change-transform"
          style={{ transform: "scale(1.0) translate3d(0,0,0)" }}
        >
          <Image
            src={imageSrc}
            alt={card.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-cover object-center brightness-[1.0] contrast-[1.1]"
          />
        </div>

        {/* ──────────────── 2. Smoke / Mist Gradient ONLY on the Lower Half ──────────────── */}
        {/* Top ~45-50% has zero overlays so image stays completely crystal clear.
            The smoke gradient begins smoothly at the midpoint and deepens at the base. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#14030be2] from-55% via-[#16040C]/75 via-52% via-[#16040C]/25 via-78% to-transparent" />

        {/* Subtle ambient warm gold light sheen on hover */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-transparent transition-opacity duration-700"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>

      {/* ──────────────── 3. Editorial Typography Block (Over the Lower Smoke) ──────────────── */}
      <div className="relative z-10 flex flex-col justify-between p-6 sm:p-7 lg:p-5 xl:p-7">
        <div>
          {/* Large Editorial Number */}
          <span className="block font-display text-5xl sm:text-6xl lg:text-5xl xl:text-6xl font-light text-[#EAD0B3] leading-none tracking-tight transition-transform duration-700 group-hover:-translate-y-0.5">
            {card.number}
          </span>

          {/* Bold Serif Service Title */}
          <h3 className="mt-2.5 font-display text-lg sm:text-xl lg:text-xl xl:text-2xl font-medium tracking-[0.14em] uppercase text-[#F5EEE6] leading-snug">
            {card.title}
          </h3>

          {/* Stacked Service Items List */}
          <div className="mt-3.5 sm:mt-4 space-y-1 sm:space-y-1.5">
            {itemLines.map((line, lineIdx) => (
              <p
                key={lineIdx}
                className="font-sans text-[0.74rem] sm:text-[0.78rem] lg:text-[0.76rem] xl:text-[0.82rem] leading-relaxed font-normal text-[#EAE0D5]/80 transition-colors duration-500 group-hover:text-[#F5EEE6]"
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Explore Link at Bottom */}
        <div className="mt-8 sm:mt-9 flex items-center gap-2 font-sans text-[0.66rem] sm:text-[0.7rem] font-medium tracking-[0.24em] uppercase text-[#DDB78A] transition-colors duration-500 group-hover:text-[#FAF1E8]">
          <span>{card.cta?.label || "EXPLORE"}</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-700"
            style={{
              transform: isHovered ? "translateX(6px)" : "translateX(0px)",
            }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Expertise({
  data = homeContent.expertise,
  assets = defaultAssets,
}: ExpertiseProps) {
  const expertise = data;
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const viewAllIsSelfLink = String(expertise.viewAllCta?.href) === "#services";
  const viewAllHref = viewAllIsSelfLink ? "#contact" : expertise.viewAllCta?.href || "#contact";
  const viewAllLabel = viewAllIsSelfLink ? "VIEW ALL SERVICES" : expertise.viewAllCta?.label || "VIEW ALL SERVICES";

  const getImageSrc = (key: string) => {
    switch (key) {
      case "events":        return assets.expertise?.events?.src        || "/images/expertise-events.jpg";
      case "exhibitions":   return assets.expertise?.exhibitions?.src   || "/images/expertise-exhibitions.jpg";
      case "workshops":     return assets.expertise?.workshops?.src     || "/images/expertise-workshops.jpg";
      case "activations":   return assets.expertise?.activations?.src   || "/images/expertise-activations.jpg";
      case "consultancy":   return assets.expertise?.consultancy?.src   || "/images/expertise-consultancy.jpg";
      default:              return assets.heroBg.src;
    }
  };

  const cards = expertise.cards || [];

  return (
    <section
      id="services"
      className="relative bg-[#16040C] text-cream px-6 py-16 sm:px-8 lg:px-15 xl:px-25 lg:py-12"
    >
      <div className="mx-auto max-w-[1480px]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-8 lg:pb-12 border-b border-cream/10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font- tracking-[0.18em] sm:tracking-[0.22em] text-[#F5EEE6] uppercase">
            {expertise.title || "OUR EXPERTISE"}
          </h2>

          <Link
            href={viewAllHref}
            className="group inline-flex items-center gap-2 text-[0.6rem] sm:text-[0.74rem] font-sans font-medium tracking-[0.26em] uppercase text-cream/70 transition-colors duration-300 hover:text-[#DDB78A]"
          >
            <span className="relative">
              {viewAllLabel}
              <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-[#DDB78A] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </div>

        {/* 5 Full-Box Horizontal Cards */}
        <div
          className="mt-8 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3 xl:gap-5 items-stretch"
          onMouseLeave={() => setActiveCardIndex(null)}
        >
          {cards.map((card, index) => (
            <ExpertiseCardItem
              key={card.number}
              card={card}
              index={index}
              isHovered={activeCardIndex === index}
              imageSrc={getImageSrc(card.imageKey)}
              onHoverStart={(idx) => setActiveCardIndex(idx)}
              onHoverEnd={() => setActiveCardIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}