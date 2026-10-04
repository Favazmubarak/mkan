export type PortraitPinAspect = "portrait" | "tall" | "square" | "wide" | "cinema";
export type PortraitPinCategory = "exhibitions" | "activations" | "corporate" | "workshops" | "consultancy";

export interface PortraitPin {
  id: string;
  _id?: string;
  title: string;
  subtitle: string;
  category: PortraitPinCategory;
  categoryLabel: string;
  aspect: PortraitPinAspect;
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
  sortOrder?: number;
  published?: boolean;
}

export const PORTRAIT_CATEGORIES: { key: PortraitPinCategory; label: string }[] = [
  { key: "exhibitions", label: "Exhibitions" },
  { key: "activations", label: "Activations" },
  { key: "corporate", label: "Corporate & Gov" },
  { key: "workshops", label: "Workshops" },
  { key: "consultancy", label: "Consultancy" },
];

export const ASPECT_OPTIONS: { key: PortraitPinAspect; label: string; ratio: string; desc: string }[] = [
  { key: "portrait", label: "Portrait", ratio: "4:5.2", desc: "Standard Vertical Showcase (Recommended)" },
  { key: "tall", label: "Tall", ratio: "3:4.2", desc: "Elongated Architectural Slit" },
  { key: "square", label: "Square", ratio: "1:1", desc: "Detail Close-up / Instagram Vignette" },
  { key: "wide", label: "Wide", ratio: "16:11", desc: "Stage & Summit Panoramic Showcase" },
  { key: "cinema", label: "Cinema", ratio: "16:9", desc: "Ultra-Wide Panoramic View" },
];

export const DEFAULT_PORTRAIT_PINS: PortraitPin[] = [
  {
    id: "ramadan-fair",
    title: "THE RAMADAN FAIR",
    subtitle: "Flagship Cultural Retail & Architectural Pavilion",
    category: "exhibitions",
    categoryLabel: "Exhibitions",
    aspect: "tall",
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
    aspect: "portrait",
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
    aspect: "wide",
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
    aspect: "square",
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
    aspect: "tall",
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
    aspect: "wide",
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
    aspect: "portrait",
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
    aspect: "tall",
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
    aspect: "square",
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
