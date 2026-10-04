import type { Metadata } from "next";
import { getLiveSiteContent } from "@/lib/content";
import { site as defaultSite } from "@/content/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ApproachPageClient } from "@/components/approach/ApproachPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getLiveSiteContent("en");
  const title = `Our Approach | ${site.name} — The MKAN Execution Method`;
  const description =
    "Explore the proprietary five-stage MKAN Method: from market positioning and 3D architectural scenography to luxury curation, 24/7 turnkey production, and post-event intelligence in Dubai & UAE.";

  return {
    metadataBase: new URL(site.domain || defaultSite.domain),
    title,
    description,
    alternates: { canonical: "/approach" },
    openGraph: {
      title,
      description,
      url: `${site.domain || defaultSite.domain}/approach`,
      siteName: site.name,
      locale: "en_AE",
      type: "website",
      images: [`${site.domain || defaultSite.domain}/images/1.png`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${site.domain || defaultSite.domain}/images/1.png`],
    },
    robots: { index: true, follow: true },
  };
}

function serializeJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default async function ApproachPage() {
  const { site, assets } = await getLiveSiteContent("en");

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "The MKAN Method: Five-Stage Luxury Experiential Execution Framework",
    description:
      "A disciplined 5-stage methodology for executing luxury events, cultural exhibitions, brand activations, and strategic consultancy across the UAE.",
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.domain,
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "MKAN Concept",
        text: "Market positioning, concept validation and commercial alignment.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Concept Development",
        text: "3D spatial scenography, material palettes, and guest journey mapping.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Curation & Vendor Management",
        text: "Vetted luxury vendor procurement and artisanal partner governance.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Production & Operations",
        text: "24/7 turnkey site management, live technical engineering, and VIP protocol.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Post-Event Reporting",
        text: "Footfall dwell analytics, commercial reconciliation, and impact dossier.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(howToJsonLd) }}
      />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 bg-gold px-4 py-3 font-sans text-sm font-medium text-plum-950 transition-transform focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
      >
        Skip to main content
      </a>
      <Navbar site={site} />
      <main id="main-content" tabIndex={-1} className="min-h-screen">
        <ApproachPageClient site={site} assets={assets} />
      </main>
      <ScrollToTop />
      <Footer site={site} />
    </>
  );
}
