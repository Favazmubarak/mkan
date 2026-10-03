import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteSection extends Document {
  sectionKey: string; // e.g. site, hero, about, expertise, method, experiences, builtForBrands, trustedBy, impactBanner, contact
  locale: string; // 'en' (default), future 'ar'
  draftData: Record<string, unknown>;
  publishedData: Record<string, unknown>;
  previousData?: Record<string, unknown> | null;
  status: "draft" | "published";
  updatedAt: Date;
  publishedAt?: Date | null;
}

const SiteSectionSchema = new Schema<ISiteSection>(
  {
    sectionKey: {
      type: String,
      required: true,
      index: true,
    },
    locale: {
      type: String,
      required: true,
      default: "en",
      index: true,
    },
    draftData: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
    publishedData: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
    previousData: {
      type: Schema.Types.Mixed,
      default: null,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index on sectionKey and locale
SiteSectionSchema.index({ sectionKey: 1, locale: 1 }, { unique: true });

export const SiteSection: Model<ISiteSection> =
  mongoose.models.SiteSection || mongoose.model<ISiteSection>("SiteSection", SiteSectionSchema);
