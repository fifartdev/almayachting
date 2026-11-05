import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requirePage } from "@/lib/builtin-pages";
import { getYachts, getYachtBySlug, getRelatedYachts } from "@/lib/yachts";
import { getSeoSettings, pageJsonLd, pageMetadata, yachtJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import YachtDetailClient from "./YachtDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const yachts = await getYachts();
    return yachts.map((yacht) => ({ slug: yacht.slug }));
  } catch {
    // Fallback: known slugs prevent build failure if WordPress is unreachable
    return [
      { slug: "lagoon-55" },
      { slug: "lagoon-51" },
      { slug: "lagoon-46" },
      { slug: "fountaine-pajot-51" },
      { slug: "fountaine-pajot-44" },
    ];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  await requirePage("fleet");
  const { slug } = await params;
  const yacht = await getYachtBySlug(slug);

  if (!yacht) return { title: "Yacht Not Found" };

  return pageMetadata({
    seo: yacht.seo,
    path: `/fleet/${yacht.slug}`,
    title: yacht.name,
    description: `${yacht.name} — ${yacht.type}, ${yacht.year}. ${yacht.guests} guests, ${yacht.cabins} cabins. From €${yacht.startingPrice.toLocaleString("en-US")}/week. Based in ${yacht.basePort}.`,
    image: yacht.heroImage || null,
  });
}

export default async function YachtDetailPage({ params }: PageProps) {
  await requirePage("fleet");
  const { slug } = await params;
  const yacht = await getYachtBySlug(slug);

  if (!yacht) notFound();

  const [related, site] = await Promise.all([getRelatedYachts(slug, 3), getSeoSettings()]);

  return (
    <>
      <JsonLd
        data={pageJsonLd(site, {
          seo: yacht.seo,
          path: `/fleet/${yacht.slug}`,
          title: yacht.name,
          description: yacht.description,
          image: yacht.heroImage || null,
          parents: [{ name: "Fleet", path: "/fleet" }],
          entities: [yachtJsonLd(site, yacht)],
        })}
      />
      <YachtDetailClient yacht={yacht} related={related} />
      <FaqSection seo={yacht.seo} />
    </>
  );
}
