/**
 * About Us Page Content & Architecture
 */

export const aboutContent = {
  header: {
    eyebrow: "ABOUT US",
    title: "ABOUT US",
    subtitle:
      "A Dubai-based, Emirati-owned consultancy, events, workshops, and exhibition company established in 2017.",
  },

  splitContent: {
    blocks: [
      {
        heading: "WE DESIGN",
        paragraph:
          "and deliver curated events, workshops, exhibitions, and structured brand activations, supported by strategic consultancy to ensure alignment with commercial objectives and market positioning.",
      },
      {
        heading: "WE DO NOT",
        paragraph:
          "simply organize events; we develop concepts with purpose, precision, and strategy.",
      },
      {
        heading: "OUR APPROACH",
        paragraph:
          "combines refined aesthetics with disciplined execution, delivering experiences with clarity, structure, and measurable impact.",
      },
    ],
  },

  stats: [
    { value: "2017", label: "ESTABLISHED" },
    { value: "DUBAI", label: "BASED" },
    { value: "EMIRATI", label: "OWNED" },
  ],
} as const;

export type AboutContent = typeof aboutContent;
