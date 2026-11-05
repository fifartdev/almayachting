import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getSiteSettings } from "@/lib/globals";
import { getSeoSettings, pageMetadata, siteJsonLd, siteMetadata } from "@/lib/seo";
import { getMenu, defaultFooterLinks, defaultPrimaryLinks } from "@/lib/menus";
import { filterLinks } from "@/lib/builtin-pages";
import { getYachts } from "@/lib/yachts";
import { getDestinations } from "@/lib/destinations";

// Fonts are bundled (src/app/fonts, SIL Open Font License) so builds never depend on Google Fonts.
const barlowCondensed = localFont({
  variable: "--font-barlow-condensed",
  src: [
    { path: "../fonts/barlow-condensed-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/barlow-condensed-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/barlow-condensed-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/barlow-condensed-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  display: "swap",
});

// Variable font: covers the 300–600 weights used across the site.
const jost = localFont({
  variable: "--font-cormorant-garamond",
  src: "../fonts/jost-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
});

const dmMono = localFont({
  variable: "--font-dm-mono",
  src: "../fonts/dm-mono-latin-400-normal.woff2",
  weight: "400",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const [defaults, site] = await Promise.all([pageMetadata({ seo: null, path: "/" }), siteMetadata()]);
  // Every page sets its own canonical; a site-wide one would mislabel 404s as the homepage.
  return { ...defaults, ...site, alternates: undefined };
}

export async function generateViewport(): Promise<Viewport> {
  const site = await getSeoSettings();
  return { themeColor: site.general.themeColor || "#0A1628" };
}

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings, site, primaryLinks, footerLinks, yachts, destinations] = await Promise.all([
    getSiteSettings(),
    getSeoSettings(),
    getMenu("primary", defaultPrimaryLinks),
    getMenu("footer", defaultFooterLinks),
    getYachts(),
    getDestinations(),
  ]);
  const pages = siteSettings.pages;
  return (
    <html lang={site.general.locale.split("_")[0] || "en"}>
      <body
        className={`${barlowCondensed.variable} ${jost.variable} ${dmMono.variable} antialiased`}
        style={{ fontFamily: "var(--font-cormorant-garamond), sans-serif" }}
      >
        <JsonLd data={siteJsonLd(site)} />
        <Navigation links={filterLinks(primaryLinks, pages)} showContact={pages.contact} />
        <main>{children}</main>
        <Footer
          settings={siteSettings}
          companyLinks={filterLinks(footerLinks, pages)}
          fleetLinks={pages.fleet ? yachts.map((y) => ({ href: `/fleet/${y.slug}`, label: y.name })) : []}
          destinationLinks={
            pages.destinations ? destinations.slice(0, 5).map((d) => ({ href: `/destinations#${d.id}`, label: d.name })) : []
          }
          showPrivacy={pages.privacy}
          showTerms={pages.terms}
        />
      </body>
    </html>
  );
}
