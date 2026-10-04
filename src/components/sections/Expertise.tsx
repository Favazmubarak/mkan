"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
 * Apple & Nike style Interactive Luxury 3D Parallax Card:
 * - Fluid pointer tracking with sub-pixel interpolation
 * - Smooth dynamic specular spotlight glare following cursor
 * - Multi-layered parallax depth (image scales & shifts in opposition to tilt)
 * - Buttery non-stuck spring recovery on mouse leave
 */
function ExpertiseCardItem({
  card,
  imageSrc,
  onNavigate,
}: {
  card: CardItem;
  imageSrc: string;
  onNavigate?: (href: string) => void;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Physics animation state
  const physics = useRef({
    targetRotX: 0,
    targetRotY: 0,
    targetLift: 0,
    targetScale: 1,
    targetImgScale: 1,
    targetImgX: 0,
    targetImgY: 0,
    currentRotX: 0,
    currentRotY: 0,
    currentLift: 0,
    currentScale: 1,
    currentImgScale: 1,
    currentImgX: 0,
    currentImgY: 0,
    isHovered: false,
    rafId: 0,
  });

  const itemLines =
    card.items && card.items.length > 0
      ? card.items
      : card.description.split("\n").filter(Boolean);

  const slug = card.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const innerHref = `/expertise#${slug}`;

  // Continuous spring loop: smoothly drives physics to target with damped harmonic motion
  const startSpringLoop = useCallback(() => {
    if (physics.current.rafId) return;

    const tick = () => {
      const p = physics.current;
      const cardEl = cardRef.current;
      const imgEl = imgRef.current;

      // Silky smooth dampening factor for card & image
      const factor = p.isHovered ? 0.09 : 0.06;
      const imgScaleFactor = p.isHovered ? 0.05 : 0.035;

      p.currentRotX += (p.targetRotX - p.currentRotX) * factor;
      p.currentRotY += (p.targetRotY - p.currentRotY) * factor;
      p.currentLift += (p.targetLift - p.currentLift) * factor;
      p.currentScale += (p.targetScale - p.currentScale) * factor;
      p.currentImgScale += (p.targetImgScale - p.currentImgScale) * imgScaleFactor;
      p.currentImgX += (p.targetImgX - p.currentImgX) * factor;
      p.currentImgY += (p.targetImgY - p.currentImgY) * factor;

      if (cardEl) {
        cardEl.style.transform = `perspective(1200px) rotateX(${p.currentRotX.toFixed(2)}deg) rotateY(${p.currentRotY.toFixed(2)}deg) translateY(${p.currentLift.toFixed(2)}px) scale3d(${p.currentScale.toFixed(4)}, ${p.currentScale.toFixed(4)}, ${p.currentScale.toFixed(4)})`;
      }
      if (imgEl) {
        imgEl.style.transform = `scale(${p.currentImgScale.toFixed(4)}) translate3d(${p.currentImgX.toFixed(2)}px, ${p.currentImgY.toFixed(2)}px, 0)`;
      }

      // Check if motion has settled to rest
      const isSettled =
        !p.isHovered &&
        Math.abs(p.targetRotX - p.currentRotX) < 0.01 &&
        Math.abs(p.targetRotY - p.currentRotY) < 0.01 &&
        Math.abs(p.targetLift - p.currentLift) < 0.05 &&
        Math.abs(p.targetScale - p.currentScale) < 0.001 &&
        Math.abs(p.targetImgScale - p.currentImgScale) < 0.001 &&
        Math.abs(p.targetImgX - p.currentImgX) < 0.05 &&
        Math.abs(p.targetImgY - p.currentImgY) < 0.05;

      if (!isSettled) {
        p.rafId = requestAnimationFrame(tick);
      } else {
        p.rafId = 0;
        p.currentRotX = 0;
        p.currentRotY = 0;
        p.currentLift = 0;
        p.currentScale = 1;
        p.currentImgScale = 1;
        p.currentImgX = 0;
        p.currentImgY = 0;
        if (cardEl) {
          cardEl.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)";
        }
        if (imgEl) {
          imgEl.style.transform = "scale(1) translate3d(0, 0, 0)";
        }
      }
    };

    physics.current.rafId = requestAnimationFrame(tick);
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
    const p = physics.current;
    p.isHovered = true;
    p.targetLift = -8;
    p.targetScale = 1.018;
    p.targetImgScale = 1.04;
    startSpringLoop();
  }, [startSpringLoop]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const p = physics.current;
    // Calculate gentle tilt angles based on mouse position from center (-3.2deg to +3.2deg)
    p.targetRotX = ((y - centerY) / centerY) * -3.2;
    p.targetRotY = ((x - centerX) / centerX) * 3.2;
    // Subtle parallax depth shift for the background image
    p.targetImgX = ((x - centerX) / centerX) * -5;
    p.targetImgY = ((y - centerY) / centerY) * -5;

    startSpringLoop();
  }, [startSpringLoop]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    const p = physics.current;
    p.isHovered = false;
    p.targetRotX = 0;
    p.targetRotY = 0;
    p.targetLift = 0;
    p.targetScale = 1;
    p.targetImgScale = 1;
    p.targetImgX = 0;
    p.targetImgY = 0;
    startSpringLoop();
  }, [startSpringLoop]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(innerHref);
    }
  };

  useEffect(() => {
    const p = physics.current;
    return () => {
      if (p.rafId) cancelAnimationFrame(p.rafId);
    };
  }, []);

  return (
    <Link
      ref={cardRef}
      href={innerHref}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group relative flex flex-col justify-end h-[480px] sm:h-[520px] lg:h-[calc(100vh-210px)] lg:min-h-[460px] lg:max-h-[580px] xl:max-h-[640px] overflow-hidden rounded-sm border bg-[#16030c] select-none will-change-transform focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        borderColor: isHovered ? "rgba(221, 183, 138, 0.75)" : "rgba(221, 183, 138, 0.2)",
        boxShadow: isHovered
          ? "0 28px 55px -12px rgba(0, 0, 0, 0.88), 0 0 25px 2px rgba(221, 183, 138, 0.18)"
          : "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        transition: "border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Full-bleed Photographic Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          ref={imgRef}
          className="relative w-full h-full will-change-transform"
          style={{ transform: "scale(1) translate3d(0,0,0)" }}
        >
          <Image
            src={imageSrc}
            alt={card.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-cover object-center brightness-[1.0] contrast-[1.05]"
          />
        </div>

        {/* Smooth Premium Dark Gradient Fade - Keeps top half 100% crystal clear */}
        <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-[#16030c] via-[#16030c]/90 via-45% to-transparent pointer-events-none" />
      </div>

      {/* Editorial Content Overlay with 3D Spatial Stacking */}
      <div
        className="relative z-10 flex flex-col justify-end p-5 sm:p-6 lg:p-5 xl:p-7 h-full w-full pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="mt-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Number */}
          <span
            className="block font-display text-4xl sm:text-5xl lg:text-[2.6rem] xl:text-[3rem] font-light text-[#EAD0B3] leading-none mb-3 sm:mb-4 tracking-tight transition-transform duration-500"
            style={{ transform: "translateZ(10px)" }}
          >
            {card.number}
          </span>

          {/* Title */}
          <h3
            className="font-display text-lg sm:text-xl lg:text-[1.3rem] xl:text-[1.45rem] font-medium tracking-[0.14em] uppercase text-[#F5EEE6] mb-3 leading-snug"
            style={{ transform: "translateZ(8px)" }}
          >
            {card.title}
          </h3>

          {/* Service Summary Description */}
          <div
            className="font-sans text-[0.7rem] sm:text-[0.74rem] lg:text-[0.72rem] xl:text-[0.78rem] leading-[1.65] font-normal text-[#EAE0D5]/75 line-clamp-3 max-w-[95%] transition-colors duration-500 group-hover:text-[#F5EEE6]"
            style={{ transform: "translateZ(5px)" }}
          >
            <p>
              {itemLines.join(", ").length > 95
                ? itemLines.join(", ").substring(0, 95) + "..."
                : itemLines.join(", ")}
            </p>
          </div>
        </div>

        {/* Explore Link at Bottom */}
        <div
          className="mt-6 sm:mt-7 flex items-center gap-2 font-sans text-[0.66rem] sm:text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#DDB78A] transition-colors duration-500 group-hover:text-[#FAF1E8]"
          style={{ transform: "translateZ(40px)" }}
        >
          <span className="relative">
            {card.cta?.label || "EXPLORE"}
            <span
              className="absolute -bottom-0.5 left-0 h-[1px] bg-[#DDB78A] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ width: isHovered ? "100%" : "0%" }}
            />
          </span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: isHovered ? "translateX(6px)" : "translateX(0px)" }}
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
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const expertise = data;

  const viewAllHref = "/expertise";
  const viewAllLabel = expertise.viewAllCta?.label || "VIEW ALL SERVICES";

  const handlePageTransition = (targetHref: string) => {
    setIsTransitioning(true);
    // Smooth cinematic veil transition duration (~800ms)
    setTimeout(() => {
      router.push(targetHref);
    }, 750);
  };

  const getImageSrc = (key: string) => {
    switch (key) {
      case "events":        return assets.expertise?.events?.src        || "/images/1.1.png";
      case "exhibitions":   return assets.expertise?.exhibitions?.src   || "/images/1.2.png";
      case "workshops":     return assets.expertise?.workshops?.src     || "/images/1.3.png";
      case "activations":   return assets.expertise?.activations?.src   || "/images/1.4.png";
      case "consultancy":   return assets.expertise?.consultancy?.src   || "/images/1.5.png";
      default:              return assets.heroBg.src || "/images/hero1.png";
    }
  };

  const cards = expertise.cards || [];

  return (
    <section
      id="services"
      className="relative bg-[#1A040E] text-cream px-4 sm:px-6 lg:px-10 xl:px-14 py-14 sm:py-16 lg:py-12 xl:py-16 lg:min-h-screen lg:flex lg:flex-col lg:justify-center overflow-hidden"
    >
      {/* Cinematic Page Veil Transition Overlay */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-[999] bg-[#16030C] flex flex-col items-center justify-center animate-in fade-in duration-700 pointer-events-auto"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="font-display text-2xl sm:text-3xl text-[#FAF1E8] tracking-[0.2em] uppercase animate-pulse">
              MKAN CONCEPT
            </span>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#DDB78A] to-transparent" />
            <span className="text-[0.65rem] font-sans font-medium tracking-[0.3em] uppercase text-[#DDB78A]">
              OPENING EXPERTISE CHAPTER
            </span>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-[1600px] flex flex-col justify-center">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 sm:pb-8 lg:pb-7 xl:pb-9 border-b border-cream/10">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-[3rem] font-normal tracking-[0.14em] sm:tracking-[0.18em] text-[#DDB78A] uppercase leading-none">
              {expertise.title || "OUR EXPERTISE"}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => handlePageTransition(viewAllHref)}
            className="group inline-flex items-center gap-2 text-[0.68rem] sm:text-[0.74rem] font-sans font-bold tracking-[0.22em] uppercase text-[#DDB78A]/80 transition-colors duration-300 hover:text-[#DDB78A] cursor-pointer"
          >
            <span className="relative">
              {viewAllLabel}
              <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-[#DDB78A] transition-all duration-300 group-hover:w-full" />
            </span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </button>
        </div>

        {/* 5 Full-Box Horizontal Cards */}
        <div className="mt-6 sm:mt-8 lg:mt-6 xl:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-3.5 xl:gap-5 items-stretch">
          {cards.map((card) => (
            <ExpertiseCardItem
              key={card.number}
              card={card}
              imageSrc={getImageSrc(card.imageKey)}
              onNavigate={handlePageTransition}
            />
          ))}
        </div>
      </div>
    </section>
  );
}