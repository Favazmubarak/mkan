import Image from "next/image";
import { homeContent } from "@/content/home";

interface ClientsProps {
  data?: typeof homeContent.trustedBy;
}

export function Clients({ data = homeContent.trustedBy }: ClientsProps) {
  const trustedBy = data;

  return (
    <section id="clients" className="bg-[#FAF1E8] px-6 py-16 sm:px-8 lg:px-12 lg:py-20 border-y border-plum-900/10">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-[0.68rem] sm:text-[0.72rem] font-medium tracking-[0.3em] uppercase text-plum-900/70 mb-10 text-center sm:text-left">
          {trustedBy.eyebrow}
        </p>

        {/* Client Logos Grid with Subtle Dividers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 sm:gap-8 items-center justify-items-center">
          {(trustedBy.clients || []).map((client) => (
            <div
              key={client.name}
              className="logo-card relative h-12 w-full max-w-[130px] flex items-center justify-center cursor-default"
            >
              <Image
                src={client.logo}
                alt={`${client.name} official logo`}
                width={130}
                height={45}
                className="object-contain max-h-10 grayscale opacity-70 img-logo-lift"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
