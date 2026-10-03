import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-plum-950 px-6 py-24 text-center text-cream">
      <div className="mx-auto max-w-md">
        <p className="font-sans text-[0.7rem] font-medium tracking-[0.3em] uppercase text-gold">
          404 &bull; Page Not Found
        </p>
        <h1 className="mt-4 font-display text-4xl font-normal tracking-wide text-cream sm:text-5xl">
          A Rare Absence.
        </h1>
        <p className="mt-4 font-sans text-sm font-light leading-relaxed text-cream/75">
          The requested page or curation is unavailable or has moved within the digital flagship.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gold px-6 py-3 text-[0.7rem] font-sans font-medium tracking-[0.2em] uppercase text-plum-950 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          >
            <span>Return to Flagship</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
