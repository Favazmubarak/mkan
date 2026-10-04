"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ExpertiseIntroProps {
  imageSrc?: string;
}

export function ExpertiseIntro({
  imageSrc = "/images/aboutsection.png",
}: ExpertiseIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [scrollYOffset, setScrollYOffset] = useState(0);

  // Smooth subtle parallax physics: image moves slightly slower than content
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When container is in view
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Calculate offset between -30px and +30px
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const offset = (progress - 0.5) * 45; // gentle 45px movement
        setScrollYOffset(offset);
      }
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="intro"
      ref={containerRef}
      className="relative bg-[#1A040E] text-[#F5EEE6] px-6 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-36 overflow-hidden"
    >
      {/* Subtle Background Radial Glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,_rgba(221,183,138,0.06)_0%,_transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Master Statement & Narrative (55% on Desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Hairline Tag */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#DDB78A]/50" aria-hidden="true" />
              <span className="text-[0.68rem] sm:text-[0.74rem] font-sans font-medium tracking-[0.3em] uppercase text-[#DDB78A]">
                STRATEGIC POSITIONING
              </span>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.5rem] font-normal tracking-[-0.01em] text-[#FAF1E8] leading-[1.08]">
              DESIGNED WITH PURPOSE.{" "}
              <span className="block text-[#DDB78A] mt-1 sm:mt-2">
                DELIVERED WITH PRECISION.
              </span>
            </h2>

            {/* Editorial Narrative from Profile */}
            <div className="mt-8 sm:mt-10 space-y-5 text-sm sm:text-base font-sans font-light text-[#EAE0D5]/80 leading-relaxed max-w-2xl">
              <p>
                MKAN CONCEPT is a Dubai-based, Emirati-owned consultancy, events, workshops and exhibition company established in 2017.
              </p>
              <p>
                We develop curated experiences, exhibitions, workshops, and structured brand activations supported by strategic consultancy to ensure alignment with commercial objectives, audience engagement, and elevated market positioning.
              </p>
              <p className="text-xs sm:text-sm text-[#DDB78A]/90 font-normal tracking-wide pt-2 border-t border-[#DDB78A]/15">
                Our approach merges refined aesthetics with disciplined execution, clarity, structure, and measurable impact across government, corporate, and private sectors in the UAE.
              </p>
            </div>

            {/* Heritage Metric Badges */}
            <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 pt-6 border-t border-cream/10 max-w-lg">
              <div>
                <span className="block font-display text-2xl sm:text-3xl text-[#EAD0B3] font-light">
                  2017
                </span>
                <span className="text-[0.62rem] sm:text-[0.68rem] font-sans tracking-[0.2em] uppercase text-[#EAE0D5]/50">
                  Established
                </span>
              </div>
              <div>
                <span className="block font-display text-2xl sm:text-3xl text-[#EAD0B3] font-light">
                  DUBAI
                </span>
                <span className="text-[0.62rem] sm:text-[0.68rem] font-sans tracking-[0.2em] uppercase text-[#EAE0D5]/50">
                  Headquarters
                </span>
              </div>
              <div>
                <span className="block font-display text-2xl sm:text-3xl text-[#EAD0B3] font-light">
                  EMIRATI
                </span>
                <span className="text-[0.62rem] sm:text-[0.68rem] font-sans tracking-[0.2em] uppercase text-[#EAE0D5]/50">
                  Owned Atelier
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Photography with Subtle Parallax (~45% Viewport) */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[420px] sm:h-[500px] lg:h-[580px] w-full overflow-hidden rounded-sm border border-[#DDB78A]/25 bg-[#16030c] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {/* Parallax Image Wrapper */}
              <div
                ref={imgRef}
                className="relative w-full h-[120%] -top-[10%] will-change-transform transition-transform duration-100 ease-out"
                style={{
                  transform: `translateY(${scrollYOffset}px) scale(1.02)`,
                }}
              >
                <Image
                  src={imageSrc}
                  alt="MKAN Concept Dubai Architectural Interior and Experiential Environment"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center brightness-[0.95] contrast-[1.05]"
                />
              </div>

              {/* Ambient Inner Gradient & Hairlines */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#16030c]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between text-[0.62rem] font-sans font-medium tracking-[0.22em] uppercase text-[#FAF1E8]/80 bg-[#16030C]/80 backdrop-blur-md px-4 py-2.5 rounded border border-[#DDB78A]/20">
                <span>Experiential Scenography</span>
                <span className="text-[#DDB78A]">Dubai, UAE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
