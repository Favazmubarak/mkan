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
  logoPlaceholder: {
    src: "/images/mkan-logo.svg",
    alt: "MKAN CONCEPT Luxury Exhibitions & Curated Experiences Logo",
    width: 200,
    height: 60,
    page: "global",
    section: "navbar & footer",
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
      src: "/images/expertise-events.jpg",
      alt: "Curated high-end institutional and corporate gala event with arched lighting",
      width: 600,
      height: 900,
      page: "home & services",
      section: "expertise-01",
    },
    exhibitions: {
      src: "/images/expertise-exhibitions.jpg",
      alt: "Curated architectural exhibition structure with illuminated white arches",
      width: 600,
      height: 900,
      page: "home & services",
      section: "expertise-02",
    },
    workshops: {
      src: "/images/expertise-workshops.jpg",
      alt: "Intimate masterclass and workshop setting with bespoke centerpiece lighting",
      width: 600,
      height: 900,
      page: "home & services",
      section: "expertise-03",
    },
    activations: {
      src: "/images/expertise-activations.jpg",
      alt: "Luxury retail pop-up and experiential pavilion with glowing frames",
      width: 600,
      height: 900,
      page: "home & services",
      section: "expertise-04",
    },
    consultancy: {
      src: "/images/expertise-consultancy.jpg",
      alt: "Executive strategy boardroom setting with ambient lighting and curated decor",
      width: 600,
      height: 900,
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

  // Philosophy Banner
  philosophyBg: {
    src: "/images/philosophy-bg.jpg",
    alt: "Warm theatrical dining banquet with ambient chandeliers and floral installations",
    width: 1920,
    height: 800,
    page: "home",
    section: "philosophy",
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
