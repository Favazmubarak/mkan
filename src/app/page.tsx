import { getLiveSiteContent } from "@/lib/content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Method } from "@/components/sections/Method";
import { PhilosophyBanner } from "@/components/sections/PhilosophyBanner";
import { Experiences } from "@/components/sections/Experiences";
import { BuiltForBrands } from "@/components/sections/BuiltForBrands";
import { Clients } from "@/components/sections/Clients";
import { ImpactBanner } from "@/components/sections/ImpactBanner";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage() {
  const { site, home, assets } = await getLiveSiteContent("en");

  return (
    <>
      <Navbar site={site} />
      <main className="min-h-screen">
        <Hero data={home.hero} assets={assets} />
        <About data={home.about} assets={assets} />
        <Expertise data={home.expertise} assets={assets} />
        <Method data={home.method} assets={assets} />
        <PhilosophyBanner data={home.philosophy} assets={assets} />
        <Experiences data={home.experiences} assets={assets} />
        <BuiltForBrands data={home.builtForBrands} assets={assets} />
        <Clients data={home.trustedBy} />
        <ImpactBanner data={home.impactBanner} assets={assets} />
        <Contact data={home.contact} site={site} assets={assets} />
      </main>
      <ScrollToTop />
      <Footer site={site} />
    </>
  );
}
