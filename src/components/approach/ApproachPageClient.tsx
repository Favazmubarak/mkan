"use client";

import { ApproachHero } from "./ApproachHero";
import { ApproachInteractiveMethod } from "./ApproachInteractiveMethod";
import { InnerContact } from "@/components/common/InnerContact";
import { site as defaultSite } from "@/content/site";
import { assets as defaultAssets } from "@/config/assets";

interface ApproachPageClientProps {
  site?: typeof defaultSite;
  assets?: typeof defaultAssets;
}

export function ApproachPageClient({
  site = defaultSite,
  assets = defaultAssets,
}: ApproachPageClientProps) {
  const heroImage = assets?.builtForBrands?.src || "/images/1.png";

  return (
    <div className="bg-[#24040F] text-[#FAF3EE] min-h-screen selection:bg-[#DDB78A] selection:text-[#24040F]">
      {/* 01: Dark Cherry Hero */}
      <ApproachHero imageSrc={heroImage} />

      {/* 02: Light Cherry Interactive 5-Stage Method Flow */}
      <ApproachInteractiveMethod />

      {/* 03: Dark Cherry & Light Alabaster Inner Contact */}
      <InnerContact
        site={site}
        title="EXPERIENCE THE MKAN METHOD."
        subtitle="Connect directly with our creative directors in Dubai to structure your next high-impact event, exhibition, or brand activation."
      />
    </div>
  );
}
