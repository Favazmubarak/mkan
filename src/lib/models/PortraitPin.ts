import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPortraitPin extends Document {
  slug: string;
  title: string;
  subtitle: string;
  category: "exhibitions" | "activations" | "corporate" | "workshops" | "consultancy";
  categoryLabel: string;
  aspect: "portrait" | "tall" | "square" | "wide" | "cinema";
  year: string;
  location: string;
  client: string;
  image: string;
  tags: string[];
  summary: string;
  overview: string;
  disciplines: string[];
  deliverables: string[];
  impact: string;
  sortOrder: number;
  published: boolean;
  locale: string;
  createdAt: Date;
  updatedAt: Date;
}

const PortraitPinSchema = new Schema<IPortraitPin>(
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
      enum: ["exhibitions", "activations", "corporate", "workshops", "consultancy"],
      required: true,
      default: "exhibitions",
    },
    categoryLabel: {
      type: String,
      default: "",
    },
    aspect: {
      type: String,
      enum: ["portrait", "tall", "square", "wide", "cinema"],
      required: true,
      default: "portrait",
    },
    year: {
      type: String,
      default: "2024",
    },
    location: {
      type: String,
      default: "Dubai, UAE",
    },
    client: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: true,
      default: "/images/2.1.png",
    },
    tags: {
      type: [String],
      default: [],
    },
    summary: {
      type: String,
      default: "",
    },
    overview: {
      type: String,
      default: "",
    },
    disciplines: {
      type: [String],
      default: [],
    },
    deliverables: {
      type: [String],
      default: [],
    },
    impact: {
      type: String,
      default: "",
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
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

PortraitPinSchema.index({ locale: 1, sortOrder: 1 });
PortraitPinSchema.index({ slug: 1, locale: 1 });

export const PortraitPin: Model<IPortraitPin> =
  mongoose.models.PortraitPin || mongoose.model<IPortraitPin>("PortraitPin", PortraitPinSchema);
