/**
 * The MKAN Method (Approach) Page Content
 */

export const methodContent = {
  header: {
    eyebrow: "EXECUTION FRAMEWORK",
    title: "THE MKAN METHOD",
    subtitle: "FROM STRATEGY TO EXTRAORDINARY EXPERIENCES.",
    intro:
      "A structured five-phase methodology engineered to translate strategic commercial vision into flawlessly orchestrated physical experiences.",
  },

  steps: [
    {
      number: "01",
      name: "CONCEPT",
      tagline: "Strategic Ideation & Validation",
      description:
        "Market positioning, concept validation, commercial alignment, and preliminary feasibility assessments to establish a rock-solid creative foundation.",
      deliverables: [
        "Market & audience research",
        "Creative narrative & mood board",
        "Commercial feasibility blueprint",
      ],
      imageKey: "concept",
    },
    {
      number: "02",
      name: "DEVELOPMENT",
      tagline: "Experiential Design Direction",
      description:
        "From strategic ideation to experiential design direction, detailed spatial planning, 3D visualizations, and sensory journey mapping.",
      deliverables: [
        "Spatial layout & 3D renders",
        "Guest journey architecture",
        "Material & technology specifications",
      ],
      imageKey: "development",
    },
    {
      number: "03",
      name: "CURATION",
      tagline: "Vendor & Partner Management",
      description:
        "Vendor selection, creative direction, artistic partner management, and artisanal procurement aligned strictly with luxury standards.",
      deliverables: [
        "Master artisan & supplier selection",
        "Curated talent & speaker coordination",
        "Bespoke decor & sensory curation",
      ],
      imageKey: "curation",
    },
    {
      number: "04",
      name: "PRODUCTION",
      tagline: "Precision Turnkey Execution",
      description:
        "Logistics, on-site staffing, time-sensitive build orchestration, technical direction, and uncompromising quality control.",
      deliverables: [
        "Turnkey build & AV management",
        "VIP guest flow orchestration",
        "Real-time operational contingency planning",
      ],
      imageKey: "production",
    },
    {
      number: "05",
      name: "REPORTING",
      tagline: "Measurable Impact Analysis",
      description:
        "Performance evaluation, ROI metrics analysis, attendee engagement telemetry, and long-term strategic recommendations.",
      deliverables: [
        "Executive debrief & KPI analytics",
        "Media & social reach valuation",
        "Future iteration roadmap",
      ],
      imageKey: "reporting",
    },
  ],
} as const;

export type MethodContent = typeof methodContent;
