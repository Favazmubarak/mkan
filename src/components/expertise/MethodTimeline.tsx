"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

interface MethodStep {
  number: string;
  name: string;
  phase: string;
  description: string;
  deliverables: string[];
  imageSrc: string;
}

const METHOD_STEPS: MethodStep[] = [
  {
    number: "01",
    name: "MKAN CONCEPT",
    phase: "Phase I · Discovery & Alignment",
    description:
      "Market positioning, concept validation and commercial alignment to establish clear project foundations.",
    deliverables: [
      "Commercial opportunity mapping",
      "Demographic & cultural positioning audit",
      "Executive stakeholder alignment charter",
    ],
    imageSrc: "/images/method-concept.jpg",
  },
  {
    number: "02",
    name: "CONCEPT DEVELOPMENT",
    phase: "Phase II · Design & Scenography",
    description:
      "From strategic ideation to experiential design direction, 3D architectural renders, and material boards.",
    deliverables: [
      "Architectural 3D scenography & spatial zoning",
      "Material palettes, custom lighting & finish specifications",
      "Full guest touchpoint journey map",
    ],
    imageSrc: "/images/method-development.jpg",
  },
  {
    number: "03",
    name: "CURATION & VENDOR MANAGEMENT",
    phase: "Phase III · Partner Orchestration",
    description:
      "Vendor selection, creative direction, artisanal partner screening, and rigorous contract management.",
    deliverables: [
      "Vetted luxury vendor procurement",
      "Artisanal partner & culinary curation",
      "Strict SLA and brand quality enforcement",
    ],
    imageSrc: "/images/method-curation.jpg",
  },
  {
    number: "04",
    name: "PRODUCTION & OPERATIONS",
    phase: "Phase IV · Turnkey Execution",
    description:
      "Logistics, on-site staffing, precision build execution, live audio-visual engineering, and quality control.",
    deliverables: [
      "24/7 on-site technical production management",
      "VIP protocol & hospitality team leadership",
      "Contingency mitigation & real-time quality control",
    ],
    imageSrc: "/images/method-production.jpg",
  },
  {
    number: "05",
    name: "POST-EVENT REPORTING",
    phase: "Phase V · Intelligence & Impact",
    description:
      "Performance evaluation, visitor dwell analytics, commercial reconciliation, and strategic recommendations.",
    deliverables: [
      "Executive impact & footfall metrics dossier",
      "Photographic & videographic archive delivery",
      "Future-phase scalability recommendations",
    ],
    imageSrc: "/images/method-reporting.jpg",
  },
];

export function MethodTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const current = METHOD_STEPS[activeStep];

  return (
    <section
      id="method"
      className="relative bg-[#16030C] text-[#F5EEE6] px-6 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-36 overflow-hidden border-t border-[#DDB78A]/15"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#DDB78A]/20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[0.72rem] font-sans font-semibold tracking-[0.3em] uppercase text-[#DDB78A]">
                EXECUTION FRAMEWORK
              </span>
              <span className="h-px w-8 bg-[#DDB78A]/40" aria-hidden="true" />
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF1E8] uppercase leading-[1.05]">
              THE MKAN METHOD
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base font-light text-[#EAE0D5]/75 leading-relaxed max-w-md">
            A disciplined five-stage methodology bridging high-level strategic intelligence with flawless physical execution.
          </p>
        </div>

        {/* Horizontal Stepper Indicator with Connecting Line */}
        <div className="mt-12 sm:mt-16 relative">
          {/* Champagne Connecting Hairline (Desktop) */}
          <div
            className="hidden lg:block absolute top-7 left-12 right-12 h-px bg-[#DDB78A]/20 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
            {METHOD_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPassed = idx < activeStep;

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`flex flex-col items-start p-4 sm:p-5 rounded-sm border transition-all duration-300 text-left cursor-pointer ${
                    isActive
                      ? "bg-[#250715] border-[#DDB78A] shadow-[0_10px_30px_rgba(221,183,138,0.15)] -translate-y-1"
                      : "bg-[#1A060E]/70 border-[#DDB78A]/15 hover:border-[#DDB78A]/40 hover:bg-[#1A060E]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-display transition-colors ${
                        isActive
                          ? "border-[#DDB78A] bg-[#DDB78A] text-[#16030c] font-bold"
                          : isPassed
                          ? "border-[#DDB78A]/60 bg-[#DDB78A]/20 text-[#DDB78A]"
                          : "border-[#DDB78A]/30 text-[#EAE0D5]/60"
                      }`}
                    >
                      {isPassed ? <Check size={12} /> : step.number}
                    </span>

                    <span className="text-[0.6rem] font-sans font-medium tracking-[0.15em] text-[#DDB78A] uppercase">
                      Stage {step.number}
                    </span>
                  </div>

                  <span className="font-display text-sm sm:text-base font-normal tracking-wide text-[#FAF1E8] uppercase">
                    {step.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Stage Card */}
        <div className="mt-10 sm:mt-12 p-8 sm:p-10 lg:p-12 rounded-sm border border-[#DDB78A]/30 bg-[#220811]/90 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Detailed Stage Info */}
            <div className="lg:col-span-7">
              <span className="text-[0.68rem] font-sans font-medium tracking-[0.25em] uppercase text-[#DDB78A] mb-2 block">
                {current.phase}
              </span>

              <h3 className="font-display text-2xl sm:text-4xl text-[#FAF1E8] uppercase mb-4 leading-tight">
                {current.number} · {current.name}
              </h3>

              <p className="font-sans text-sm sm:text-base font-light text-[#EAE0D5]/85 leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="pt-6 border-t border-[#DDB78A]/20">
                <span className="block text-[0.68rem] font-sans font-medium tracking-[0.2em] uppercase text-[#DDB78A] mb-3">
                  Key Stage Deliverables
                </span>
                <div className="space-y-2.5">
                  {current.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-[#EAE0D5]/80 font-light">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#DDB78A] shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Stage Visual */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-96 rounded-sm overflow-hidden border border-[#DDB78A]/25 bg-[#16030c]">
              <Image
                src={current.imageSrc}
                alt={`MKAN Method - ${current.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center brightness-95 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#220811]/90 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
