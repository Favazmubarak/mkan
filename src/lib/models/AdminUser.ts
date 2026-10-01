import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdminUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  failedAttempts: number;
  lockUntil?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: "MKAN Administrator",
    },
    failedAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser || mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);
