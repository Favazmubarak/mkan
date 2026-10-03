import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getLiveSiteContent } from "@/lib/content";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/sections/Contact";

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
      case "events":        return assets.expertise?.events?.src        || "/images/expertise-events.jpg";
      case "exhibitions":   return assets.expertise?.exhibitions?.src   || "/images/expertise-exhibitions.jpg";
      case "workshops":     return assets.expertise?.workshops?.src     || "/images/expertise-workshops.jpg";
      case "activations":   return assets.expertise?.activations?.src   || "/images/expertise-activations.jpg";
      case "consultancy":   return assets.expertise?.consultancy?.src   || "/images/expertise-consultancy.jpg";
      default:              return assets.heroBg.src;
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
      <main className="min-h-screen bg-[#1E0611] text-[#F5EEE6]">
        {/* Header/Hero Section with Mandatory First Image */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
          <Image
            src={mainImageSrc}
            alt={card.title}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[#1E0611] via-[#1E0611]/80 to-transparent" />
          
          <div className="absolute inset-x-0 bottom-0 p-8 lg:p-16 max-w-[1200px] mx-auto z-10 flex flex-col justify-end h-full">
            <Link href="/#services" className="text-[#DDB78A] text-[0.7rem] font-bold tracking-[0.2em] uppercase hover:text-white transition-colors mb-6 inline-block">
              ← BACK TO EXPERTISE
            </Link>
            <span className="block font-display text-4xl lg:text-6xl text-[#EAD0B3] leading-none mb-4">
              {card.number}
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[5rem] tracking-[0.1em] text-[#DDB78A] uppercase">
              {card.title}
            </h1>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-16 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Details Section */}
            <div className="lg:col-span-7">
              <h2 className="font-display text-3xl text-white tracking-widest uppercase mb-8 border-b border-[#DDB78A]/20 pb-4">
                Service Details
              </h2>
              <div className="space-y-6 text-[#EAE0D5]/80 font-sans text-[0.95rem] leading-relaxed">
                {(() => {
                  const storyText =
                    ("longDescription" in card && typeof card.longDescription === "string" && card.longDescription.trim().length > 0)
                      ? card.longDescription
                      : `At MKAN Concept, our ${card.title.toLowerCase()} division is dedicated to executing premium, high-impact experiences. We integrate deeply with our clients' strategic goals to ensure that every aspect of the project aligns perfectly with their commercial objectives and market positioning.`;

                  return storyText
                    .split("\n\n")
                    .filter(Boolean)
                    .map((paragraph, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ));
                })()}

                <div className="pl-6 border-l-2 border-[#DDB78A] mt-8">
                  <h3 className="text-[#DDB78A] font-bold text-[0.75rem] tracking-widest uppercase mb-4">Key Focus Areas</h3>
                  <ul className="space-y-3">
                    {itemLines.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-1 h-1 bg-[#DDB78A] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Editorial Insights Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-[#2B0B17] p-8 lg:p-10 border border-[#DDB78A]/20">
                <h3 className="font-display text-2xl text-white tracking-widest uppercase mb-6">
                  Related Insights
                </h3>
                <div className="space-y-6">
                  <div className="group">
                    <p className="text-[#DDB78A] text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">FEATURED PERSPECTIVE</p>
                    <h4 className="font-display text-xl text-[#F5EEE6] group-hover:text-white transition-colors leading-tight mb-2">
                      The Future of Luxury {card.title} in the UAE
                    </h4>
                    <p className="text-[#EAE0D5]/70 text-sm line-clamp-3">
                      Discover how strategic conceptualization is transforming the landscape of {card.title.toLowerCase()} across Dubai and Abu Dhabi.
                    </p>
                  </div>
                  <div className="h-[1px] w-full bg-[#DDB78A]/10" />
                  <div className="group">
                    <p className="text-[#DDB78A] text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">STRATEGIC APPROACH</p>
                    <h4 className="font-display text-xl text-[#F5EEE6] group-hover:text-white transition-colors leading-tight mb-2">
                      Elevating Brand Value Through {card.title}
                    </h4>
                    <p className="text-[#EAE0D5]/70 text-sm line-clamp-2">
                      An in-depth look at our bespoke design methodology, curatorial rigor, and seamless delivery.
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
    </>
  );
}
