import type { Metadata } from "next";
import { contactContent } from "@/content/contact";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: contactContent.header.intro,
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-plum-950 text-cream pt-32 pb-24 sm:pt-40 sm:pb-32 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Header */}
          <div className="max-w-3xl pb-14 border-b border-cream/10">
            <p className="font-sans text-[0.7rem] sm:text-[0.75rem] font-medium tracking-[0.3em] uppercase text-gold mb-3">
              {contactContent.header.eyebrow}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-cream tracking-tight">
              {contactContent.header.heading}
            </h1>
            <p className="mt-4 font-sans text-sm sm:text-base font-light text-cream/80 leading-relaxed">
              {contactContent.header.intro}
            </p>
          </div>

          {/* Contact Layout Grid */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column — Direct Studio Coordinates */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-normal text-cream mb-6">
                  MKAN Concept Studio
                </h2>

                <div className="flex flex-col gap-6">
                  {/* Phone */}
                  <a
                    href={contactContent.details.phoneHref}
                    className="group flex items-start gap-4 text-sm font-sans text-cream/85 transition-colors hover:text-gold"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors group-hover:border-gold group-hover:text-gold">
                      📞
                    </span>
                    <div>
                      <p className="text-[0.65rem] font-sans font-medium tracking-[0.2em] uppercase text-cream/50 mb-1">
                        Direct Inquiries
                      </p>
                      <p className="font-medium">{contactContent.details.phone}</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={contactContent.details.emailHref}
                    className="group flex items-start gap-4 text-sm font-sans text-cream/85 transition-colors hover:text-gold"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors group-hover:border-gold group-hover:text-gold">
                      ✉️
                    </span>
                    <div>
                      <p className="text-[0.65rem] font-sans font-medium tracking-[0.2em] uppercase text-cream/50 mb-1">
                        Electronic Mail
                      </p>
                      <p className="font-medium">{contactContent.details.email}</p>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href={contactContent.details.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 text-sm font-sans text-cream/85 transition-colors hover:text-gold"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors group-hover:border-gold group-hover:text-gold">
                      📷
                    </span>
                    <div>
                      <p className="text-[0.65rem] font-sans font-medium tracking-[0.2em] uppercase text-cream/50 mb-1">
                        Instagram Portfolio
                      </p>
                      <p className="font-medium">
                        {contactContent.details.instagram}
                      </p>
                    </div>
                  </a>

                  {/* Address */}
                  <a
                    href={contactContent.details.locationMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 text-sm font-sans text-cream/85 transition-colors hover:text-gold"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors group-hover:border-gold group-hover:text-gold">
                      📍
                    </span>
                    <div>
                      <p className="text-[0.65rem] font-sans font-medium tracking-[0.2em] uppercase text-cream/50 mb-1">
                        Physical Headquarters
                      </p>
                      <p className="font-medium">
                        {contactContent.details.location}
                      </p>
                    </div>
                  </a>
                </div>

                <div className="mt-10 p-6 border border-cream/10 bg-plum-900/40">
                  <p className="text-[0.68rem] font-sans font-medium tracking-[0.2em] uppercase text-gold mb-1">
                    Operating Hours
                  </p>
                  <p className="text-xs sm:text-sm font-sans font-light text-cream/75">
                    {contactContent.details.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column — Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm theme="dark" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
