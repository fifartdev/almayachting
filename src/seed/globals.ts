import type { Payload } from "payload";

function toRichText(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      children: paragraphs.map((text) => ({
        type: "paragraph",
        children: [{ type: "text", text }],
        version: 1,
      })),
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

export async function seedGlobals(payload: Payload) {
  console.log("🌐 Seeding globals...");

  // site-settings
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      companyName: "ALMA Yachting",
      tagline: "Bespoke luxury yacht charter and fleet management services across the Greek islands. Sail the Aegean with ALMA.",
      phone: "+30 210 300 1618",
      email: "info@almayachting.com",
      address: "46 Archimidous str., 17563 Paleo Faliro, Athens, Greece",
      officeHours: "Monday – Friday: 9:00 – 18:00\nSaturday: 10:00 – 14:00 (EET / UTC+2)",
      basePort: "Marina Zea · Piraeus · Athens",
    },
  });
  console.log("  ✓ site-settings");

  // homepage
  await payload.updateGlobal({
    slug: "homepage",
    data: {
      hero: {
        label: "Greece · Mediterranean · Aegean",
        headline: "Sail the Mediterranean",
        subheadline: "Bespoke yacht charters across the Greek islands. Where the Aegean meets luxury.",
        ctaPrimaryText: "Explore Our Fleet",
        ctaSecondaryText: "Plan Your Journey",
        stats: [
          { value: "5", label: "Premium Yachts" },
          { value: "8+", label: "Destinations" },
          { value: "300+", label: "Happy Guests" },
          { value: "10+", label: "Years Experience" },
        ],
      },
      aboutIntro: {
        quoteText: "Where the Aegean meets luxury.",
        quoteAttribution: "— ALMA YACHTING, GREECE",
        sectionLabel: "01 / Our Story",
        sectionHeading: "Born from a love of the sea",
        bodyText: toRichText([
          "ALMA Yachting was founded on a singular belief: that the Greek islands deserve to be experienced from the water, on your own terms, with the freedom to discover hidden coves inaccessible to any other traveller.",
          "Based in Athens and operating across the Aegean and Ionian seas, our fleet of premium catamarans represents the finest vessels available for charter in Greece — each one maintained to the highest standard and crewed by professionals who know these waters intimately.",
        ]),
      },
      fleetPreview: {
        label: "02 / Fleet",
        heading: "Our Premium Vessels",
        subtitle: "Five exceptional catamarans, each a floating sanctuary for the discerning traveller.",
      },
      servicesSection: {
        label: "03 / Services",
        heading: "What We Offer",
        subtitle: "A complete suite of maritime services, delivered with Greek warmth and world-class precision.",
      },
      destinationsSection: {
        label: "04 / Destinations",
        heading: "Greek Island Paradise",
        subtitle: "From the glamour of Mykonos to the serenity of Hydra — discover Greece as only a yacht can show you.",
      },
      ctaSection: {
        label: "05 / Begin Your Journey",
        heading: "Ready to Set Sail?",
        bodyText: "Contact our team to begin crafting your perfect Greek sailing experience. We respond within 24 hours.",
        ctaPrimaryText: "Plan Your Charter",
        ctaSecondaryText: "Browse Our Fleet",
      },
      seoExtended: {
        focusKeyphrase: "luxury yacht charter Greece",
        secondaryKeyphrases: [
          { phrase: "catamaran charter Greek islands" },
          { phrase: "sailing holiday Aegean" },
          { phrase: "yacht charter Athens" },
        ],
        contentSummary: "ALMA Yachting offers bespoke luxury catamaran charters across the Greek islands, departing from Athens. With 5 premium vessels, 10+ years of experience, and both crewed and bareboat options, ALMA Yachting is Greece's leading yacht charter company.",
      },
    },
  });
  console.log("  ✓ homepage");

  // about-page
  await payload.updateGlobal({
    slug: "about-page",
    data: {
      pageLabel: "06 / About",
      pageHeading: "Our Story",
      storyHeading: "Born in Athens, Made for the Sea",
      storyText: toRichText([
        "ALMA Yachting was born from a simple conviction: that the Greek islands — among the most beautiful places on Earth — are best experienced not from a hotel terrace, but from the deck of a yacht, with the freedom to go wherever the wind and your curiosity lead you.",
        "Founded in Athens in 2014 by competitive sailor Alexandros Papadopoulos, ALMA started as a single-vessel charter operation in the Saronic Gulf. Within three years, growing demand from discerning international guests had led to the development of our current fleet of five premium catamarans — each chosen for the quality of their design, performance, and onboard experience.",
        "Today, ALMA Yachting serves guests from more than 30 countries, offering not just yacht charter but a full suite of maritime services: fleet management, crewing, and a concierge programme designed to make every moment on the Greek islands unforgettable. We are, in every sense, a company built by sailors, for those who love the sea.",
      ]),
      stats: [
        { value: "5", label: "Premium Yachts" },
        { value: "10+", label: "Years Experience" },
        { value: "300+", label: "Happy Guests" },
        { value: "50+", label: "Destinations" },
      ],
      values: [
        { title: "Passion", description: "We are sailors first and a company second. Every decision we make is filtered through one question: does this make our guests' time on the water better?" },
        { title: "Integrity", description: "Transparent pricing, honest advice, and no hidden surprises. We tell you exactly what to expect, because the last thing we want is for reality to fall short of the promise." },
        { title: "Expertise", description: "Decades of combined sailing experience across the Aegean and Ionian seas. We know these waters not just professionally, but intimately — as sailors who love them." },
        { title: "Sustainability", description: "The sea we sail is the sea we cherish. We minimise our environmental footprint through modern vessel technology, responsible anchoring practices, and partnerships with local conservation initiatives." },
      ],
      ctaHeading: "Sail with ALMA",
      ctaBodyText: "Join the hundreds of guests who have experienced the Greek islands through our eyes — and our fleet.",
      seoExtended: {
        focusKeyphrase: "ALMA Yachting Athens",
        contentSummary: "ALMA Yachting is a luxury yacht charter company founded in Athens in 2014. With 10+ years of experience, 5 premium catamarans, and guests from 30+ countries, ALMA offers crewed and bareboat charter across the Greek islands.",
      },
    },
  });
  console.log("  ✓ about-page");

  // fleet-page
  await payload.updateGlobal({
    slug: "fleet-page",
    data: {
      pageLabel: "02 / Fleet",
      pageHeading: "Our Fleet",
      introText: "Five premium catamarans. All based in Athens. All available for crewed or bareboat charter.",
      stats: [
        { value: "5", label: "Vessels" },
        { value: "44–55ft", label: "Length Range" },
        { value: "6–8", label: "Guests" },
      ],
      bespokeSection: {
        heading: "Can't find your perfect match?",
        subtitle: "Tell us your dream voyage and we'll find the ideal vessel from our extended network of premium yachts across Greece.",
        details: [
          { label: "Charter Types", value: "Bareboat & Crewed" },
          { label: "Base Port", value: "Athens, Greece" },
          { label: "Season", value: "April – November" },
          { label: "Response Time", value: "Within 24 Hours" },
        ],
      },
      seoExtended: {
        focusKeyphrase: "catamaran fleet charter Greece",
        contentSummary: "ALMA Yachting operates a fleet of 5 premium catamarans ranging from 44 to 55 feet, all based in Athens. Lagoon and Fountaine Pajot models available for crewed or bareboat charter across the Greek islands.",
      },
    },
  });
  console.log("  ✓ fleet-page");

  // destinations-page
  await payload.updateGlobal({
    slug: "destinations-page",
    data: {
      pageLabel: "04 / Destinations",
      pageHeading: "Greek Islands",
      pageSubheading: "The Aegean, Ionian and Saronic seas await.",
      seas: [
        { name: "Aegean Sea", description: "The birthplace of Western civilisation, dotted with iconic Cycladic islands and historic Dodecanese outposts.", islands: "Mykonos, Santorini, Paros, Rhodes" },
        { name: "Ionian Sea", description: "Calmer, verdant, and extraordinarily beautiful — the Ionian offers gentler sailing and lush green islands.", islands: "Corfu, Zakynthos, Kefalonia, Ithaca" },
        { name: "Saronic Gulf", description: "Athens' backyard archipelago — easily accessible, deeply beautiful, and far less crowded than the Cyclades.", islands: "Hydra, Spetses, Aegina, Poros" },
      ],
      destinationsGridHeading: "Where Will You Sail?",
      customRouteCta: {
        heading: "Create Your Custom Route",
        bodyText: "Tell us your dream islands and we'll craft the perfect itinerary — from a weekend Saronic hop to a two-week Aegean odyssey.",
      },
      seoExtended: {
        focusKeyphrase: "Greek island sailing destinations",
        contentSummary: "ALMA Yachting charters to destinations across the Aegean, Ionian, and Saronic seas including Santorini, Mykonos, Corfu, Hydra, and Spetses, all departing from Athens.",
      },
    },
  });
  console.log("  ✓ destinations-page");

  // services-page
  await payload.updateGlobal({
    slug: "services-page",
    data: {
      pageLabel: "03 / Services",
      pageHeading: "What We Offer",
      pageSubheading: "A complete suite of maritime services, delivered with Greek warmth.",
      whyAlmaLabel: "Why ALMA",
      whyAlmaHeading: "The ALMA Difference",
      whyAlmaSubtitle: "We're not a booking platform. We're a team of passionate sailors who happen to run a company.",
      whyAlmaStats: [
        { stat: "10+", label: "Years in the Aegean", description: "Over a decade of navigating these waters" },
        { stat: "300+", label: "Happy Guests", description: "Guests who return season after season" },
        { stat: "5", label: "Premium Vessels", description: "Maintained to the highest standard" },
        { stat: "24h", label: "Response Time", description: "We're always reachable when you need us" },
      ],
      seoExtended: {
        focusKeyphrase: "yacht charter fleet management Greece",
        contentSummary: "ALMA Yachting offers yacht charter, fleet management, crewing, and concierge services across the Greek islands. Both crewed and bareboat charter options available from Athens.",
      },
    },
  });
  console.log("  ✓ services-page");

  // contact-page
  await payload.updateGlobal({
    slug: "contact-page",
    data: {
      pageLabel: "07 / Contact",
      pageHeading: "Get in Touch",
      subheading: "Begin Your Journey",
      introText: "Whether you have a specific voyage in mind or simply want to explore the possibilities, our team is here to help. We respond to all enquiries within 24 hours.",
      mapLabel: "Alimos Marina, Athens",
      responseGuarantee: "We reply within 24 hours",
      seoExtended: {
        focusKeyphrase: "contact yacht charter Greece",
        contentSummary: "Contact ALMA Yachting for yacht charter enquiries. Office at 46 Archimidous str., Paleo Faliro, Athens. Phone: +30 210 300 1618. Email: info@almayachting.com. Response within 24 hours.",
      },
    },
  });
  console.log("  ✓ contact-page");

  console.log("🌐 Globals seeding complete.\n");
}
