import { connectToDatabase } from "@/lib/db";
import { SiteSection } from "@/lib/models/SiteSection";
import { Project } from "@/lib/models/Project";
import { ContactMessage } from "@/lib/models/ContactMessage";
import { site } from "@/content/site";
import { homeContent } from "@/content/home";
import { InstagramStudioClient } from "@/components/admin/InstagramStudioClient";
import type { StudioSite } from "@/components/admin/studio-types";

export const dynamic = "force-dynamic";

type AdminSection = { draftData: Record<string, unknown>; status: string };
type AdminProject = {
  id?: string;
  _id?: string;
  title: string;
  subtitle: string;
  category: string;
  imageKey?: string;
  imageUrl?: string;
  featuredOnHome: boolean;
  sortOrder: number;
  [key: string]: unknown;
};
type AdminMessage = {
  _id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  status: string;
  createdAt: string;
  [key: string]: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export default async function AdminDashboardPage() {
  await connectToDatabase();

  // Load all sections
  const sectionsMap: Record<string, AdminSection> = {
    hero: { draftData: homeContent.hero, status: "published" },
    about: { draftData: homeContent.about, status: "published" },
    expertise: { draftData: homeContent.expertise, status: "published" },
    method: { draftData: homeContent.method, status: "published" },
    philosophy: { draftData: homeContent.philosophy, status: "published" },
    builtForBrands: { draftData: homeContent.builtForBrands, status: "published" },
    impactBanner: { draftData: homeContent.impactBanner, status: "published" },
    trustedBy: { draftData: homeContent.trustedBy, status: "published" },
  };

  let siteData: Record<string, unknown> = { ...site };
  let projects: AdminProject[] = homeContent.experiences.items.map((item, idx) => ({
    ...item,
    featuredOnHome: true,
    sortOrder: idx,
  }));
  let messages: AdminMessage[] = [];

  try {
    const dbSections = await SiteSection.find({ locale: "en" }).lean();
    for (const sec of dbSections) {
      const fallback = sec.sectionKey in homeContent
        ? homeContent[sec.sectionKey as keyof typeof homeContent]
        : {};
      const sectionData = isRecord(sec.draftData)
        ? sec.draftData
        : isRecord(sec.publishedData)
          ? sec.publishedData
          : isRecord(fallback)
            ? fallback
            : {};

      if (sec.sectionKey === "site") {
        siteData = sectionData;
      } else {
        sectionsMap[sec.sectionKey] = {
          draftData: sectionData,
          status: sec.status || "published",
        };
      }
    }

    const dbProjects = await Project.find({ locale: "en" }).sort({ sortOrder: 1, createdAt: -1 }).lean();
    if (dbProjects.length > 0) {
      projects = dbProjects.map((project) => ({
        ...project,
        _id: project._id.toString(),
      }));
    }

    const dbMessages = await ContactMessage.find({}).sort({ createdAt: -1 }).limit(20).lean();
    messages = dbMessages.map((message) => ({
      ...message,
      _id: message._id.toString(),
      createdAt: message.createdAt
        ? new Date(message.createdAt).toISOString()
        : new Date().toISOString(),
    }));
  } catch (e) {
    console.warn("[Admin Page Data Load]", e);
  }

  return (
    <InstagramStudioClient
      initialSections={sectionsMap}
      initialProjects={projects}
      initialMessages={messages}
      initialSite={siteData as unknown as StudioSite}
    />
  );
}
