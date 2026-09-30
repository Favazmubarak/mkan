import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Expertise />
        <Method />
        <PhilosophyBanner />
        <Experiences />
        <BuiltForBrands />
        <Clients />
        <ImpactBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
