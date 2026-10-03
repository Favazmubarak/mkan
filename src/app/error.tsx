"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Application Runtime Error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-plum-950 px-6 py-24 text-center text-cream">
      <div className="mx-auto max-w-md">
        <p className="font-sans text-[0.7rem] font-medium tracking-[0.3em] uppercase text-gold">
          Experience Interrupted
        </p>
        <h1 className="mt-4 font-display text-4xl font-normal tracking-wide text-cream sm:text-5xl">
          An Unexpected Occasion.
        </h1>
        <p className="mt-4 font-sans text-sm font-light leading-relaxed text-cream/75">
          We encountered a brief disruption while composing this experience.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 bg-gold px-6 py-3 text-[0.7rem] font-sans font-medium tracking-[0.2em] uppercase text-plum-950 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
          >
            <span>Try Again</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-cream/30 px-6 py-3 text-[0.7rem] font-sans font-medium tracking-[0.2em] uppercase text-cream transition-all duration-300 hover:border-cream hover:scale-[1.03]"
          >
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
