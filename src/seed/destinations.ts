import type { Payload } from "payload";

interface SeedDestination {
  id: string; name: string; region: string; description: string;
  shortDescription: string; image: string; highlights: string[];
  bestSeason: string; distance: string;
}

const destinations: SeedDestination[] = [
  {
    id: "lefkada", name: "Lefkada", region: "Ionian Islands",
    description: "Lefkada is the Ionian's best-kept secret — a mountainous island of rare natural beauty connected to the mainland by a narrow causeway, yet surrounded by waters that rival the Caribbean in their clarity and colour. The west coast is home to Porto Katsiki and Egremni, two of the most dramatic beaches in all of Greece: white pebbles tumbling into seas of impossible turquoise, backed by sheer white limestone cliffs. Sailing south from Lefkada, you enter the sheltered waters of the Lefkada channel and the protected Nidri strait, a cruising ground studded with small green islets — Meganisi, Skorpios, Kastos — each with its own hidden anchorage and taverna at the water's edge.",
    shortDescription: "Mountainous Ionian island with Caribbean-blue waters and dramatic white-cliff beaches.",
    image: "/images/destinations/lefkada.jpg",
    highlights: ["Porto Katsiki — one of Greece's finest beaches", "Protected Nidri strait and island-hopping anchorages", "Skorpios island — former Onassis private retreat", "Exceptional sailing winds for experienced crews"],
    bestSeason: "May – October", distance: "185 nautical miles from Athens",
  },
  {
    id: "zakynthos", name: "Zakynthos", region: "Ionian Islands",
    description: "Zakynthos — known to Italians as Zante, 'the flower of the Levant' — is an island of extraordinary natural drama. The famous Navagio Beach (Shipwreck Beach), accessible only by sea, is one of the most photographed places on Earth: a pristine crescent of white pebbles enclosed by towering limestone cliffs, with the rusting hull of a smuggler's ship at its centre. The Blue Caves, carved by centuries of wave action into the northern cliffs, glow with an otherworldly light in the afternoon sun. Loggerhead sea turtles nest on the southern beaches, making a late-night anchorage here a privileged wildlife encounter.",
    shortDescription: "Home to the legendary Shipwreck Beach and the magical Blue Caves.",
    image: "/images/destinations/zakynthos.jpg",
    highlights: ["Iconic Navagio Shipwreck Beach", "Blue Caves sea kayaking and exploration", "Loggerhead turtle nesting beaches", "Verdant hills and Venetian heritage"],
    bestSeason: "May – September", distance: "190 nautical miles from Athens",
  },
  {
    id: "spetses", name: "Spetses", region: "Saronic Gulf",
    description: "Spetses is the most aristocratic island in the Saronic Gulf — a fragrant pine-covered island of elegant neoclassical mansions, horse-drawn carriages, and a sailing culture that runs deep in its blood. Cars are largely banned from the old town, lending the seafront a timeless quality that has made Spetses a favourite retreat for Athenian families and discerning international visitors for generations. The island's position at the mouth of the Argolic Gulf makes it the ideal base for exploring the broader Saronic and Argolic chains: Hydra, Dokos, Ermioni, and the ancient ruins of Epidaurus are all within a half-day's sail.",
    shortDescription: "Aristocratic pine-covered island with neoclassical mansions and a proud sailing heritage.",
    image: "/images/destinations/spetses.jpg",
    highlights: ["Car-free old harbour with horse-drawn carriages", "Elegant neoclassical mansions and pine-lined lanes", "Gateway to the Argolic Gulf and ancient Epidaurus", "Just 55 nautical miles from Athens"],
    bestSeason: "April – October", distance: "55 nautical miles from Athens",
  },
  {
    id: "hydra", name: "Hydra", region: "Saronic Gulf",
    description: "Hydra is the most singular island in all of Greece. Motor vehicles are banned here — the only transport is by foot, donkey, or boat — and the result is an island of perfect, timeless tranquility. The horseshoe harbour, ringed by grand 18th-century stone mansions built by shipping merchants, is one of the most beautiful in the Aegean. Artists, writers, and musicians have found sanctuary here for generations, drawn by the quality of the light, the silence, and the sense that time moves at a different pace. As the closest jewel in the Saronic chain to Athens, Hydra is the perfect first or last night of any Greek charter.",
    shortDescription: "The car-free island of artists and stone mansions — closest gem to Athens.",
    image: "/images/destinations/hydra.jpg",
    highlights: ["No motor vehicles — total tranquility", "Elegant 18th-century stone mansions", "Artist and literary heritage", "Just 40 nautical miles from Athens"],
    bestSeason: "April – October", distance: "40 nautical miles from Athens",
  },
];

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
