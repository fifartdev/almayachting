/**
 * On/off switches for the built-in pages (WordPress: ALMA Site → Site Settings → Built-in pages).
 * A switched-off page returns 404 and its links disappear from menus, footer, homepage,
 * sitemap and llms.txt.
 */
import { notFound } from "next/navigation";
import { getSiteSettings, type BuiltInPage, type PageSwitches } from "@/lib/globals";
import type { NavLink } from "@/lib/menus";

export type { BuiltInPage, PageSwitches };

export async function getPageSwitches(): Promise<PageSwitches> {
  return (await getSiteSettings()).pages;
}

/** Call at the top of a built-in page (and its generateMetadata) to 404 when switched off. */
export async function requirePage(page: BuiltInPage): Promise<void> {
  const switches = await getPageSwitches();
  if (!switches[page]) notFound();
}

/** False when the link points into a switched-off built-in page, e.g. "/fleet/lagoon-55". */
export function isLinkEnabled(switches: PageSwitches, href: string): boolean {
  if (!href.startsWith("/")) return true;
  const section = href.split(/[?#]/)[0].split("/")[1];
  return !(section in switches) || switches[section as BuiltInPage];
}

export function filterLinks(links: NavLink[], switches: PageSwitches): NavLink[] {
  return links
    .filter((link) => isLinkEnabled(switches, link.href))
    .map((link) => ({ ...link, children: link.children ? filterLinks(link.children, switches) : undefined }));
}
