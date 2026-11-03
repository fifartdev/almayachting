import type { Metadata, Viewport } from "next";
import {
  Barlow_Condensed,
  Jost,
  DM_Mono,
} from "next/font/google";
import "../globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getSiteSettings } from "@/lib/globals";
import { getSeoSettings, pageMetadata, siteJsonLd, siteMetadata } from "@/lib/seo";
import { getMenu, defaultFooterLinks, defaultPrimaryLinks } from "@/lib/menus";
import { getYachts } from "@/lib/yachts";
import { getDestinations } from "@/lib/destinations";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400"],
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
  return (
    <html lang={site.general.locale.split("_")[0] || "en"}>
      <body
        className={`${barlowCondensed.variable} ${jost.variable} ${dmMono.variable} antialiased`}
        style={{ fontFamily: "var(--font-cormorant-garamond), sans-serif" }}
      >
        <JsonLd data={siteJsonLd(site)} />
        <Navigation links={primaryLinks} />
        <main>{children}</main>
        <Footer
          settings={siteSettings}
          companyLinks={footerLinks}
          fleetLinks={yachts.map((y) => ({ href: `/fleet/${y.slug}`, label: y.name }))}
          destinationLinks={destinations.slice(0, 5).map((d) => ({ href: `/destinations#${d.id}`, label: d.name }))}
        />
      </body>
    </html>
  );
}
