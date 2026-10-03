"use client";

import Link from "next/link";
import { useEffect, useRef, type ComponentProps, type PointerEvent } from "react";

type SpotlightLinkProps = Omit<ComponentProps<typeof Link>, "ref"> & {
  /** Max tilt in degrees. 0 keeps the spotlight but disables the 3D tilt. */
  tilt?: number;
};

/**
 * A <Link> that writes pointer position into CSS variables (--mx, --my, --rx, --ry).
 * All visuals live in luxury-motion.css (.lux-card). No React re-renders on move.
 * Mouse only — touch and pen are ignored so phones never get stuck hover states.
 */
export function SpotlightLink({
  tilt = 3,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  ...props
}: SpotlightLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const track = (e: PointerEvent<HTMLAnchorElement>, snap: boolean) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { clientX, clientY } = e;

    const apply = () => {
      const r = el.getBoundingClientRect();
      const x = (clientX - r.left) / r.width;
      const y = (clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      if (!reduce && tilt > 0) {
        el.style.setProperty("--ry", `${((x - 0.5) * tilt * 2).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${((0.5 - y) * tilt * 2).toFixed(2)}deg`);
      }
    };

    if (snap) {
      // first contact: place the cursor disc instantly instead of gliding from centre
      el.dataset.snap = "";
      apply();
      return;
    }

    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      apply();
      delete el.dataset.snap;
    });
  };

  return (
    <Link
      ref={ref}
      {...props}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        track(e, true);
      }}
      onPointerMove={(e) => {
        onPointerMove?.(e);
        track(e, false);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        const el = ref.current;
        if (!el) return;
        cancelAnimationFrame(frame.current);
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      }}
    />
  );
}