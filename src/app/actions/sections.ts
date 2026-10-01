"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { SiteSection } from "@/lib/models/SiteSection";

export interface SectionActionResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Saves a draft of section content without publishing to live visitors.
 */
export async function saveSectionDraftAction(
  sectionKey: string,
  draftData: Record<string, any>,
  locale: string = "en"
): Promise<SectionActionResponse> {
  try {
    await requireAdmin();
    await connectToDatabase();

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
        {
          $set: {
            draftData,
            status: "draft",
            updatedAt: new Date(),
          },
        }
      );
    }

    return {
      success: true,
      message: `Draft for "${sectionKey}" saved successfully. Click "Publish Changes" to make it live.`,
    };
  } catch (error: any) {
    console.error("[Save Draft Error]", error);
    return {
      success: false,
      message: error.message || "Failed to save draft.",
    };
  }
}

/**
 * Publishes section draft to the live public website and triggers on-demand ISR revalidation.
 */
export async function publishSectionAction(
  sectionKey: string,
  locale: string = "en"
): Promise<SectionActionResponse> {
  try {
    await requireAdmin();
    await connectToDatabase();

    const section = await SiteSection.findOne({ sectionKey, locale });

    if (!section) {
      return { success: false, message: `Section "${sectionKey}" not found.` };
    }

    // Archive current publishedData as previousData for 1-click revert
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

    // Trigger instant ISR cache revalidation for the home page
    revalidatePath("/");

    return {
      success: true,
      message: `Section "${sectionKey}" is now LIVE on the website!`,
    };
  } catch (error: any) {
    console.error("[Publish Error]", error);
    return {
      success: false,
      message: error.message || "Failed to publish section.",
    };
  }
}

/**
 * Reverts the section to the previous published version.
 */
export async function revertSectionAction(
  sectionKey: string,
  locale: string = "en"
): Promise<SectionActionResponse> {
  try {
    await requireAdmin();
    await connectToDatabase();

    const section = await SiteSection.findOne({ sectionKey, locale });

    if (!section || !section.previousData) {
      return {
        success: false,
        message: "No previous published version found to revert to.",
      };
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

    return {
      success: true,
      message: `Section "${sectionKey}" successfully reverted to the previous version.`,
    };
  } catch (error: any) {
    console.error("[Revert Error]", error);
    return {
      success: false,
      message: error.message || "Failed to revert section.",
    };
  }
}

/**
 * Publishes all draft changes across the entire site in 1 click.
 */
export async function publishAllSectionsAction(
  locale: string = "en"
): Promise<SectionActionResponse> {
  try {
    await requireAdmin();
    await connectToDatabase();

    const sections = await SiteSection.find({ locale });
    for (const sec of sections) {
      if (sec.draftData) {
        await SiteSection.updateOne(
          { _id: sec._id },
          {
            $set: {
              previousData: sec.publishedData || null,
              publishedData: sec.draftData,
              status: "published",
              publishedAt: new Date(),
              updatedAt: new Date(),
            },
          }
        );
      }
    }

    revalidatePath("/");

    return {
      success: true,
      message: "All changes are now LIVE on the public website!",
    };
  } catch (error: any) {
    console.error("[Publish All Error]", error);
    return {
      success: false,
      message: error.message || "Failed to publish all sections.",
    };
  }
}

