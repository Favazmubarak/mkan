"use client";

import { useEffect } from "react";
import { ExpertiseHero } from "./ExpertiseHero";
import { ExpertiseIntro } from "./ExpertiseIntro";
import { ExpertiseNavCards } from "./ExpertiseNavCards";
import { EventsSection } from "./EventsSection";
import { ExhibitionsSection } from "./ExhibitionsSection";
import { WorkshopsSection } from "./WorkshopsSection";
import { ActivationsSection } from "./ActivationsSection";
import { ConsultancySection } from "./ConsultancySection";
import { MethodTimeline } from "./MethodTimeline";
import { WhyMkan } from "./WhyMkan";
import { ClientsMonochrome } from "./ClientsMonochrome";
import { ExpertiseCta } from "./ExpertiseCta";
import { site as defaultSite } from "@/content/site";
import { assets as defaultAssets } from "@/config/assets";
import { scrollToElementCenter } from "@/lib/cinematic-scroll";

interface ExpertisePageClientProps {
  site?: typeof defaultSite;
  assets?: typeof defaultAssets;
}

export function ExpertisePageClient({
  site = defaultSite,
  assets = defaultAssets,
}: ExpertisePageClientProps) {
  // Check for hash on mount to perform smooth cinematic glide to specific section
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      const timer = setTimeout(() => {
        scrollToElementCenter(hash, 1000);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const heroBg = assets?.heroBg?.src || "/images/Hero1.png";
  const aboutImage = assets?.aboutInterior?.src || "/images/aboutsection.png";
  const eventsImage = assets?.experiences?.corporateEvents?.src || "/images/2.3.png";
  const exhibitionsImage = assets?.experiences?.ramadanFair?.src || "/images/2.1.png";
  const workshopsImage = assets?.expertise?.workshops?.src || "/images/1.3.png";
  const activationsImage = assets?.experiences?.luxuryActivation?.src || "/images/2.2.png";
  const activationsSecondary = assets?.expertise?.activations?.src || "/images/1.4.png";
  const consultancyImage = assets?.expertise?.consultancy?.src || "/images/1.5.png";

  return (
    <div className="bg-[#16030C] text-[#F5EEE6] min-h-screen selection:bg-[#DDB78A] selection:text-[#16030C]">
      {/* 01: Hero Section */}
      <ExpertiseHero imageSrc={heroBg} />

      {/* 02: Introduction to MKAN's Expertise */}
      <ExpertiseIntro imageSrc={aboutImage} />

      {/* 03: The Five Expertise Areas Architectural Panels */}
      <ExpertiseNavCards />

      {/* 04: Corporate & Institutional Events */}
      <EventsSection
        mainImageSrc={eventsImage}
        galleryImages={["/images/1.1.png", "/images/2.4.png"]}
      />

      {/* 05: Curated Exhibitions */}
      <ExhibitionsSection
        imageSrc={exhibitionsImage}
        supportingImageSrc="/images/1.2.png"
      />

      {/* 06: Workshops & Masterclasses */}
      <WorkshopsSection imageSrc={workshopsImage} />

      {/* 07: Brand Activations & Pop-Ups */}
      <ActivationsSection
        imageSrc={activationsImage}
        secondaryImageSrc={activationsSecondary}
      />

      {/* 08: Strategic Consultancy */}
      <ConsultancySection imageSrc={consultancyImage} />

      {/* 09: The MKAN Method Framework */}
      <MethodTimeline />

      {/* 10: Why MKAN Concept */}
      <WhyMkan />

      {/* 11: Selected Clients Monochrome Matrix */}
      <ClientsMonochrome />

      {/* 12: Final Exceptional Creation CTA */}
      <ExpertiseCta site={site} imageSrc={heroBg} />
    </div>
  );
}
