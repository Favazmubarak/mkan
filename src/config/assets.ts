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
    src: "/images/hero-bg.jpg",
    alt: "Illuminated luxury architectural grand corridor at dusk with deep plum ambiance",
    width: 1920,
    height: 1080,
    page: "home",
    section: "hero",
  },
  // Home Page
  aboutInterior: {
    src: "/images/about-interior.jpg",
    alt: "Refined atmospheric lounge with warm sculptural lighting and curved furniture",
    width: 800,
    height: 600,
    page: "home",
    section: "about",
  },

  // Our Expertise (5 cards)
  expertise: {
    events: {
      src: "/images/experience-corporate.jpg",
      alt: "Institutional gala dinner with warm lighting and a formal tablescape",
      width: 800,
      height: 600,
      page: "home & services",
      section: "expertise-01",
    },
    exhibitions: {
      src: "/images/experience-ramadan-fair.jpg",
      alt: "Cultural exhibition pavilion with sculptural illuminated archways",
      width: 800,
      height: 600,
      page: "home & services",
      section: "expertise-02",
    },
    workshops: {
      src: "/images/method-development.jpg",
      alt: "Experiential design planning with presentation layouts and material studies",
      width: 400,
      height: 300,
      page: "home & services",
      section: "expertise-03",
    },
    activations: {
      src: "/images/experience-luxury-activation.jpg",
      alt: "Luxury brand activation with illuminated geometric installations",
      width: 800,
      height: 600,
      page: "home & services",
      section: "expertise-04",
    },
    consultancy: {
      src: "/images/method-reporting.jpg",
      alt: "Event performance report with strategic impact recommendations",
      width: 400,
      height: 300,
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
      src: "/images/experience-ramadan-fair.jpg",
      alt: "Ramadan Fair flagship cultural pavilion with grand illuminated terracotta arches",
      width: 800,
      height: 600,
      page: "home & experiences",
      section: "experiences",
    },
    corporateEvents: {
      src: "/images/experience-corporate.jpg",
      alt: "Institutional corporate gala dinner with golden glow and lush olive trees",
      width: 800,
      height: 600,
      page: "home & experiences",
      section: "experiences",
    },
    luxuryActivation: {
      src: "/images/experience-luxury-activation.jpg",
      alt: "High-end luxury brand activation with illuminated geometric columns",
      width: 800,
      height: 600,
      page: "home & experiences",
      section: "experiences",
    },
    privateEngagement: {
      src: "/images/experience-private.jpg",
      alt: "Exclusive private VIP engagement with bespoke tablescaping and canopy lighting",
      width: 800,
      height: 600,
      page: "home & experiences",
      section: "experiences",
    },
  },

  // Built for Brands Arched Visual
  builtForBrands: {
    src: "/images/built-for-brands.jpg",
    alt: "Arched architectural portal framing an olive tree and clean stone courtyard",
    width: 800,
    height: 1000,
    page: "home",
    section: "built-for-brands",
  },

  // Impact Banner
  impactBg: {
    src: "/images/impact-bg.jpg",
    alt: "Atmospheric evening courtyard with warm candlelit tables and sculpted greenery",
    width: 1920,
    height: 800,
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
