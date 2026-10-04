import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getLiveSiteContent } from "@/lib/content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Contact } from "@/components/sections/Contact";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ExpertisePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "events" },
    { slug: "exhibitions" },
    { slug: "workshops" },
    { slug: "activations" },
    { slug: "consultancy" },
  ];
}

export default async function ExpertiseDetailsPage({ params }: ExpertisePageProps) {
  const { slug } = await params;
  const { site, home, assets } = await getLiveSiteContent("en");

  // Find the expertise card that matches the slug
  const expertiseSection = home.expertise;
  const cards = expertiseSection.cards || [];
  
  const card = cards.find(c => {
    const cardSlug = c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return cardSlug === slug;
  });

  if (!card) {
    notFound();
  }

  // Get the main image
  const getImageSrc = (key: string) => {
    switch (key) {
      case "events":        return assets.expertise?.events?.src        || "/images/1.1.png";
      case "exhibitions":   return assets.expertise?.exhibitions?.src   || "/images/1.2.png";
      case "workshops":     return assets.expertise?.workshops?.src     || "/images/1.3.png";
      case "activations":   return assets.expertise?.activations?.src   || "/images/1.4.png";
      case "consultancy":   return assets.expertise?.consultancy?.src   || "/images/1.5.png";
      default:              return assets.heroBg.src || "/images/hero1.png";
    }
  };

  const mainImageSrc = getImageSrc(card.imageKey);

  // Parse items for description
  const itemLines = card.items && card.items.length > 0
    ? card.items
    : card.description.split("\n").filter(Boolean);

  return (
    <>
      <Navbar site={site} />
      <main className="min-h-screen bg-[#16030C] text-[#F5EEE6]">
        {/* Header/Hero Section with Mandatory First Image */}
        <div className="relative w-full h-[55vh] sm:h-[65vh] lg:h-[75vh] overflow-hidden pt-20">
          <Image
            src={mainImageSrc}
            alt={card.title}
            fill
            className="object-cover object-center brightness-[0.8] contrast-[1.1]"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-[#16030C] via-[#16030C]/85 to-transparent" />
          
          <div className="absolute inset-x-0 bottom-0 p-8 lg:p-16 max-w-[1440px] mx-auto z-10 flex flex-col justify-end h-full">
            <div className="flex items-center gap-4 mb-6">
              <Link
                href="/expertise"
                className="inline-flex items-center gap-2 text-[#DDB78A] text-[0.7rem] font-bold tracking-[0.2em] uppercase hover:text-white transition-colors"
              >
                <ArrowLeft size={13} />
                <span>ALL CAPABILITIES</span>
              </Link>
              <span className="text-[#DDB78A]/40">/</span>
              <span className="text-[#EAD0B3]/70 text-[0.7rem] tracking-[0.2em] uppercase">
                {card.title}
              </span>
            </div>

            <span className="block font-display text-4xl lg:text-6xl text-[#EAD0B3] leading-none mb-3">
              {card.number}
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.8rem] tracking-[0.08em] text-[#FAF1E8] uppercase leading-[1.05]">
              {card.title}
            </h1>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Details Section */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-[#DDB78A]/50" aria-hidden="true" />
                <span className="text-[0.68rem] font-sans font-medium tracking-[0.3em] uppercase text-[#DDB78A]">
                  ARCHITECTURAL SCOPE & DELIVERABLES
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl text-[#FAF1E8] uppercase mb-8 leading-tight">
                Curated Execution & Strategic Rigor
              </h2>

              <div className="space-y-6 text-[#EAE0D5]/80 font-sans text-sm sm:text-base leading-relaxed font-light">
                {(() => {
                  const storyText =
                    ("longDescription" in card && typeof card.longDescription === "string" && card.longDescription.trim().length > 0)
                      ? card.longDescription
                      : `At MKAN Concept, our ${card.title.toLowerCase()} practice combines refined Middle Eastern aesthetics with disciplined operational precision. We integrate deeply with our clients' strategic goals to ensure that every aspect of the project aligns perfectly with their commercial objectives and elevated market positioning.`;

                  return storyText
                    .split("\n\n")
                    .filter(Boolean)
                    .map((paragraph, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ));
                })()}

                <div className="p-6 sm:p-8 rounded-sm border border-[#DDB78A]/20 bg-[#220811]/70 mt-8">
                  <h3 className="text-[#DDB78A] font-medium text-xs tracking-[0.25em] uppercase mb-4">
                    Core Capability Areas
                  </h3>
                  <ul className="space-y-3">
                    {itemLines.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-[#FAF1E8]">
                        <span className="h-1.5 w-1.5 bg-[#DDB78A] rounded-full shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <Link
                    href={`/expertise#${slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-[#DDB78A] text-xs font-sans font-bold tracking-[0.2em] uppercase text-[#DDB78A] hover:bg-[#DDB78A]/10 hover:text-white transition-all"
                  >
                    <span>View In Full Expertise Framework</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Editorial Insights Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-[#220811] p-8 lg:p-10 border border-[#DDB78A]/25 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <span className="text-[#DDB78A] text-[0.65rem] font-bold tracking-[0.25em] uppercase mb-2 block">
                  ADVISORY INSIGHT
                </span>
                <h3 className="font-display text-2xl text-[#FAF1E8] uppercase mb-6">
                  The MKAN Standard
                </h3>
                <div className="space-y-6">
                  <div className="group">
                    <p className="text-[#DDB78A]/90 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-1.5">
                      UAE & GCC EXCELLENCE
                    </p>
                    <h4 className="font-display text-lg text-[#FAF1E8] leading-snug mb-2">
                      Transforming the Landscape of Luxury {card.title}
                    </h4>
                    <p className="text-[#EAE0D5]/70 text-xs sm:text-sm leading-relaxed">
                      Discover how strategic conceptualization is transforming the landscape of {card.title.toLowerCase()} across Dubai, Abu Dhabi, and the wider Emirates.
                    </p>
                  </div>

                  <div className="h-[1px] w-full bg-[#DDB78A]/15" />

                  <div className="group">
                    <p className="text-[#DDB78A]/90 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-1.5">
                      BESPOKE RIGOR
                    </p>
                    <h4 className="font-display text-lg text-[#FAF1E8] leading-snug mb-2">
                      Elevating Long-Term Brand Value
                    </h4>
                    <p className="text-[#EAE0D5]/70 text-xs sm:text-sm leading-relaxed">
                      An in-depth look at our bespoke design methodology, curatorial discipline, and seamless delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section at the Bottom */}
        <div className="border-t border-[#DDB78A]/20">
          <Contact data={home.contact} site={site} assets={assets} />
        </div>
      </main>
      <ScrollToTop />
      <Footer site={site} />
    </>
  );
}
