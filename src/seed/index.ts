/**
 * Master seed script. Run once against a fresh database:
 *   npm run seed
 *
 * The script is idempotent — it checks for existing records before inserting,
 * so re-running against a populated database is safe but will skip all records.
 */
import { getPayload } from "@/lib/payload";
import { seedMedia } from "./media";
import { seedVessels } from "./vessels";
import { seedDestinations } from "./destinations";
import { seedServices } from "./services";
import { seedTeamMembers } from "./team-members";
import { seedGlobals } from "./globals";

async function main() {
  console.log("🚀 ALMA Yachting — Payload CMS seed starting...\n");

  const payload = await getPayload();

  // 1. Upload all images first — returns localPath → ID map
  const mediaMap = await seedMedia(payload);

  // 2. Collections (depend on media IDs)
  await seedVessels(payload, mediaMap);
  await seedDestinations(payload, mediaMap);
  await seedServices(payload, mediaMap);
  await seedTeamMembers(payload);

  // 3. Globals (page text, no media dependencies)
  await seedGlobals(payload);

  console.log("✅ Seed complete. All data is now in Payload CMS.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
