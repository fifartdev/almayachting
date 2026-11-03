/**
 * Navigation menus from WordPress (Appearance → Menus). Falls back to the
 * built-in links when a menu is empty or WordPress is unreachable.
 */
import { wpFetch, WP_TAGS } from "@/lib/wordpress";

export interface NavLink {
  href: string;
  label: string;
  target?: string | null;
  children?: NavLink[];
}

interface WpMenuItem {
  label: string;
  url: string;
  target: string | null;
  children: WpMenuItem[];
}

function toNavLink(item: WpMenuItem): NavLink {
  return {
    href: item.url,
    label: item.label,
    target: item.target,
    children: item.children.map(toNavLink),
  };
}

export async function getMenu(location: "primary" | "footer", fallback: NavLink[]): Promise<NavLink[]> {
  try {
    const items = await wpFetch<WpMenuItem[]>(`/alma/v1/menus/${location}`, [WP_TAGS.menus]);
    return items.length ? items.map(toNavLink) : fallback;
  } catch {
    return fallback;
  }
}

export const defaultPrimaryLinks: NavLink[] = [
  { href: "/fleet", label: "Fleet" },
  { href: "/destinations", label: "Destinations" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const defaultFooterLinks: NavLink[] = [
  { href: "/about", label: "Our Story" },
  { href: "/services", label: "Services" },
  { href: "/destinations", label: "Destinations" },
  { href: "/contact", label: "Contact Us" },
];
