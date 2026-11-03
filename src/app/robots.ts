import type { MetadataRoute } from "next";
import { getSeoSettings, siteUrl, AI_SEARCH_BOTS, AI_TRAINING_BOTS } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSeoSettings();
  const base = siteUrl(site);
  const { crawlers } = site;

  if (!crawlers.indexSite) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  const disallow = ["/api/", ...crawlers.disallowPaths];
  const blocked = [
    ...(crawlers.allowAiSearch ? [] : AI_SEARCH_BOTS),
    ...(crawlers.allowAiTraining ? [] : AI_TRAINING_BOTS),
    ...crawlers.blockedBots,
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...(blocked.length ? [{ userAgent: blocked, disallow: "/" }] : []),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
