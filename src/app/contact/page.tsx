import type { Metadata } from "next";
import { getYachts } from "@/lib/yachts";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact ALMA Yachting to enquire about yacht charters across the Greek islands. Office in Paleo Faliro, Athens. Response within 24 hours.",
};

export default async function ContactPage() {
  const yachts = await getYachts();

  const vesselList = yachts.map((y) => ({
    id: y.id,
    slug: y.slug,
    name: y.name,
    length: y.length,
    guests: y.guests,
  }));

  return <ContactClient yachts={vesselList} />;
}
