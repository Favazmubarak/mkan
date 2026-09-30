/**
 * Experiences (Portfolio) Page Content
 */

export const experiencesContent = {
  header: {
    eyebrow: "OUR WORK",
    title: "EXPERIENCES",
    subtitle: "A SELECTION OF OUR WORK.",
    intro:
      "Explore how MKAN Concept creates bespoke environments and high-impact physical platforms for visionary institutions, luxury brands, and discerning clients.",
  },

  categories: [
    { id: "all", label: "ALL" },
    { id: "events", label: "EVENTS" },
    { id: "exhibitions", label: "EXHIBITIONS" },
    { id: "workshops", label: "WORKSHOPS" },
    { id: "activations", label: "ACTIVATIONS" },
  ],

  projects: [
    {
      id: "ramadan-fair",
      title: "RAMADAN FAIR",
      subtitle: "Flagship Exhibition Platform",
      category: "exhibitions",
      categoryLabel: "Exhibition",
      location: "Dubai, UAE",
      year: "2024",
      imageKey: "ramadanFair",
      description:
        "A monumental cultural exhibition platform weaving heritage architecture with contemporary luxury retail pavilions and gastronomic storytelling.",
      featured: true,
      size: "large",
    },
    {
      id: "corporate-events",
      title: "CORPORATE EVENTS",
      subtitle: "Institutional Experience",
      category: "events",
      categoryLabel: "Event",
      location: "Abu Dhabi, UAE",
      year: "2024",
      imageKey: "corporateEvents",
      description:
        "High-stakes ministerial summit and diplomatic gala honoring regional leadership with immersive spatial storytelling.",
      featured: true,
      size: "large",
    },
    {
      id: "luxury-brand-activation",
      title: "LUXURY BRAND ACTIVATION",
      subtitle: "Retail & Experiential",
      category: "activations",
      categoryLabel: "Activation",
      location: "Dubai Mall, UAE",
      year: "2023",
      imageKey: "luxuryActivation",
      description:
        "An exclusive sensory pop-up pavilion for an international haute-couture maison featuring kinetic sculpture and VIP champagne lounge.",
      featured: true,
      size: "large",
    },
    {
      id: "private-engagement",
      title: "PRIVATE ENGAGEMENT",
      subtitle: "Curated Experience",
      category: "events",
      categoryLabel: "Private Event",
      location: "Jumeirah, Dubai",
      year: "2023",
      imageKey: "privateEngagement",
      description:
        "An intimate private estate celebration curated around bespoke gastronomic theatre, bespoke candlelit florals, and world-class live acoustics.",
      featured: false,
      size: "small",
    },
    {
      id: "artisanal-masterclass",
      title: "ARTISANAL MASTERCLASS",
      subtitle: "Creative Learning Series",
      category: "workshops",
      categoryLabel: "Workshop",
      location: "Alserkal Avenue, Dubai",
      year: "2023",
      imageKey: "expertise.workshops",
      description:
        "A hands-on masterclass series pairing master perfumers with luxury patrons in an architecturally transformed gallery space.",
      featured: false,
      size: "small",
    },
    {
      id: "trade-pavilion",
      title: "GLOBAL TRADE PAVILION",
      subtitle: "Strategic Commercial Showcase",
      category: "exhibitions",
      categoryLabel: "Exhibition",
      location: "DWTC, Dubai",
      year: "2023",
      imageKey: "expertise.exhibitions",
      description:
        "Over 2,500 sqm of strategic exhibition architecture delivering dynamic B2B engagement lounges and interactive media installations.",
      featured: false,
      size: "small",
    },
  ],
} as const;

export type ExperiencesContent = typeof experiencesContent;
