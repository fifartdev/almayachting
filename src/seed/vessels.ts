import type { Payload } from "payload";
import { yachts } from "@/lib/yachts";

function parseHighlights(items: string[]) {
  return items.map((text) => ({ text }));
}

export async function seedVessels(
  payload: Payload,
  mediaMap: Map<string, string>,
) {
  console.log("⛵ Seeding vessels...");

  for (const yacht of yachts) {
    const existing = await payload.find({
      collection: "vessels",
      where: { slug: { equals: yacht.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      console.log(`  ✓ Already exists: ${yacht.name}`);
      continue;
    }

    const heroImageId = mediaMap.get(yacht.heroImage);
    const galleryImages = yacht.images
      .map((imgPath) => {
        const id = mediaMap.get(imgPath);
        return id ? { image: id } : null;
      })
      .filter(Boolean) as { image: string }[];

    await payload.create({
      collection: "vessels",
      data: {
        name: yacht.name,
        slug: yacht.slug,
        type: yacht.type,
        year: yacht.year,
        length: yacht.length,
        beam: yacht.beam,
        draft: yacht.draft,
        guests: yacht.guests,
        cabins: yacht.cabins,
        bathrooms: yacht.bathrooms,
        crew: yacht.crew,
        startingPrice: yacht.startingPrice,
        location: yacht.location,
        basePort: yacht.basePort,
        description: {
          root: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [{ type: "text", text: yacht.description }],
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
          },
        },
        highlights: parseHighlights(yacht.highlights),
        specifications: yacht.specifications,
        heroImage: heroImageId || null,
        images: galleryImages,
        seoExtended: {
          focusKeyphrase: `${yacht.name} charter Greece`,
          contentSummary: `${yacht.name} is a ${yacht.year} ${yacht.type} accommodating ${yacht.guests} guests in ${yacht.cabins} cabins. Available for crewed and bareboat charter from Athens from €${yacht.startingPrice.toLocaleString()}/week.`,
        },
      },
    });

    console.log(`  ✓ Created: ${yacht.name}`);
  }

  console.log("⛵ Vessels seeding complete.\n");
}
