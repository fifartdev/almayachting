import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Anchor, Ship, Users, Star, MapPin } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import FleetCard from "@/components/FleetCard";
import SectionTitle from "@/components/SectionTitle";
import { yachts } from "@/lib/yachts";
import { destinations } from "@/lib/destinations";

const services = [
  {
    icon: Ship,
    title: "Yacht Charter",
    description:
      "Tailor-made sailing experiences across the Greek islands. Choose your vessel, your crew, and your itinerary — we handle every detail.",
    href: "/services#charter",
  },
  {
    icon: Anchor,
    title: "Fleet Management",
    description:
      "Professional care and maintenance for your vessel. From technical oversight to mooring arrangements, your yacht is in expert hands.",
    href: "/services#management",
  },
  {
    icon: Users,
    title: "Crewing Services",
    description:
      "Experienced Greek captains and crews with deep knowledge of local waters, hidden anchorages, and island culture.",
    href: "/services#crewing",
  },
  {
    icon: Star,
    title: "Concierge & Extras",
    description:
      "Private chefs, curated island experiences, restaurant reservations, helicopter transfers — your perfect voyage, curated by us.",
    href: "/services#concierge",
  },
];

const featuredDestinations = destinations.slice(0, 5);

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. About Intro */}
      <section
        className="section-pad grain-overlay"
        style={{ background: "#F5F0EB" }}
      >
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Large editorial quote */}
            <div>
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: "#C4965A",
                  marginBottom: "32px",
                }}
              />
              <blockquote
                style={{
                  fontFamily: "var(--font-cormorant-garamond), serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(28px, 3.5vw, 46px)",
                  color: "#2C2C2C",
                  lineHeight: "1.35",
                  marginBottom: "32px",
                }}
              >
                &ldquo;Where the Aegean
                <br />
                meets luxury.&rdquo;
              </blockquote>
              <p
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "#C4965A",
                }}
              >
                — ALMA YACHTING, GREECE
              </p>
            </div>

            {/* Right: Brand text */}
            <div>
              <SectionTitle
                label="01 / Our Story"
                heading="Born from a<br/>love of the sea"
              />
              <div className="mt-6 space-y-4">
                <p
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    fontSize: "17px",
                    color: "rgba(44,44,44,0.75)",
                    lineHeight: "1.8",
                  }}
                >
                  ALMA Yachting was founded on a singular belief: that the
                  Greek islands deserve to be experienced from the water, on
                  your own terms, with the freedom to discover hidden coves
                  inaccessible to any other traveller.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    fontSize: "17px",
                    color: "rgba(44,44,44,0.75)",
                    lineHeight: "1.8",
                  }}
                >
                  Based in Athens and operating across the Aegean and Ionian
                  seas, our fleet of premium catamarans represents the finest
                  vessels available for charter in Greece — each one maintained
                  to the highest standard and crewed by professionals who know
                  these waters intimately.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/about" className="btn-dark">
                  Our Story
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Fleet Preview */}
      <section
        className="section-pad"
        style={{ background: "#fff" }}
      >
        <div className="container-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <SectionTitle
              label="02 / Fleet"
              heading="Our Premium<br/>Vessels"
              subtitle="Five exceptional catamarans, each a floating sanctuary for the discerning traveller."
            />
            <Link
              href="/fleet"
              className="flex items-center gap-2 shrink-0"
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#C4965A",
                whiteSpace: "nowrap",
              }}
            >
              View All Fleet
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {yachts.map((yacht) => (
              <FleetCard key={yacht.id} yacht={yacht} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Services */}
      <section
        className="section-pad grain-overlay"
        style={{ background: "#0A1628" }}
      >
        <div className="container-xl">
          <div className="text-center mb-14">
            <SectionTitle
              label="03 / Services"
              heading="What We Offer"
              subtitle="A complete suite of maritime services, delivered with Greek warmth and world-class precision."
              align="center"
              light
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group relative p-8 lg:p-10 transition-all duration-300"
                  style={{ background: "rgba(10,22,40,0.95)" }}
                >
                  <div
                    className="mb-6 flex items-center justify-center w-12 h-12"
                    style={{ border: "1px solid rgba(196,150,90,0.3)" }}
                  >
                    <Icon size={20} style={{ color: "#C4965A" }} />
                  </div>

                  <span
                    className="absolute top-6 right-6"
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "10px",
                      color: "rgba(196,150,90,0.3)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    0{i + 1}
                  </span>

                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "var(--font-barlow-condensed), sans-serif",
                      fontWeight: 700,
                      fontSize: "22px",
                      color: "#F5F0EB",
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-cormorant-garamond), serif",
                      fontSize: "15px",
                      color: "rgba(245,240,235,0.55)",
                      lineHeight: "1.7",
                    }}
                  >
                    {service.description}
                  </p>

                  <div
                    className="flex items-center gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{
                      fontFamily: "var(--font-barlow-condensed), sans-serif",
                      fontWeight: 700,
                      fontSize: "11px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#C4965A",
                    }}
                  >
                    Learn More
                    <ArrowRight size={12} />
                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: "#C4965A" }}
                  />
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-primary">
              All Services
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Destinations */}
      <section
        className="section-pad"
        style={{ background: "#F5F0EB" }}
      >
        <div className="container-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <SectionTitle
              label="04 / Destinations"
              heading="Greek Island<br/>Paradise"
              subtitle="From the glamour of Mykonos to the serenity of Hydra — discover Greece as only a yacht can show you."
            />
            <Link
              href="/destinations"
              className="flex items-center gap-2 shrink-0"
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#C4965A",
                whiteSpace: "nowrap",
              }}
            >
              All Destinations
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-12 gap-4">
            {/* Large featured card */}
            <Link
              href={`/destinations#${featuredDestinations[0].id}`}
              className="col-span-12 md:col-span-7 group relative overflow-hidden"
              style={{ aspectRatio: "16/10" }}
            >
              <Image
                src={`${featuredDestinations[0].image.split("?")[0]}?w=1200&q=80`}
                alt={featuredDestinations[0].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(10,22,40,0.85) 0%, transparent 55%)",
                }}
              />
              <div className="absolute bottom-0 left-0 p-8">
                <div
                  className="flex items-center gap-2 mb-2"
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    color: "#C4965A",
                  }}
                >
                  <MapPin size={11} />
                  {featuredDestinations[0].region}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-barlow-condensed), sans-serif",
                    fontWeight: 800,
                    fontSize: "36px",
                    color: "#F5F0EB",
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {featuredDestinations[0].name}
                </h3>
              </div>
            </Link>

            {/* Stack of 4 smaller cards */}
            <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-4">
              {featuredDestinations.slice(1, 5).map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destinations#${dest.id}`}
                  className="group relative overflow-hidden"
                  style={{ aspectRatio: "1/1" }}
                >
                  <Image
                    src={`${dest.image.split("?")[0]}?w=600&q=80`}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(10,22,40,0.8) 0%, transparent 55%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 p-4">
                    <p
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "9px",
                        letterSpacing: "0.15em",
                        color: "#C4965A",
                        marginBottom: "4px",
                      }}
                    >
                      {dest.region}
                    </p>
                    <h4
                      style={{
                        fontFamily: "var(--font-barlow-condensed), sans-serif",
                        fontWeight: 700,
                        fontSize: "18px",
                        color: "#F5F0EB",
                        textTransform: "uppercase",
                      }}
                    >
                      {dest.name}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contact CTA */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#2C2C2C" }}
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
            alt="Greek island from the sea"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>

        <div
          className="relative container-xl py-24 md:py-36 text-center"
          style={{ zIndex: 1 }}
        >
          <div
            className="mx-auto mb-8"
            style={{ width: "60px", height: "1px", background: "#C4965A" }}
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
            05 / Begin Your Journey
          </p>

          <h2
            className="mb-6 leading-none"
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(40px, 7vw, 90px)",
              color: "#F5F0EB",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
            }}
          >
            Ready to Set Sail?
          </h2>

          <p
            className="mb-10 mx-auto max-w-xl"
            style={{
              fontFamily: "var(--font-cormorant-garamond), serif",
              fontStyle: "italic",
              fontSize: "clamp(17px, 2vw, 22px)",
              fontWeight: 300,
              color: "rgba(245,240,235,0.65)",
              lineHeight: "1.65",
            }}
          >
            Contact our team to begin crafting your perfect Greek sailing
            experience. We respond within 24 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Plan Your Charter
              <ArrowRight size={14} />
            </Link>
            <Link href="/fleet" className="btn-outline">
              Browse Our Fleet
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center gap-3">
            <div style={{ width: "30px", height: "1px", background: "rgba(196,150,90,0.4)" }} />
            <span
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "10px",
                letterSpacing: "0.18em",
                color: "rgba(196,150,90,0.4)",
              }}
            >
              MARINA ZEA · PIRAEUS · ATHENS
            </span>
            <div style={{ width: "30px", height: "1px", background: "rgba(196,150,90,0.4)" }} />
          </div>
        </div>
      </section>
    </>
  );
}
