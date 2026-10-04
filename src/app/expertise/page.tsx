import type { Metadata } from "next";
import { getLiveSiteContent } from "@/lib/content";
import { site as defaultSite } from "@/content/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ExpertisePageClient } from "@/components/expertise/ExpertisePageClient";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getLiveSiteContent("en");
  const title = `Our Expertise | ${site.name} — Luxury Exhibitions & Curated Experiences`;
  const description =
    "Explore MKAN Concept's comprehensive expertise across corporate & institutional events, curated exhibitions, creative workshops, luxury brand activations, and strategic consultancy in Dubai & UAE.";

  return {
    metadataBase: new URL(site.domain || defaultSite.domain),
    title,
    description,
    alternates: { canonical: "/expertise" },
    openGraph: {
      title,
      description,
      url: `${site.domain || defaultSite.domain}/expertise`,
      siteName: site.name,
      locale: "en_AE",
      type: "website",
      images: [`${site.domain || defaultSite.domain}/images/Hero1.png`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${site.domain || defaultSite.domain}/images/Hero1.png`],
    },
    robots: { index: true, follow: true },
  };
}

function serializeJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default async function ExpertisePage() {
  const { site, assets } = await getLiveSiteContent("en");

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Luxury Experiential Design and Events Consultancy",
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.domain,
    },
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "MKAN Concept Expertise Capabilities",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate & Institutional Events" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Curated Exhibitions & Fairs" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Creative Workshops & Masterclasses" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Luxury Brand Activations & Pop-Ups" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Strategic Concept Consultancy" } },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd) }}
      />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 bg-gold px-4 py-3 font-sans text-sm font-medium text-plum-950 transition-transform focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
      >
        Skip to main content
      </a>
      <Navbar site={site} />
      <main id="main-content" tabIndex={-1} className="min-h-screen">
        <ExpertisePageClient site={site} assets={assets} />
      </main>
      <ScrollToTop />
      <Footer site={site} />
    </>
  );
}
