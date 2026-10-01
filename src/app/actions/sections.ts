"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { SiteSection } from "@/lib/models/SiteSection";

const SECTION_KEYS = new Set([
  "site",
  "hero",
  "about",
  "expertise",
  "method",
  "philosophy",
  "experiences",
  "builtForBrands",
  "trustedBy",
  "impactBanner",
  "contact",
]);
const MAX_SECTION_BYTES = 64 * 1024;

export interface SectionActionResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

function validateSectionKey(sectionKey: string, locale: string): string | null {
  if (!SECTION_KEYS.has(sectionKey)) return "Unknown website section.";
  if (!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(locale)) return "Invalid content locale.";
  return null;
}

function validateSectionData(data: unknown): string | null {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return "Section content must be an object.";
  }
  try {
    if (Buffer.byteLength(JSON.stringify(data), "utf8") > MAX_SECTION_BYTES) {
      return "Section content is larger than the 64 KB limit.";
    }
  } catch {
    return "Section content is not valid serializable data.";
  }
  return null;
}

async function ensureDatabase(): Promise<boolean> {
  return Boolean(await connectToDatabase());
}

/** Saves an unpublished section draft. */
export async function saveSectionDraftAction(
  sectionKey: string,
  draftData: Record<string, unknown>,
  locale = "en"
): Promise<SectionActionResponse> {
  try {
    await requireAdmin();
    const invalidSection = validateSectionKey(sectionKey, locale);
    if (invalidSection) return { success: false, message: invalidSection };
    const invalidData = validateSectionData(draftData);
    if (invalidData) return { success: false, message: invalidData };
    if (!(await ensureDatabase())) {
      return { success: false, message: "Content storage is temporarily unavailable." };
    }

    const existing = await SiteSection.findOne({ sectionKey, locale });
    if (!existing) {
      await SiteSection.create({
        sectionKey,
        locale,
        draftData,
        publishedData: draftData,
        status: "draft",
      });
    } else {
      await SiteSection.updateOne(
        { sectionKey, locale },
        { $set: { draftData, status: "draft", updatedAt: new Date() } }
      );
    }

    return {
      success: true,
      message: `Draft for "${sectionKey}" saved successfully. Click "Publish Changes" to make it live.`,
    };
  } catch (error) {
    console.error("[Save Draft Error]", error);
    return { success: false, message: "Failed to save the section draft." };
  }
}

/** Publishes a section draft and revalidates the public homepage. */
export async function publishSectionAction(
  sectionKey: string,
  locale = "en"
): Promise<SectionActionResponse> {
  try {
    await requireAdmin();
    const invalidSection = validateSectionKey(sectionKey, locale);
    if (invalidSection) return { success: false, message: invalidSection };
    if (!(await ensureDatabase())) {
      return { success: false, message: "Content storage is temporarily unavailable." };
    }

    const section = await SiteSection.findOne({ sectionKey, locale });
    if (!section) return { success: false, message: `Section "${sectionKey}" not found.` };

    const previousData = section.publishedData || null;
    const publishedData = section.draftData || section.publishedData;
    await SiteSection.updateOne(
      { sectionKey, locale },
      {
        $set: {
          publishedData,
          previousData,
          status: "published",
          publishedAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    revalidatePath("/");
    return { success: true, message: `Section "${sectionKey}" is now live.` };
  } catch (error) {
    console.error("[Publish Error]", error);
    return { success: false, message: "Failed to publish the section." };
  }
}

/** Restores the previous published version of a section. */
export async function revertSectionAction(
  sectionKey: string,
  locale = "en"
): Promise<SectionActionResponse> {
  try {
    await requireAdmin();
    const invalidSection = validateSectionKey(sectionKey, locale);
    if (invalidSection) return { success: false, message: invalidSection };
    if (!(await ensureDatabase())) {
      return { success: false, message: "Content storage is temporarily unavailable." };
    }

    const section = await SiteSection.findOne({ sectionKey, locale });
    if (!section || !section.previousData) {
      return { success: false, message: "No previous published version is available." };
    }

    const restoredData = section.previousData;
    await SiteSection.updateOne(
      { sectionKey, locale },
      {
        $set: {
          publishedData: restoredData,
          draftData: restoredData,
          previousData: null,
          status: "published",
          updatedAt: new Date(),
        },
      }
    );

    revalidatePath("/");
    return { success: true, message: `Section "${sectionKey}" was reverted.` };
  } catch (error) {
    console.error("[Revert Error]", error);
    return { success: false, message: "Failed to revert the section." };
  }
}

/** Publishes all draft changes for one locale. */
export async function publishAllSectionsAction(
  locale = "en"
): Promise<SectionActionResponse> {
  try {
    await requireAdmin();
    if (!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(locale)) {
      return { success: false, message: "Invalid content locale." };
    }
    if (!(await ensureDatabase())) {
      return { success: false, message: "Content storage is temporarily unavailable." };
    }

    const sections = await SiteSection.find({ locale });
    for (const section of sections) {
      if (section.draftData) {
        await SiteSection.updateOne(
          { _id: section._id },
          {
            $set: {
              previousData: section.publishedData || null,
              publishedData: section.draftData,
              status: "published",
              publishedAt: new Date(),
              updatedAt: new Date(),
            },
          }
        );
      }
    }

    revalidatePath("/");
    return { success: true, message: "All section changes are now live." };
  } catch (error) {
    console.error("[Publish All Error]", error);
    return { success: false, message: "Failed to publish all sections." };
  }
}
