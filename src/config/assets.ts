/**
 * Central Asset Registry & Manifest for MKAN Concept
 * Replace any visual asset by modifying this registry or dropping a matching aspect-ratio file in /public/images/
 */

export interface AssetMeta {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  page: string;
  section: string;
}

export const assets = {
  // Hero & Global
  heroBg: {
    src: "/images/Hero1.png",
    alt: "Illuminated luxury architectural grand corridor at dusk with deep plum ambiance",
    width: 1920,
    height: 1080,
    page: "home",
    section: "hero",
  },
  // Home Page
  aboutInterior: {
    src: "/images/aboutsection.png",
    alt: "Refined atmospheric lounge with warm sculptural lighting and curved furniture",
    width: 800,
    height: 600,
    page: "home",
    section: "about",
  },

  // Our Expertise (5 cards)
  expertise: {
    events: {
      src: "/images/1.1.png",
      alt: "Corporate and institutional events, gala dinners and engagement platforms",
      width: 800,
      height: 600,
      page: "home & services",
      section: "expertise-01",
    },
    exhibitions: {
      src: "/images/1.2.png",
      alt: "Seasonal fairs, cultural exhibitions and architectural pavilions",
      width: 800,
      height: 600,
      page: "home & services",
      section: "expertise-02",
    },
    workshops: {
      src: "/images/1.3.png",
      alt: "Creative masterclasses, interactive workshops and educational platforms",
      width: 800,
      height: 600,
      page: "home & services",
      section: "expertise-03",
    },
    activations: {
      src: "/images/1.4.png",
      alt: "Luxury brand activations, pop-ups and experiential retail design",
      width: 800,
      height: 600,
      page: "home & services",
      section: "expertise-04",
    },
    consultancy: {
      src: "/images/1.5.png",
      alt: "Strategic concept consultancy, brand positioning and experience blueprints",
      width: 800,
      height: 600,
      page: "home & services",
      section: "expertise-05",
    },
  },

  // Method Thumbnails
  method: {
    concept: {
      src: "/images/method-concept.jpg",
      alt: "Strategic sketches, concept blueprints and architectural ideation material",
      width: 400,
      height: 300,
      page: "home & method",
      section: "method-01",
    },
    development: {
      src: "/images/method-development.jpg",
      alt: "Detailed experiential layout development and materials planning",
      width: 400,
      height: 300,
      page: "home & method",
      section: "method-02",
    },
    curation: {
      src: "/images/method-curation.jpg",
      alt: "Sculptural elements, artisanal props, and sensory curation materials",
      width: 400,
      height: 300,
      page: "home & method",
      section: "method-03",
    },
    production: {
      src: "/images/method-production.jpg",
      alt: "On-site lighting, staging, precision logistics and production execution",
      width: 400,
      height: 300,
      page: "home & method",
      section: "method-04",
    },
    reporting: {
      src: "/images/method-reporting.jpg",
      alt: "Executive analytics portfolio and post-event strategic impact documentation",
      width: 400,
      height: 300,
      page: "home & method",
      section: "method-05",
    },
  },

  // Selected Experiences (2x2 Grid)
  experiences: {
    ramadanFair: {
      src: "/images/2.1.png",
      alt: "Ramadan Fair flagship cultural pavilion with grand illuminated terracotta arches",
      width: 800,
      height: 600,
      page: "home & experiences",
      section: "experiences",
    },
    luxuryActivation: {
      src: "/images/2.2.png",
      alt: "High-end luxury brand activation with illuminated geometric columns",
      width: 800,
      height: 600,
      page: "home & experiences",
      section: "experiences",
    },
    corporateEvents: {
      src: "/images/2.3.png",
      alt: "Institutional corporate gala dinner with golden glow and lush olive trees",
      width: 800,
      height: 600,
      page: "home & experiences",
      section: "experiences",
    },
    privateEngagement: {
      src: "/images/2.4.png",
      alt: "Exclusive private VIP engagement with bespoke tablescaping and canopy lighting",
      width: 800,
      height: 600,
      page: "home & experiences",
      section: "experiences",
    },
  },

  // Built for Brands Arched Visual
  builtForBrands: {
    src: "/images/1.png",
    alt: "Minimalist stone courtyard with arched portal framing an olive tree and warm sunlit wall",
    width: 1920,
    height: 1080,
    page: "home",
    section: "built-for-brands",
  },

  // Impact Banner
  impactBg: {
    src: "/images/impact.png",
    alt: "Illuminated architectural portal and lantern-lit promenade framing evening skyline",
    width: 2158,
    height: 729,
    page: "home",
    section: "impact-banner",
  },

  // Contact Arched Visual
  contactArch: {
    src: "/images/contact-arch.jpg",
    alt: "Monumental illuminated archway with delicate sparkling crystal water curtain feature",
    width: 800,
    height: 1100,
    page: "home & contact",
    section: "contact",
  },

  // Inner Pages Specific
  aboutUsSplit: {
    src: "/images/about-split.jpg",
    alt: "Dramatic architectural interior with monolithic terracotta walls and serene courtyard",
    width: 900,
    height: 1200,
    page: "about",
    section: "split-content",
  },
} as const;
