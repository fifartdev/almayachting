/**
 * Standard template for client-managed WordPress pages: hero (featured image,
 * label, title, subtitle) → block editor content → optional CTA band → FAQ.
 * Built-in routes (/fleet, /about, …) take precedence over this catch-all.
 */
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getPageByPath, getPages } from "@/lib/pages";
import { getSeoSettings, pageJsonLd, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page) => ({ slug: page.path.split("/").filter(Boolean) }));
}

async function loadPage(params: PageProps["params"]) {
  const { slug } = await params;
  return getPageByPath(`/${slug.join("/")}`);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await loadPage(params);
  if (!page) return { title: "Page Not Found", robots: { index: false } };
  return pageMetadata({
    seo: page.seo,
    path: page.path,
    title: page.title,
    description: page.heroSubtitle || undefined,
    image: page.heroImage,
  });
}

export default async function StandardPage({ params }: PageProps) {
  const [page, site, pages] = await Promise.all([loadPage(params), getSeoSettings(), getPages()]);
  if (!page) notFound();

  // Breadcrumb trail through parent pages, e.g. /guides/hydra → Guides.
  const segments = page.path.split("/").filter(Boolean);
  const parents = segments
    .slice(0, -1)
    .map((_, i) => pages.find((p) => p.path === `/${segments.slice(0, i + 1).join("/")}`))
    .filter((p) => p !== undefined)
    .map((p) => ({ name: p.seo?.ai.breadcrumbTitle || p.title, path: p.path }));

  return (
    <>
      <JsonLd
        data={pageJsonLd(site, {
          seo: page.seo,
          path: page.path,
          title: page.title,
          description: page.heroSubtitle,
          image: page.heroImage?.url ?? null,
          parents,
        })}
      />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "#0A1628", minHeight: "60svh" }}>
        {page.heroImage && (
          <>
            <Image
              src={page.heroImage.url}
              alt={page.heroImage.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.35) 40%, rgba(10,22,40,0.8) 100%)",
              }}
            />
          </>
        )}
        <div
          className="relative container-xl flex flex-col justify-end pb-16 md:pb-20"
          style={{ minHeight: "60svh", paddingTop: "140px", zIndex: 1 }}
        >
          {page.heroLabel && (
            <div className="flex items-center gap-4 mb-6">
              <div style={{ width: "40px", height: "1px", background: "rgba(138,155,168,0.5)" }} />
              <span
                style={{
                  fontFamily: "var(--font-barlow-condensed), sans-serif",
                  fontWeight: 500,
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: "rgba(138,155,168,0.9)",
                  textTransform: "uppercase",
                }}
              >
                {page.heroLabel}
              </span>
            </div>
          )}
          <h1
            className="leading-none max-w-4xl"
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(44px, 7vw, 96px)",
              color: "#F5F0EB",
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
            }}
          >
            {page.title}
          </h1>
          {page.heroSubtitle && (
            <p
              data-speakable
              className="mt-6 max-w-2xl"
              style={{
                fontFamily: "var(--font-cormorant-garamond), serif",
                fontStyle: "italic",
                fontSize: "clamp(18px, 2.2vw, 22px)",
                fontWeight: 300,
                color: "rgba(245,240,235,0.8)",
                lineHeight: "1.6",
              }}
            >
              {page.heroSubtitle}
            </p>
          )}
        </div>
      </section>

      {/* Content (WordPress block editor HTML, written by trusted editors) */}
      {page.content.trim() && (
        <section className="section-pad" style={{ background: "#fff" }}>
          <div className="container-xl">
            <div className="wp-content" dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        </section>
      )}

      {/* CTA band */}
      {page.cta.enabled && (
        <section className="relative overflow-hidden grain-overlay" style={{ background: "#0A1628" }}>
          <div className="relative container-xl py-20 md:py-28 text-center" style={{ zIndex: 1 }}>
            {page.cta.heading && (
              <h2
                className="mb-6"
                style={{
                  fontFamily: "var(--font-barlow-condensed), sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(36px, 5vw, 64px)",
                  color: "#F5F0EB",
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                }}
              >
                {page.cta.heading}
              </h2>
            )}
            {page.cta.bodyText && (
              <p
                className="mx-auto mb-10 max-w-xl"
                style={{
                  fontFamily: "var(--font-cormorant-garamond), serif",
                  fontSize: "18px",
                  color: "rgba(245,240,235,0.7)",
                  lineHeight: "1.7",
                }}
              >
                {page.cta.bodyText}
              </p>
            )}
            {page.cta.buttonText && (
              <Link href={page.cta.buttonUrl || "/contact"} className="btn-primary">
                {page.cta.buttonText}
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </section>
      )}

      <FaqSection seo={page.seo} />
    </>
  );
}
