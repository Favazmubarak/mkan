"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";

/* ═══════════════════════════════════════════════════════════════════════════
   EASY TWEAK ZONE — change these numbers to tune the feel
   ═══════════════════════════════════════════════════════════════════════════
   TRAVEL_MIN / TRAVEL_MAX  shortest / longest duration of one move (seconds)
                            slower & more cinematic → 1.1 and 2.2
   TRAVEL_PER_PX            extra time per pixel of distance
   RETRACT_T                how long the thread takes to withdraw on leave
   SHEEN_V                  speed of the light passing along the thread
   IDLE_X                   parking spot (off-screen left) when not hovered
   WAVE_*                   water ripple height / length / drift / settle time
   DESC_COLOR               description colour on the hovered stage
   NUM_COLOR                gold colour of the stage number
   ═══════════════════════════════════════════════════════════════════════════ */
const TRAVEL_MIN = 1.2;
const TRAVEL_MAX = 2.2;
const TRAVEL_PER_PX = 1 / 800;
const RETRACT_T = 1.4;
const SHEEN_V = 90;
// water feel — kept subtle on purpose
const WAVE_REST = 0.55; // ripple height (px) when still
const WAVE_MOVE = 1.1; // extra ripple height while travelling
const WAVE_LEN = 360; // wave length (px) — bigger = longer, calmer swells
const WAVE_SPEED = 0.55; // how fast the ripple drifts along the thread
const WAVE_SETTLE = 1.6; // how quickly ripples calm after stopping
const IDLE_X = -60;
const DESC_COLOR = "#7a5c3b";
const NUM_COLOR = "#b88e5e";

const GRAD_ID = "method-gold-grad";
const SHEEN_ID = "method-gold-sheen";
const HALO_ID = "method-gold-halo";

/* Method-only CSS lives here so this is the only file you need to edit.
   (You can delete the old `.method-*` rules from your global CSS.) */
const METHOD_CSS = `
.method-desc {
  transition: color 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.method-step[data-active="true"] .method-desc {
  color: ${DESC_COLOR};
  transition-delay: var(--arrive, 0s);
}
.method-num-lit {
  position: absolute;
  left: 0;
  top: 0;
  color: ${NUM_COLOR};
  opacity: 0;
  pointer-events: none;
}
`;

interface MethodProps {
  data?: typeof homeContent.method;
  assets?: typeof defaultAssets;
}

type Geo = { lefts: number[]; rights: number[]; cy: number; w: number };

export function Method({ data = homeContent.method, assets = defaultAssets }: MethodProps) {
  const method = data;
  const approachIsSelfLink = String(method.cta?.href) === "#method";
  const methodCtaHref = approachIsSelfLink ? "#contact" : method.cta?.href || "#contact";
  const methodCtaLabel = approachIsSelfLink ? "Plan a Project" : method.cta?.label || "Plan a Project";

  // ── refs: everything animates imperatively, so hovering never re-renders React ──
  const gridRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<SVGLineElement>(null);
  const gradRef = useRef<SVGLinearGradientElement>(null);
  const sheenGradRef = useRef<SVGLinearGradientElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const threadRef = useRef<SVGPathElement>(null);
  const sheenRef = useRef<SVGPathElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);
  const headRef = useRef<SVGCircleElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const litRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const geo = useRef<Geo>({ lefts: [], rights: [], cy: 12, w: 0 });
  const sim = useRef({
    h: IDLE_X, hv: 0, // current position / velocity
    from: IDLE_X, to: IDLE_X, // current move
    v0: 0, t0: 0, T: 1, // start velocity, start time, duration
    phase: 0, amp: WAVE_REST, raf: 0, last: 0,
  });

  /** Read where the stage numbers actually sit (works at any width, after fonts/images load). */
  const measure = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const g = grid.getBoundingClientRect();
    const lefts: number[] = [];
    const rights: number[] = [];
    let cy = 12;
    numRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      lefts[i] = r.left - g.left;
      rights[i] = r.right - g.left;
      cy = r.top - g.top + r.height / 2;
    });
    geo.current = { lefts, rights, cy, w: g.width };

    const track = trackRef.current;
    if (track && lefts.length > 1) {
      track.setAttribute("x1", String(rights[0]));
      track.setAttribute("x2", String(lefts[lefts.length - 1]));
      track.setAttribute("y1", String(cy));
      track.setAttribute("y2", String(cy));
    }
  }, []);

  /** Paint one frame of the thread from the current simulation state. */
  const draw = useCallback(() => {
    const s = sim.current;
    const { lefts, cy } = geo.current;
    const F = s.h; // leading point of the thread

    const sm = (t: number) => {
      const c = Math.max(0, Math.min(1, t));
      return c * c * (3 - 2 * c);
    };

    // water: one long, quiet swell drifting along the thread
    const A = s.amp;
    let d = "";
    if (F > 3) {
      const pts: string[] = [];
      for (let x = 0; x < F; x += 6) {
        const env = sm(x / 110) * sm((F - x) / 120);
        const y = cy + Math.sin((x * Math.PI * 2) / WAVE_LEN - s.phase * WAVE_SPEED * 2.2) * A * env;
        pts.push(`${x.toFixed(1)} ${y.toFixed(2)}`);
      }
      pts.push(`${F.toFixed(1)} ${cy}`);
      d = `M ${pts.join(" L ")}`;
    }
    glowRef.current?.setAttribute("d", d);
    threadRef.current?.setAttribute("d", d);
    sheenRef.current?.setAttribute("d", d);

    // head: a small bright point inside a soft halo (soft fade-in)
    const k = sm((F + 10) / 60);
    if (headRef.current) {
      headRef.current.setAttribute("cx", F.toFixed(2));
      headRef.current.setAttribute("cy", String(cy));
      headRef.current.setAttribute("r", (2.3 * k).toFixed(2));
    }
    if (haloRef.current) {
      haloRef.current.setAttribute("cx", F.toFixed(2));
      haloRef.current.setAttribute("cy", String(cy));
      haloRef.current.setAttribute("r", (15 * k).toFixed(2));
    }

    // colour: deep gold at the source, champagne at the head
    gradRef.current?.setAttribute("x2", String(Math.max(F, 90)));

    // light: a soft band of highlight that travels along the thread on a loop
    const band = ((s.phase * SHEEN_V) % (Math.max(F, 0) + 220)) - 110;
    sheenGradRef.current?.setAttribute("x1", (band - 90).toFixed(1));
    sheenGradRef.current?.setAttribute("x2", (band + 90).toFixed(1));

    // stage numbers fade to gold gently as the thread approaches
    litRefs.current.forEach((el, i) => {
      if (!el || lefts[i] === undefined) return;
      el.style.opacity = sm((F - (lefts[i] - 46)) / 40).toFixed(3);
    });
  }, []);

  const frame = useCallback(
    function frame(now: number) {
      const s = sim.current;
      const dt = Math.min((now - s.last) / 1000, 1 / 30);
      s.last = now;
      s.phase += dt;

      // ripple height follows speed, but eases back slowly so the water keeps moving after a stop
      const ampTarget = WAVE_REST + Math.min(Math.abs(s.hv) / 400, 1) * WAVE_MOVE;
      s.amp += (ampTarget - s.amp) * Math.min(1, dt * WAVE_SETTLE);

      // Cubic Hermite glide: starts with the velocity we already have (no jerk),
      // finishes at zero velocity (long, soft landing).
      const u = Math.min(1, Math.max(0, (now - s.t0) / (s.T * 1000)));
      const u2 = u * u;
      const u3 = u2 * u;

      const pos =
        (2 * u3 - 3 * u2 + 1) * s.from +
        (u3 - 2 * u2 + u) * s.T * s.v0 +
        (-2 * u3 + 3 * u2) * s.to;

      const dPos =
        (6 * u2 - 6 * u) * s.from +
        (3 * u2 - 4 * u + 1) * s.T * s.v0 +
        (-6 * u2 + 6 * u) * s.to;

      s.h = pos;
      s.hv = dPos / s.T;

      if (u >= 1) {
        s.h = s.to;
        s.hv = 0;
      }

      draw();

      if (u >= 1 && s.to <= IDLE_X + 1) {
        s.raf = 0; // fully withdrawn → stop the loop
        return;
      }
      s.raf = requestAnimationFrame(frame); // while hovered, keep the light moving
    },
    [draw]
  );

  /** Mark the hovered stage so its description colours in (CSS transition). */
  const setActive = (index: number | null, arriveSec = 0) => {
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === index) {
        el.dataset.active = "true";
        el.style.setProperty("--arrive", `${arriveSec.toFixed(2)}s`);
      } else {
        delete el.dataset.active;
      }
    });
  };

  const flowTo = (index: number | null) => {
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      setActive(index);
      return;
    }
    measure();
    const { lefts, rights } = geo.current;
    if (!lefts.length) {
      setActive(index);
      return;
    }

    const s = sim.current;
    const target = index === null ? IDLE_X : index === 0 ? rights[0] + 14 : lefts[index] - 3;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(index);
      cancelAnimationFrame(s.raf);
      s.raf = 0;
      s.h = s.from = s.to = target;
      s.hv = s.v0 = 0;
      draw();
      return;
    }

    // same destination already in progress → leave it alone
    if (s.raf && Math.abs(s.to - target) < 0.5) {
      setActive(index, 0);
      return;
    }

    const dist = Math.abs(target - s.h);
    const T =
      index === null
        ? RETRACT_T
        : Math.min(TRAVEL_MAX, Math.max(TRAVEL_MIN, TRAVEL_MIN + dist * TRAVEL_PER_PX * 0.6));

    s.from = s.h;
    s.v0 = s.hv; // carry current speed into the new move
    s.to = target;
    s.T = T;
    s.t0 = performance.now();

    // description colour arrives as the thread nears the stage
    setActive(index, Math.max(0, T * 0.55 - 0.15));

    if (!s.raf) {
      s.last = performance.now();
      s.raf = requestAnimationFrame(frame);
    }
  };

  useEffect(() => {
    const grid = gridRef.current;
    const s = sim.current;
    measure();
    draw();
    if (!grid) return;
    const ro = new ResizeObserver(() => {
      measure();
      draw();
    });
    ro.observe(grid);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(s.raf);
    };
  }, [measure, draw]);

  const getStepImage = (key: string) => {
    switch (key) {
      case "concept":
        return assets.method?.concept?.src || assets.heroBg.src;
      case "development":
        return assets.method?.development?.src || assets.heroBg.src;
      case "curation":
        return assets.method?.curation?.src || assets.heroBg.src;
      case "production":
        return assets.method?.production?.src || assets.heroBg.src;
      case "reporting":
        return assets.method?.reporting?.src || assets.heroBg.src;
      default:
        return assets.heroBg.src;
    }
  };

  return (
    <section
      id="method"
      className="bg-cream text-ink px-6 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <style>{METHOD_CSS}</style>

      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-16">
          <div>
            <p className="font-sans text-[0.7rem] sm:text-[0.75rem] font-medium tracking-[0.3em] uppercase text-gold-dark mb-2">
              {method.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-plum-900 tracking-normal">
              {method.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-sans font-medium tracking-[0.15em] uppercase text-plum-900/80">
              {method.subtitle}
            </p>
          </div>

          <Link
            href={methodCtaHref}
            className="group inline-flex items-center gap-2 text-[0.72rem] font-sans font-medium tracking-[0.2em] uppercase text-plum-900 transition-colors duration-300 hover:text-gold-dark"
          >
            <span className="relative">
              {methodCtaLabel}
              <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-plum-900 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-hover:bg-gold-dark" />
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        {/* 5 Sequential Framework Stages */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 relative"
          onPointerLeave={() => flowTo(null)}
        >
          {/* Gold thread: one continuous line across all five stages (desktop) */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-[1] hidden h-6 w-full overflow-visible lg:block"
          >
            <defs>
              <linearGradient ref={gradRef} id={GRAD_ID} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="300" y2="0">
                <stop offset="0" stopColor="#a8804f" />
                <stop offset="0.65" stopColor="#ddb78a" />
                <stop offset="1" stopColor="#f6e3c8" />
              </linearGradient>
              <linearGradient ref={sheenGradRef} id={SHEEN_ID} gradientUnits="userSpaceOnUse" x1="-90" y1="0" x2="90" y2="0">
                <stop offset="0" stopColor="#fff6e6" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fff6e6" stopOpacity="0.95" />
                <stop offset="1" stopColor="#fff6e6" stopOpacity="0" />
              </linearGradient>
              <radialGradient id={HALO_ID}>
                <stop offset="0" stopColor="#f6e3c8" stopOpacity="0.55" />
                <stop offset="1" stopColor="#ddb78a" stopOpacity="0" />
              </radialGradient>
            </defs>

            <line ref={trackRef} stroke="rgba(34, 8, 17, 0.2)" strokeWidth="1" />

            {/* soft bloom under the thread */}
            <path
              ref={glowRef}
              fill="none"
              stroke="#ddb78a"
              strokeOpacity="0.16"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "blur(4px)" }}
            />
            {/* the thread itself */}
            <path
              ref={threadRef}
              fill="none"
              stroke={`url(#${GRAD_ID})`}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* travelling light */}
            <path
              ref={sheenRef}
              fill="none"
              stroke={`url(#${SHEEN_ID})`}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle ref={haloRef} r="0" fill={`url(#${HALO_ID})`} />
            <circle ref={headRef} r="0" fill="#fff4e2" />
          </svg>

          {(method.steps || []).map((step, index) => (
            <div
              key={step.number}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className="method-step flex flex-col"
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") flowTo(index);
              }}
            >
              {/* Stage number sits on the track; its cream box tucks the line underneath */}
              <div className="mb-3 flex items-center">
                <span
                  ref={(el) => {
                    numRefs.current[index] = el;
                  }}
                  className="relative z-[2] shrink-0 bg-cream pr-3 font-display text-2xl font-light leading-none text-plum-900"
                >
                  {step.number}
                  <span
                    ref={(el) => {
                      litRefs.current[index] = el;
                    }}
                    aria-hidden="true"
                    className="method-num-lit"
                  >
                    {step.number}
                  </span>
                </span>
              </div>

              {/* Heading: no hover effect */}
              <h3 className="mb-4 font-sans text-xs font-semibold tracking-[0.16em] uppercase text-plum-900 sm:text-sm">
                {step.name}
              </h3>

              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden bg-plum-900/5">
                <Image
                  src={getStepImage(step.imageKey)}
                  alt={step.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center"
                />
              </div>

              <p className="method-desc font-sans text-xs font-normal leading-relaxed text-plum-900/75 sm:text-[0.82rem]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}