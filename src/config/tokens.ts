/**
 * Design Tokens for MKAN Concept
 * Central single source of truth for colors, typography, spacing, and interaction physics.
 */

export const tokens = {
  colors: {
    // Backgrounds & Brand solids
    plum: {
      950: "#1A060E", // deepest background
      900: "#220811", // primary dark section background
      850: "#2B0B17", // dark card surfaces
      800: "#36101E", // hover & border states for plum
    },
    cream: {
      base: "#F5EEE6", // primary light section background
      light: "#FAF1E8", // trusted-by & card accent background
      soft: "#EAE0D5", // subtle dividers on cream
    },
    gold: {
      DEFAULT: "#DDB78A", // primary warm luxury gold
      light: "#EAD0B3",
      dark: "#B88E5E",
      muted: "#8C7153",
    },
    text: {
      light: "#F5EEE6", // text on dark backgrounds
      lightMuted: "rgba(245, 238, 230, 0.75)",
      lightSubtle: "rgba(245, 238, 230, 0.45)",
      dark: "#220811", // primary dark plum-brown text on cream
      darkMuted: "#4A2733",
      darkSubtle: "#7D5866",
    },
    borders: {
      darkSubtle: "rgba(245, 238, 230, 0.15)",
      darkMedium: "rgba(245, 238, 230, 0.25)",
      goldSubtle: "rgba(221, 183, 138, 0.35)",
      goldSolid: "#DDB78A",
      lightSubtle: "rgba(34, 8, 17, 0.12)",
      lightMedium: "rgba(34, 8, 17, 0.22)",
    },
  },

  typography: {
    fonts: {
      display: "var(--font-cormorant), ui-serif, Georgia, serif",
      body: "var(--font-sans), system-ui, -apple-system, sans-serif",
    },
    letterSpacing: {
      tight: "-0.02em",
      normal: "0",
      wide: "0.15em",
      wider: "0.25em",
      widest: "0.35em",
    },
  },

  // Apple-grade interaction motion physics
  motion: {
    durations: {
      fast: 0.2, // 200ms
      base: 0.35, // 350ms
      slow: 0.7, // 700ms
      pageTransition: 0.45, // 450ms
      lenisScroll: 1.2, // 1200ms
    },
    easings: {
      luxury: "cubic-bezier(0.22, 1, 0.36, 1)", // custom ease-out
      smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      easeIn: "cubic-bezier(0.32, 0, 0.67, 0)",
      easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
    },
    scales: {
      navHover: 1.06,
      btnHover: 1.03,
      btnActive: 0.97,
      cardImageZoom: 1.05,
    },
  },

  layout: {
    maxWidth: "1440px",
    headerHeight: "80px",
  },
} as const;

export type Tokens = typeof tokens;
