import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mkan_concept";

async function resetPassword() {
  const email = (process.argv[2] || process.env.ADMIN_DEFAULT_EMAIL || "admin@mkanconcept.ae").trim().toLowerCase();
  const newPassword = process.env.ADMIN_DEFAULT_PASSWORD;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new Error("Provide a valid admin email address.");
  }
  if (!newPassword || newPassword.length < 12 || Buffer.byteLength(newPassword, "utf8") > 72) {
    throw new Error("Set ADMIN_DEFAULT_PASSWORD to a password with at least 12 characters and no more than 72 UTF-8 bytes.");
  }

  console.log(`Resetting admin password for: ${email}`);
  await mongoose.connect(MONGODB_URI);

  try {
    const passwordHash = await bcrypt.hash(newPassword, 12);
    const db = mongoose.connection;
    const adminColl = db.collection("adminusers");
    const admin = await adminColl.findOne({ email }, { projection: { _id: 1 } });

    if (!admin) {
      console.error(`No admin user found with email: ${email}`);
      process.exitCode = 1;
      return;
    }

    await adminColl.updateOne(
      { _id: admin._id },
      {
        $set: {
          passwordHash,
          failedAttempts: 0,
          lockUntil: null,
          updatedAt: new Date(),
        },
      }
    );

    const revoked = await db.collection("adminsessions").deleteMany({ userId: admin._id });
    console.log(`Password updated and ${revoked.deletedCount} active session(s) revoked for ${email}.`);
  } finally {
    await mongoose.disconnect();
  }
}

resetPassword().catch((err) => {
  console.error("Password reset failed:", err instanceof Error ? err.message : "Unknown error");
  process.exit(1);
});
