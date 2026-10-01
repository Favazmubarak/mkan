import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IRateLimitBucket extends Document {
  key: string;
  scope: string;
  count: number;
  expiresAt: Date;
}

const RateLimitBucketSchema = new Schema<IRateLimitBucket>(
  {
    key: { type: String, required: true, unique: true },
    scope: { type: String, required: true, index: true },
    count: { type: Number, required: true, default: 0 },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true }
);

export const RateLimitBucket: Model<IRateLimitBucket> =
  mongoose.models.RateLimitBucket ||
  mongoose.model<IRateLimitBucket>("RateLimitBucket", RateLimitBucketSchema);
