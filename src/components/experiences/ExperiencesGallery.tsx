"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X, Sparkles, MapPin, Calendar, Layers, CheckCircle2 } from "lucide-react";

export type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  category: "exhibitions" | "activations" | "events" | "vip";
  categoryLabel: string;
  year: string;
  location: string;
  client: string;
  image: string;
  summary: string;
  overview: string;
  disciplines: string[];
  deliverables: string[];
  impact: string;
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "ramadan-fair",
    title: "RAMADAN FAIR",
    subtitle: "Flagship Luxury Exhibition & Cultural Retail Platform",
    category: "exhibitions",
    categoryLabel: "Exhibition",
    year: "2024",
    location: "Dubai, UAE",
    client: "Curated Cultural Brands & Sovereign Partners",
    image: "/images/2.1.png",
    summary: "A multi-day sovereign cultural exhibition bringing together elite regional designers, jewelers, and artisanal culinary houses in a bespoke architectural pavilion.",
    overview: "MKAN conceptualized and produced the flagship Ramadan Fair, transforming a prime Dubai venue into an atmospheric sanctuary of heritage and contemporary luxury. The platform curated 45+ premier regional brands with seamless VIP guest journeys and private hospitality lounges.",
    disciplines: ["Spatial Masterplanning", "Curation & Brand Vetting", "Architectural Scenography", "VIP Protocol"],
    deliverables: [
      "Custom architectural booth frameworks with gold-mesh acoustic treatments",
      "Private VIP majlis reception for state dignitaries and patron families",
      "Turnkey vendor management, lighting design, and live acoustic programming",
      "Full digital guest accreditation and bespoke concierge registration system"
    ],
    impact: "Over 8,500 qualified high-net-worth visitors over 5 evenings, achieving 100% vendor satisfaction and extensive regional press coverage."
  },
  {
    id: "luxury-brand-activation",
    title: "HAUTE PARFUMERIE IMMERSION",
    subtitle: "Sensory Retail Architecture & Brand Storytelling",
    category: "activations",
    categoryLabel: "Activation",
    year: "2024",
    location: "Wasl / Downtown Dubai",
    client: "Prestige Fragrance House",
    image: "/images/2.2.png",
    summary: "An olfactory architectural pavilion featuring sensory tunnels, private fragrance profiling salons, and bespoke light installations.",
    overview: "Designed as an ephemeral sensory sanctuary, this activation invited collectors and media figures into a private realm of bespoke perfume creation. Every touchpoint, from the velvet-lined acoustic booths to the warm brass vitrines, was engineered for intimate high-value customer engagement.",
    disciplines: ["Experiential Architecture", "Sensory Lighting Design", "Interactive Soundscapes", "Private VIP Booking"],
    deliverables: [
      "Modular acoustic scent chambers with micro-diffused fragrance zones",
      "Integrated capacitive touch pedestals revealing ingredient provenance",
      "Bespoke private consultation salon with customized champagne hospitality",
      "Handcrafted takeaway presentation cases produced with Italian linen"
    ],
    impact: "Drove 3.4x average dwell time compared to traditional retail counters and generated record-breaking direct private client reservations."
  },
  {
    id: "corporate-engagement",
    title: "ANNUAL EXECUTIVE GALA & AWARDS",
    subtitle: "Sovereign Enterprise Celebration & Thought Leadership Forum",
    category: "events",
    categoryLabel: "Corporate Event",
    year: "2023",
    location: "Abu Dhabi, UAE",
    client: "Emirates Steel & Industrial Leaders",
    image: "/images/2.3.png",
    summary: "A high-precision corporate summit and gala evening uniting 600+ industrial leaders, government ministers, and international delegations.",
    overview: "MKAN served as the turnkey lead agency responsible for scenic design, institutional protocol, AV engineering, and stage production. The evening celebrated milestone national industrial achievements within an ultra-refined, monolithic metallic environment.",
    disciplines: ["Executive Show Direction", "Institutional Protocol", "Ultra-Wide LED Scenography", "Gala Dining Logistics"],
    deliverables: [
      "32-meter seamless curved 8K LED panoramic stage with bespoke motion content",
      "Bespoke sculptural award statuettes crafted in brushed titanium and gold leaf",
      "Full VVIP royal protocol seating arrangement, motorcade coordination, and security flow",
      "Multi-camera live broadcast production with real-time multilingual interpretation"
    ],
    impact: "Flawless execution with zero protocol delays and 98% positive guest rating among attending sovereign and diplomatic dignitaries."
  },
  {
    id: "private-vip-protocol",
    title: "SOVEREIGN PRIVATE RETREAT & MAJLIS",
    subtitle: "Discreet Ministerial Reception & Cultural Gathering",
    category: "vip",
    categoryLabel: "VIP Protocol",
    year: "2023",
    location: "Dubai, UAE",
    client: "Private Royal Office",
    image: "/images/2.4.png",
    summary: "An exclusive private gathering executed under strict non-disclosure, combining traditional Emirati hospitality with contemporary spatial elegance.",
    overview: "Crafted for an intimate assembly of global dignitaries, this private majlis balanced supreme discretion, cultural authenticity, and contemporary luxury design. Every element, from bespoke calligraphy installations to custom ambient scenting, was tailored to perfection.",
    disciplines: ["Diplomatic Protocol", "Bespoke Hospitality Curation", "Acoustic Engineering", "Discreet On-Site Production"],
    deliverables: [
      "Custom handcrafted furnishings upholstered in natural raw silks and camel wool",
      "Curated menu co-developed with Michelin-recognized regional culinary masters",
      "Acoustically isolated private meeting enclaves with secured communications infrastructure",
      "Turnkey staffing vetted through rigorous security and diplomatic protocol training"
    ],
    impact: "Uncompromised confidentiality, seamless hospitality flow, and commendation from the private royal office."
  },
  {
    id: "cultural-pavilion",
    title: "CONTEMPORARY HERITAGE PAVILION",
    subtitle: "Public Architectural Installation & Craftsmanship Archive",
    category: "exhibitions",
    categoryLabel: "Exhibition",
    year: "2024",
    location: "Al Fahidi / Dubai Creek",
    client: "Dubai Culture & Arts Authority Partner",
    image: "/images/1.1.png",
    summary: "An open-air architectural installation exploring Emirati craft through modern geometric arches and interactive craft workshops.",
    overview: "Built using sustainable regional limestone, weathered brass, and woven palm fronds, this pavilion bridged ancient artisanal traditions with contemporary parametric architecture. The structure hosted live masterclasses led by master Emirati artisans.",
    disciplines: ["Architectural Design", "Heritage Research", "Live Workshop Production", "Public Flow Management"],
    deliverables: [
      "Self-shading parametric wooden canopy designed for natural airflow and desert climate",
      "Curated showcase vitrines featuring historical weaving and pearl-diving artifacts",
      "Interactive 20-seat masterclass pavilion with live multi-angle display monitors",
      "Bilingual publication catalog documenting featured master craftsmen"
    ],
    impact: "Welcomed over 14,000 public visitors and 1,200 workshop attendees over a two-week cultural festival."
  },
  {
    id: "institutional-summit",
    title: "FUTURE WOMEN IN LEADERSHIP FORUM",
    subtitle: "Strategic Conference & High-Level Networking Platform",
    category: "events",
    categoryLabel: "Corporate Event",
    year: "2023",
    location: "Abu Dhabi, UAE",
    client: "Abu Dhabi Business Women Council",
    image: "/images/1.3.png",
    summary: "A two-day empowerment summit featuring keynote addresses, interactive workshops, and an exclusive networking dinner for female founders.",
    overview: "Designed to reflect modern female leadership in the Emirates, the forum utilized an open, light-filled stage architecture with warm rose-champagne accents. MKAN managed all programming, speaker management, media staging, and attendee registration.",
    disciplines: ["Conference Management", "Speaker Stage Direction", "Media Press Lounges", "Interactive Breakout Rooms"],
    deliverables: [
      "Four concurrent breakout workshop zones with integrated digital collaborative boards",
      "Main plenary hall seating 450 delegates with studio-grade acoustic clarity",
      "Dedicated media center with branded interview backdrops and live feed distribution",
      "Post-event comprehensive executive summary booklet delivered to participating councils"
    ],
    impact: "Attended by 450+ high-ranking officials and founders, resulting in 12 signed commercial memorandums of understanding."
  }
];

export function ExperiencesGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = [
    { key: "all", label: "ALL WORKS" },
    { key: "exhibitions", label: "EXHIBITIONS" },
    { key: "activations", label: "ACTIVATIONS" },
    { key: "events", label: "CORPORATE EVENTS" },
    { key: "vip", label: "VIP PROTOCOL" },
  ];

  const filteredProjects = activeCategory === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio-grid" className="relative bg-[#FAF3EE] text-[#24040F] px-6 sm:px-10 lg:px-16 py-20 sm:py-28 select-none">
      <div className="mx-auto w-full max-w-[1300px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#24040F]/10">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="h-px w-8 bg-[#B88E5E]" aria-hidden="true" />
              <span className="font-sans text-[0.68rem] font-semibold tracking-[0.35em] uppercase text-[#B88E5E]">
                CURATED ARCHIVE
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal uppercase tracking-[-0.01em] text-[#24040F]">
              PORTFOLIO OF WORKS
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-sm text-[0.68rem] sm:text-xs font-sans font-medium tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#24040F] text-[#FAF3EE] shadow-sm"
                      : "bg-[#F3E7DF] text-[#24040F]/70 hover:bg-[#E9DDD5] hover:text-[#24040F]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mt-14">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col bg-[#F3E7DF]/60 rounded-sm border border-[#24040F]/10 overflow-hidden hover:border-[#B88E5E]/40 hover:shadow-xl transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Container with Zoom */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#20040D]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#20040D]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Category Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3 py-1 rounded-sm bg-[#20040D]/80 backdrop-blur-md text-[0.62rem] font-sans font-semibold tracking-[0.25em] uppercase text-[#DDB78A]">
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Year Tag */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-block px-2.5 py-1 rounded-sm bg-[#FAF3EE]/90 backdrop-blur-md text-[0.62rem] font-sans font-semibold tracking-[0.2em] text-[#24040F]">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Content Box */}
              <div className="flex-1 flex flex-col justify-between p-6 sm:p-7">
                <div>
                  <span className="text-[0.65rem] font-sans uppercase tracking-[0.25em] text-[#B88E5E] block mb-1.5">
                    {project.client}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-normal uppercase text-[#24040F] leading-tight group-hover:text-[#801030] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-xs sm:text-[0.82rem] font-light text-[#24040F]/75 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="mt-6 pt-4 border-t border-[#24040F]/10 flex items-center justify-between">
                  <span className="text-[0.65rem] font-sans font-medium tracking-[0.2em] uppercase text-[#24040F]/60 group-hover:text-[#24040F] transition-colors">
                    EXPLORE CASE STUDY
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#24040F] text-[#FAF3EE] group-hover:bg-[#B88E5E] transition-colors">
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Deep-Dive Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF3EE] text-[#24040F] rounded-sm border border-[#B88E5E]/30 shadow-2xl p-6 sm:p-10 lg:p-12 transition-all duration-300"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#F3E7DF] text-[#24040F] hover:bg-[#24040F] hover:text-[#FAF3EE] transition-colors cursor-pointer"
              aria-label="Close project modal"
            >
              <X size={18} />
            </button>

            {/* Eyebrow & Category */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-sm bg-[#24040F] text-[#FAF3EE] text-[0.62rem] font-sans font-semibold tracking-[0.25em] uppercase">
                {selectedProject.categoryLabel}
              </span>
              <span className="text-xs font-sans text-[#B88E5E] font-medium tracking-wider">
                {selectedProject.client}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-normal uppercase text-[#24040F] leading-tight">
              {selectedProject.title}
            </h2>
            <p className="mt-2 font-serif italic text-base sm:text-lg text-[#B88E5E]">
              {selectedProject.subtitle}
            </p>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 py-4 border-y border-[#24040F]/10 text-xs font-sans">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#B88E5E]" />
                <span>Year: <strong className="font-semibold">{selectedProject.year}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#B88E5E]" />
                <span>Location: <strong className="font-semibold">{selectedProject.location}</strong></span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Layers size={14} className="text-[#B88E5E]" />
                <span>Discipline: <strong className="font-semibold">{selectedProject.categoryLabel}</strong></span>
              </div>
            </div>

            {/* Image Frame */}
            <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden my-6 border border-[#24040F]/10">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Detailed Overview */}
            <div className="space-y-6 mt-6">
              <div>
                <h4 className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#B88E5E] mb-2">
                  EXECUTIVE OVERVIEW
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#24040F]/85 leading-relaxed">
                  {selectedProject.overview}
                </p>
              </div>

              {/* Key Deliverables */}
              <div>
                <h4 className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#B88E5E] mb-3">
                  KEY SCOPE & DELIVERABLES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProject.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs font-sans text-[#24040F]/80">
                      <CheckCircle2 size={13} className="text-[#B88E5E] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Statement */}
              <div className="p-4 sm:p-5 rounded-sm bg-[#F3E7DF] border-l-2 border-[#B88E5E]">
                <h4 className="flex items-center gap-2 text-[0.68rem] font-sans font-semibold tracking-[0.25em] uppercase text-[#24040F] mb-1">
                  <Sparkles size={13} className="text-[#B88E5E]" />
                  MEASURABLE IMPACT
                </h4>
                <p className="font-sans text-xs sm:text-[0.82rem] text-[#24040F]/80">
                  {selectedProject.impact}
                </p>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 pt-6 border-t border-[#24040F]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-sans text-[#24040F]/60 text-center sm:text-left">
                Discuss a custom platform or request the complete private atelier lookbook.
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedProject(null);
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-sm bg-[#24040F] text-[#FAF3EE] hover:bg-[#3A0A19] text-xs font-sans font-semibold tracking-[0.2em] uppercase transition-colors shrink-0 cursor-pointer"
              >
                INQUIRE ABOUT THIS WORK →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
