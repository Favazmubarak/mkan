import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdminSession extends Document {
  userId: mongoose.Types.ObjectId;
  token: string; // SHA-256 hashed session token
  ipAddress?: string;
  userAgent?: string;
  expiresAt: Date;
  createdAt: Date;
}

const AdminSessionSchema = new Schema<IAdminSession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "AdminUser",
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    ipAddress: {
      type: String,
      default: "",
    },
    userAgent: {
      type: String,
      default: "",
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // MongoDB auto-TTL expiry
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const AdminSession: Model<IAdminSession> =
  mongoose.models.AdminSession || mongoose.model<IAdminSession>("AdminSession", AdminSessionSchema);
