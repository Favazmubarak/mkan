import type { Metadata } from "next";
import { ExperiencesPageClient } from "@/components/experiences/ExperiencesPageClient";
import { getPortraitPinsAction } from "@/app/actions/portrait-gallery";
import { getLiveSiteContent } from "@/lib/content";
import { site as defaultSite } from "@/content/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getLiveSiteContent("en");
  const title = "Selected Experiences & Curated Portfolio";
  const description =
    "Explore MKAN Concept's portfolio of curated exhibitions, luxury brand activations, high-level corporate events, and VIP royal protocols in Dubai and the UAE.";
  const canonicalUrl = `${site.domain || defaultSite.domain}/experiences`;
  const imgUrl = `${site.domain || defaultSite.domain}/images/Hero1.png`;

  return {
    metadataBase: new URL(site.domain || defaultSite.domain),
    title,
    description,
    alternates: { canonical: "/experiences" },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: site.name,
      locale: "en_AE",
      type: "website",
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: `${site.name} — Selected Experiences`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imgUrl],
    },
    robots: { index: true, follow: true },
  };
}

function serializeJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default async function ExperiencesPage() {
  const { site } = await getLiveSiteContent("en");
  const initialPins = await getPortraitPinsAction();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Selected Experiences & Portfolio — MKAN Concept",
    description:
      "A curated dossier of luxury exhibitions, brand activations, and cultural pavilions executed across Dubai and the UAE.",
    url: `${site.domain}/experiences`,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.domain,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Selected Experiences",
        item: `${site.domain}/experiences`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <Navbar site={site} />
      <ExperiencesPageClient initialPins={initialPins} />
      <ScrollToTop />
      <Footer site={site} />
    </>
  );
}
