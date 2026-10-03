import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { site } from "../src/content/site";
import { homeContent } from "../src/content/home";
import { assets } from "../src/config/assets";

// Load environment variables from .env.local if present
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mkan_concept";

async function runSeed() {
  const adminEmail = (process.env.ADMIN_DEFAULT_EMAIL || "admin@mkanconcept.ae").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail) || adminEmail.length > 254) {
    throw new Error("Set ADMIN_DEFAULT_EMAIL to a valid email address before seeding.");
  }
  if (!adminPassword || adminPassword.length < 12 || Buffer.byteLength(adminPassword, "utf8") > 72) {
    throw new Error("Set ADMIN_DEFAULT_PASSWORD to a value with at least 12 characters and no more than 72 UTF-8 bytes.");
  }

  console.log("--------------------------------------------------");
  console.log("🌱 Starting MKAN Concept Database Seeding...");
  console.log("Connecting to MongoDB...");

  await mongoose.connect(MONGODB_URI);
  console.log("✓ Connected to MongoDB.");

  const db = mongoose.connection;

  // 1. Seed Admin User
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const adminColl = db.collection("adminusers");
  await adminColl.updateOne(
    { email: adminEmail.toLowerCase() },
    {
      $set: {
        email: adminEmail.toLowerCase(),
        passwordHash,
        name: "MKAN Administrator",
        failedAttempts: 0,
        lockUntil: null,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true }
  );
  const seededAdmin = await adminColl.findOne(
    { email: adminEmail.toLowerCase() },
    { projection: { _id: 1 } }
  );
  if (seededAdmin) {
    await db.collection("adminsessions").deleteMany({ userId: seededAdmin._id });
  }
  console.log(`✓ Admin user seeded: ${adminEmail}; existing sessions revoked.`);

  // 2. Seed Site Sections (Draft & Published initialized with seed content)
  const sectionsColl = db.collection("sitesections");

  const sectionsToSeed = [
    { sectionKey: "site", data: site },
    { sectionKey: "hero", data: homeContent.hero },
    { sectionKey: "about", data: homeContent.about },
    { sectionKey: "expertise", data: homeContent.expertise },
    { sectionKey: "method", data: homeContent.method },
    { sectionKey: "experiences", data: homeContent.experiences },
    { sectionKey: "builtForBrands", data: homeContent.builtForBrands },
    { sectionKey: "trustedBy", data: homeContent.trustedBy },
    { sectionKey: "impactBanner", data: homeContent.impactBanner },
    { sectionKey: "contact", data: homeContent.contact },
  ];

  for (const item of sectionsToSeed) {
    await sectionsColl.updateOne(
      { sectionKey: item.sectionKey, locale: "en" },
      {
        $set: {
          sectionKey: item.sectionKey,
          locale: "en",
          draftData: item.data,
          publishedData: item.data,
          status: "published",
          updatedAt: new Date(),
          publishedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
          previousData: null,
        },
      },
      { upsert: true }
    );
  }
  console.log(`✓ Seeded ${sectionsToSeed.length} site sections with draft & published parity.`);

  // 3. Seed Projects
  const projectsColl = db.collection("projects");
  let order = 0;
  for (const proj of homeContent.experiences.items) {
    await projectsColl.updateOne(
      { slug: proj.id, locale: "en" },
      {
        $set: {
          slug: proj.id,
          title: proj.title,
          subtitle: proj.subtitle,
          category: proj.category,
          categoryLabel: proj.subtitle,
          imageKey: proj.imageKey,
          imageUrl: assets.experiences[proj.imageKey]?.src || "/images/hero-bg.jpg",
          altText: assets.experiences[proj.imageKey]?.alt || proj.title,
          featuredOnHome: true,
          sortOrder: order++,
          locale: "en",
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );
  }
  console.log(`✓ Seeded ${homeContent.experiences.items.length} initial portfolio projects.`);

  console.log("--------------------------------------------------");
  console.log("🎉 Seeding Completed Successfully!");
  console.log("--------------------------------------------------");

  await mongoose.disconnect();
}

runSeed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
