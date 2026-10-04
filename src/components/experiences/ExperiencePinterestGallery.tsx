"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowUpRight, X, Sparkles, MapPin, Calendar, Layers, CheckCircle2, SlidersHorizontal, Eye } from "lucide-react";

export type PinterestPin = {
  id: string;
  title: string;
  subtitle: string;
  category: "exhibitions" | "activations" | "corporate" | "workshops" | "consultancy";
  categoryLabel: string;
  aspect: "tall" | "square" | "portrait" | "wide" | "cinema";
  year: string;
  location: string;
  client: string;
  image: string;
  tags: string[];
  summary: string;
  overview: string;
  disciplines: string[];
  deliverables: string[];
  impact: string;
};

const PINS: PinterestPin[] = [
  {
    id: "ramadan-fair",
    title: "THE RAMADAN FAIR",
    subtitle: "Flagship Cultural Retail & Architectural Pavilion",
    category: "exhibitions",
    categoryLabel: "Exhibitions",
    aspect: "tall", // 3:4
    year: "2024",
    location: "Dubai, UAE",
    client: "Curated Cultural Brands & Sovereign Partners",
    image: "/images/2.1.png",
    tags: ["Spatial Masterplanning", "Pavilion Design", "45+ Luxury Brands"],
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
    subtitle: "Sensory Retail Architecture & Olfactory Pavilions",
    category: "activations",
    categoryLabel: "Activations",
    aspect: "portrait", // 4:5
    year: "2024",
    location: "Wasl / Downtown Dubai",
    client: "Prestige Fragrance Maison",
    image: "/images/2.2.png",
    tags: ["Sensory Chambers", "Private VIP Salon", "Olfactory Design"],
    summary: "An olfactory architectural pavilion featuring sensory tunnels, private fragrance profiling salons, and bespoke brass vitrines.",
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
    title: "EXECUTIVE GALA & SUMMIT",
    subtitle: "Sovereign Industrial Assembly & 8K Panoramic Scenography",
    category: "corporate",
    categoryLabel: "Corporate & Gov",
    aspect: "wide", // 16:10
    year: "2023",
    location: "Abu Dhabi, UAE",
    client: "Emirates Steel & Industrial Leaders",
    image: "/images/2.3.png",
    tags: ["Institutional Protocol", "600+ Dignitaries", "Panoramic LED"],
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
    title: "SOVEREIGN MAJLIS & RETREAT",
    subtitle: "Discreet Ministerial Reception & Cultural Gathering",
    category: "corporate",
    categoryLabel: "Corporate & Gov",
    aspect: "square", // 1:1
    year: "2023",
    location: "Dubai, UAE",
    client: "Private Royal Office",
    image: "/images/2.4.png",
    tags: ["Royal Majlis", "Discreet Protocol", "Bespoke Hospitality"],
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
    subtitle: "Public Architectural Canopy & Live Masterclass Atrium",
    category: "exhibitions",
    categoryLabel: "Exhibitions",
    aspect: "tall", // 3:4
    year: "2024",
    location: "Al Fahidi / Dubai Creek",
    client: "Dubai Culture & Arts Authority Partner",
    image: "/images/1.1.png",
    tags: ["Parametric Canopy", "Live Artisans", "Heritage Archive"],
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
    id: "exhibition-masterplanning",
    title: "CURATED TRADE & PUBLIC PAVILIONS",
    subtitle: "Bespoke Spatial Circulation & Modular Architecture",
    category: "exhibitions",
    categoryLabel: "Exhibitions",
    aspect: "wide", // 16:11
    year: "2023",
    location: "Dubai World Trade Centre",
    client: "Regional Exhibition Organizers",
    image: "/images/1.2.png",
    tags: ["Booth Scenography", "Visitor Flow", "Modular Build"],
    summary: "Transforming convention halls into curated sensory walkways with bespoke booth designs and directional lighting.",
    overview: "MKAN engineers exhibition floors that maximize exhibitor prominence and visitor dwell times. By replacing standard shell-scheme corridors with fluid, architectural avenues, we deliver elevated commercial returns.",
    disciplines: ["Floorplan Optimization", "Modular Fabrication", "Lighting Choreography", "Exhibitor Brand Guidelines"],
    deliverables: [
      "End-to-end master floor layout with wide architectural sightlines",
      "Bespoke brand booth structures built with sustainable regional timber",
      "Centralized media registration hub and VIP lounge pavilion",
      "Comprehensive exhibitor onboarding kit and production oversight"
    ],
    impact: "Achieved a 40% increase in average visitor booth dwell time and superior exhibitor satisfaction index."
  },
  {
    id: "creative-workshops",
    title: "ARTISANAL LEARNING PLATFORMS",
    subtitle: "Themed Masterclasses & Interactive Cohort Sessions",
    category: "workshops",
    categoryLabel: "Workshops",
    aspect: "portrait", // 4:5
    year: "2024",
    location: "Wasl 51 Atelier, Dubai",
    client: "Creative Institutions & Luxury Brands",
    image: "/images/1.3.png",
    tags: ["Hands-On Labs", "Master Craftsmen", "Intimate Cohorts"],
    summary: "Structured creative platforms connecting master practitioners with aspiring regional designers and corporate teams.",
    overview: "MKAN curates intimate learning environments designed for high focus and creative breakthroughs. From bespoke leatherworking masterclasses to fragrance formulation workshops, each session is meticulously equipped.",
    disciplines: ["Curriculum Structuring", "Tooling & Material Procurement", "Studio Scenography", "Cohort Management"],
    deliverables: [
      "Customized craftsman workbenches equipped with bespoke tooling kits",
      "Overhead high-definition multi-angle live demonstration streaming",
      "Bilingual instructional booklets and certification certificates",
      "Private catering and artisanal refreshment bar"
    ],
    impact: "Over 40 hosted workshop editions maintaining a 100% attendee recommendation rate."
  },
  {
    id: "mall-activations",
    title: "LUXURY ATRIUM POP-UP",
    subtitle: "High-Dwell Experiential Architecture in Commercial Spaces",
    category: "activations",
    categoryLabel: "Activations",
    aspect: "tall", // 3:4
    year: "2024",
    location: "Mall of the Emirates, Dubai",
    client: "International Luxury Maison",
    image: "/images/1.4.png",
    tags: ["Atrium Installation", "Commercial Impact", "High Footfall"],
    summary: "A high-visibility circular pop-up pavilion stopping mall foot traffic with interactive displays and private VIP fitting suites.",
    overview: "Engineered for high-traffic retail environments, this installation balanced open public fascination with discreet, ultra-private VIP salons. High-gloss lacquer finishes and warm micro-spotlighting created an unmistakable beacon of luxury.",
    disciplines: ["Retail Scenography", "Mall Management Coordination", "Rapid Nighttime Installation", "VIP Customer Capture"],
    deliverables: [
      "Zero-ground-anchorage freestanding structural pavilion complying with mall safety",
      "Interactive digital product configurators with tactile swatch samples",
      "Concealed private fitting and consultation suite with security access",
      "Full post-campaign modular dismantling and material recycling"
    ],
    impact: "Generated over 45,000 public impressions over 10 days and exceeded quarterly regional boutique targets."
  },
  {
    id: "strategic-consultancy",
    title: "SPATIAL & BRAND ADVISORY",
    subtitle: "6 Core Strategic Pillars from Inception to Blueprint",
    category: "consultancy",
    categoryLabel: "Consultancy",
    aspect: "square", // 1:1
    year: "2023–2024",
    location: "Dubai & Abu Dhabi",
    client: "Institutional & Private Enterprise Clients",
    image: "/images/1.5.png",
    tags: ["Concept Ideation", "Spatial Strategy", "Feasibility Studies"],
    summary: "Strategic advisory services guiding government bodies, cultural foundations, and luxury brands from initial vision to operational blueprints.",
    overview: "MKAN provides high-level consultancy before a single physical hammer is swung. We structure the business case, artistic vision, spatial floorplans, and vendor procurement frameworks for landmark projects.",
    disciplines: ["Concept Ideation", "Thematic Narrative Planning", "Floor & Circulation Blueprints", "Operational Masterplanning"],
    deliverables: [
      "Comprehensive Experiential Masterplan Document (100+ pages)",
      "3D volumetric massing models and circulation heatmaps",
      "Vendor RFP packages, technical specifications, and budget models",
      "Executive stakeholder alignment presentations"
    ],
    impact: "Successfully guided multi-million dirham public and private experiential developments across the UAE."
  },
  {
    id: "method-concept-stage",
    title: "STAGE 01 · STRATEGIC THESIS",
    subtitle: "Concept Validation, Audience Psychology & Market Alignment",
    category: "consultancy",
    categoryLabel: "Consultancy",
    aspect: "wide",
    year: "2024",
    location: "Wasl 51, Dubai",
    client: "MKAN Proprietary Framework",
    image: "/images/method-concept.jpg",
    tags: ["MKAN Method", "Strategic Thesis", "Cultural Context"],
    summary: "The foundational phase of every MKAN project, defining core brand narrative and preliminary spatial feasibility.",
    overview: "We believe memorable experiences require strategic depth. Before designing aesthetics, we dissect client objectives, cultural resonance, and guest psychology to formulate an unshakeable experiential thesis.",
    disciplines: ["Strategic Analysis", "Narrative Architecture", "Audience Profiling", "Feasibility Mapping"],
    deliverables: [
      "Experiential Objective Matrix",
      "Core Thematic Narrative Document",
      "Audience Persona Journey Maps",
      "Budget & Timeline Framework"
    ],
    impact: "Establishes total alignment across executive leadership and creative stakeholders."
  },
  {
    id: "method-development-stage",
    title: "STAGE 02 · 3D SCENOGRAPHY",
    subtitle: "Spatial Blueprints, Tactile Palettes & Sensory Lighting",
    category: "exhibitions",
    categoryLabel: "Exhibitions",
    aspect: "tall",
    year: "2024",
    location: "MKAN Design Studio, Dubai",
    client: "MKAN Atelier Production",
    image: "/images/method-development.jpg",
    tags: ["3D Blueprints", "Lighting Moods", "Circulation Flow"],
    summary: "Translating narrative strategy into precise 3D architectural renderings, circulation paths, and tactile finishes.",
    overview: "Every millimetre of guest space is choreographed in full 3D. We test lighting angles, acoustic reflections, and natural human movement pathways to ensure physical reality matches creative vision.",
    disciplines: ["3D Spatial Modeling", "Sensory Lighting Design", "Material Curation", "Circulation Engineering"],
    deliverables: [
      "Photo-realistic 3D walkthrough renderings",
      "Full architectural construction plans & elevation drawings",
      "Tactile physical material moodboard samples",
      "Electrical, AV & lighting schedule blueprints"
    ],
    impact: "Eliminates on-site design ambiguity and accelerates engineering compliance approvals."
  },
  {
    id: "method-curation-stage",
    title: "STAGE 03 · ARTISAN SELECTION",
    subtitle: "Master Craftsmen, Elite Audio Engineering & Material Sourcing",
    category: "workshops",
    categoryLabel: "Workshops",
    aspect: "portrait",
    year: "2024",
    location: "UAE & International Circuit",
    client: "Vetted Artisan Network",
    image: "/images/method-curation.jpg",
    tags: ["Bespoke Procurement", "Master Artisans", "Quality Control"],
    summary: "Procuring rare materials and commissioning elite fabricators, acoustic engineers, and culinary directors.",
    overview: "True luxury is born of exceptional craftsmanship. MKAN maintains an exclusive roster of vetted master artisans across the Emirates and international luxury capitals to execute unique bespoke elements.",
    disciplines: ["Artisan Commissioning", "Material Qualification", "Procurement Governance", "Cost Engineering"],
    deliverables: [
      "Vetted contractor and artisan contracts",
      "Material quality laboratory certificates",
      "Mock-up review and structural testing sign-offs",
      "Guaranteed milestone delivery schedules"
    ],
    impact: "Guarantees uncompromising quality standards while safeguarding client budgets and deadlines."
  }
];

export function ExperiencePinterestGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPin, setSelectedPin] = useState<PinterestPin | null>(null);

  const categories = [
    { key: "all", label: "ALL WORKS" },
    { key: "exhibitions", label: "EXHIBITIONS" },
    { key: "activations", label: "ACTIVATIONS" },
    { key: "corporate", label: "CORPORATE & GOV" },
    { key: "workshops", label: "WORKSHOPS" },
    { key: "consultancy", label: "CONSULTANCY" },
  ];

  const filteredPins = useMemo(() => {
    if (activeCategory === "all") return PINS;
    return PINS.filter((pin) => pin.category === activeCategory);
  }, [activeCategory]);

  const getAspectClass = (aspect: PinterestPin["aspect"]) => {
    switch (aspect) {
      case "tall":
        return "aspect-[3/4.2]";
      case "portrait":
        return "aspect-[4/5.2]";
      case "wide":
        return "aspect-[16/11]";
      case "square":
        return "aspect-square";
      case "cinema":
        return "aspect-[16/9]";
      default:
        return "aspect-[4/5]";
    }
  };

  return (
    <section id="experience-gallery" className="relative bg-[#FAF6F0] text-[#24040F] px-6 sm:px-10 lg:px-16 py-16 sm:py-20 select-none border-b border-[#24040F]/10">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Pinterest Gallery Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#24040F]/10">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="h-px w-6 bg-[#8A1435]" aria-hidden="true" />
              <span className="font-sans text-[0.64rem] font-semibold tracking-[0.3em] uppercase text-[#8A1435]">
                CURATED VISUAL DOSSIER
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-[2.8rem] font-light uppercase tracking-tight text-[#24040F] leading-[1.04]">
              EXPERIENTIAL <br />
              <span className="font-serif italic font-light text-[#8A1435]">
                GALLERY &amp; ARCHIVE.
              </span>
            </h2>
          </div>

          {/* Filter Pills — Pinterest Style */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <div className="hidden sm:flex items-center gap-2 mr-2 text-[#24040F]/50 text-xs font-sans">
              <SlidersHorizontal size={13} />
              <span className="text-[0.66rem] font-mono tracking-widest uppercase">FILTER:</span>
            </div>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-[0.66rem] sm:text-xs font-sans font-medium tracking-[0.16em] uppercase transition-colors duration-250 cursor-pointer ${
                    isActive
                      ? "bg-[#20040D] text-[#FAF3EE] shadow-sm"
                      : "bg-[#EFE8DF] text-[#24040F]/75 hover:bg-[#E4DCCE] hover:text-[#20040D]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pinterest Masonry Columns Grid */}
        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredPins.map((pin) => (
            <div
              key={pin.id}
              onClick={() => setSelectedPin(pin)}
              className="break-inside-avoid group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-[#20040D]/[0.08] shadow-[0_2px_12px_rgba(32,4,13,0.03)] hover:border-[#8A1435]/35 hover:shadow-[0_20px_45px_-12px_rgba(32,4,13,0.09)] hover:-translate-y-1.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
            >
              {/* Photo Frame with Pinterest Aspect */}
              <div className={`relative w-full overflow-hidden bg-[#180209] ${getAspectClass(pin.aspect)}`}>
                <Image
                  src={pin.image}
                  alt={pin.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
                  className="object-cover object-center brightness-[0.96] contrast-[1.04] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-105"
                />

                {/* Ambient Soft Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#20040D]/90 via-[#20040D]/25 to-transparent opacity-75 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

                {/* Top Category Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#180209]/85 backdrop-blur-md text-[0.6rem] font-sans font-semibold tracking-[0.22em] uppercase text-[#DDB78A] border border-white/10">
                    {pin.categoryLabel}
                  </span>
                </div>

                {/* Top Right Quick-Action View Eye Button */}
                <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF3EE]/95 backdrop-blur-md text-[#20040D] shadow-md hover:scale-110 transition-transform">
                    <Eye size={13} />
                  </span>
                </div>

                {/* Floating Content Inside Photo (Pinterest Card Style) */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-[#FAF3EE] pointer-events-none z-10">
                  <span className="text-[0.62rem] font-sans tracking-[0.2em] text-[#DDB78A] uppercase block mb-1">
                    {pin.client}
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-medium uppercase tracking-tight text-[#FAF3EE] leading-snug drop-shadow-sm group-hover:text-[#FAF3EE] transition-colors">
                    {pin.title}
                  </h3>
                  <p className="font-serif italic text-xs text-[#EAD0B3]/90 mt-1 line-clamp-1">
                    {pin.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom Details & Tags Block */}
              <div className="p-4 sm:p-4.5 bg-white flex flex-col justify-between">
                {/* Micro Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {pin.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-sm bg-[#FAF6F0] border border-[#24040F]/8 text-[0.6rem] font-sans font-medium text-[#24040F]/70 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Bar */}
                <div className="pt-2.5 border-t border-[#24040F]/8 flex items-center justify-between text-xs text-[#24040F]/75">
                  <div className="flex items-center gap-1.5 text-[0.65rem] font-sans text-[#24040F]/60">
                    <MapPin size={11} className="text-[#8A1435]" />
                    <span>{pin.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[0.66rem] font-sans font-semibold tracking-wider text-[#8A1435] uppercase group-hover:translate-x-0.5 transition-transform">
                    <span>DOSSIER</span>
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Case Study Modal (High-End Luxury Drawer) */}
      {selectedPin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={() => setSelectedPin(null)}
        >
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FAF3EE] text-[#24040F] rounded-xl border border-[#8A1435]/30 shadow-2xl p-6 sm:p-10 lg:p-12 transition-all duration-300"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPin(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#EFE8DF] text-[#24040F] hover:bg-[#20040D] hover:text-[#FAF3EE] transition-all cursor-pointer"
              aria-label="Close project modal"
            >
              <X size={18} />
            </button>

            {/* Category & Client Header */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#20040D] text-[#FAF3EE] text-[0.62rem] font-sans font-semibold tracking-[0.25em] uppercase">
                {selectedPin.categoryLabel}
              </span>
              <span className="text-xs font-sans text-[#8A1435] font-semibold tracking-wider uppercase">
                {selectedPin.client}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-light uppercase text-[#24040F] leading-tight">
              {selectedPin.title}
            </h2>
            <p className="mt-2 font-serif italic text-base sm:text-lg text-[#8A1435]">
              &ldquo;{selectedPin.subtitle}&rdquo;
            </p>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 py-4 border-y border-[#24040F]/10 text-xs font-sans">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#8A1435]" />
                <span>Year: <strong className="font-semibold">{selectedPin.year}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#8A1435]" />
                <span>Location: <strong className="font-semibold">{selectedPin.location}</strong></span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Layers size={14} className="text-[#8A1435]" />
                <span>Discipline: <strong className="font-semibold">{selectedPin.categoryLabel}</strong></span>
              </div>
            </div>

            {/* Image Showcase Frame */}
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden my-6 border border-[#24040F]/15 bg-[#180209]">
              <Image
                src={selectedPin.image}
                alt={selectedPin.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Detailed Executive Overview */}
            <div className="space-y-6 mt-6">
              <div>
                <h4 className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#8A1435] mb-2">
                  EXECUTIVE OVERVIEW
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#24040F]/85 leading-relaxed font-light">
                  {selectedPin.overview}
                </p>
              </div>

              {/* Key Deliverables */}
              <div>
                <h4 className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#8A1435] mb-3">
                  KEY SCOPE &amp; DELIVERABLES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedPin.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs font-sans text-[#24040F]/80">
                      <CheckCircle2 size={13} className="text-[#8A1435] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Measurable Impact */}
              <div className="p-4 sm:p-5 rounded-lg bg-[#EFE8DF]/80 border-l-2 border-[#8A1435]">
                <h4 className="flex items-center gap-2 text-[0.68rem] font-sans font-semibold tracking-[0.25em] uppercase text-[#24040F] mb-1">
                  <Sparkles size={13} className="text-[#8A1435]" />
                  MEASURABLE IMPACT
                </h4>
                <p className="font-sans text-xs sm:text-[0.84rem] text-[#24040F]/85">
                  {selectedPin.impact}
                </p>
              </div>
            </div>

            {/* Bottom Modal CTA */}
            <div className="mt-8 pt-6 border-t border-[#24040F]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-sans text-[#24040F]/60 text-center sm:text-left">
                Schedule a consultation or request the private atelier project lookbook.
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedPin(null);
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-full bg-[#20040D] text-[#FAF3EE] hover:bg-[#3A081A] text-xs font-sans font-semibold tracking-[0.2em] uppercase transition-colors shrink-0 cursor-pointer shadow-md"
              >
                INQUIRE ABOUT THIS PROJECT →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
