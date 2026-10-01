import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  slug: string;
  title: string;
  subtitle: string;
  category: "events" | "exhibitions" | "workshops" | "activations";
  categoryLabel?: string;
  imageKey?: string;
  imageUrl?: string;
  altText?: string;
  description?: string;
  featuredOnHome: boolean;
  sortOrder: number;
  locale: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["events", "exhibitions", "workshops", "activations"],
      required: true,
    },
    categoryLabel: {
      type: String,
      default: "",
    },
    imageKey: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    altText: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    featuredOnHome: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    locale: {
      type: String,
      default: "en",
    },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.index({ locale: 1, sortOrder: 1 });

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
