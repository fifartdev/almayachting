import type { Payload } from "payload";

const teamData = [
  {
    name: "Alexandros Papadopoulos",
    role: "Founder & Managing Director",
    bio: "Former competitive offshore sailor, Alexandros founded ALMA Yachting in 2014 after 15 years racing and cruising in Greek waters. His vision: make the finest sailing experiences in Greece accessible to those who love the sea.",
    order: 1,
  },
  {
    name: "Marina Kostaki",
    role: "Head of Charter Operations",
    bio: "With a background in luxury hospitality and a lifelong passion for sailing, Marina oversees every guest charter from first enquiry to final departure, ensuring every voyage exceeds expectations.",
    order: 2,
  },
  {
    name: "Nikos Georgiou",
    role: "Fleet Technical Director",
    bio: "A marine engineer with 20 years' experience, Nikos ensures every ALMA vessel is maintained to an immaculate standard. His obsession with technical excellence is the reason our fleet is always ready to sail.",
    order: 3,
  },
];

export async function seedTeamMembers(payload: Payload) {
  console.log("👥 Seeding team members...");

  for (const member of teamData) {
    const existing = await payload.find({
      collection: "team-members",
      where: { name: { equals: member.name } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      console.log(`  ✓ Already exists: ${member.name}`);
      continue;
    }

    await payload.create({
      collection: "team-members",
      data: {
        name: member.name,
        role: member.role,
        bio: member.bio,
        order: member.order,
      },
    });

    console.log(`  ✓ Created: ${member.name}`);
  }

  console.log("👥 Team members seeding complete.\n");
}
