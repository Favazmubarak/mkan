/**
 * Home Page Content & Structure
 * Single source of truth for all 12 sections of the MKAN Concept Single-Page Website.
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
      href: "#experiences",
    },
    ctaSecondary: {
      label: "Let's Create Together",
      href: "#contact",
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
      label: "Our Approach",
      href: "#method",
    },
    stats: [
      { value: "2017", label: "ESTABLISHED" },
      { value: "DUBAI", label: "BASED" },
      { value: "EMIRATI", label: "OWNED" },
    ],
  },

  // 3. Our Expertise Section (Plum)
  expertise: {
    eyebrow: "WHAT WE DO",
    title: "OUR EXPERTISE",
    viewAllCta: {
      label: "VIEW ALL SERVICES",
      href: "/expertise",
    },
    cards: [
      {
        number: "01",
        title: "EVENTS",
        description:
          "Corporate & Institutional\nGovernment Events\nEngagement Platforms\nProduct Launches",
        longDescription: "",
        blogTitle: "",
        blogExcerpt: "",
        items: [
          "Corporate & Institutional",
          "Government Events",
          "Engagement Platforms",
          "Product Launches",
        ],
        cta: { label: "EXPLORE", href: "#contact" },
        imageKey: "events",
      },
      {
        number: "02",
        title: "EXHIBITIONS",
        description:
          "Seasonal Fairs\nTrade & Public Exhibitions\nExhibition Strategy\n& Planning",
        longDescription: "",
        blogTitle: "",
        blogExcerpt: "",
        items: [
          "Seasonal Fairs",
          "Trade & Public Exhibitions",
          "Exhibition Strategy",
          "& Planning",
        ],
        cta: { label: "EXPLORE", href: "#contact" },
        imageKey: "exhibitions",
      },
      {
        number: "03",
        title: "WORKSHOPS",
        description:
          "Creative Learning\nPlatforms\nMasterclasses\nGuided Sessions",
        longDescription: "",
        blogTitle: "",
        blogExcerpt: "",
        items: [
          "Creative Learning",
          "Platforms",
          "Masterclasses",
          "Guided Sessions",
        ],
        cta: { label: "EXPLORE", href: "#contact" },
        imageKey: "workshops",
      },
      {
        number: "04",
        title: "ACTIVATIONS",
        description:
          "Luxury Brand Activations\nMall Activations\nRetail Pop-Ups",
        longDescription: "",
        blogTitle: "",
        blogExcerpt: "",
        items: [
          "Luxury Brand Activations",
          "Mall Activations",
          "Retail Pop-Ups",
        ],
        cta: { label: "EXPLORE", href: "#contact" },
        imageKey: "activations",
      },
      {
        number: "05",
        title: "CONSULTANCY",
        description:
          "Concept Development\nCustomer Experience\nMarket Analysis\nActivation Strategy\nLaunch & Repositioning",
        longDescription: "",
        blogTitle: "",
        blogExcerpt: "",
        items: [
          "Concept Development",
          "Customer Experience",
          "Market Analysis",
          "Activation Strategy",
          "Launch & Repositioning",
        ],
        cta: { label: "EXPLORE", href: "#contact" },
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
      label: "OUR APPROACH",
      href: "/approach",
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

  // 6. Selected Experiences Section (Plum)
  experiences: {
    eyebrow: "OUR WORK",
    title: "SELECTED EXPERIENCES",
    viewAllCta: {
      label: "VIEW ALL PROJECTS",
      href: "/experiences",
    },
    items: [
      {
        id: "ramadan-fair",
        title: "RAMADAN FAIR",
        subtitle: "Flagship Exhibition Platform",
        category: "exhibitions",
        imageKey: "ramadanFair",
        href: "/experiences",
      },
      {
        id: "luxury-brand-activation",
        title: "LUXURY BRAND ACTIVATION",
        subtitle: "Retail & Experiential",
        category: "activations",
        imageKey: "luxuryActivation",
        href: "/experiences",
      },
      {
        id: "corporate-engagement",
        title: "CORPORATE ENGAGEMENT",
        subtitle: "Private Event Experience",
        category: "events",
        imageKey: "corporateEvents",
        href: "/experiences",
      },
      {
        id: "private-engagement",
        title: "PRIVATE ENGAGEMENT",
        subtitle: "Curated VIP Protocol",
        category: "events",
        imageKey: "privateEngagement",
        href: "/experiences",
      },
      {
        id: "cultural-pavilion",
        title: "CULTURAL PAVILION",
        subtitle: "Architectural Public Platform",
        category: "exhibitions",
        imageKey: "ramadanFair",
        href: "/experiences",
      },
      {
        id: "institutional-summit",
        title: "INSTITUTIONAL SUMMIT",
        subtitle: "High-Level Executive Forum",
        category: "events",
        imageKey: "corporateEvents",
        href: "/experiences",
      },
    ],
  },

  // 7. Built for Brands Section (Cream)
  builtForBrands: {
    heading: "BUILT FOR BRANDS, INSTITUTIONS & COMMUNITIES.",
    paragraph:
      "From corporate programs and government events to brand activations and cultural experiences, we create meaningful platforms that connect people, brands and opportunities.",
    cta: {
      label: "OUR CLIENTS",
      href: "/experiences#clients",
    },
  },

  // 8. Trusted By Section (Light Cream)
  trustedBy: {
    eyebrow: "OUR CLIENTS",
    clients: [
      { name: "Abu Dhabi Business Women Council", logo: "/images/logo/abudhabi-business-women-council.png", width: 800, height: 172, aspectRatio: 4.65 },
      { name: "Dubai Ladies Club", logo: "/images/logo/dubai-ladies-club.png", width: 463, height: 324, aspectRatio: 1.43 },
      { name: "Chalhoub Group", logo: "/images/logo/chalhoub.png", width: 432, height: 379, aspectRatio: 1.14 },
      { name: "Emirates Steel", logo: "/images/logo/emirates-steel.png", width: 654, height: 200, aspectRatio: 3.27 },
      { name: "Galeries Lafayette", logo: "/images/logo/gallaries.png", width: 603, height: 315, aspectRatio: 1.91 },
      { name: "Dubai Health Authority", logo: "/images/logo/health-authotirty.png", width: 241, height: 220, aspectRatio: 1.1 },
      { name: "HSBC", logo: "/images/logo/hsbc.png", width: 213, height: 157, aspectRatio: 1.36 },
      { name: "Kaya Skin Clinic", logo: "/images/logo/kaya.png", width: 796, height: 305, aspectRatio: 2.61 },
      { name: "KIZAD", logo: "/images/logo/kizad.png", width: 575, height: 189, aspectRatio: 3.04 },
      { name: "SEHA", logo: "/images/logo/seha.png", width: 179, height: 155, aspectRatio: 1.15 },
      { name: "Alta Pleat", logo: "/images/logo/alta-pleat.png", width: 206, height: 186, aspectRatio: 1.11 },
      { name: "Aisha's", logo: "/images/logo/aishas.png", width: 165, height: 133, aspectRatio: 1.24 },
      { name: "EIC", logo: "/images/logo/eic.png", width: 345, height: 218, aspectRatio: 1.58 },
      { name: "Fabula Jewels", logo: "/images/logo/fabula.png", width: 391, height: 109, aspectRatio: 3.59 },
      { name: "Fiz", logo: "/images/logo/fiz.png", width: 229, height: 260, aspectRatio: 0.88 },
      { name: "Homa Q", logo: "/images/logo/homaq.png", width: 379, height: 130, aspectRatio: 2.92 },
      { name: "Selsela", logo: "/images/logo/selsela.png", width: 190, height: 106, aspectRatio: 1.79 },
    ],
  },

  // 9. Meaningful Experiences Impact Banner (Plum over photo)
  impactBanner: {
    heading: "MEANINGFUL EXPERIENCES.\nREAL IMPACT.",
    paragraph:
      "We collaborate with brands, institutions and communities to deliver experiences that\ninspire, engage and create lasting value.",
    cta: {
      label: "LET'S TALK",
      href: "#contact",
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
