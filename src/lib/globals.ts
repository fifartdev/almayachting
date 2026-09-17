/**
 * Data layer for singleton page content (Payload globals).
 * Falls back to the same defaults defined on each global's schema if the
 * DB is unreachable, so pages never render blank.
 */
import { getPayload } from "@/lib/payload";

export interface StatItem {
  value: string;
  label: string;
}

export interface HomepageContent {
  hero: {
    label: string;
    headline: string;
    subheadline: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    stats: StatItem[];
  };
  aboutIntro: {
    quoteText: string;
    quoteAttribution: string;
    sectionLabel: string;
    sectionHeading: string;
    bodyText: unknown;
  };
  fleetPreview: {
    label: string;
    heading: string;
    subtitle: string;
  };
  servicesSection: {
    label: string;
    heading: string;
    subtitle: string;
  };
  destinationsSection: {
    label: string;
    heading: string;
    subtitle: string;
  };
  ctaSection: {
    label: string;
    heading: string;
    bodyText: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
  };
}

const homepageDefaults: HomepageContent = {
  hero: {
    label: "Greece · Mediterranean · Aegean",
    headline: "Sail the Mediterranean",
    subheadline:
      "Bespoke yacht charters across the Greek islands. Where the Aegean meets luxury.",
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
    bodyText: null,
  },
  fleetPreview: {
    label: "02 / Fleet",
    heading: "Our Premium Vessels",
    subtitle:
      "Five exceptional catamarans, each a floating sanctuary for the discerning traveller.",
  },
  servicesSection: {
    label: "03 / Services",
    heading: "What We Offer",
    subtitle:
      "A complete suite of maritime services, delivered with Greek warmth and world-class precision.",
  },
  destinationsSection: {
    label: "04 / Destinations",
    heading: "Greek Island Paradise",
    subtitle:
      "From the glamour of Mykonos to the serenity of Hydra — discover Greece as only a yacht can show you.",
  },
  ctaSection: {
    label: "05 / Begin Your Journey",
    heading: "Ready to Set Sail?",
    bodyText:
      "Contact our team to begin crafting your perfect Greek sailing experience. We respond within 24 hours.",
    ctaPrimaryText: "Plan Your Charter",
    ctaSecondaryText: "Browse Our Fleet",
  },
};

export async function getHomepage(): Promise<HomepageContent> {
  try {
    const payload = await getPayload();
    const doc = await payload.findGlobal({ slug: "homepage" });
    return {
      hero: { ...homepageDefaults.hero, ...(doc.hero as object) },
      aboutIntro: { ...homepageDefaults.aboutIntro, ...(doc.aboutIntro as object) },
      fleetPreview: { ...homepageDefaults.fleetPreview, ...(doc.fleetPreview as object) },
      servicesSection: { ...homepageDefaults.servicesSection, ...(doc.servicesSection as object) },
      destinationsSection: { ...homepageDefaults.destinationsSection, ...(doc.destinationsSection as object) },
      ctaSection: { ...homepageDefaults.ctaSection, ...(doc.ctaSection as object) },
    };
  } catch {
    return homepageDefaults;
  }
}

export interface AboutPageContent {
  pageLabel: string;
  pageHeading: string;
  storyHeading: string;
  storyText: unknown;
  stats: StatItem[];
  values: Array<{ title: string; description: string }>;
  ctaHeading: string;
  ctaBodyText: string;
}

const aboutPageDefaults: AboutPageContent = {
  pageLabel: "06 / About",
  pageHeading: "Our Story",
  storyHeading: "Born in Athens, Made for the Sea",
  storyText: null,
  stats: [
    { value: "5", label: "Premium Yachts" },
    { value: "10+", label: "Years Experience" },
    { value: "300+", label: "Happy Guests" },
    { value: "50+", label: "Destinations" },
  ],
  values: [
    {
      title: "Passion",
      description:
        "We are sailors first and a company second. Every decision we make is filtered through one question: does this make our guests' time on the water better?",
    },
    {
      title: "Integrity",
      description:
        "Transparent pricing, honest advice, and no hidden surprises. We tell you exactly what to expect, because the last thing we want is for reality to fall short of the promise.",
    },
    {
      title: "Expertise",
      description:
        "Decades of combined sailing experience across the Aegean and Ionian seas. We know these waters not just professionally, but intimately — as sailors who love them.",
    },
    {
      title: "Sustainability",
      description:
        "The sea we sail is the sea we cherish. We minimise our environmental footprint through modern vessel technology, responsible anchoring practices, and partnerships with local conservation initiatives.",
    },
  ],
  ctaHeading: "Sail with ALMA",
  ctaBodyText:
    "Join the hundreds of guests who have experienced the Greek islands through our eyes — and our fleet.",
};

export async function getAboutPage(): Promise<AboutPageContent> {
  try {
    const payload = await getPayload();
    const doc = await payload.findGlobal({ slug: "about-page" });
    return {
      pageLabel: (doc.pageLabel as string) ?? aboutPageDefaults.pageLabel,
      pageHeading: (doc.pageHeading as string) ?? aboutPageDefaults.pageHeading,
      storyHeading: (doc.storyHeading as string) ?? aboutPageDefaults.storyHeading,
      storyText: doc.storyText ?? null,
      stats: (doc.stats as StatItem[])?.length ? (doc.stats as StatItem[]) : aboutPageDefaults.stats,
      values: (doc.values as AboutPageContent["values"])?.length
        ? (doc.values as AboutPageContent["values"])
        : aboutPageDefaults.values,
      ctaHeading: (doc.ctaHeading as string) ?? aboutPageDefaults.ctaHeading,
      ctaBodyText: (doc.ctaBodyText as string) ?? aboutPageDefaults.ctaBodyText,
    };
  } catch {
    return aboutPageDefaults;
  }
}

export interface ContactPageContent {
  pageLabel: string;
  pageHeading: string;
  subheading: string;
  introText: string;
  mapLabel: string;
  responseGuarantee: string;
}

const contactPageDefaults: ContactPageContent = {
  pageLabel: "07 / Contact",
  pageHeading: "Get in Touch",
  subheading: "Begin Your Journey",
  introText:
    "Whether you have a specific voyage in mind or simply want to explore the possibilities, our team is here to help. We respond to all enquiries within 24 hours.",
  mapLabel: "Alimos Marina, Athens",
  responseGuarantee: "We reply within 24 hours",
};

export async function getContactPage(): Promise<ContactPageContent> {
  try {
    const payload = await getPayload();
    const doc = await payload.findGlobal({ slug: "contact-page" });
    return {
      pageLabel: (doc.pageLabel as string) ?? contactPageDefaults.pageLabel,
      pageHeading: (doc.pageHeading as string) ?? contactPageDefaults.pageHeading,
      subheading: (doc.subheading as string) ?? contactPageDefaults.subheading,
      introText: (doc.introText as string) ?? contactPageDefaults.introText,
      mapLabel: (doc.mapLabel as string) ?? contactPageDefaults.mapLabel,
      responseGuarantee: (doc.responseGuarantee as string) ?? contactPageDefaults.responseGuarantee,
    };
  } catch {
    return contactPageDefaults;
  }
}

export interface SeaRegion {
  name: string;
  description: string;
  islands: string;
}

export interface DestinationsPageContent {
  pageLabel: string;
  pageHeading: string;
  pageSubheading: string;
  seas: SeaRegion[];
  destinationsGridHeading: string;
  customRouteCta: { heading: string; bodyText: string };
}

const destinationsPageDefaults: DestinationsPageContent = {
  pageLabel: "04 / Destinations",
  pageHeading: "Greek Islands",
  pageSubheading: "The Aegean, Ionian and Saronic seas await.",
  seas: [
    {
      name: "Aegean Sea",
      description:
        "The birthplace of Western civilisation, dotted with iconic Cycladic islands and historic Dodecanese outposts.",
      islands: "Mykonos, Santorini, Paros, Rhodes",
    },
    {
      name: "Ionian Sea",
      description:
        "Calmer, verdant, and extraordinarily beautiful — the Ionian offers gentler sailing and lush green islands.",
      islands: "Corfu, Zakynthos, Kefalonia, Ithaca",
    },
    {
      name: "Saronic Gulf",
      description:
        "Athens' backyard archipelago — easily accessible, deeply beautiful, and far less crowded than the Cyclades.",
      islands: "Hydra, Spetses, Aegina, Poros",
    },
  ],
  destinationsGridHeading: "Where Will You Sail?",
  customRouteCta: {
    heading: "Create Your Custom Route",
    bodyText:
      "Tell us your dream islands and we'll craft the perfect itinerary — from a weekend Saronic hop to a two-week Aegean odyssey.",
  },
};

export async function getDestinationsPage(): Promise<DestinationsPageContent> {
  try {
    const payload = await getPayload();
    const doc = await payload.findGlobal({ slug: "destinations-page" });
    return {
      pageLabel: (doc.pageLabel as string) ?? destinationsPageDefaults.pageLabel,
      pageHeading: (doc.pageHeading as string) ?? destinationsPageDefaults.pageHeading,
      pageSubheading: (doc.pageSubheading as string) ?? destinationsPageDefaults.pageSubheading,
      seas: (doc.seas as SeaRegion[])?.length ? (doc.seas as SeaRegion[]) : destinationsPageDefaults.seas,
      destinationsGridHeading:
        (doc.destinationsGridHeading as string) ?? destinationsPageDefaults.destinationsGridHeading,
      customRouteCta: {
        ...destinationsPageDefaults.customRouteCta,
        ...(doc.customRouteCta as object),
      },
    };
  } catch {
    return destinationsPageDefaults;
  }
}

export interface FleetPageContent {
  pageLabel: string;
  pageHeading: string;
  introText: string;
  stats: StatItem[];
  bespokeSection: {
    heading: string;
    subtitle: string;
    details: Array<{ label: string; value: string }>;
  };
}

const fleetPageDefaults: FleetPageContent = {
  pageLabel: "02 / Fleet",
  pageHeading: "Our Fleet",
  introText:
    "Five premium catamarans. All based in Athens. All available for crewed or bareboat charter.",
  stats: [
    { value: "5", label: "Vessels" },
    { value: "44–55ft", label: "Length Range" },
    { value: "6–8", label: "Guests" },
  ],
  bespokeSection: {
    heading: "Can't find your perfect match?",
    subtitle:
      "Tell us your dream voyage and we'll find the ideal vessel from our extended network of premium yachts across Greece.",
    details: [
      { label: "Charter Types", value: "Bareboat & Crewed" },
      { label: "Base Port", value: "Athens, Greece" },
      { label: "Season", value: "April – November" },
      { label: "Response Time", value: "Within 24 Hours" },
    ],
  },
};

export async function getFleetPage(): Promise<FleetPageContent> {
  try {
    const payload = await getPayload();
    const doc = await payload.findGlobal({ slug: "fleet-page" });
    const bespoke = (doc.bespokeSection as Record<string, unknown>) ?? {};
    return {
      pageLabel: (doc.pageLabel as string) ?? fleetPageDefaults.pageLabel,
      pageHeading: (doc.pageHeading as string) ?? fleetPageDefaults.pageHeading,
      introText: (doc.introText as string) ?? fleetPageDefaults.introText,
      stats: (doc.stats as StatItem[])?.length ? (doc.stats as StatItem[]) : fleetPageDefaults.stats,
      bespokeSection: {
        heading: (bespoke.heading as string) ?? fleetPageDefaults.bespokeSection.heading,
        subtitle: (bespoke.subtitle as string) ?? fleetPageDefaults.bespokeSection.subtitle,
        details: (bespoke.details as FleetPageContent["bespokeSection"]["details"])?.length
          ? (bespoke.details as FleetPageContent["bespokeSection"]["details"])
          : fleetPageDefaults.bespokeSection.details,
      },
    };
  } catch {
    return fleetPageDefaults;
  }
}

export interface WhyAlmaStat {
  stat: string;
  label: string;
  description?: string;
}

export interface ServicesPageContent {
  pageLabel: string;
  pageHeading: string;
  pageSubheading: string;
  whyAlmaLabel: string;
  whyAlmaHeading: string;
  whyAlmaSubtitle: string;
  whyAlmaStats: WhyAlmaStat[];
}

const servicesPageDefaults: ServicesPageContent = {
  pageLabel: "03 / Services",
  pageHeading: "What We Offer",
  pageSubheading: "A complete suite of maritime services, delivered with Greek warmth.",
  whyAlmaLabel: "Why ALMA",
  whyAlmaHeading: "The ALMA Difference",
  whyAlmaSubtitle:
    "We're not a booking platform. We're a team of passionate sailors who happen to run a company.",
  whyAlmaStats: [
    { stat: "10+", label: "Years in the Aegean", description: "Over a decade of navigating these waters" },
    { stat: "300+", label: "Happy Guests", description: "Guests who return season after season" },
    { stat: "5", label: "Premium Vessels", description: "Maintained to the highest standard" },
    { stat: "24h", label: "Response Time", description: "We're always reachable when you need us" },
  ],
};

export async function getServicesPage(): Promise<ServicesPageContent> {
  try {
    const payload = await getPayload();
    const doc = await payload.findGlobal({ slug: "services-page" });
    return {
      pageLabel: (doc.pageLabel as string) ?? servicesPageDefaults.pageLabel,
      pageHeading: (doc.pageHeading as string) ?? servicesPageDefaults.pageHeading,
      pageSubheading: (doc.pageSubheading as string) ?? servicesPageDefaults.pageSubheading,
      whyAlmaLabel: (doc.whyAlmaLabel as string) ?? servicesPageDefaults.whyAlmaLabel,
      whyAlmaHeading: (doc.whyAlmaHeading as string) ?? servicesPageDefaults.whyAlmaHeading,
      whyAlmaSubtitle: (doc.whyAlmaSubtitle as string) ?? servicesPageDefaults.whyAlmaSubtitle,
      whyAlmaStats: (doc.whyAlmaStats as WhyAlmaStat[])?.length
        ? (doc.whyAlmaStats as WhyAlmaStat[])
        : servicesPageDefaults.whyAlmaStats,
    };
  } catch {
    return servicesPageDefaults;
  }
}

export interface SiteSettingsContent {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  officeHours: string;
  basePort: string;
  instagramUrl?: string;
  facebookUrl?: string;
}

const siteSettingsDefaults: SiteSettingsContent = {
  companyName: "ALMA Yachting",
  tagline:
    "Bespoke luxury yacht charter and fleet management services across the Greek islands.",
  phone: "+30 210 300 1618",
  email: "info@almayachting.com",
  address: "46 Archimidous str., 17563 Paleo Faliro, Athens, Greece",
  officeHours: "Monday – Friday: 9:00 – 18:00\nSaturday: 10:00 – 14:00 (EET / UTC+2)",
  basePort: "Marina Zea · Piraeus · Athens",
};

export async function getSiteSettings(): Promise<SiteSettingsContent> {
  try {
    const payload = await getPayload();
    const doc = await payload.findGlobal({ slug: "site-settings" });
    return {
      companyName: (doc.companyName as string) ?? siteSettingsDefaults.companyName,
      tagline: (doc.tagline as string) ?? siteSettingsDefaults.tagline,
      phone: (doc.phone as string) ?? siteSettingsDefaults.phone,
      email: (doc.email as string) ?? siteSettingsDefaults.email,
      address: (doc.address as string) ?? siteSettingsDefaults.address,
      officeHours: (doc.officeHours as string) ?? siteSettingsDefaults.officeHours,
      basePort: (doc.basePort as string) ?? siteSettingsDefaults.basePort,
      instagramUrl: (doc.instagramUrl as string) || undefined,
      facebookUrl: (doc.facebookUrl as string) || undefined,
    };
  } catch {
    return siteSettingsDefaults;
  }
}
