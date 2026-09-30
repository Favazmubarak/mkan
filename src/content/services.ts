/**
 * Services Page Content & Tab Data
 */

export const servicesContent = {
  header: {
    eyebrow: "SERVICES",
    title: "SERVICES",
    subtitle: "EXPERIENCES THAT DELIVER IMPACT.",
  },

  tabs: [
    {
      id: "events",
      number: "01",
      name: "EVENTS",
      headline: "EVENTS",
      description:
        "Corporate and institutional events, government programs, product launches and curated engagement platforms.",
      subservices: [
        "Corporate & Government Events",
        "Corporate Engagement Platforms",
        "Product Launches",
        "Gala Dinners & Award Ceremonies",
        "VIP & Diplomatic Receptions",
      ],
      cta: { label: "Discover More", href: "/contact?service=events" },
      imageKey: "events",
    },
    {
      id: "exhibitions",
      number: "02",
      name: "EXHIBITIONS",
      headline: "EXHIBITIONS",
      description:
        "Seasonal fairs, trade & public exhibitions with strategic planning and flawless turnkey execution.",
      subservices: [
        "Seasonal Cultural Fairs & Pavilions",
        "Trade & Public Exhibitions",
        "Exhibition Strategy & Space Planning",
        "Curated Art & Design Showcases",
      ],
      cta: { label: "Discover More", href: "/contact?service=exhibitions" },
      imageKey: "exhibitions",
    },
    {
      id: "workshops",
      number: "03",
      name: "WORKSHOPS",
      headline: "WORKSHOPS",
      description:
        "Creative learning platforms, educational masterclasses, and executive skill-building intensives.",
      subservices: [
        "Creative Learning Platforms",
        "Masterclasses & Executive Labs",
        "Guided Interactive Sessions",
        "Artisanal & Cultural Workshops",
      ],
      cta: { label: "Discover More", href: "/contact?service=workshops" },
      imageKey: "workshops",
    },
    {
      id: "activations",
      number: "04",
      name: "ACTIVATIONS",
      headline: "ACTIVATIONS",
      description:
        "Luxury brand activations, mall experiences, retail pop-ups and viral experiential installations.",
      subservices: [
        "Luxury Brand Activations",
        "Mall Activations & Pop-ups",
        "Retail Pop-ups & Spatial Takeovers",
        "Immersive Experiential Installations",
      ],
      cta: { label: "Discover More", href: "/contact?service=activations" },
      imageKey: "activations",
    },
    {
      id: "consultancy",
      number: "05",
      name: "CONSULTANCY",
      headline: "CONSULTANCY",
      description:
        "Concept development, customer experience architecture, market analysis and activation strategy.",
      subservices: [
        "Concept Development & Validation",
        "Customer Experience (CX) Architecture",
        "Market Analysis & Feasibility",
        "Activation Strategy & Repositioning",
      ],
      cta: { label: "Discover More", href: "/contact?service=consultancy" },
      imageKey: "consultancy",
    },
  ],
} as const;

export type ServicesContent = typeof servicesContent;
