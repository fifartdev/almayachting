import type { Payload } from "payload";
import { destinations } from "@/lib/destinations";

export async function seedDestinations(
  payload: Payload,
  mediaMap: Map<string, string>,
) {
  console.log("🏝️  Seeding destinations...");

  for (const dest of destinations) {
    const existing = await payload.find({
      collection: "destinations",
      where: { slug: { equals: dest.id } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      console.log(`  ✓ Already exists: ${dest.name}`);
      continue;
    }

    const imageId = mediaMap.get(dest.image);

    await payload.create({
      collection: "destinations",
      data: {
        name: dest.name,
        slug: dest.id,
        region: dest.region,
        shortDescription: dest.shortDescription,
        description: {
          root: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [{ type: "text", text: dest.description }],
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
          },
        },
        image: imageId || null,
        highlights: dest.highlights.map((text) => ({ text })),
        bestSeason: dest.bestSeason,
        distance: dest.distance,
        seoExtended: {
          focusKeyphrase: `${dest.name} sailing Greece`,
          contentSummary: `${dest.name} is a ${dest.region} destination reachable by yacht from Athens. ${dest.shortDescription}`,
        },
      },
    });

    console.log(`  ✓ Created: ${dest.name}`);
  }

  console.log("🏝️  Destinations seeding complete.\n");
}
