import { connectToDatabase } from "@/lib/db";
import { SiteSection } from "@/lib/models/SiteSection";
import { Project } from "@/lib/models/Project";
import { ContactMessage } from "@/lib/models/ContactMessage";
import { site } from "@/content/site";
import { homeContent } from "@/content/home";
import { InstagramStudioClient } from "@/components/admin/InstagramStudioClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await connectToDatabase();

  // Load all sections
  let sectionsMap: Record<string, any> = {
    hero: { draftData: homeContent.hero, status: "published" },
    about: { draftData: homeContent.about, status: "published" },
    expertise: { draftData: homeContent.expertise, status: "published" },
    method: { draftData: homeContent.method, status: "published" },
    philosophy: { draftData: homeContent.philosophy, status: "published" },
    builtForBrands: { draftData: homeContent.builtForBrands, status: "published" },
    impactBanner: { draftData: homeContent.impactBanner, status: "published" },
    trustedBy: { draftData: homeContent.trustedBy, status: "published" },
  };

  let siteData: any = site;
  let projects: any[] = homeContent.experiences.items.map((item, idx) => ({
    ...item,
    featuredOnHome: true,
    sortOrder: idx,
  }));
  let messages: any[] = [];

  try {
    const dbSections = await SiteSection.find({ locale: "en" }).lean();
    for (const sec of dbSections) {
      if (sec.sectionKey === "site") {
        siteData = sec.draftData || sec.publishedData || site;
      } else {
        sectionsMap[sec.sectionKey] = {
          draftData: sec.draftData || sec.publishedData || (homeContent as any)[sec.sectionKey],
          status: sec.status || "published",
        };
      }
    }

    const dbProjects = await Project.find({ locale: "en" }).sort({ sortOrder: 1, createdAt: -1 }).lean();
    if (dbProjects.length > 0) {
      projects = dbProjects.map((p) => ({
        ...p,
        _id: p._id.toString(),
      }));
    }

    const dbMessages = await ContactMessage.find({}).sort({ createdAt: -1 }).limit(20).lean();
    messages = dbMessages.map((m) => ({
      ...m,
      _id: m._id.toString(),
      createdAt: m.createdAt ? new Date(m.createdAt).toISOString() : new Date().toISOString(),
    }));
  } catch (e) {
    console.warn("[Admin Page Data Load]", e);
  }

  return (
    <InstagramStudioClient
      initialSections={sectionsMap}
      initialProjects={projects}
      initialMessages={messages}
      initialSite={siteData}
    />
  );
}
