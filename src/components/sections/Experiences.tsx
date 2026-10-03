"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";

type ExperienceItem = {
  id: string;
  title: string;
  subtitle: string;
  category?: string;
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

export function Experiences({
  data = homeContent.experiences,
  assets = defaultAssets,
}: ExperiencesProps) {
  const experiences = data;

  const viewAllHref = experiences.viewAllCta?.href || "#contact";
  const viewAllLabel = experiences.viewAllCta?.label || "VIEW ALL PROJECTS";

  const getImageSrc = (key: string, imageUrl?: string) => {
    if (imageUrl) return imageUrl;

    switch (key) {
      case "ramadanFair":
        return assets.experiences?.ramadanFair?.src || assets.heroBg.src;
      case "luxuryActivation":
        return assets.experiences?.luxuryActivation?.src || assets.heroBg.src;
      case "corporateEvents":
        return assets.experiences?.corporateEvents?.src || assets.heroBg.src;
      case "privateEngagement":
        return assets.experiences?.privateEngagement?.src || assets.heroBg.src;
      default:
        return assets.heroBg.src;
    }
  };

  const items = experiences.items && experiences.items.length > 0
    ? experiences.items
    : homeContent.experiences.items;

  // Responsive items-per-view tracking
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Touch swipe & mouse drag refs
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const mouseStartX = useRef<number>(0);
  const dragDistance = useRef<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);

  // Keep index within bounds on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Luxury auto-play cycle with graceful momentum
  useEffect(() => {
    if (!isAutoPlaying || maxIndex <= 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, maxIndex, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsAutoPlaying(false);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setIsAutoPlaying(true);
  };

  // Mouse drag support for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragDistance.current = 0;
    mouseStartX.current = e.clientX;
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const diff = mouseStartX.current - e.clientX;
    dragDistance.current = Math.abs(diff);
    if (diff > 60) {
      isDragging.current = false;
      handleNext();
    } else if (diff < -60) {
      isDragging.current = false;
      handlePrev();
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setIsAutoPlaying(true);
  };

  // Total slides / indicators
  const totalSlides = maxIndex + 1;
  const slidePercent = 100 / visibleCount;

  return (
    <section
      id="experiences"
      className="relative text-[#F5EEE6] px-6 sm:px-8 lg:px-12 py-12 sm:py-14 lg:py-16 overflow-hidden"
      style={{
        background:
          "radial-gradient(130% 90% at 50% 20%, #260616 0%, #1A040E 55%, #100208 100%)",
      }}
    >
      {/* Subtle Luxury Atmospheric Color Fade & Ambient Glow (Inside Section) */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] sm:w-[850px] lg:w-[1100px] h-[300px] rounded-full bg-gradient-to-b from-[#6A1736]/18 via-[#3A081E]/10 to-transparent blur-3xl pointer-events-none -z-0"
      />
      <div
        className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0C0106]/75 via-[#100208]/30 to-transparent pointer-events-none -z-0"
      />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        {/* Section Header: Title on Left, Link + Carousel Controls on Right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 pb-6 sm:pb-7 lg:pb-8 border-b border-white/10">
          <div>
            <p className="font-sans text-[0.68rem] sm:text-[0.74rem] font-bold tracking-[0.24em] uppercase text-[#DDB78A]/90 mb-2">
              {experiences.eyebrow || "OUR WORK"}
            </p>
            <h2 className="font-display font-medium sm:font-semibold text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[3rem] text-[#F5EEE6] tracking-[0.03em] uppercase leading-none">
              {experiences.title || "SELECTED EXPERIENCES"}
            </h2>
          </div>

          {/* Action Row: Link + Apple-Style Carousel Arrow Buttons */}
          <div className="flex items-center gap-5 sm:gap-7 self-end sm:self-auto">
            <Link
              href={viewAllHref}
              className="group inline-flex items-center gap-2.5 text-[0.72rem] sm:text-[0.78rem] font-sans font-bold tracking-[0.22em] uppercase text-[#EAD0B3] transition-colors duration-300 hover:text-[#DDB78A]"
            >
              <span>{viewAllLabel}</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-bold"
              >
                →
              </span>
            </Link>

            {/* Apple-Style Circular Carousel Navigators */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                type="button"
                aria-label="Previous experiences"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/80 transition-all duration-300 hover:bg-[#DDB78A] hover:border-[#DDB78A] hover:text-[#1A060E] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#DDB78A]"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3.5L5.5 8L10 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                type="button"
                aria-label="Next experiences"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/80 transition-all duration-300 hover:bg-[#DDB78A] hover:border-[#DDB78A] hover:text-[#1A060E] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#DDB78A]"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 3.5L10.5 8L6 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Viewport: Smooth Slide Animation with Balanced Box Heights & Floating Physics */}
        <div
          className="relative w-full mt-7 sm:mt-8 lg:mt-9 overflow-hidden py-4 -my-4 cursor-grab active:cursor-grabbing select-none"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => {
            setIsAutoPlaying(true);
            isDragging.current = false;
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            className="flex transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] -mx-2.5 sm:-mx-3 lg:-mx-3.5"
            style={{
              transform: `translateX(-${currentIndex * slidePercent}%)`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                style={{ width: `${slidePercent}%` }}
                className="shrink-0 px-2.5 sm:px-3 lg:px-3.5"
              >
                {/* Floating Card Wrapper with Organic Staggered Sinusoidal Float */}
                <div
                  className="relative group/wrapper h-full lux-float"
                  style={{
                    animationDelay: `${(index % 3) * 1.5}s`,
                  }}
                >
                  {/* Atmospheric Levitation Shadow & Ambient Underglow */}
                  <div
                    className="absolute -inset-2 rounded-2xl bg-gradient-to-b from-[#DDB78A]/25 via-[#B88E5E]/15 to-transparent blur-xl opacity-0 group-hover/wrapper:opacity-100 transition-all duration-700 ease-out pointer-events-none -z-10 translate-y-3"
                  />

                  {/* Main Panoramic Card Link: Decreased Elegant Height & Modern Rounded Borders */}
                  <Link
                    href={item.href || "#contact"}
                    onClick={(e) => {
                      if (dragDistance.current > 12) {
                        e.preventDefault();
                      }
                    }}
                    className="group relative flex h-[260px] sm:h-[295px] lg:h-[325px] xl:h-[350px] w-full flex-col justify-end overflow-hidden rounded-xl border border-white/15 bg-[#14020A] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.015] hover:border-[#DDB78A]/85 hover:shadow-[0_22px_44px_-10px_rgba(0,0,0,0.8),0_0_28px_-6px_rgba(221,183,138,0.22)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#DDB78A]"
                  >
                    {/* Full-bleed Photographic Layer with 35mm Parallax Push */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <div className="relative w-full h-full transition-transform duration-1200 ease-out group-hover:scale-[1.045]">
                        <Image
                          src={getImageSrc(
                            item.imageKey,
                            "imageUrl" in item && typeof (item as { imageUrl?: string }).imageUrl === "string"
                              ? (item as { imageUrl?: string }).imageUrl
                              : undefined
                          )}
                          alt={
                            ("altText" in item && typeof (item as { altText?: string }).altText === "string"
                              ? (item as { altText?: string }).altText
                              : undefined) || item.title
                          }
                          fill
                          priority={index < 3}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center transition-all duration-700 ease-out brightness-[0.96] contrast-[1.02] group-hover:brightness-[1.04] group-hover:contrast-[1.04]"
                        />
                      </div>

                      {/* Cinematic Anamorphic Specular Light Sweep */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[130%] group-hover:translate-x-[130%] transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-10"
                      />

                      {/* Deep Cinematic Shadow Gradient for Crystal-Clear Text Legibility */}
                      <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-[#14020A] via-[#14020A]/80 via-50% to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-90 z-10" />

                      {/* Subtle Ethereal Glass Rim Light */}
                      <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none z-10" />
                    </div>

                    {/* Bottom Content Overlay: Title + Subtitle on Left, Circular Button on Right */}
                    <div className="relative z-20 flex w-full items-end justify-between gap-3 p-4 sm:p-5 lg:p-5 xl:p-6">
                      <div className="flex-1 pr-1.5">
                        <h3 className="font-display text-base sm:text-lg lg:text-[1.12rem] xl:text-[1.22rem] font-medium tracking-[0.03em] uppercase text-[#F5EEE6] leading-snug transition-colors duration-300 group-hover:text-white">
                          {item.title}
                        </h3>
                        <p className="font-sans text-[0.7rem] sm:text-[0.74rem] lg:text-[0.78rem] text-[#D4C8BC]/85 font-normal tracking-wide mt-1 transition-colors duration-300 group-hover:text-[#EAD0B3]">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Circular Interactive Arrow Button (Matches reference image) */}
                      <div
                        className="relative flex h-9 w-9 sm:h-9.5 sm:w-9.5 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/30 backdrop-blur-md text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:border-[#DDB78A] group-hover:bg-[#DDB78A] group-hover:text-[#1A060E] group-hover:shadow-[0_0_16px_rgba(221,183,138,0.65)]"
                        aria-hidden="true"
                      >
                        <svg
                          className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Indicator Pills (Apple Keynote Style) */}
        {totalSlides > 1 && (
          <div className="mt-7 sm:mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  currentIndex === idx
                    ? "w-8 bg-[#DDB78A] shadow-[0_0_12px_rgba(221,183,138,0.6)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}