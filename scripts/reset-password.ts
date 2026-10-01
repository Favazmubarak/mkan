import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mkan_concept";

async function resetPassword() {
  const email = (process.argv[2] || "admin@mkanconcept.ae").toLowerCase();
  const newPassword = process.argv[3] || "Mkan@Luxury2026";

  console.log(`Resetting admin password for: ${email}`);
  await mongoose.connect(MONGODB_URI);

  const passwordHash = await bcrypt.hash(newPassword, 12);
  const db = mongoose.connection;
  const adminColl = db.collection("adminusers");

  const result = await adminColl.updateOne(
    { email },
    {
      $set: {
        passwordHash,
        failedAttempts: 0,
        lockUntil: null,
        updatedAt: new Date(),
      },
    }
  );

  if (result.matchedCount === 0) {
    console.error(`❌ No admin user found with email: ${email}`);
  } else {
    console.log(`✓ Password updated successfully for: ${email}`);
    console.log(`New Password: ${newPassword}`);
  }

  await mongoose.disconnect();
}

resetPassword().catch((err) => {
  console.error("❌ Reset password failed:", err);
  process.exit(1);
});
