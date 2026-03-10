import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FleetCard from "@/components/FleetCard";
import SectionTitle from "@/components/SectionTitle";
import { yachts } from "@/lib/yachts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Fleet",
  description:
    "Explore ALMA Yachting's premium fleet of five luxury catamarans available for charter in Greece. Lagoon and Fountaine Pajot vessels from 44ft to 55ft.",
};

export default function FleetPage() {
  return (
    <>
      {/* Hero */}
      <div
        className="relative flex items-end overflow-hidden"
        style={{ height: "60vh", minHeight: "400px" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=1920&q=80"
          alt="ALMA Yachting fleet"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,22,40,0.4) 0%, rgba(10,22,40,0.75) 100%)",
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
            02 / Fleet
          </p>
          <h1
            className="leading-none"
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(48px, 8vw, 100px)",
              color: "#F5F0EB",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
            }}
          >
            Our Fleet
          </h1>
        </div>
      </div>

      {/* Intro strip */}
      <div
        className="py-6"
        style={{
          background: "#2C2C2C",
          borderBottom: "1px solid rgba(196,150,90,0.15)",
        }}
      >
        <div className="container-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p
              style={{
                fontFamily: "var(--font-cormorant-garamond), serif",
                fontStyle: "italic",
                fontSize: "17px",
                color: "rgba(245,240,235,0.6)",
              }}
            >
              Five premium catamarans. All based in Athens. All available for crewed or bareboat charter.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-barlow-condensed), sans-serif",
                    fontWeight: 700,
                    fontSize: "22px",
                    color: "#C4965A",
                  }}
                >
                  5
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "rgba(245,240,235,0.4)",
                    display: "block",
                  }}
                >
                  VESSELS
                </span>
              </div>
              <div
                style={{ width: "1px", height: "32px", background: "rgba(196,150,90,0.2)" }}
              />
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-barlow-condensed), sans-serif",
                    fontWeight: 700,
                    fontSize: "22px",
                    color: "#C4965A",
                  }}
                >
                  44–55ft
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "rgba(245,240,235,0.4)",
                    display: "block",
                  }}
                >
                  LENGTH RANGE
                </span>
              </div>
              <div
                style={{ width: "1px", height: "32px", background: "rgba(196,150,90,0.2)" }}
              />
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-barlow-condensed), sans-serif",
                    fontWeight: 700,
                    fontSize: "22px",
                    color: "#C4965A",
                  }}
                >
                  6–8
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "rgba(245,240,235,0.4)",
                    display: "block",
                  }}
                >
                  GUESTS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Grid */}
      <section className="section-pad" style={{ background: "#F5F0EB" }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {yachts.map((yacht) => (
              <FleetCard key={yacht.id} yacht={yacht} />
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Charters CTA */}
      <section
        className="section-pad grain-overlay"
        style={{ background: "#0A1628" }}
      >
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle
                label="Bespoke Charters"
                heading="Can't find your<br/>perfect match?"
                subtitle="Tell us your dream voyage and we'll find the ideal vessel from our extended network of premium yachts across Greece."
                light
              />
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">
                  Speak to Our Team
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Charter Types", value: "Bareboat & Crewed" },
                { label: "Base Port", value: "Athens, Greece" },
                { label: "Season", value: "April – November" },
                { label: "Response Time", value: "Within 24 Hours" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-6"
                  style={{ border: "1px solid rgba(196,150,90,0.2)" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "9px",
                      letterSpacing: "0.18em",
                      color: "#C4965A",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-barlow-condensed), sans-serif",
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "#F5F0EB",
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
