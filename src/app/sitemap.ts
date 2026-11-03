import type { MetadataRoute } from "next";
import { getSeoSettings, absoluteUrl } from "@/lib/seo";
import { getYachts } from "@/lib/yachts";
import { getPages } from "@/lib/pages";
import {
  getAboutPage,
  getContactPage,
  getDestinationsPage,
  getFleetPage,
  getHomepage,
  getServicesPage,
} from "@/lib/globals";
import type { WpSeo } from "@/lib/wordpress";
import { getPageSwitches, isLinkEnabled } from "@/lib/builtin-pages";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

interface Entry {
  path: string;
  seo: WpSeo | null;
  priority: number;
  changeFrequency: ChangeFrequency;
  modified?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, yachts, pages, home, about, contact, destinations, fleet, services, switches] = await Promise.all([
    getSeoSettings(),
    getYachts(),
    getPages(),
    getHomepage(),
    getAboutPage(),
    getContactPage(),
    getDestinationsPage(),
    getFleetPage(),
    getServicesPage(),
    getPageSwitches(),
  ]);

  if (!site.crawlers.indexSite) return [];

  const entries: Entry[] = [
    { path: "/", seo: home.seo, priority: 1, changeFrequency: "weekly" },
    { path: "/fleet", seo: fleet.seo, priority: 0.9, changeFrequency: "weekly" },
    { path: "/destinations", seo: destinations.seo, priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", seo: services.seo, priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", seo: about.seo, priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", seo: contact.seo, priority: 0.7, changeFrequency: "yearly" },
    { path: "/privacy", seo: null, priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", seo: null, priority: 0.2, changeFrequency: "yearly" },
    ...yachts.map((y) => ({
      path: `/fleet/${y.slug}`,
      seo: y.seo,
      priority: 0.8,
      changeFrequency: "monthly" as const,
      modified: y.modified,
    })),
    ...pages.map((p) => ({
      path: p.path,
      seo: p.seo,
      priority: 0.6,
      changeFrequency: "monthly" as const,
      modified: p.modified,
    })),
  ];

  const excluded = new Set(site.crawlers.sitemapExclude.map((p) => p.replace(/\/+$/, "") || "/"));

  return entries
    .filter((e) => isLinkEnabled(switches, e.path))
    .filter((e) => !excluded.has(e.path) && !e.seo?.robots.noindex && !e.seo?.robots.excludeFromSitemap)
    .map((e) => ({
      url: e.seo?.canonicalUrl || absoluteUrl(site, e.path),
      lastModified: e.modified ? new Date(`${e.modified}Z`) : undefined,
      changeFrequency: (e.seo?.robots.sitemapChangeFrequency || e.changeFrequency) as ChangeFrequency,
      priority: e.seo?.robots.sitemapPriority ? Number(e.seo.robots.sitemapPriority) : e.priority,
    }));
}
