/**
 * Minimal client for the WordPress REST API (alma-headless plugin).
 * Responses are cached by Next and tagged, so the plugin's webhook
 * (/api/revalidate) can refresh exactly what changed.
 */

const WP_URL = (process.env.WP_URL ?? "").replace(/\/+$/, "");

/** Safety net in case a webhook is missed. */
const REVALIDATE_SECONDS = 3600;

export const WP_TAGS = {
  all: "wp",
  vessels: "wp:vessels",
  destinations: "wp:destinations",
  services: "wp:services",
  team: "wp:team",
  pages: "wp:pages",
  menus: "wp:menus",
  settings: (key: string) => `wp:settings:${key}`,
};

export interface WpImage {
  id: number;
  url: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface WpVideo {
  id: number;
  url: string;
  mimeType: string;
  width: number | null;
  height: number | null;
}

export interface WpGeo {
  placeName: string;
  region: string;
  latitude: number | null;
  longitude: number | null;
}

/** Per-entry SEO & GEO panel (see seo_group() in the plugin). */
export interface WpSeo {
  title: string;
  description: string;
  focusKeyphrase: string;
  secondaryKeyphrases: string[];
  canonicalUrl: string;
  robots: {
    noindex: boolean;
    nofollow: boolean;
    noarchive: boolean;
    nosnippet: boolean;
    noimageindex: boolean;
    maxImagePreview: "large" | "standard" | "none";
    maxSnippet: number | null;
    excludeFromSitemap: boolean;
    sitemapPriority: string;
    sitemapChangeFrequency: string;
  };
  openGraph: { title: string; description: string; image: WpImage | null; type: "website" | "article" };
  twitter: { title: string; description: string; image: WpImage | null; card: "summary_large_image" | "summary" };
  ai: {
    contentSummary: string;
    keyFacts: string[];
    faq: Array<{ question: string; answer: string }>;
    showFaq: boolean;
    schemaType: string;
    breadcrumbTitle: string;
  };
  location: WpGeo;
}

export interface WpPost<F> {
  id: number;
  slug: string;
  link: string;
  modified_gmt?: string;
  parent?: number;
  menu_order?: number;
  title: { rendered: string };
  content?: { rendered: string };
  fields: F & { seo: WpSeo };
  featuredImage: WpImage | null;
}

export async function wpFetch<T>(path: string, tags: string[]): Promise<T> {
  if (!WP_URL) throw new Error("WP_URL is not set");
  const res = await fetch(`${WP_URL}/wp-json${path}`, {
    next: { tags: [WP_TAGS.all, ...tags], revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`WordPress responded ${res.status} for ${path}`);
  return (await res.json()) as T;
}

/** All published posts of a post type, ordered by "Order" then title. */
export async function wpCollection<F>(restBase: string, tag: string, query = ""): Promise<WpPost<F>[]> {
  const posts = await wpFetch<WpPost<F>[]>(
    `/wp/v2/${restBase}?per_page=100&_fields=id,slug,link,modified_gmt,parent,menu_order,title,content,fields,featuredImage${query}`,
    [tag],
  );
  return posts.sort(
    (a, b) => (a.menu_order ?? 0) - (b.menu_order ?? 0) || a.title.rendered.localeCompare(b.title.rendered),
  );
}
