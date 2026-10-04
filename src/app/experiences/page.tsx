import { Metadata } from "next";
import { ExperiencesPageClient } from "@/components/experiences/ExperiencesPageClient";

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

export default function ExperiencesPage() {
  return <ExperiencesPageClient />;
}
