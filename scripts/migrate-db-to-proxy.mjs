import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection.db;

const assets = await db.collection("mediaassets").find({}).toArray();
console.log(`Checking ${assets.length} media assets...`);

for (const a of assets) {
  if (a.url && a.url.includes("r2.dev/uploads/")) {
    const filename = a.url.split("/").pop();
    await db.collection("mediaassets").updateOne(
      { _id: a._id },
      { $set: { url: `/api/media/uploads/${filename}`, updatedAt: new Date() } }
    );
    console.log(`  ✓ ${a.slotKey} -> /api/media/uploads/${filename}`);
  }
}

const projects = await db.collection("projects").find({}).toArray();
console.log(`Checking ${projects.length} projects...`);
for (const p of projects) {
  if (p.imageUrl && p.imageUrl.includes("r2.dev/uploads/")) {
    const filename = p.imageUrl.split("/").pop();
    await db.collection("projects").updateOne(
      { _id: p._id },
      { $set: { imageUrl: `/api/media/uploads/${filename}`, updatedAt: new Date() } }
    );
    console.log(`  ✓ Project "${p.title}" -> /api/media/uploads/${filename}`);
  }
}

await mongoose.disconnect();
console.log("Finished migrating all DB records to /api/media proxy!");
