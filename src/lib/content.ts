import { cache } from "react";
import { connectToDatabase } from "@/lib/db";
import { SiteSection } from "@/lib/models/SiteSection";
import { Project } from "@/lib/models/Project";
import { MediaAsset } from "@/lib/models/MediaAsset";
import { site as defaultSite } from "@/content/site";
import { homeContent as defaultHome } from "@/content/home";
import { assets as defaultAssets } from "@/config/assets";

interface LiveExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  category: "events" | "exhibitions" | "workshops" | "activations";
  imageKey: string;
  imageUrl?: string;
  altText?: string;
  href: string;
}

type Mutable<T> = T extends object
  ? { -readonly [Key in keyof T]: Mutable<T[Key]> }
  : T;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Retrieves published website content and merges it with static seed content.
 * If MongoDB is unavailable, the public site falls back to the seed files.
 */
export const getLiveSiteContent = cache(async (locale: string = "en") => {
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

    const sections = await SiteSection.find({ locale, status: "published" }).lean();
    const mediaOverrides = await MediaAsset.find({}).lean();
    const dbProjects = await Project.find({ locale }).sort({ sortOrder: 1 }).lean();

    const siteData = { ...defaultSite };
    const homeData = {
      ...defaultHome,
      experiences: {
        ...defaultHome.experiences,
        items: defaultHome.experiences.items.map(
          (item): LiveExperienceItem => ({ ...item })
        ),
      },
    };

    for (const section of sections) {
      if (!section.publishedData || !isRecord(section.publishedData)) continue;
      if (section.sectionKey === "site") {
        Object.assign(siteData, section.publishedData);
        continue;
      }

      if (section.sectionKey in homeData) {
        const sectionData = homeData[section.sectionKey as keyof typeof homeData];
        if (isRecord(sectionData)) Object.assign(sectionData, section.publishedData);
      }
    }

    if (dbProjects.length > 0) {
      homeData.experiences.items = dbProjects
        .filter((project) => project.featuredOnHome)
        .map((project): LiveExperienceItem => ({
          id: project.slug,
          title: project.title,
          subtitle: project.subtitle,
          category: project.category,
          imageKey: project.imageKey || "ramadanFair",
          imageUrl: project.imageUrl || undefined,
          altText: project.altText || project.title,
          href: "#contact",
        }));
    }

    const dynamicAssets = JSON.parse(JSON.stringify(defaultAssets)) as Mutable<typeof defaultAssets>;
    const assetTree = dynamicAssets as unknown as Record<string, unknown>;

    for (const override of mediaOverrides) {
      const [parentKey, childKey] = override.slotKey.split(".");
      const slotKey = childKey ? parentKey : override.slotKey;
      const container = childKey ? assetTree[parentKey] : assetTree;
      if (!isRecord(container)) continue;

      const currentAsset = container[childKey || slotKey];
      if (!isRecord(currentAsset)) continue;

      container[childKey || slotKey] = {
        ...currentAsset,
        src: override.url,
        alt: override.altText || currentAsset.alt,
        blurDataURL: override.blurDataURL || undefined,
      };
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
});
