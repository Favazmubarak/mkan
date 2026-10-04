import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

await mongoose.connect(MONGODB_URI);
const db = mongoose.connection.db;

const mediaUpdates = [
  { slotKey: "heroBg", url: "/images/Hero1.png" },
  { slotKey: "aboutInterior", url: "/images/aboutsection.png" },
  { slotKey: "expertise.events", url: "/images/1.1.png" },
  { slotKey: "expertise-events", url: "/images/1.1.png" },
  { slotKey: "expertise.exhibitions", url: "/images/1.2.png" },
  { slotKey: "expertise-exhibitions", url: "/images/1.2.png" },
  { slotKey: "expertise.workshops", url: "/images/1.3.png" },
  { slotKey: "expertise-workshops", url: "/images/1.3.png" },
  { slotKey: "expertise.activations", url: "/images/1.4.png" },
  { slotKey: "expertise-activations", url: "/images/1.4.png" },
  { slotKey: "expertise.consultancy", url: "/images/1.5.png" },
  { slotKey: "expertise-consultancy", url: "/images/1.5.png" },
  { slotKey: "experiences.ramadanFair", url: "/images/2.1.png" },
  { slotKey: "experiences.luxuryActivation", url: "/images/2.2.png" },
  { slotKey: "experiences.corporateEvents", url: "/images/2.3.png" },
  { slotKey: "experiences.privateEngagement", url: "/images/2.4.png" },
  { slotKey: "experiences.proj_1791061418450", url: "/images/2.1.png" },
  { slotKey: "experiences.proj_1791061451638", url: "/images/2.2.png" },
  { slotKey: "experiences.proj_1791061436835", url: "/images/2.3.png" },
  { slotKey: "experiences.proj_1791061466279", url: "/images/2.4.png" },
];

console.log("Updating mediaassets in MongoDB...");
for (const item of mediaUpdates) {
  await db.collection("mediaassets").updateOne(
    { slotKey: item.slotKey },
    {
      $set: {
        slotKey: item.slotKey,
        url: item.url,
        storageProvider: "local",
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );
  console.log(`  ✓ ${item.slotKey} -> ${item.url}`);
}

console.log("\nUpdating projects in MongoDB...");
await db.collection("projects").updateOne(
  { title: "RAMADAN FAIR" },
  { $set: { imageUrl: "/images/2.1.png", imageKey: "ramadanFair", updatedAt: new Date() } }
);
console.log("  ✓ RAMADAN FAIR -> /images/2.1.png");

await db.collection("projects").updateOne(
  { title: "LUXURY BRAND ACTIVATION" },
  { $set: { imageUrl: "/images/2.2.png", imageKey: "luxuryActivation", updatedAt: new Date() } }
);
console.log("  ✓ LUXURY BRAND ACTIVATION -> /images/2.2.png");

await db.collection("projects").updateOne(
  { title: "CORPORATE EVENTS" },
  { $set: { imageUrl: "/images/2.3.png", imageKey: "corporateEvents", updatedAt: new Date() } }
);
console.log("  ✓ CORPORATE EVENTS -> /images/2.3.png");

await db.collection("projects").updateOne(
  { title: "PRIVATE ENGAGEMENT" },
  { $set: { imageUrl: "/images/2.4.png", imageKey: "privateEngagement", updatedAt: new Date() } }
);
console.log("  ✓ PRIVATE ENGAGEMENT -> /images/2.4.png");

await mongoose.disconnect();
console.log("\nAll MongoDB assets successfully updated to local /images/ paths!");
