/**
 * /llms.txt: a plain-language map of the site for AI assistants (llmstxt.org).
 * Built from the "SEO & GEO" screen plus each entry's content summary, key facts and FAQ.
 */
import { getSeoSettings, absoluteUrl } from "@/lib/seo";
import { getYachts } from "@/lib/yachts";
import { getServices } from "@/lib/services";
import { getDestinations } from "@/lib/destinations";
import { getPages } from "@/lib/pages";
import { getSiteSettings } from "@/lib/globals";
import type { WpSeo } from "@/lib/wordpress";

export const revalidate = 3600;

function line(title: string, url: string, summary?: string) {
  return `- [${title}](${url})${summary ? `: ${summary}` : ""}`;
}

function summaryOf(seo: WpSeo | null | undefined, fallback: string) {
  return (seo?.ai.contentSummary || seo?.description || fallback).replace(/\s+/g, " ").trim();
}

export async function GET() {
  const [site, settings, yachts, services, destinations, pages] = await Promise.all([
    getSeoSettings(),
    getSiteSettings(),
    getYachts(),
    getServices(),
    getDestinations(),
    getPages(),
  ]);

  if (!site.crawlers.indexSite) {
    return new Response("", { status: 404 });
  }

  const url = (path: string) => absoluteUrl(site, path);
  const on = settings.pages;
  const o = site.organization;
  const out: string[] = [];

  out.push(`# ${site.general.siteName}`, "");
  out.push(`> ${(o.description || site.general.defaultDescription).replace(/\s+/g, " ").trim()}`, "");
  if (site.crawlers.llmsIntro) out.push(site.crawlers.llmsIntro.trim(), "");

  const facts = [
    o.locality && `Office: ${[o.streetAddress, o.locality, o.postalCode, o.country].filter(Boolean).join(", ")}`,
    settings.basePort && `Base port: ${settings.basePort}`,
    o.areaServed.length && `Areas served: ${o.areaServed.join(", ")}`,
    o.knowsLanguage.length && `Languages: ${o.knowsLanguage.join(", ")}`,
    o.priceRange && `Price range: ${o.priceRange}`,
    settings.phone && `Phone: ${settings.phone}`,
    settings.email && `Email: ${settings.email}`,
  ].filter(Boolean) as string[];
  if (facts.length) out.push("## Key facts", ...facts.map((f) => `- ${f}`), "");

  const mainPages = [
    on.fleet && line("Fleet", url("/fleet"), "All yachts available for charter"),
    on.destinations && line("Destinations", url("/destinations"), "Greek island sailing destinations"),
    on.services && line("Services", url("/services"), "Charter, management and concierge services"),
    on.about && line("About", url("/about"), "Company story and values"),
    on.contact && line("Contact", url("/contact"), "Charter enquiries"),
  ].filter(Boolean) as string[];
  if (mainPages.length) out.push("## Main pages", ...mainPages, "");

  const visible = <T extends { seo: WpSeo | null }>(items: T[]) => items.filter((i) => !i.seo?.robots.noindex);

  const fleet = on.fleet ? visible(yachts) : [];
  if (fleet.length) {
    out.push("## Fleet");
    for (const y of fleet) {
      const fallback = `${y.type}, ${y.year}, ${y.length}. ${y.guests} guests, ${y.cabins} cabins. From €${y.startingPrice.toLocaleString("en-US")} per week.`;
      out.push(line(y.name, url(`/fleet/${y.slug}`), summaryOf(y.seo, fallback)));
    }
    out.push("");
  }

  const serviceList = on.services ? visible(services) : [];
  if (serviceList.length) {
    out.push("## Services", ...serviceList.map((s) => line(s.title, url(`/services#${s.slug}`), summaryOf(s.seo, s.shortDescription))), "");
  }

  const destinationList = on.destinations ? visible(destinations) : [];
  if (destinationList.length) {
    out.push(
      "## Destinations",
      ...destinationList.map((d) => line(`${d.name} (${d.region})`, url(`/destinations#${d.id}`), summaryOf(d.seo, d.shortDescription))),
      "",
    );
  }

  const pageList = visible(pages);
  if (pageList.length) {
    out.push("## More", ...pageList.map((p) => line(p.title, url(p.path), summaryOf(p.seo, p.heroSubtitle))), "");
  }

  const faq = [...fleet, ...serviceList, ...destinationList, ...pageList].flatMap((i) =>
    (i.seo?.ai.faq ?? []).filter((q) => q.question && q.answer),
  );
  if (faq.length) {
    out.push("## FAQ");
    for (const q of faq) out.push(`### ${q.question}`, q.answer, "");
  }

  return new Response(out.join("\n").trimEnd() + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
