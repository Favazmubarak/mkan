/**
 * Home Page Content & Structure
 * Single source of truth for all 12 sections of the MKAN Concept Home Page.
 */

export const homeContent = {
  // 1. Hero Section
  hero: {
    eyebrow: "LUXURY EXHIBITIONS & CURATED EXPERIENCES",
    headingLines: [
      "CURATED",
      "EXPERIENCES.",
      "STRATEGICALLY",
      "DESIGNED.",
    ],
    subtitle:
      "Events, exhibitions, workshops, activations and strategic consultancy.",
    ctaPrimary: {
      label: "Explore Our Work",
      href: "/experiences",
    },
    ctaSecondary: {
      label: "Let's Create Together",
      href: "/contact",
    },
    locationLabel: "DUBAI • UAE | EST. 2017",
    scrollLabel: "SCROLL",
    scrollTarget: "#about",
  },

  // 2. About MKAN Section (Cream)
  about: {
    eyebrow: "ABOUT MKAN",
    heading: "WE DON'T JUST ORGANIZE EVENTS.",
    subheading: "WE DEVELOP CONCEPTS WITH PURPOSE, PRECISION AND STRATEGY.",
    paragraphs: [
      "MKAN CONCEPT is a Dubai-based, Emirati-owned consultancy, events, workshops, and exhibition company established in 2017. We design and deliver curated events, workshops, exhibitions, and structured brand activations, supported by strategic consultancy to ensure alignment with commercial objectives and market positioning.",
    ],
    cta: {
      label: "Our Story",
      href: "/about",
    },
    stats: [
      { value: "2017", label: "ESTABLISHED" },
      { value: "DUBAI", label: "BASED" },
      { value: "EMIRATI", label: "OWNED" },
    ],
  },

  // 3. Our Expertise Section (Plum)
  expertise: {
    eyebrow: "OUR EXPERTISE",
    title: "OUR EXPERTISE",
    viewAllCta: {
      label: "View All Services",
      href: "/services",
    },
    cards: [
      {
        number: "01",
        title: "EVENTS",
        description:
          "Corporate & institutional events, government programs, product launches and engagement platforms.",
        cta: { label: "Explore", href: "/services#events" },
        imageKey: "events",
      },
      {
        number: "02",
        title: "EXHIBITIONS",
        description:
          "Seasonal fairs, trade & public exhibitions with strategic planning and execution.",
        cta: { label: "Explore", href: "/services#exhibitions" },
        imageKey: "exhibitions",
      },
      {
        number: "03",
        title: "WORKSHOPS",
        description:
          "Creative learning platforms and themed masterclasses.",
        cta: { label: "Explore", href: "/services#workshops" },
        imageKey: "workshops",
      },
      {
        number: "04",
        title: "ACTIVATIONS",
        description:
          "Luxury brand activations, mall activations and retail pop-ups.",
        cta: { label: "Explore", href: "/services#activations" },
        imageKey: "activations",
      },
      {
        number: "05",
        title: "CONSULTANCY",
        description:
          "Concept development, customer experience, market analysis and activation strategy.",
        cta: { label: "Explore", href: "/services#consultancy" },
        imageKey: "consultancy",
      },
    ],
  },

  // 4. The MKAN Method Section (Cream)
  method: {
    eyebrow: "EXECUTION FRAMEWORK",
    title: "THE MKAN METHOD",
    subtitle: "FROM STRATEGY TO EXTRAORDINARY EXPERIENCES.",
    cta: {
      label: "Our Approach",
      href: "/method",
    },
    steps: [
      {
        number: "01",
        name: "CONCEPT",
        description:
          "Market positioning, concept validation, and commercial alignment.",
        imageKey: "concept",
      },
      {
        number: "02",
        name: "DEVELOPMENT",
        description:
          "From strategic ideation to experiential design direction.",
        imageKey: "development",
      },
      {
        number: "03",
        name: "CURATION",
        description:
          "Vendor selection, creative direction and partner management.",
        imageKey: "curation",
      },
      {
        number: "04",
        name: "PRODUCTION",
        description:
          "Logistics, staffing, execution and quality control.",
        imageKey: "production",
      },
      {
        number: "05",
        name: "REPORTING",
        description:
          "Performance evaluation and strategic recommendations.",
        imageKey: "reporting",
      },
    ],
  },

  // 5. Philosophy Banner (Plum over photo)
  philosophy: {
    eyebrow: "OUR PHILOSOPHY",
    heading: "STRATEGY BEFORE SPECTACLE.",
    subheading: "Curated experiences. Measurable impact.",
    cta: {
      label: "Why MKAN",
      href: "/about#philosophy",
    },
  },

  // 6. Selected Experiences Section (Plum)
  experiences: {
    eyebrow: "OUR WORK",
    title: "SELECTED EXPERIENCES",
    viewAllCta: {
      label: "View All Projects",
      href: "/experiences",
    },
    filters: [
      { id: "all", label: "ALL" },
      { id: "events", label: "EVENTS" },
      { id: "exhibitions", label: "EXHIBITIONS" },
      { id: "workshops", label: "WORKSHOPS" },
      { id: "activations", label: "ACTIVATIONS" },
    ],
    items: [
      {
        id: "ramadan-fair",
        title: "RAMADAN FAIR",
        subtitle: "Flagship Exhibition Platform",
        category: "exhibitions",
        imageKey: "ramadanFair",
        href: "/experiences/ramadan-fair",
      },
      {
        id: "corporate-events",
        title: "CORPORATE EVENTS",
        subtitle: "Institutional Experience",
        category: "events",
        imageKey: "corporateEvents",
        href: "/experiences/corporate-events",
      },
      {
        id: "luxury-brand-activation",
        title: "LUXURY BRAND ACTIVATION",
        subtitle: "Retail & Experiential",
        category: "activations",
        imageKey: "luxuryActivation",
        href: "/experiences/luxury-brand-activation",
      },
      {
        id: "private-engagement",
        title: "PRIVATE ENGAGEMENT",
        subtitle: "Curated Experience",
        category: "events",
        imageKey: "privateEngagement",
        href: "/experiences/private-engagement",
      },
    ],
  },

  // 7. Built for Brands Section (Cream)
  builtForBrands: {
    heading: "BUILT FOR BRANDS, INSTITUTIONS & COMMUNITIES.",
    paragraph:
      "From corporate programs and government events to brand activations and cultural experiences, we create meaningful platforms that connect people, brands and opportunities.",
    cta: {
      label: "Our Clients",
      href: "/contact",
    },
  },

  // 8. Trusted By Section (Light Cream)
  trustedBy: {
    eyebrow: "TRUSTED BY",
    clients: [
      { name: "Government of Dubai", logo: "/images/clients/gov-dubai.svg" },
      { name: "Emaar", logo: "/images/clients/emaar.svg" },
      { name: "Meraas", logo: "/images/clients/meraas.svg" },
      { name: "Dubai Culture & Arts Authority", logo: "/images/clients/dubai-culture.svg" },
      { name: "ADNOC", logo: "/images/clients/adnoc.svg" },
      { name: "Emirates", logo: "/images/clients/emirates.svg" },
      { name: "Dubai Tourism", logo: "/images/clients/dubai-tourism.svg" },
    ],
  },

  // 9. Meaningful Experiences Impact Banner (Plum over photo)
  impactBanner: {
    heading: "MEANINGFUL EXPERIENCES. REAL IMPACT.",
    paragraph:
      "We collaborate with brands, institutions and communities to deliver experiences that inspire, engage and create lasting value.",
    cta: {
      label: "Let's Talk",
      href: "/contact",
    },
  },

  // 10. Contact Section (Cream with Arched Frame)
  contact: {
    eyebrow: "CONTACT",
    heading: "LET'S CREATE SOMETHING EXCEPTIONAL.",
    intro: "Tell us about your next event, exhibition, activation or concept.",
    details: {
      phone: "+971 50 222 5890",
      email: "mkanconcept@gmail.com",
      instagram: "@mkan.concept",
      address: "Wasl 51",
    },
    form: {
      fields: {
        name: { label: "Your Name", placeholder: "Your name" },
        company: { label: "Company", placeholder: "Company" },
        email: { label: "Email", placeholder: "Email" },
        message: { label: "Message", placeholder: "Message" },
      },
      submitCta: "Send Message",
    },
  },
} as const;

export type HomeContent = typeof homeContent;
