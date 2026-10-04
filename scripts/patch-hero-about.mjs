import mongoose from "mongoose";

const BASE = "https://pub-37d7351060641228a3c4c0fe9806ae.r2.dev/uploads/";

await mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection.db;

await db.collection("mediaassets").updateOne(
  { slotKey: "heroBg" },
  { $set: { url: BASE + "heroBg-bfd5437fcb5f2574.webp", filename: "heroBg-bfd5437fcb5f2574.webp", storageProvider: "r2", updatedAt: new Date() } }
);
console.log("heroBg → R2 (local copy) ✅");

await db.collection("mediaassets").updateOne(
  { slotKey: "aboutInterior" },
  { $set: { url: BASE + "aboutInterior-dcc709c80a83e273.webp", filename: "aboutInterior-dcc709c80a83e273.webp", storageProvider: "r2", updatedAt: new Date() } }
);
console.log("aboutInterior → R2 (local copy) ✅");

const all = await db.collection("mediaassets").find({}).toArray();
const localRemaining = all.filter(a => !a.url.startsWith("http"));
const onR2 = all.filter(a => a.storageProvider === "r2").length;

console.log(`\nAll records on R2: ${onR2}/${all.length}`);
console.log(`Local URLs remaining: ${localRemaining.length}`);

if (localRemaining.length > 0) {
  console.log("Still local:");
  for (const a of localRemaining) console.log(`  - ${a.slotKey}: ${a.url}`);
}

await mongoose.disconnect();
console.log("\nDone ✅");
