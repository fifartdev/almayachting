import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Compass, Wind, Anchor } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { destinations } from "@/lib/destinations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore the finest Greek island destinations with ALMA Yachting. From Mykonos and Santorini to Corfu and Hydra — discover the Aegean and Ionian seas.",
};

const seas = [
  {
    name: "Aegean Sea",
    icon: Compass,
    description:
      "The birthplace of Western civilisation, dotted with iconic Cycladic islands and historic Dodecanese outposts.",
    islands: ["Mykonos", "Santorini", "Paros", "Rhodes"],
  },
  {
    name: "Ionian Sea",
    icon: Wind,
    description:
      "Calmer, verdant, and extraordinarily beautiful — the Ionian offers gentler sailing and lush green islands.",
    islands: ["Corfu", "Zakynthos", "Kefalonia", "Ithaca"],
  },
  {
    name: "Saronic Gulf",
    icon: Anchor,
    description:
      "Athens' backyard archipelago — easily accessible, deeply beautiful, and far less crowded than the Cyclades.",
    islands: ["Hydra", "Spetses", "Aegina", "Poros"],
  },
];

export default function DestinationsPage() {
  return (
    <>
      {/* Hero */}
      <div
        className="relative flex items-end overflow-hidden"
        style={{ height: "65vh", minHeight: "440px" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1920&q=80"
          alt="Greek islands from above"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,22,40,0.35) 0%, rgba(10,22,40,0.78) 100%)",
          }}
        />
        <div className="relative container-xl pb-16" style={{ zIndex: 1 }}>
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "#C4965A",
              textTransform: "uppercase",
            }}
          >
            04 / Destinations
          </p>
          <h1
            className="leading-none mb-4"
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(48px, 8vw, 100px)",
              color: "#F5F0EB",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
            }}
          >
            Greek Islands
          </h1>
          <p
            style={{
              fontFamily: "var(--font-cormorant-garamond), serif",
              fontStyle: "italic",
              fontSize: "clamp(16px, 2vw, 22px)",
              color: "rgba(245,240,235,0.65)",
              fontWeight: 300,
            }}
          >
            The Aegean, Ionian and Saronic seas await.
          </p>
        </div>
      </div>

      {/* Seas Section */}
      <section className="py-16" style={{ background: "#0A1628" }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {seas.map((sea) => {
              const Icon = sea.icon;
              return (
                <div
                  key={sea.name}
                  className="p-8 lg:p-10"
                  style={{ background: "#0A1628" }}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 mb-5"
                    style={{ border: "1px solid rgba(196,150,90,0.3)" }}
                  >
                    <Icon size={18} style={{ color: "#C4965A" }} />
                  </div>
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "var(--font-barlow-condensed), sans-serif",
                      fontWeight: 700,
                      fontSize: "22px",
                      color: "#F5F0EB",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {sea.name}
                  </h3>
                  <p
                    className="mb-5"
                    style={{
                      fontFamily: "var(--font-cormorant-garamond), serif",
                      fontSize: "15px",
                      color: "rgba(245,240,235,0.55)",
                      lineHeight: "1.7",
                    }}
                  >
                    {sea.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sea.islands.map((island) => (
                      <span
                        key={island}
                        style={{
                          fontFamily: "var(--font-dm-mono), monospace",
                          fontSize: "9px",
                          letterSpacing: "0.12em",
                          color: "rgba(196,150,90,0.7)",
                          border: "1px solid rgba(196,150,90,0.2)",
                          padding: "3px 8px",
                          textTransform: "uppercase",
                        }}
                      >
                        {island}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="section-pad" style={{ background: "#F5F0EB" }}>
        <div className="container-xl">
          <div className="mb-14">
            <SectionTitle
              label="All Destinations"
              heading="Where Will You<br/>Sail?"
              subtitle="Eight of the finest destinations in the Greek islands, each with its own character and magic."
            />
          </div>

          <div className="space-y-20">
            {destinations.map((dest, i) => (
              <div
                key={dest.id}
                id={dest.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                style={{
                  flexDirection: i % 2 === 1 ? "row-reverse" : "row",
                }}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden img-hover-zoom ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={`${dest.image.split("?")[0]}?w=900&q=80`}
                    alt={dest.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Number overlay */}
                  <div
                    className="absolute top-6 left-6"
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      color: "rgba(245,240,235,0.6)",
                      background: "rgba(10,22,40,0.6)",
                      backdropFilter: "blur(8px)",
                      padding: "5px 10px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Text */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin size={13} style={{ color: "#C4965A" }} />
                    <span
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "10px",
                        letterSpacing: "0.18em",
                        color: "#C4965A",
                        textTransform: "uppercase",
                      }}
                    >
                      {dest.region}
                    </span>
                    <div
                      style={{ width: "20px", height: "1px", background: "rgba(196,150,90,0.4)" }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "10px",
                        letterSpacing: "0.12em",
                        color: "rgba(44,44,44,0.4)",
                        textTransform: "uppercase",
                      }}
                    >
                      {dest.distance}
                    </span>
                  </div>

                  <h2
                    className="mb-5"
                    style={{
                      fontFamily: "var(--font-barlow-condensed), sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(36px, 5vw, 64px)",
                      color: "#2C2C2C",
                      textTransform: "uppercase",
                      letterSpacing: "-0.01em",
                      lineHeight: 1,
                    }}
                  >
                    {dest.name}
                  </h2>

                  <p
                    className="mb-6"
                    style={{
                      fontFamily: "var(--font-cormorant-garamond), serif",
                      fontSize: "17px",
                      color: "rgba(44,44,44,0.7)",
                      lineHeight: "1.8",
                    }}
                  >
                    {dest.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6 list-none p-0 m-0">
                    {dest.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <div
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: "#C4965A",
                            marginTop: "9px",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "var(--font-cormorant-garamond), serif",
                            fontSize: "15px",
                            color: "rgba(44,44,44,0.65)",
                          }}
                        >
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className="flex items-center gap-3"
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      color: "rgba(44,44,44,0.4)",
                      textTransform: "uppercase",
                    }}
                  >
                    <span>Best season:</span>
                    <span style={{ color: "#C4965A" }}>{dest.bestSeason}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Route CTA */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#0A1628" }}
      >
        <div className="container-xl py-24 text-center" style={{ zIndex: 1, position: "relative" }}>
          <div
            className="mx-auto mb-8"
            style={{ width: "50px", height: "1px", background: "#C4965A" }}
          />
          <p
            className="mb-4"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "#C4965A",
              textTransform: "uppercase",
            }}
          >
            Custom Routing
          </p>
          <h2
            className="mb-6 leading-none"
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(40px, 6vw, 80px)",
              color: "#F5F0EB",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
            }}
          >
            Create Your Custom Route
          </h2>
          <p
            className="mb-10 mx-auto max-w-xl"
            style={{
              fontFamily: "var(--font-cormorant-garamond), serif",
              fontStyle: "italic",
              fontSize: "clamp(17px, 2vw, 21px)",
              color: "rgba(245,240,235,0.55)",
              fontWeight: 300,
              lineHeight: "1.65",
            }}
          >
            Tell us your dream islands and we&apos;ll craft the perfect itinerary —
            from a weekend Saronic hop to a two-week Aegean odyssey.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Plan Your Route
              <ArrowRight size={14} />
            </Link>
            <Link href="/fleet" className="btn-outline">
              Browse Our Fleet
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
