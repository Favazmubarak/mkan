import type { Metadata } from "next";
import { getLiveSiteContent } from "@/lib/content";
import { site as defaultSite } from "@/content/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Method } from "@/components/sections/Method";
import { PhilosophyBanner } from "@/components/sections/PhilosophyBanner";
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
      images: [`${site.domain || defaultSite.domain}/images/hero-bg.jpg`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: site.description,
      images: [`${site.domain || defaultSite.domain}/images/hero-bg.jpg`],
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
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.domain,
    logo: `${site.domain}/images/mkan-logo.svg`,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.location,
      addressLocality: site.contact.city || "Dubai",
      addressCountry: site.contact.country || "AE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.contact.phone,
      contactType: "customer service",
      email: site.contact.email,
      availableLanguage: ["English", "Arabic"],
    },
    sameAs: [site.contact.instagramUrl, site.contact.linkedinUrl].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd) }}
      />
      <Navbar site={site} />
      <main className="min-h-screen">
        <Hero data={home.hero} assets={assets} />
        <About data={home.about} assets={assets} />
        <Expertise data={home.expertise} assets={assets} />
        <Method data={home.method} assets={assets} />
        <PhilosophyBanner data={home.philosophy} assets={assets} />
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
