import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Inter } from "next/font/google";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MotionProvider } from "@/components/MotionProvider";
import { LiveContentSync } from "@/components/LiveContentSync";
import "./globals.css";
import "./luxury-motion.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const adminFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1A060E",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.domain),
  keywords: [
    "MKAN Concept",
    "luxury events Dubai",
    "cultural exhibitions UAE",
    "brand activations Dubai",
    "corporate summits UAE",
    "Ramadan Fair Dubai",
    "experiential atelier",
    "curated events",
    "Wasl 51 Dubai",
    "VIP protocol management",
  ],
  authors: [{ name: site.name, url: site.domain }],
  creator: site.name,
  publisher: site.name,
  category: "Luxury Experiential Design & Cultural Exhibitions",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: site.domain,
    siteName: site.name,
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: `${site.domain}/images/Hero1.png`,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [`${site.domain}/images/Hero1.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={site.locale}
      dir={site.dir}
      className={`${displayFont.variable} ${bodyFont.variable} ${adminFont.variable}`}
    >
      <body className="bg-plum-950 font-sans text-cream antialiased selection:bg-gold selection:text-plum-950">
        <SmoothScroll>
          <MotionProvider>{children}</MotionProvider>
        </SmoothScroll>
        <LiveContentSync />
      </body>
    </html>
  );
}
