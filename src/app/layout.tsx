import type { Metadata } from "next";
import {
  Barlow_Condensed,
  Jost,
  DM_Mono,
} from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  title: {
    default: "ALMA Yachting | Luxury Yacht Charter & Management in Greece",
    template: "%s | ALMA Yachting",
  },
  description:
    "ALMA Yachting offers bespoke luxury yacht charter and fleet management services in Greece. Sail the Aegean and Ionian seas aboard our premium fleet of catamarans.",
  keywords: [
    "yacht charter Greece",
    "luxury sailing Greece",
    "catamaran charter",
    "Aegean yacht",
    "Greek islands sailing",
    "ALMA Yachting",
    "fleet management Greece",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://almayachting.com",
    siteName: "ALMA Yachting",
    title: "ALMA Yachting | Luxury Yacht Charter & Management in Greece",
    description:
      "Bespoke luxury yacht charter and fleet management in Greece. Sail the Aegean aboard our premium catamaran fleet.",
    images: [
      {
        url: "/images/various/hero-b.jpg",
        width: 1200,
        height: 630,
        alt: "ALMA Yachting - Luxury Yacht Charter in Greece",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALMA Yachting | Luxury Yacht Charter in Greece",
    description: "Bespoke luxury yacht charter and fleet management in Greece.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlowCondensed.variable} ${jost.variable} ${dmMono.variable} antialiased`}
        style={{ fontFamily: "var(--font-cormorant-garamond), sans-serif" }}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
