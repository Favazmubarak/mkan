"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { PortraitPin } from "@/lib/models/PortraitPin";
import { DEFAULT_PORTRAIT_PINS, type PortraitPin as PortraitPinType, type PortraitPinCategory, type PortraitPinAspect } from "@/content/portrait-gallery";
import { touchContentVersion } from "@/lib/live-sync";

const VALID_CATEGORIES: PortraitPinCategory[] = [
  "exhibitions",
  "activations",
  "corporate",
  "workshops",
  "consultancy",
];

const VALID_ASPECTS: PortraitPinAspect[] = [
  "portrait",
  "tall",
  "square",
  "wide",
  "cinema",
];

export interface PortraitActionResponse {
  success: boolean;
  message: string;
  pin?: PortraitPinType;
  pins?: PortraitPinType[];
}

function readText(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function parseArrayField(formData: FormData, name: string): string[] {
  const raw = formData.get(name);
  if (typeof raw !== "string" || !raw.trim()) return [];
  // Supports JSON array string or comma/newline separated
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map((s) => String(s).trim()).filter(Boolean);
  } catch {
    // not JSON, fallback to splitting by newline or comma
  }
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Fetches all portrait gallery pins, seeding default 12 showcases if empty */
export async function getPortraitPinsAction(): Promise<PortraitPinType[]> {
  try {
    await connectToDatabase();
    const count = await PortraitPin.countDocuments({ locale: "en" });

    if (count === 0) {
      // Seed initial verified pins
      await PortraitPin.insertMany(
        DEFAULT_PORTRAIT_PINS.map((pin, index) => ({
          ...pin,
          slug: pin.id || `pin-${index}`,
          sortOrder: index,
          published: true,
          locale: "en",
        }))
      );
    }

    const docs = await PortraitPin.find({ locale: "en" })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    return docs.map((doc) => ({
      id: doc.slug || doc._id.toString(),
      _id: doc._id.toString(),
      title: doc.title,
      subtitle: doc.subtitle,
      category: doc.category as PortraitPinCategory,
      categoryLabel: doc.categoryLabel || doc.category.toUpperCase(),
      aspect: doc.aspect as PortraitPinAspect,
      year: doc.year || "2024",
      location: doc.location || "Dubai, UAE",
      client: doc.client || "",
      image: doc.image,
      tags: doc.tags || [],
      summary: doc.summary || "",
      overview: doc.overview || "",
      disciplines: doc.disciplines || [],
      deliverables: doc.deliverables || [],
      impact: doc.impact || "",
      sortOrder: doc.sortOrder ?? 0,
      published: doc.published ?? true,
    }));
  } catch (err) {
    console.error("[getPortraitPinsAction Error]", err);
    return DEFAULT_PORTRAIT_PINS;
  }
}

/** Creates or updates a portrait gallery showcase */
export async function upsertPortraitPinAction(
  formData: FormData
): Promise<PortraitActionResponse> {
  try {
    await requireAdmin();
    await connectToDatabase();

    const id = readText(formData, "id");
    const mongoId = readText(formData, "_id");
    const title = readText(formData, "title");
    const subtitle = readText(formData, "subtitle");
    const category = readText(formData, "category") as PortraitPinCategory;
    const categoryLabel = readText(formData, "categoryLabel") || category.toUpperCase();
    const aspect = (readText(formData, "aspect") || "portrait") as PortraitPinAspect;
    const year = readText(formData, "year") || "2024";
    const location = readText(formData, "location") || "Dubai, UAE";
    const client = readText(formData, "client") || "MKAN Client";
    const image = readText(formData, "image") || "/images/2.1.png";
    const summary = readText(formData, "summary");
    const overview = readText(formData, "overview");
    const impact = readText(formData, "impact");
    const tags = parseArrayField(formData, "tags");
    const disciplines = parseArrayField(formData, "disciplines");
    const deliverables = parseArrayField(formData, "deliverables");

    if (title.length < 2 || title.length > 140) {
      return { success: false, message: "Title must be between 2 and 140 characters." };
    }
    if (subtitle.length < 2 || subtitle.length > 200) {
      return { success: false, message: "Subtitle must be between 2 and 200 characters." };
    }
    if (!VALID_CATEGORIES.includes(category)) {
      return { success: false, message: "Please select a valid gallery category." };
    }
    if (!VALID_ASPECTS.includes(aspect)) {
      return { success: false, message: "Please select a valid aspect ratio." };
    }
    if (!image) {
      return { success: false, message: "An image URL or upload is required." };
    }

    const slug =
      readText(formData, "slug") ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const updatePayload = {
      slug: slug || `showcase-${Date.now()}`,
      title,
      subtitle,
      category,
      categoryLabel,
      aspect,
      year,
      location,
      client,
      image,
      tags,
      summary,
      overview,
      disciplines,
      deliverables,
      impact,
      published: true,
      locale: "en",
    };

    let savedDoc;
    if (mongoId && mongoose.isValidObjectId(mongoId)) {
      savedDoc = await PortraitPin.findByIdAndUpdate(
        mongoId,
        { $set: updatePayload },
        { returnDocument: "after", new: true, upsert: true }
      );
    } else if (id) {
      savedDoc = await PortraitPin.findOneAndUpdate(
        { slug: id, locale: "en" },
        { $set: updatePayload },
        { returnDocument: "after", new: true, upsert: true }
      );
    } else {
      const highestOrder = await PortraitPin.findOne({ locale: "en" }).sort({ sortOrder: -1 }).select("sortOrder").lean();
      const nextSortOrder = (highestOrder?.sortOrder ?? 0) + 1;
      savedDoc = await PortraitPin.create({ ...updatePayload, sortOrder: nextSortOrder });
    }

    if (!savedDoc) {
      return { success: false, message: "Showcase document could not be saved in database." };
    }

    touchContentVersion();
    revalidatePath("/experiences");
    revalidatePath("/admin");

    const mappedPin: PortraitPinType = {
      id: savedDoc.slug,
      _id: savedDoc._id.toString(),
      title: savedDoc.title,
      subtitle: savedDoc.subtitle,
      category: savedDoc.category as PortraitPinCategory,
      categoryLabel: savedDoc.categoryLabel,
      aspect: savedDoc.aspect as PortraitPinAspect,
      year: savedDoc.year,
      location: savedDoc.location,
      client: savedDoc.client,
      image: savedDoc.image,
      tags: savedDoc.tags,
      summary: savedDoc.summary,
      overview: savedDoc.overview,
      disciplines: savedDoc.disciplines,
      deliverables: savedDoc.deliverables,
      impact: savedDoc.impact,
      sortOrder: savedDoc.sortOrder,
    };

    return {
      success: true,
      message: `Showcase "${title}" saved successfully.`,
      pin: mappedPin,
    };
  } catch (err) {
    console.error("[upsertPortraitPinAction Error]", err);
    return { success: false, message: "Failed to save the gallery showcase." };
  }
}

/** Deletes a portrait gallery showcase */
export async function deletePortraitPinAction(idOrMongoId: string): Promise<PortraitActionResponse> {
  try {
    await requireAdmin();
    await connectToDatabase();

    if (mongoose.isValidObjectId(idOrMongoId)) {
      await PortraitPin.findByIdAndDelete(idOrMongoId);
    } else {
      await PortraitPin.findOneAndDelete({ slug: idOrMongoId, locale: "en" });
    }

    touchContentVersion();
    revalidatePath("/experiences");
    revalidatePath("/admin");

    return { success: true, message: "Showcase deleted successfully." };
  } catch (err) {
    console.error("[deletePortraitPinAction Error]", err);
    return { success: false, message: "Failed to delete the gallery showcase." };
  }
}

/** Reorders portrait gallery showcases */
export async function reorderPortraitPinsAction(pinIds: string[]): Promise<PortraitActionResponse> {
  try {
    await requireAdmin();
    await connectToDatabase();

    const bulkOps = pinIds.map((id, index) => {
      const isObjectId = mongoose.isValidObjectId(id);
      return {
        updateOne: {
          filter: isObjectId ? { _id: new mongoose.Types.ObjectId(id) } : { slug: id, locale: "en" },
          update: { $set: { sortOrder: index } },
        },
      };
    });

    if (bulkOps.length > 0) {
      await PortraitPin.bulkWrite(bulkOps);
    }

    touchContentVersion();
    revalidatePath("/experiences");
    revalidatePath("/admin");

    return { success: true, message: "Showcases reordered successfully." };
  } catch (err) {
    console.error("[reorderPortraitPinsAction Error]", err);
    return { success: false, message: "Failed to reorder gallery showcases." };
  }
}

/** Resets to default 12 verified showcases */
export async function resetPortraitPinsToDefaultAction(): Promise<PortraitActionResponse> {
  try {
    await requireAdmin();
    await connectToDatabase();

    await PortraitPin.deleteMany({ locale: "en" });
    await PortraitPin.insertMany(
      DEFAULT_PORTRAIT_PINS.map((pin, index) => ({
        ...pin,
        slug: pin.id || `pin-${index}`,
        sortOrder: index,
        published: true,
        locale: "en",
      }))
    );

    touchContentVersion();
    revalidatePath("/experiences");
    revalidatePath("/admin");

    const pins = await getPortraitPinsAction();
    return { success: true, message: "Reset to verified 12 showcases successfully.", pins };
  } catch (err) {
    console.error("[resetPortraitPinsToDefaultAction Error]", err);
    return { success: false, message: "Failed to reset gallery showcases." };
  }
}
