import type { ReactNode } from "react";

type Tone = "cream" | "plum" | "image";

const tones: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  plum: "bg-plum-900 text-cream",
  image: "bg-plum-950 text-cream",
};

// Shared section shell: semantic <section> with an anchor id and an accessible name.
export function Section({
  id,
  title,
  tone,
  children,
}: {
  id: string;
  title: string;
  tone: Tone;
  children?: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${tones[tone]} px-6 py-24`}>
      <div className="mx-auto max-w-7xl">
        <h2 id={`${id}-title`} className="font-display text-4xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
