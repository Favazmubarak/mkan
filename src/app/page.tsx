import type { Metadata } from "next";
import { getLiveSiteContent } from "@/lib/content";
import { site as defaultSite } from "@/content/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageLoader } from "@/components/PageLoader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Method } from "@/components/sections/Method";
import { Experiences } from "@/components/sections/Experiences";
import { BuiltForBrands } from "@/components/sections/BuiltForBrands";
import { Clients } from "@/components/sections/Clients";
import { ImpactBanner } from "@/components/sections/ImpactBanner";
import { Contact } from "@/components/sections/Contact";


export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getLiveSiteContent("en");
  const title = `${site.name} | ${site.tagline}`;

  return {
    metadataBase: new URL(site.domain || defaultSite.domain),
    title,
    description: site.description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description: site.description,
      url: site.domain || defaultSite.domain,
      siteName: site.name,
      locale: "en_AE",
      type: "website",
      images: [
        {
          url: `${site.domain || defaultSite.domain}/images/Hero1.png`,
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: site.description,
      images: [`${site.domain || defaultSite.domain}/images/Hero1.png`],
    },
    robots: { index: true, follow: true },
  };
}

function serializeJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default async function HomePage() {
  const { site, home, assets } = await getLiveSiteContent("en");

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: site.name,
    legalName: site.legalName,
    url: site.domain,
    logo: `${site.domain}/images/mkan-logo.svg`,
    image: `${site.domain}/images/Hero1.png`,
    description: site.description,
    priceRange: "$$$$",
    areaServed: ["United Arab Emirates", "Dubai", "Abu Dhabi", "GCC"],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.location,
      addressLocality: site.contact.city || "Dubai",
      addressRegion: "Dubai",
      postalCode: "00000",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.2155,
      longitude: 55.2589,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.contact.phone,
      contactType: "customer service",
      email: site.contact.email,
      availableLanguage: ["English", "Arabic"],
    },
    sameAs: [site.contact.instagramUrl, site.contact.linkedinUrl].filter(Boolean),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.domain,
    description: site.description,
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
  };

  return (
    <>
      <PageLoader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
      />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 bg-gold px-4 py-3 font-sans text-sm font-medium text-plum-950 transition-transform focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
      >
        Skip to main content
      </a>
      <Navbar site={site} />
      <main id="main-content" tabIndex={-1} className="min-h-screen">
        <Hero data={home.hero} assets={assets} />
        <About data={home.about} assets={assets} />
        <Expertise data={home.expertise} assets={assets} />
        <Method data={home.method} assets={assets} />
        <Experiences data={home.experiences} assets={assets} />
        <BuiltForBrands data={home.builtForBrands} assets={assets} />
        <Clients data={home.trustedBy} />
        <ImpactBanner data={home.impactBanner} assets={assets} />
        <Contact data={home.contact} site={site} assets={assets} />
      </main>
      <ScrollToTop />
      <Footer site={site} />
    </>
  );
}
