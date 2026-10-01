import { connectToDatabase } from "@/lib/db";
import { SiteSection } from "@/lib/models/SiteSection";
import { Project } from "@/lib/models/Project";
import { MediaAsset } from "@/lib/models/MediaAsset";
import { site as defaultSite } from "@/content/site";
import { homeContent as defaultHome } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";

/**
 * Retrieves the live, published website content.
 * Checks the database first; if DB is empty or disconnected, falls back seamlessly to the static seed data.
 */
export async function getLiveSiteContent(locale: string = "en") {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return {
        site: defaultSite,
        home: defaultHome,
        assets: defaultAssets,
        isFromDatabase: false,
      };
    }

    // Query published sections
    const sections = await SiteSection.find({ locale, status: "published" }).lean();
    const mediaOverrides = await MediaAsset.find({}).lean();
    const dbProjects = await Project.find({ locale }).sort({ sortOrder: 1 }).lean();

    if (!sections || sections.length === 0) {
      return {
        site: defaultSite,
        home: defaultHome,
        assets: defaultAssets,
        isFromDatabase: false,
      };
    }

    // Construct dynamic home & site objects merged with defaults
    const siteData = { ...defaultSite };
    const homeData = { ...defaultHome };

    for (const sec of sections) {
      if (sec.sectionKey === "site" && sec.publishedData) {
        Object.assign(siteData, sec.publishedData);
      } else if (sec.publishedData && sec.sectionKey in homeData) {
        (homeData as any)[sec.sectionKey] = {
          ...(homeData as any)[sec.sectionKey],
          ...sec.publishedData,
        };
      }
    }

    // If database has projects, replace default experience items
    if (dbProjects && dbProjects.length > 0) {
      const formattedProjects = dbProjects.map((p) => ({
        id: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        category: p.category,
        imageKey: p.imageKey || "ramadanFair",
        href: "#contact",
      }));

      homeData.experiences = {
        ...homeData.experiences,
        items: formattedProjects as any,
      };
    }

    // Merge media overrides into assets
    const dynamicAssets = JSON.parse(JSON.stringify(defaultAssets));
    if (mediaOverrides && mediaOverrides.length > 0) {
      for (const override of mediaOverrides) {
        if (override.slotKey.includes(".")) {
          const [parent, child] = override.slotKey.split(".");
          if (dynamicAssets[parent]?.[child]) {
            dynamicAssets[parent][child] = {
              ...dynamicAssets[parent][child],
              src: override.url,
              alt: override.altText || dynamicAssets[parent][child].alt,
              blurDataURL: override.blurDataURL || undefined,
            };
          }
        } else if (dynamicAssets[override.slotKey]) {
          dynamicAssets[override.slotKey] = {
            ...dynamicAssets[override.slotKey],
            src: override.url,
            alt: override.altText || dynamicAssets[override.slotKey].alt,
            blurDataURL: override.blurDataURL || undefined,
          };
        }
      }
    }

    return {
      site: siteData,
      home: homeData,
      assets: dynamicAssets,
      isFromDatabase: true,
    };
  } catch (error) {
    console.warn("[Content Fetch Error] Falling back to default seed data:", error);
    return {
      site: defaultSite,
      home: defaultHome,
      assets: defaultAssets,
      isFromDatabase: false,
    };
  }
}
