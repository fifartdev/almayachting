import type { Payload } from "payload";

interface SeedYacht {
  name: string; slug: string; type: string; year: number;
  length: string; beam: string; draft: string; guests: number;
  cabins: number; bathrooms: number; crew: number; description: string;
  highlights: string[]; specifications: Record<string, string>;
  images: string[]; heroImage: string; startingPrice: number;
  location: string; basePort: string;
}

const yachts: SeedYacht[] = [
  {
    name: "Lagoon 55", slug: "lagoon-55", type: "Luxury Catamaran", year: 2026,
    length: "55ft", beam: "27ft", draft: "4.3ft", guests: 8, cabins: 4, bathrooms: 4, crew: 2,
    description: "The Lagoon 55 represents the pinnacle of modern catamaran design — a vessel where sweeping ocean vistas meet the refinement of a boutique hotel at sea. Her expansive flybridge commands panoramic views of the Aegean, while the generous cockpit becomes an open-air salon perfect for alfresco dining under the Greek stars. Below deck, four lavishly appointed owner suites each feature an en-suite bathroom, premium linens, and thoughtful touches that make extended voyages feel effortlessly luxurious. Whether you're gliding between the Cyclades or anchored in a secluded Ionian bay, the Lagoon 55 is a floating sanctuary that elevates every moment on the water.",
    highlights: ["Panoramic flybridge with 360° Mediterranean views", "Four en-suite owner cabins with premium bedding", "Expansive cockpit for alfresco dining at anchor", "State-of-the-art navigation and safety systems", "Professional chef and captain available", "Hydraulic swim platform with water sports equipment", "Solar panels and lithium battery bank for eco-cruising", "Air conditioning throughout all living spaces"],
    specifications: { loa: "16.75m (55ft)", beam: "8.35m (27ft)", draft: "1.30m (4.3ft)", displacement: "18,000 kg", sailArea: "170 m²", engines: "2 × Yanmar 57hp", fuelCapacity: "900L", waterCapacity: "700L", maxSpeed: "14 knots", cruisingSpeed: "8–10 knots" },
    images: ["/images/Lagoon55/Lagoon-55-2.jpg", "/images/Lagoon55/Lagoon-55-3.jpg", "/images/Lagoon55/Lagoon-55-4.jpg", "/images/Lagoon55/Lagoon-55-5.jpg", "/images/Lagoon55/Lagoon-55-6.jpg", "/images/Lagoon55/Lagoon-55-7.jpg", "/images/Lagoon55/Lagoon-55-8.jpg"],
    heroImage: "/images/Lagoon55/Lagoon-55-1.jpg", startingPrice: 12000, location: "Greece", basePort: "Athens, Greece",
  },
  {
    name: "Lagoon 51", slug: "lagoon-51", type: "Luxury Catamaran", year: 2024,
    length: "51ft", beam: "25ft", draft: "4.1ft", guests: 8, cabins: 4, bathrooms: 4, crew: 2,
    description: "The Lagoon 51 strikes an exquisite balance between performance and pleasure, making her the ideal companion for an Aegean odyssey. Her sleek hull cuts through azure waters with precision while her interiors — bathed in natural light through generous port lights and hatches — offer an ambience of refined tranquility. The large saloon with its panoramic windows blurs the boundary between inside and out, creating a seamless connection with the surrounding seascape. Four generous cabins ensure each guest enjoys their own private sanctuary, making the Lagoon 51 perfect for two couples or a family seeking an unforgettable Greek sailing experience.",
    highlights: ["Award-winning Nauta Design interior", "Full beam saloon with panoramic windows", "Four private cabins each with en-suite", "Performance rigging for spirited sailing", "Electric windlass and bow thruster", "Watermaker and generator on board", "Tender and outboard motor included", "Integrated audio system throughout"],
    specifications: { loa: "15.62m (51ft)", beam: "7.99m (26ft)", draft: "1.25m (4.1ft)", displacement: "14,500 kg", sailArea: "148 m²", engines: "2 × Yanmar 45hp", fuelCapacity: "750L", waterCapacity: "600L", maxSpeed: "13 knots", cruisingSpeed: "7–9 knots" },
    images: ["/images/Lagoon51/Lagoon-51-1.jpg", "/images/Lagoon51/Lagoon-51-2.jpg", "/images/Lagoon51/Lagoon-51-4.jpg", "/images/Lagoon51/Lagoon-51-5.jpg", "/images/Lagoon51/Lagoon-51-6.jpg"],
    heroImage: "/images/Lagoon51/Lagoon-51-3.jpg", startingPrice: 9500, location: "Greece", basePort: "Athens, Greece",
  },
  {
    name: "Lagoon 46", slug: "lagoon-46", type: "Luxury Catamaran", year: 2023,
    length: "46ft", beam: "24ft", draft: "3.9ft", guests: 6, cabins: 3, bathrooms: 3, crew: 2,
    description: "Elegant and spirited, the Lagoon 46 is the quintessential vessel for intimate Greek island exploration. Her modern lines and optimized hull form deliver a sailing experience that rewards both the seasoned skipper and the charter guest seeking effortless comfort. Three generously proportioned cabins each with private bathroom create a sense of personal space rarely found at this size. The forward cockpit — a Lagoon signature — offers an intimate seating area close to the water, perfect for morning coffee as you watch the sun rise over the Cyclades. This is luxury sailing distilled to its most essential and beautiful form.",
    highlights: ["Signature Lagoon forward cockpit lounge", "Three en-suite cabins with natural light", "Optimized hull for performance sailing", "Large trampoline nets for sun lounging", "Fully equipped galley with premium appliances", "Bimini and spray hood for all-weather comfort", "LED underwater lights for evening anchorages", "USB charging and entertainment system"],
    specifications: { loa: "14.06m (46ft)", beam: "7.55m (24.7ft)", draft: "1.18m (3.9ft)", displacement: "11,200 kg", sailArea: "125 m²", engines: "2 × Yanmar 40hp", fuelCapacity: "600L", waterCapacity: "500L", maxSpeed: "12 knots", cruisingSpeed: "7–8 knots" },
    images: ["/images/Lagoon46/Lagoon-46-2.jpg", "/images/Lagoon46/Lagoon-46-3.jpg", "/images/Lagoon46/Lagoon-46-4.jpg", "/images/Lagoon46/Lagoon-46-5.jpg", "/images/Lagoon46/Lagoon-46-6.jpg"],
    heroImage: "/images/Lagoon46/Lagoon-46-1.jpg", startingPrice: 7500, location: "Greece", basePort: "Athens, Greece",
  },
  {
    name: "Fountaine Pajot 51", slug: "fountaine-pajot-51", type: "Sailing Catamaran", year: 2025,
    length: "51ft", beam: "26ft", draft: "4.1ft", guests: 8, cabins: 4, bathrooms: 4, crew: 2,
    description: "The Fountaine Pajot 51 embodies French savoir-faire applied to the art of blue-water sailing. Born from decades of ocean racing heritage, she delivers an exhilarating under-canvas experience without ever compromising on the comfort her guests deserve. The sweeping coachroof provides shade over a vast outdoor living area, while the racing-inspired rig allows her to make exhilarating passages between the Greek islands. Her interior design philosophy embraces clean lines and natural materials — teak, leather, and fine fabrics — creating spaces that feel both contemporary and warmly inviting. For those who wish to truly sail Greece rather than merely motor through it, the FP51 is the definitive choice.",
    highlights: ["Racing heritage hull for exceptional performance", "Vast outdoor cockpit with removable shade structure", "Four premium owner cabins with sea views", "French design interior with natural material palette", "Performance furling mainsail and genoa", "Professional crew available with local knowledge", "Water sports package: paddleboards, snorkeling gear", "Gourmet galley with twin ovens and wine fridge"],
    specifications: { loa: "15.50m (51ft)", beam: "8.00m (26ft)", draft: "1.25m (4.1ft)", displacement: "13,800 kg", sailArea: "155 m²", engines: "2 × Volvo 50hp", fuelCapacity: "800L", waterCapacity: "650L", maxSpeed: "14 knots", cruisingSpeed: "8–11 knots" },
    images: ["/images/FP51/FP-51-2.jpg", "/images/FP51/FP-51-3.jpg", "/images/FP51/FP-51-4.jpg", "/images/FP51/FP-51-5.jpg", "/images/FP51/FP-51-6.jpg", "/images/FP51/FP-51-1.jpg", "/images/FP51/FP-51-8.jpg", "/images/FP51/FP-51-9.jpg", "/images/FP51/FP-51-10.jpg"],
    heroImage: "/images/FP51/FP-51-7.jpg", startingPrice: 9000, location: "Greece", basePort: "Athens, Greece",
  },
  {
    name: "Fountaine Pajot 44", slug: "fountaine-pajot-44", type: "Sailing Catamaran", year: 2024,
    length: "44ft", beam: "23ft", draft: "3.8ft", guests: 6, cabins: 3, bathrooms: 3, crew: 2,
    description: "Graceful, responsive, and beautifully proportioned, the Fountaine Pajot 44 is the ideal canvas for a curated Greek sailing experience. Her compact dimensions belie an interior of surprising spaciousness — three private cabins, a wide saloon, and a dedicated navigation station reflect the thoughtful design that has made Fountaine Pajot synonymous with the finest in French catamaran building. On deck, the cockpit extends generously aft, offering a social hub where guests gather as evening light turns the Aegean gold. She sails beautifully in the meltemi breezes of the Cyclades, rewarding those who choose to harness the wind over the engine.",
    highlights: ["Responsive sailing performance in all conditions", "Spacious cockpit perfect for social gatherings", "Three private en-suite cabins", "Wide saloon with panoramic visibility", "Autopilot and chartplotter with Greek charts", "Snorkeling and paddleboard equipment", "Cockpit BBQ for Greek-island style dining", "Bluetooth sound system on deck and below"],
    specifications: { loa: "13.48m (44ft)", beam: "7.17m (23.5ft)", draft: "1.15m (3.8ft)", displacement: "10,500 kg", sailArea: "118 m²", engines: "2 × Volvo 40hp", fuelCapacity: "550L", waterCapacity: "450L", maxSpeed: "12 knots", cruisingSpeed: "7–9 knots" },
    images: ["/images/FP44/FP-44-1.jpg", "/images/FP44/FP-44-2.jpg", "/images/FP44/FP-44-3.jpg", "/images/FP44/FP-44-5.jpg", "/images/FP44/FP-44-6.jpg", "/images/FP44/FP-44-7.jpg", "/images/FP44/FP-44-8.jpg", "/images/FP44/FP-44-9.jpg", "/images/FP44/FP-44-10.jpg"],
    heroImage: "/images/FP44/FP-44-4.jpg", startingPrice: 6500, location: "Greece", basePort: "Athens, Greece",
  },
];

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
