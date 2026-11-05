import type { WpSeo } from "@/lib/wordpress";
import SectionTitle from "@/components/SectionTitle";

/**
 * Visible FAQ from an entry's "AI search (GEO)" panel. Rendered only when the editor
 * ticks "Also show the FAQ on the page", matching the FAQPage structured data.
 */
export default function FaqSection({ seo }: { seo: WpSeo | null | undefined }) {
  const faq = seo?.ai.showFaq ? seo.ai.faq.filter((q) => q.question && q.answer) : [];
  if (!faq.length) return null;

  return (
    <section className="section-pad" style={{ background: "#F5F0EB" }}>
      <div className="container-xl max-w-3xl">
        <SectionTitle label="FAQ" heading="Frequently Asked Questions" />
        <div className="mt-10" style={{ borderTop: "1px solid rgba(10,22,40,0.12)" }}>
          {faq.map((item) => (
            <details key={item.question} className="group" style={{ borderBottom: "1px solid rgba(10,22,40,0.12)" }}>
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-6 py-6"
                style={{
                  fontFamily: "var(--font-barlow-condensed), sans-serif",
                  fontWeight: 700,
                  fontSize: "18px",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  color: "#0A1628",
                }}
              >
                {item.question}
                <span aria-hidden className="transition-transform duration-300 group-open:rotate-45" style={{ color: "#8A9BA8", fontSize: "24px" }}>
                  +
                </span>
              </summary>
              <p
                className="pb-6"
                style={{
                  fontFamily: "var(--font-cormorant-garamond), serif",
                  fontSize: "17px",
                  color: "rgba(44,44,44,0.75)",
                  lineHeight: "1.8",
                  whiteSpace: "pre-line",
                }}
              >
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
