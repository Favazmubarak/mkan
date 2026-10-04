/**
 * Global Site Configuration & Master Copy
 * Single source of truth for global metadata, navigation, socials, and contact endpoints.
 */

export const site = {
  name: "MKAN Concept",
  legalName: "MKAN Concept LLC",
  tagline: "Luxury Exhibitions & Curated Experiences",
  description:
    "Dubai-based, Emirati-owned events, exhibitions, workshops, activations and strategic consultancy company, established 2017.",
  locale: "en",
  dir: "ltr", // Future Arabic migration: switch to 'rtl'
  domain: "https://mkanconcept.ae",

  // Contact details as extracted from design reference
  contact: {
    phone: "+971 50 222 5890",
    phoneHref: "tel:+971502225890",
    email: "mkanconcept@gmail.com",
    emailHref: "mailto:mkanconcept@gmail.com",
    instagramHandle: "@mkan.concept",
    instagramUrl: "https://instagram.com/mkan.concept",
    linkedinUrl: "https://linkedin.com/company/mkan-concept",
    location: "Wasl 51, Dubai, UAE",
    locationMapUrl: "https://maps.google.com/?q=Wasl+51+Dubai",
    established: "2017",
    city: "Dubai",
    country: "UAE",
  },

  // Primary Single-Page Navigation (Matches final source of truth reference)
  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "/expertise" },
    { label: "Experiences", href: "/experiences" },
    { label: "Approach", href: "/approach" },
    { label: "Clients", href: "#clients" },
    { label: "Contact", href: "#contact" },
  ],

  // Header CTA Button
  cta: {
    label: "Let's Talk",
    href: "#contact",
  },

  // Footer Navigation
  footer: {
    copyright: `© ${new Date().getFullYear()} MKAN CONCEPT. ALL RIGHTS RESERVED.`,
    locationTag: "DUBAI | UAE",
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "/expertise" },
      { label: "Experiences", href: "/experiences" },
      { label: "Approach", href: "/approach" },
      { label: "Clients", href: "#clients" },
      { label: "Contact", href: "#contact" },
    ],
  },
} as const;

export type SiteConfig = typeof site;
