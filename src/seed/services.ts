import type { Payload } from "payload";

const servicesData = [
  {
    id: "charter",
    order: 1,
    title: "Yacht Charter",
    subtitle: "Tailor-made sailing experiences",
    shortDescription:
      "Tailor-made sailing experiences across the Greek islands. Choose your vessel, your crew, and your itinerary — we handle every detail.",
    description:
      "Every ALMA charter is built around you. Whether you're seeking a bareboat adventure with just the wind for company, or a fully crewed experience where every detail is handled by professionals, our team will craft an itinerary that transforms your time in Greece into something truly extraordinary.",
    longDescription:
      "We operate two charter models: bareboat, where qualified sailors take the helm themselves with complete freedom to explore at their own pace; and crewed, where an experienced captain and optional chef take care of everything while you simply enjoy the journey. Both models draw on our intimate knowledge of the Greek waters — from the iconic anchorages to the hidden coves that no guidebook will ever reveal.",
    features: [
      "Bareboat and fully crewed charter options",
      "Customisable itineraries across all Greek waters",
      "Flexible departure from Athens (Piraeus) or Corfu",
      "Provisioning and victualling services",
      "Airport transfers and logistics coordination",
      "24/7 shore support throughout your voyage",
    ],
    image: "/images/services/yacht-charter.jpg",
  },
  {
    id: "management",
    order: 2,
    title: "Fleet Management",
    subtitle: "Professional care for your vessel",
    shortDescription:
      "Professional care and maintenance for your vessel. From technical oversight to mooring arrangements, your yacht is in expert hands.",
    description:
      "Owning a yacht in Greece is a privilege — maintaining her to the standard she deserves is a full-time commitment. ALMA Yachting's fleet management service means your vessel is always ready to sail, whether you're stepping aboard next weekend or in three months' time.",
    longDescription:
      "Our team of experienced marine engineers and naval architects oversee every aspect of vessel care: scheduled maintenance, antifouling, engine servicing, rigging inspection, and cosmetic upkeep. We manage mooring arrangements at the finest marinas in Greece, handle the administrative requirements of vessel ownership, and can generate charter revenue from your yacht when you're not using it — helping offset the cost of ownership.",
    features: [
      "Comprehensive technical maintenance programme",
      "Annual haul-out and antifouling management",
      "Marina and berthing arrangements",
      "Insurance and documentation handling",
      "Revenue generation through managed charter",
      "Monthly condition reports and photography",
    ],
    image: "/images/services/fleet-management.jpg",
  },
  {
    id: "crewing",
    order: 3,
    title: "Crewing Services",
    subtitle: "Experienced Greek maritime professionals",
    shortDescription:
      "Experienced Greek captains and crews with deep knowledge of local waters, hidden anchorages, and island culture.",
    description:
      "There is no substitute for local knowledge. Our captains have spent their careers navigating these specific waters — they know where the meltemi blows hardest, which bays offer perfect shelter in a southerly, and which taverna on which island will give you the meal of your life.",
    longDescription:
      "Every ALMA crew member is rigorously vetted, fully licensed, and deeply passionate about sharing the best of Greece with their guests. Our skippers hold internationally recognised qualifications; our onboard chefs are trained in Greek and Mediterranean cuisine. We match crew to guest preferences carefully — a young, active couple planning to sail hard will receive a different crew recommendation than a multigenerational family looking for a relaxed, food-focused voyage.",
    features: [
      "RYA/MCA certified captains and first mates",
      "Professional onboard chefs on request",
      "Crew trained in first aid and safety procedures",
      "Local guides and dive instructors available",
      "Multilingual crew options (English, Greek, French, German)",
      "Careful crew-to-guest personality matching",
    ],
    image: "/images/services/crewing-services.jpg",
  },
  {
    id: "concierge",
    order: 4,
    title: "Concierge & Extras",
    subtitle: "Curated island experiences",
    shortDescription:
      "Private chefs, curated island experiences, restaurant reservations, helicopter transfers — your perfect voyage, curated by us.",
    description:
      "The yacht is your floating home. The Greek islands are your playground. Our concierge team exists to ensure that everything beyond the water — and much of what happens on it — meets the same standard of excellence that defines the ALMA experience.",
    longDescription:
      "From the moment you land at Athens airport to the moment you depart, ALMA's concierge service manages every logistical detail. We handle restaurant reservations at sought-after island tables, organise private wine tastings at Santorini's finest estates, arrange helicopter transfers for those who want to maximise their time afloat, and source water sports equipment, dive charters, and private guides for shore excursions. Nothing is too complex; everything is handled with discretion and care.",
    features: [
      "Priority restaurant reservations across the islands",
      "Private wine tours and archaeological site visits",
      "Helicopter and seaplane transfers",
      "Water sports and diving equipment",
      "Private chefs and event catering on board",
      "Bespoke wedding and celebration packages",
    ],
    image: "/images/services/concierge-extras.jpg",
  },
];

function toRichText(text: string) {
  return {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", text }],
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

export async function seedServices(
  payload: Payload,
  mediaMap: Map<string, string>,
) {
  console.log("⚓ Seeding services...");

  for (const svc of servicesData) {
    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: svc.id } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      console.log(`  ✓ Already exists: ${svc.title}`);
      continue;
    }

    const imageId = mediaMap.get(svc.image);

    await payload.create({
      collection: "services",
      data: {
        title: svc.title,
        slug: svc.id,
        order: svc.order,
        subtitle: svc.subtitle,
        shortDescription: svc.shortDescription,
        description: toRichText(svc.description),
        longDescription: toRichText(svc.longDescription),
        features: svc.features.map((text) => ({ text })),
        image: imageId || null,
        seoExtended: {
          focusKeyphrase: `${svc.title.toLowerCase()} Greece`,
        },
      },
    });

    console.log(`  ✓ Created: ${svc.title}`);
  }

  console.log("⚓ Services seeding complete.\n");
}
