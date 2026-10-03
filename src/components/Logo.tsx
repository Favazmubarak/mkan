import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  variant?: "light" | "gold" | "dark";
}

/**
 * Official MKAN CONCEPT High-Contrast Editorial Vector Logo
 * Matches the exact typography, stroke weights, serifs and letterforms.
 */
export function Logo({
  className = "h-8 w-auto",
  variant = "light",
  ...props
}: LogoProps) {
  const primaryColor =
    variant === "gold"
      ? "#DDB78A"
      : variant === "dark"
      ? "#1A060E"
      : "#F5EEE6";

  const accentColor =
    variant === "gold"
      ? "#EAD0B3"
      : variant === "dark"
      ? "#2B0B17"
      : "#DDB78A";

  return (
    <svg
      viewBox="0 0 150.5 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MKAN CONCEPT"
      role="img"
      {...props}
    >
      {/* ────────────────── "MKAN" Main High-Contrast Editorial Wordmark ────────────────── */}
      <g fill={primaryColor}>
        {/* ── Letter M ── */}
        {/* Left vertical stem with top/bottom serifs */}
        <rect x="12" y="7" width="2.2" height="37" />
        <rect x="9.5" y="6" width="7" height="1.8" />
        <circle cx="13.1" cy="44" r="1.6" />

        {/* Diagonal 1 (hairline down) */}
        <polygon points="14,7 16.5,7 28.5,43 26.5,43" />

        {/* Diagonal 2 (thick up) */}
        <polygon points="26,44 29.5,44 41,7 37,7" />

        {/* Right vertical stem */}
        <rect x="40" y="7" width="4.8" height="37" />
        <rect x="37.5" y="6" width="9.5" height="1.8" />
        <rect x="38" y="42.5" width="8.5" height="1.8" />

        {/* ── Letter K ── */}
        {/* Left vertical bold stem */}
        <rect x="52" y="7" width="5.2" height="37" />
        <rect x="49.5" y="6" width="10" height="1.8" />
        <rect x="49.5" y="42.5" width="10" height="1.8" />

        {/* Top diagonal arm (hairline) */}
        <polygon points="57,25 72,7 75,7 58,28" />
        <rect x="71" y="6" width="5.5" height="1.8" />

        {/* Bottom diagonal leg (thick) */}
        <polygon points="59,23 64.5,23 77.5,44 71.5,44" />
        <rect x="70.5" y="42.5" width="8.5" height="1.8" />

        {/* ── Letter A ── */}
        {/* Left diagonal (hairline) */}
        <polygon points="90,7 93,7 80,44 77,44" />
        <rect x="76" y="42.5" width="5.5" height="1.8" />

        {/* Right diagonal (thick) */}
        <polygon points="88,7 94.5,7 108.5,44 102.5,44" />
        <rect x="101.5" y="42.5" width="8.5" height="1.8" />

        {/* Crossbar */}
        <rect x="83.5" y="31.5" width="18.5" height="1.6" />

        {/* Top apex serif */}
        <rect x="88" y="6" width="6.5" height="1.8" />

        {/* ── Letter N ── */}
        {/* Left vertical stem (hairline) */}
        <rect x="115" y="7" width="2.4" height="37" />
        <rect x="112.5" y="6" width="7" height="1.8" />
        <rect x="112.5" y="42.5" width="7" height="1.8" />

        {/* Diagonal stroke (thick) */}
        <polygon points="115.5,7 122,7 138,44 131.5,44" />

        {/* Right vertical stem (hairline) */}
        <rect x="136.5" y="7" width="2.4" height="37" />
        <rect x="134" y="6" width="7" height="1.8" />
        <rect x="134" y="42.5" width="7" height="1.8" />
      </g>

      {/* ────────────────── "CONCEPT" Geometric Sans Subtitle ────────────────── */}
      {/* textLength="127" exactly spans the width of the main vertical stems of M and N */}
      <text
        x="75.25"
        y="58.5"
        textAnchor="middle"
        fill={accentColor}
        fontFamily="var(--font-sans), 'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="6.8"
        fontWeight="600"
        textLength="127"
        lengthAdjust="spacing"
      >
        CONCEPT
      </text>
    </svg>
  );
}

export default Logo;
