import { Metadata } from "next";
import { ExperiencesPageClient } from "@/components/experiences/ExperiencesPageClient";
import { getPortraitPinsAction } from "@/app/actions/portrait-gallery";
import { getLiveSiteContent } from "@/lib/content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Selected Experiences & Portfolio | MKAN Concept Dubai",
  description:
    "Explore MKAN Concept's portfolio of curated exhibitions, luxury brand activations, high-level corporate events, and VIP royal protocols in Dubai and the UAE.",
  openGraph: {
    title: "Selected Experiences & Portfolio | MKAN Concept Dubai",
    description:
      "Explore MKAN Concept's portfolio of curated exhibitions, luxury brand activations, high-level corporate events, and VIP royal protocols in Dubai and the UAE.",
    url: "https://mkanconcept.ae/experiences",
    type: "website",
  },
};

export default async function ExperiencesPage() {
  const { site } = await getLiveSiteContent("en");
  const initialPins = await getPortraitPinsAction();
  return (
    <>
      <Navbar site={site} />
      <ExperiencesPageClient initialPins={initialPins} />
      <ScrollToTop />
      <Footer site={site} />
    </>
  );
}
