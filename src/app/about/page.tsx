import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Shield, Compass, Leaf } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story of ALMA Yachting — born in Greece, built on a passion for the sea. Learn about our team, values, and commitment to extraordinary sailing experiences.",
};

const stats = [
  { value: "5", label: "Premium Yachts" },
  { value: "10+", label: "Years Experience" },
  { value: "300+", label: "Happy Guests" },
  { value: "50+", label: "Destinations" },
];

const values = [
  {
    icon: Heart,
    title: "Passion",
    description:
      "We are sailors first and a company second. Every decision we make is filtered through one question: does this make our guests' time on the water better?",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "Transparent pricing, honest advice, and no hidden surprises. We tell you exactly what to expect, because the last thing we want is for reality to fall short of the promise.",
  },
  {
    icon: Compass,
    title: "Expertise",
    description:
      "Decades of combined sailing experience across the Aegean and Ionian seas. We know these waters not just professionally, but intimately — as sailors who love them.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "The sea we sail is the sea we cherish. We minimise our environmental footprint through modern vessel technology, responsible anchoring practices, and partnerships with local conservation initiatives.",
  },
];

const team = [
  {
    name: "Alexandros Papadopoulos",
    role: "Founder & Managing Director",
    bio: "Former competitive offshore sailor, Alexandros founded ALMA Yachting in 2014 after 15 years racing and cruising in Greek waters. His vision: make the finest sailing experiences in Greece accessible to those who love the sea.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Marina Kostaki",
    role: "Head of Charter Operations",
    bio: "With a background in luxury hospitality and a lifelong passion for sailing, Marina oversees every guest charter from first enquiry to final departure, ensuring every voyage exceeds expectations.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Nikos Georgiou",
    role: "Fleet Technical Director",
    bio: "A marine engineer with 20 years' experience, Nikos ensures every ALMA vessel is maintained to an immaculate standard. His obsession with technical excellence is the reason our fleet is always ready to sail.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div
        className="relative flex items-end overflow-hidden"
        style={{ height: "70vh", minHeight: "500px" }}
      >
        <Image
          src="/images/various/hero.jpg"
          alt="Greek coast from the sea"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,22,40,0.3) 0%, rgba(10,22,40,0.8) 100%)",
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
            06 / About
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
            Our Story
          </h1>
        </div>
      </div>

      {/* Story Section */}
      <section
        className="section-pad grain-overlay"
        style={{ background: "#F5F0EB" }}
      >
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: image */}
            <div className="relative">
              <div
                className="relative overflow-hidden img-hover-zoom"
                style={{ aspectRatio: "3/4" }}
              >
                <Image
                  src="/images/various/attica-riviera-b.jpg"
                  alt="ALMA Yachting — sailing Greece"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Stats overlay */}
              <div
                className="absolute bottom-0 right-0 grid grid-cols-2 gap-px"
                style={{ background: "rgba(196,150,90,0.3)" }}
              >
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center justify-center p-5"
                    style={{
                      background: "rgba(44,44,44,0.92)",
                      minWidth: "100px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-barlow-condensed), sans-serif",
                        fontWeight: 800,
                        fontSize: "28px",
                        color: "#C4965A",
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "8px",
                        letterSpacing: "0.15em",
                        color: "rgba(245,240,235,0.5)",
                        textTransform: "uppercase",
                        marginTop: "4px",
                        textAlign: "center",
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: story text */}
            <div>
              <SectionTitle
                label="Our Story"
                heading="Born in Athens,<br/>Made for the Sea"
              />

              <div className="mt-8 space-y-5">
                <p
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    fontSize: "18px",
                    color: "rgba(44,44,44,0.8)",
                    lineHeight: "1.8",
                  }}
                >
                  ALMA Yachting was born from a simple conviction: that the
                  Greek islands — among the most beautiful places on Earth — are
                  best experienced not from a hotel terrace, but from the deck
                  of a yacht, with the freedom to go wherever the wind and your
                  curiosity lead you.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    fontSize: "17px",
                    color: "rgba(44,44,44,0.7)",
                    lineHeight: "1.8",
                  }}
                >
                  Founded in Athens in 2014 by competitive sailor Alexandros
                  Papadopoulos, ALMA started as a single-vessel charter
                  operation in the Saronic Gulf. Within three years, growing
                  demand from discerning international guests had led to the
                  development of our current fleet of five premium catamarans —
                  each chosen for the quality of their design, performance, and
                  onboard experience.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    fontSize: "17px",
                    color: "rgba(44,44,44,0.7)",
                    lineHeight: "1.8",
                  }}
                >
                  Today, ALMA Yachting serves guests from more than 30
                  countries, offering not just yacht charter but a full suite of
                  maritime services: fleet management, crewing, and a concierge
                  programme designed to make every moment on the Greek islands
                  unforgettable. We are, in every sense, a company built by
                  sailors, for those who love the sea.
                </p>
              </div>

              <div className="mt-10">
                <Link href="/contact" className="btn-dark">
                  Begin Your Journey
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad" style={{ background: "#0A1628" }}>
        <div className="container-xl">
          <div className="text-center mb-14">
            <SectionTitle
              label="Our Values"
              heading="What We Stand For"
              subtitle="Four principles that guide every decision we make at ALMA Yachting."
              align="center"
              light
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="p-8"
                  style={{ border: "1px solid rgba(196,150,90,0.15)" }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="flex items-center justify-center w-10 h-10"
                      style={{ border: "1px solid rgba(196,150,90,0.3)" }}
                    >
                      <Icon size={18} style={{ color: "#C4965A" }} />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "10px",
                        color: "rgba(196,150,90,0.3)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      0{i + 1}
                    </span>
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
                    {value.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant-garamond), serif",
                      fontSize: "15px",
                      color: "rgba(245,240,235,0.5)",
                      lineHeight: "1.7",
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}

      {/* CTA */}
      <section
        className="py-24"
        style={{
          background: "#2C2C2C",
          borderTop: "1px solid rgba(196,150,90,0.15)",
        }}
      >
        <div className="container-xl text-center">
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "#F5F0EB",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            Sail with ALMA
          </h2>
          <p
            className="mb-8 mx-auto max-w-lg"
            style={{
              fontFamily: "var(--font-cormorant-garamond), serif",
              fontStyle: "italic",
              fontSize: "clamp(17px, 2vw, 21px)",
              color: "rgba(245,240,235,0.55)",
              lineHeight: "1.65",
            }}
          >
            Join the hundreds of guests who have experienced the Greek islands
            through our eyes — and our fleet.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/fleet" className="btn-primary">
              View Our Fleet
              <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="btn-outline">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
