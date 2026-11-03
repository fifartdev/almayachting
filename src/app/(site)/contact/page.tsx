import type { Metadata } from "next";
import { getYachts } from "@/lib/yachts";
import { getContactPage, getSiteSettings } from "@/lib/globals";
import { getSeoSettings, pageJsonLd, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import ContactClient from "./ContactClient";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContactPage();
  return pageMetadata({
    seo,
    path: "/contact",
    title: "Contact",
    description:
      "Contact ALMA Yachting to enquire about yacht charters across the Greek islands. Office in Paleo Faliro, Athens. Response within 24 hours.",
  });
}

export default async function ContactPage() {
  const [yachts, contactPage, siteSettings, site] = await Promise.all([
    getYachts(),
    getContactPage(),
    getSiteSettings(),
    getSeoSettings(),
  ]);

  const vesselList = yachts.map((y) => ({
    id: y.id,
    slug: y.slug,
    name: y.name,
    length: y.length,
    guests: y.guests,
  }));

  return (
    <>
      <JsonLd
        data={pageJsonLd(site, { seo: contactPage.seo, path: "/contact", title: "Contact", defaultType: "ContactPage" })}
      />
      <ContactClient yachts={vesselList} contactPage={contactPage} siteSettings={siteSettings} />
      <FaqSection seo={contactPage.seo} />
    </>
  );
}
