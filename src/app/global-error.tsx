"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#1A060E] px-6 py-24 text-center text-[#F5EEE6]">
        <div className="mx-auto max-w-md">
          <p className="font-sans text-xs font-semibold tracking-widest uppercase text-[#DDB78A]">
            Critical Disruption
          </p>
          <h1 className="mt-4 text-3xl font-normal tracking-wide text-[#F5EEE6]">
            MKAN CONCEPT
          </h1>
          <p className="mt-4 text-sm font-light text-[#F5EEE6]/75">
            A system error interrupted page rendering.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center gap-2 bg-[#DDB78A] px-6 py-3 text-xs font-semibold uppercase text-[#1A060E] transition-all hover:scale-105 cursor-pointer"
            >
              <span>Reload Experience</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
