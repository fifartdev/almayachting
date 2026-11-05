/**
 * SEO & GEO: metadata, structured data (JSON-LD) and crawler rules, built from the
 * WordPress "SEO & GEO" screen plus each entry's own SEO panel.
 * "GEO" covers both Generative Engine Optimization (AI search) and geographic targeting.
 */
import type { Metadata } from "next";
import { getSettings } from "@/lib/globals";
import type { WpGeo, WpImage, WpSeo } from "@/lib/wordpress";

export interface SeoSettings {
  general: {
    siteUrl: string;
    siteName: string;
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string[];
    defaultShareImage: WpImage | null;
    locale: string;
    alternateLanguages: Array<{ hreflang: string; url: string }>;
    themeColor: string;
  };
  verification: { google: string; bing: string; yandex: string; baidu: string; pinterest: string; facebook: string };
  social: { twitterSite: string; facebookAppId: string; sameAs: string[] };
  organization: {
    type: string;
    name: string;
    legalName: string;
    alternateName: string;
    description: string;
    logo: WpImage | null;
    image: WpImage | null;
    phone: string;
    email: string;
    streetAddress: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
    latitude: number | null;
    longitude: number | null;
    mapUrl: string;
    priceRange: string;
    currency: string;
    areaServed: string[];
    knowsLanguage: string[];
    foundingDate: string;
    vatId: string;
    openingHours: Array<{ days: string[]; opens: string; closes: string }>;
  };
  location: WpGeo;
  crawlers: {
    indexSite: boolean;
    allowAiSearch: boolean;
    allowAiTraining: boolean;
    blockedBots: string[];
    disallowPaths: string[];
    sitemapExclude: string[];
    llmsIntro: string;
  };
}

const seoDefaults: SeoSettings = {
  general: {
    siteUrl: "https://www.almayachting.com",
    siteName: "ALMA Yachting",
    titleTemplate: "%s | ALMA Yachting",
    defaultTitle: "ALMA Yachting | Luxury Yacht Charter & Management in Greece",
    defaultDescription:
      "ALMA Yachting offers bespoke luxury yacht charter and fleet management services in Greece. Sail the Aegean and Ionian seas aboard our premium fleet of catamarans.",
    defaultKeywords: [
      "yacht charter Greece",
      "luxury sailing Greece",
      "catamaran charter",
      "Aegean yacht",
      "Greek islands sailing",
      "ALMA Yachting",
      "fleet management Greece",
    ],
    defaultShareImage: null,
    locale: "en_US",
    alternateLanguages: [],
    themeColor: "#0A1628",
  },
  verification: { google: "", bing: "", yandex: "", baidu: "", pinterest: "", facebook: "" },
  social: { twitterSite: "", facebookAppId: "", sameAs: [] },
  organization: {
    type: "TravelAgency",
    name: "ALMA Yachting",
    legalName: "",
    alternateName: "",
    description: "",
    logo: null,
    image: null,
    phone: "+30 210 300 1618",
    email: "info@almayachting.com",
    streetAddress: "46 Archimidous str.",
    locality: "Paleo Faliro",
    region: "Attica",
    postalCode: "17563",
    country: "GR",
    latitude: null,
    longitude: null,
    mapUrl: "",
    priceRange: "",
    currency: "EUR",
    areaServed: [],
    knowsLanguage: [],
    foundingDate: "",
    vatId: "",
    openingHours: [],
  },
  location: { placeName: "Athens, Greece", region: "GR-I", latitude: null, longitude: null },
  crawlers: {
    indexSite: true,
    allowAiSearch: true,
    allowAiTraining: true,
    blockedBots: [],
    disallowPaths: [],
    sitemapExclude: [],
    llmsIntro: "",
  },
};

export function getSeoSettings(): Promise<SeoSettings> {
  return getSettings("seo", seoDefaults);
}

export function siteUrl(site: SeoSettings): string {
  return site.general.siteUrl.replace(/\/+$/, "");
}

export function absoluteUrl(site: SeoSettings, path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl(site)}${path === "/" ? "" : path}`;
}

/* ------------------------------------------------------------------ Metadata */

export interface PageSeoInput {
  /** Entry's SEO panel from WordPress (null when not loaded). */
  seo: WpSeo | null | undefined;
  /** Site-relative path, e.g. "/fleet/lagoon-55". */
  path: string;
  /** Fallbacks when the SEO panel is empty. Omit title on the homepage to use the default title. */
  title?: string;
  description?: string;
  image?: string | WpImage | null;
}

function toOgImage(image: string | WpImage | null | undefined) {
  if (!image) return undefined;
  if (typeof image === "string") return { url: image };
  return { url: image.url, width: image.width, height: image.height, alt: image.alt || undefined };
}

function robotsFor(site: SeoSettings, seo: WpSeo | null | undefined): Metadata["robots"] {
  if (!site.crawlers.indexSite) return { index: false, follow: false };
  const r = seo?.robots;
  const maxSnippet = r?.maxSnippet ?? -1;
  return {
    index: !r?.noindex,
    follow: !r?.nofollow,
    noarchive: r?.noarchive || undefined,
    nosnippet: r?.nosnippet || undefined,
    noimageindex: r?.noimageindex || undefined,
    googleBot: {
      index: !r?.noindex,
      follow: !r?.nofollow,
      "max-image-preview": r?.maxImagePreview ?? "large",
      "max-snippet": maxSnippet,
      "max-video-preview": -1,
    },
  };
}

/** Entry location → site default, field by field. */
export function resolveGeo(site: SeoSettings, geo?: Partial<WpGeo> | null): WpGeo {
  return {
    placeName: geo?.placeName || site.location.placeName,
    region: geo?.region || site.location.region,
    latitude: geo?.latitude ?? site.location.latitude ?? site.organization.latitude,
    longitude: geo?.longitude ?? site.location.longitude ?? site.organization.longitude,
  };
}

function geoMeta(geo: WpGeo): Record<string, string> {
  const meta: Record<string, string> = {};
  if (geo.region) meta["geo.region"] = geo.region;
  if (geo.placeName) meta["geo.placename"] = geo.placeName;
  if (geo.latitude != null && geo.longitude != null) {
    meta["geo.position"] = `${geo.latitude};${geo.longitude}`;
    meta.ICBM = `${geo.latitude}, ${geo.longitude}`;
  }
  return meta;
}

export async function pageMetadata(input: PageSeoInput): Promise<Metadata> {
  const site = await getSeoSettings();
  const { seo } = input;

  const description = seo?.description || input.description || site.general.defaultDescription;
  const pageTitle = seo?.title || input.title;
  const title: Metadata["title"] = seo?.title ? { absolute: seo.title } : input.title;
  const shareTitle = pageTitle ?? site.general.defaultTitle;
  const canonical = seo?.canonicalUrl || absoluteUrl(site, input.path);

  const ogImage = toOgImage(seo?.openGraph.image ?? input.image ?? site.general.defaultShareImage);
  const twitterImage = toOgImage(seo?.twitter.image) ?? ogImage;
  const keywords = [seo?.focusKeyphrase, ...(seo?.secondaryKeyphrases ?? [])].filter(Boolean) as string[];
  const ogTitle = seo?.openGraph.title || shareTitle;
  const ogDescription = seo?.openGraph.description || description;

  const other: Record<string, string> = geoMeta(resolveGeo(site, seo?.location));
  if (site.social.facebookAppId) other["fb:app_id"] = site.social.facebookAppId;

  const languages = Object.fromEntries(
    site.general.alternateLanguages
      .filter((l) => l.hreflang && l.url)
      .map((l) => [l.hreflang, `${l.url.replace(/\/+$/, "")}${input.path === "/" ? "" : input.path}`]),
  );

  return {
    // Leave title out entirely on the homepage so the layout's default title applies.
    ...(title ? { title } : {}),
    description,
    keywords: keywords.length ? keywords : site.general.defaultKeywords,
    alternates: { canonical, languages: Object.keys(languages).length ? languages : undefined },
    robots: robotsFor(site, seo),
    openGraph: {
      type: seo?.openGraph.type ?? "website",
      url: canonical,
      siteName: site.general.siteName,
      locale: site.general.locale,
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: seo?.twitter.card ?? "summary_large_image",
      site: site.social.twitterSite || undefined,
      title: seo?.twitter.title || ogTitle,
      description: seo?.twitter.description || ogDescription,
      images: twitterImage ? [twitterImage] : undefined,
    },
    other,
  };
}

/** Site-wide metadata for the root layout: title template, verification, base URL. */
export async function siteMetadata(): Promise<Metadata> {
  const site = await getSeoSettings();
  const v = site.verification;
  const otherVerification: Record<string, string> = {};
  if (v.bing) otherVerification["msvalidate.01"] = v.bing;
  if (v.baidu) otherVerification["baidu-site-verification"] = v.baidu;
  if (v.pinterest) otherVerification["p:domain_verify"] = v.pinterest;
  if (v.facebook) otherVerification["facebook-domain-verification"] = v.facebook;

  return {
    metadataBase: new URL(siteUrl(site)),
    applicationName: site.general.siteName,
    title: { default: site.general.defaultTitle, template: site.general.titleTemplate || "%s" },
    description: site.general.defaultDescription,
    verification: {
      google: v.google || undefined,
      yandex: v.yandex || undefined,
      other: Object.keys(otherVerification).length ? otherVerification : undefined,
    },
  };
}

/* ------------------------------------------------------------- Structured data */

type JsonLdNode = Record<string, unknown>;

function postalAddress(o: SeoSettings["organization"]): JsonLdNode | undefined {
  if (!o.streetAddress && !o.locality) return undefined;
  return {
    "@type": "PostalAddress",
    streetAddress: o.streetAddress || undefined,
    addressLocality: o.locality || undefined,
    addressRegion: o.region || undefined,
    postalCode: o.postalCode || undefined,
    addressCountry: o.country || undefined,
  };
}

export function geoCoordinates(lat: number | null | undefined, lng: number | null | undefined): JsonLdNode | undefined {
  return lat != null && lng != null ? { "@type": "GeoCoordinates", latitude: lat, longitude: lng } : undefined;
}

export function organizationId(site: SeoSettings): string {
  return `${siteUrl(site)}/#organization`;
}

/** Organization / local business + WebSite, rendered once in the root layout. */
export function siteJsonLd(site: SeoSettings): JsonLdNode {
  const o = site.organization;
  const base = siteUrl(site);
  const isLocal = o.type !== "Organization";

  const organization: JsonLdNode = {
    "@type": o.type || "TravelAgency",
    "@id": organizationId(site),
    name: o.name || site.general.siteName,
    legalName: o.legalName || undefined,
    alternateName: o.alternateName || undefined,
    description: o.description || site.general.defaultDescription,
    url: base,
    logo: o.logo?.url ?? `${base}/alma-logo.png`,
    image: o.image?.url ?? o.logo?.url ?? undefined,
    telephone: o.phone || undefined,
    email: o.email || undefined,
    address: postalAddress(o),
    geo: isLocal ? geoCoordinates(o.latitude, o.longitude) : undefined,
    hasMap: o.mapUrl || undefined,
    priceRange: isLocal ? o.priceRange || undefined : undefined,
    currenciesAccepted: isLocal ? o.currency || undefined : undefined,
    areaServed: o.areaServed.length ? o.areaServed.map((name) => ({ "@type": "Place", name })) : undefined,
    knowsLanguage: o.knowsLanguage.length ? o.knowsLanguage : undefined,
    foundingDate: o.foundingDate || undefined,
    vatID: o.vatId || undefined,
    sameAs: site.social.sameAs.length ? site.social.sameAs : undefined,
    openingHoursSpecification:
      isLocal && o.openingHours.length
        ? o.openingHours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          }))
        : undefined,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: site.general.siteName,
        inLanguage: site.general.locale.replace("_", "-"),
        publisher: { "@id": organizationId(site) },
      },
    ],
  };
}

export interface PageJsonLdInput {
  seo: WpSeo | null | undefined;
  path: string;
  title: string;
  description?: string;
  /** Used when the editor left "Page type" on Automatic. */
  defaultType?: string;
  /** Breadcrumb trail above this page, e.g. [{ name: "Fleet", path: "/fleet" }]. */
  parents?: Array<{ name: string; path: string }>;
  image?: string | null;
  /** Extra entities (Product, TouristDestination, ItemList…) linked as the page's mainEntity. */
  entities?: JsonLdNode[];
}

/** WebPage + breadcrumbs + FAQ + any page entities, as one @graph. */
export function pageJsonLd(site: SeoSettings, input: PageJsonLdInput): JsonLdNode {
  const { seo } = input;
  const url = seo?.canonicalUrl || absoluteUrl(site, input.path);
  const ai = seo?.ai;
  const geo = seo?.location;
  const crumbs = [
    { name: "Home", path: "/" },
    ...(input.parents ?? []),
    ...(input.path === "/" ? [] : [{ name: ai?.breadcrumbTitle || input.title, path: input.path }]),
  ];
  const faq = ai?.showFaq ? (ai.faq ?? []).filter((q) => q.question && q.answer) : [];
  const schemaType = ai?.schemaType || input.defaultType || "WebPage";
  const pageIsEntity = !["WebPage", "AboutPage", "ContactPage", "CollectionPage", "FAQPage"].includes(schemaType);

  const page: JsonLdNode = {
    "@type": pageIsEntity ? "WebPage" : schemaType,
    "@id": `${url}#webpage`,
    url,
    name: seo?.title || input.title,
    description: seo?.description || input.description || undefined,
    abstract: ai?.contentSummary || undefined,
    keywords: [seo?.focusKeyphrase, ...(seo?.secondaryKeyphrases ?? [])].filter(Boolean).join(", ") || undefined,
    inLanguage: site.general.locale.replace("_", "-"),
    isPartOf: { "@id": `${siteUrl(site)}/#website` },
    about: { "@id": organizationId(site) },
    primaryImageOfPage: input.image ? { "@type": "ImageObject", url: input.image } : undefined,
    breadcrumb: crumbs.length > 1 ? { "@id": `${url}#breadcrumb` } : undefined,
    contentLocation:
      geo && (geo.placeName || geo.latitude != null)
        ? { "@type": "Place", name: geo.placeName || undefined, geo: geoCoordinates(geo.latitude, geo.longitude) }
        : undefined,
    mainEntity: input.entities?.length ? input.entities.map((e) => ({ "@id": e["@id"] })) : undefined,
    speakable: ai?.contentSummary ? { "@type": "SpeakableSpecification", cssSelector: ["h1", "[data-speakable]"] } : undefined,
  };

  const graph: JsonLdNode[] = [page, ...(input.entities ?? [])];

  if (crumbs.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: absoluteUrl(site, c.path),
      })),
    });
  }

  if (faq.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faq.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer },
      })),
    });
  }

  if (ai?.keyFacts?.length) {
    page.mentions = ai.keyFacts.map((fact) => ({ "@type": "Thing", description: fact }));
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/* ----------------------------------------------------------------- Crawlers */

/** AI assistants fetching pages live to answer a user (search / citations). */
export const AI_SEARCH_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "DuckAssistBot",
  "MistralAI-User",
];

/** Crawlers collecting content to train AI models. */
export const AI_TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "meta-externalagent",
  "cohere-training-data-crawler",
];

/* ------------------------------------------------------------ Entity schemas */

interface YachtLike {
  slug: string;
  name: string;
  type: string;
  year: number;
  length: string;
  guests: number;
  cabins: number;
  bathrooms: number;
  description: string;
  heroImage: string;
  images: string[];
  startingPrice: number;
  basePort: string;
}

export function yachtJsonLd(site: SeoSettings, y: YachtLike): JsonLdNode {
  const url = absoluteUrl(site, `/fleet/${y.slug}`);
  const property = (name: string, value: string | number) => (value ? { "@type": "PropertyValue", name, value } : null);
  return {
    "@type": "Product",
    "@id": `${url}#vessel`,
    name: y.name,
    description: y.description || undefined,
    category: y.type || undefined,
    image: [y.heroImage, ...y.images].filter(Boolean),
    url,
    additionalProperty: [
      property("Year", y.year),
      property("Length", y.length),
      property("Guests", y.guests),
      property("Cabins", y.cabins),
      property("Bathrooms", y.bathrooms),
      property("Base port", y.basePort),
    ].filter(Boolean),
    offers: y.startingPrice
      ? {
          "@type": "Offer",
          url,
          priceCurrency: site.organization.currency || "EUR",
          price: y.startingPrice,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: y.startingPrice,
            priceCurrency: site.organization.currency || "EUR",
            unitCode: "WEE",
            unitText: "per week",
          },
          availability: "https://schema.org/InStock",
          seller: { "@id": organizationId(site) },
        }
      : undefined,
  };
}

export function fleetListJsonLd(site: SeoSettings, yachts: YachtLike[]): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(site, "/fleet")}#list`,
    numberOfItems: yachts.length,
    itemListElement: yachts.map((y, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(site, `/fleet/${y.slug}`),
      name: y.name,
    })),
  };
}

interface DestinationLike {
  id: string;
  name: string;
  region: string;
  description: string;
  shortDescription: string;
  image: string;
  latitude: number | null;
  longitude: number | null;
  seo: WpSeo | null;
}

export function destinationJsonLd(site: SeoSettings, d: DestinationLike): JsonLdNode {
  return {
    "@type": d.seo?.ai.schemaType === "TouristTrip" ? "TouristTrip" : "TouristDestination",
    "@id": `${absoluteUrl(site, "/destinations")}#${d.id}`,
    name: d.name,
    description: d.seo?.ai.contentSummary || d.description || d.shortDescription || undefined,
    image: d.image || undefined,
    url: `${absoluteUrl(site, "/destinations")}#${d.id}`,
    geo: geoCoordinates(d.latitude ?? d.seo?.location.latitude, d.longitude ?? d.seo?.location.longitude),
    containedInPlace: d.region ? { "@type": "Place", name: d.region } : undefined,
  };
}

interface ServiceLike {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  seo: WpSeo | null;
}

export function serviceJsonLd(site: SeoSettings, s: ServiceLike): JsonLdNode {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(site, "/services")}#${s.slug}`,
    name: s.title,
    description: s.seo?.ai.contentSummary || s.description || s.shortDescription || undefined,
    image: s.image || undefined,
    url: `${absoluteUrl(site, "/services")}#${s.slug}`,
    provider: { "@id": organizationId(site) },
    areaServed: site.organization.areaServed.length
      ? site.organization.areaServed.map((name) => ({ "@type": "Place", name }))
      : { "@type": "Country", name: "Greece" },
  };
}
