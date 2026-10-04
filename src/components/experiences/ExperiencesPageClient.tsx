"use client";

import { ExperienceHero } from "./ExperienceHero";
import { ExperiencePinterestGallery } from "./ExperiencePinterestGallery";
import { ExperiencePhilosophy } from "./ExperiencePhilosophy";
import { ExperienceMethodFlow } from "./ExperienceMethodFlow";
import { ExperienceBeyond } from "./ExperienceBeyond";
import { InnerContact } from "@/components/common/InnerContact";
import type { PortraitPin } from "@/content/portrait-gallery";

interface ExperiencesPageClientProps {
  initialPins?: PortraitPin[];
}

export function ExperiencesPageClient({ initialPins }: ExperiencesPageClientProps = {}) {
  return (
    <main className="bg-[#20040D] min-h-screen text-[#FAF3EE] overflow-x-hidden selection:bg-[#DDB78A] selection:text-[#20040D]">
      {/* 01: Single-Page View Cinematic Opening (Unified Hero + Mechanical Numbers Dock) */}
      <ExperienceHero />

      {/* 02: Pinterest-Style Masonry Gallery & Visual Dossier */}
      <ExperiencePinterestGallery initialPins={initialPins} />

      {/* 03: The MKAN Approach & Philosophy (Purpose, Precision, Strategy) */}
      <ExperiencePhilosophy />

      {/* 04: The MKAN Method (5-Stage Interactive Progression) */}
      <ExperienceMethodFlow />

      {/* 05: Beyond The Event (Engagement, Recall, Positioning, Connection, Impact) */}
      <ExperienceBeyond />

      {/* 06: Vice-Versa Dark Cherry Desktop Contact Module */}
      <InnerContact
        title="WHAT WILL YOU CREATE NEXT?"
        subtitle="Tell us what you envision. Schedule a private consultation with our Dubai atelier to shape the experience behind it."
      />
    </main>
  );
}
