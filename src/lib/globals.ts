/**
 * Data layer for singleton page content (WordPress "ALMA Site" screens).
 * Empty fields fall back to the defaults below, and the defaults are used
 * entirely if WordPress is unreachable, so pages never render blank.
 */
import { wpFetch, WP_TAGS, type WpImage, type WpSeo, type WpVideo } from "@/lib/wordpress";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Deep-merges CMS data over defaults; empty strings and empty lists keep the default. */
function withDefaults<T>(defaults: T, data: unknown): T {
  if (Array.isArray(defaults)) {
    return (Array.isArray(data) && data.length ? data : defaults) as T;
  }
  if (isPlainObject(defaults)) {
    const source = isPlainObject(data) ? data : {};
    const merged: Record<string, unknown> = { ...source };
    for (const key of Object.keys(defaults)) merged[key] = withDefaults(defaults[key], source[key]);
    return merged as T;
  }
  if (typeof defaults === "string") {
    return (typeof data === "string" && data.trim() ? data : defaults) as T;
  }
  return (data ?? defaults) as T;
}

export async function getSettings<T>(key: string, defaults: T): Promise<T> {
  try {
    const data = await wpFetch<unknown>(`/alma/v1/settings/${key}`, [WP_TAGS.settings(key)]);
    return withDefaults(defaults, data);
  } catch {
    return defaults;
  }
}

export interface StatItem {
  value: string;
  label: string;
}

export interface HomepageContent {
  hero: {
    /** "slider": 1–6 images; "video": one video, no sliding. */
    mode: "slider" | "video";
    slides: WpImage[];
    video: WpVideo | null;
    videoPoster: WpImage | null;
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
    /** HTML */
    bodyText: string;
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
    backgroundImage: WpImage | null;
  };
  seo: WpSeo | null;
}

const homepageDefaults: HomepageContent = {
  hero: {
    mode: "slider",
    slides: [],
    video: null,
    videoPoster: null,
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
    bodyText: "",
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
    backgroundImage: null,
  },
  seo: null,
};

export function getHomepage(): Promise<HomepageContent> {
  return getSettings("homepage", homepageDefaults);
}

export interface AboutPageContent {
  pageLabel: string;
  pageHeading: string;
  storyHeading: string;
  /** HTML */
  storyText: string;
  stats: StatItem[];
  values: Array<{ title: string; description: string }>;
  ctaHeading: string;
  ctaBodyText: string;
  seo: WpSeo | null;
}

const aboutPageDefaults: AboutPageContent = {
  pageLabel: "06 / About",
  pageHeading: "Our Story",
  storyHeading: "Born in Athens, Made for the Sea",
  storyText: "",
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
  seo: null,
};

export function getAboutPage(): Promise<AboutPageContent> {
  return getSettings("about-page", aboutPageDefaults);
}

export interface ContactPageContent {
  pageLabel: string;
  pageHeading: string;
  subheading: string;
  introText: string;
  mapLabel: string;
  responseGuarantee: string;
  seo: WpSeo | null;
}

const contactPageDefaults: ContactPageContent = {
  pageLabel: "07 / Contact",
  pageHeading: "Get in Touch",
  subheading: "Begin Your Journey",
  introText:
    "Whether you have a specific voyage in mind or simply want to explore the possibilities, our team is here to help. We respond to all enquiries within 24 hours.",
  mapLabel: "Alimos Marina, Athens",
  responseGuarantee: "We reply within 24 hours",
  seo: null,
};

export function getContactPage(): Promise<ContactPageContent> {
  return getSettings("contact-page", contactPageDefaults);
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
  seo: WpSeo | null;
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
  seo: null,
};

export function getDestinationsPage(): Promise<DestinationsPageContent> {
  return getSettings("destinations-page", destinationsPageDefaults);
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
  seo: WpSeo | null;
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
  seo: null,
};

export function getFleetPage(): Promise<FleetPageContent> {
  return getSettings("fleet-page", fleetPageDefaults);
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
  seo: WpSeo | null;
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
  seo: null,
};

export function getServicesPage(): Promise<ServicesPageContent> {
  return getSettings("services-page", servicesPageDefaults);
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

export function getSiteSettings(): Promise<SiteSettingsContent> {
  return getSettings("site-settings", siteSettingsDefaults);
}
