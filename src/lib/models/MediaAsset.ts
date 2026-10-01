import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMediaAsset extends Document {
  slotKey: string; // e.g., 'hero.bg', 'about.interior', 'expertise.01_events'
  filename: string;
  url: string;
  altText: string;
  width: number;
  height: number;
  blurDataURL?: string;
  fileSize: number;
  mimeType: string;
  storageProvider: "local" | "r2";
  createdAt: Date;
  updatedAt: Date;
}

const MediaAssetSchema = new Schema<IMediaAsset>(
  {
    slotKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      required: true,
      default: "",
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    blurDataURL: {
      type: String,
      default: "",
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    mimeType: {
      type: String,
      default: "image/jpeg",
    },
    storageProvider: {
      type: String,
      enum: ["local", "r2"],
      default: "local",
    },
  },
  {
    timestamps: true,
  }
);

export const MediaAsset: Model<IMediaAsset> =
  mongoose.models.MediaAsset || mongoose.model<IMediaAsset>("MediaAsset", MediaAssetSchema);
