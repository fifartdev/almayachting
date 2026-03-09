import Image from "next/image";
import Link from "next/link";
import { Ship, Anchor, Users, Star, ArrowRight, Check } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "ALMA Yachting provides luxury yacht charter, fleet management, crewing services, and bespoke concierge experiences across Greece.",
};

const services = [
  {
    id: "charter",
    icon: Ship,
    number: "01",
    title: "Yacht Charter",
    subtitle: "Tailor-made sailing experiences",
    description:
      "Every ALMA charter is built around you. Whether you're seeking a bareboat adventure with just the wind for company, or a fully crewed experience where every detail is handled by professionals, our team will craft an itinerary that transforms your time in Greece into something truly extraordinary.",
    longDescription:
      "We operate two charter models: bareboat, where qualified sailors take the helm themselves with complete freedom to explore at their own pace; and crewed, where an experienced captain and optional chef take care of everything while you simply enjoy the journey. Both models draw on our intimate knowledge of the Greek waters — from the iconic anchorages to the hidden coves that no guidebook will ever reveal.",
    features: [
      "Bareboat and fully crewed charter options",
      "Customisable itineraries across all Greek waters",
      "Flexible departure from Athens (Piraeus) or Corfu",
      "Provisioning and victualling services",
      "Airport transfers and logistics coordination",
      "24/7 shore support throughout your voyage",
    ],
    image: "https://images.unsplash.com/photo-1548574169-d870fc490f40?w=1200&q=80",
  },
  {
    id: "management",
    icon: Anchor,
    number: "02",
    title: "Fleet Management",
    subtitle: "Professional care for your vessel",
    description:
      "Owning a yacht in Greece is a privilege — maintaining her to the standard she deserves is a full-time commitment. ALMA Yachting's fleet management service means your vessel is always ready to sail, whether you're stepping aboard next weekend or in three months' time.",
    longDescription:
      "Our team of experienced marine engineers and naval architects oversee every aspect of vessel care: scheduled maintenance, antifouling, engine servicing, rigging inspection, and cosmetic upkeep. We manage mooring arrangements at the finest marinas in Greece, handle the administrative requirements of vessel ownership, and can generate charter revenue from your yacht when you're not using it — helping offset the cost of ownership.",
    features: [
      "Comprehensive technical maintenance programme",
      "Annual haul-out and antifouling management",
      "Marina and berthing arrangements",
      "Insurance and documentation handling",
      "Revenue generation through managed charter",
      "Monthly condition reports and photography",
    ],
    image: "https://images.unsplash.com/photo-1566576912-9bbbb76bcf66?w=1200&q=80",
  },
  {
    id: "crewing",
    icon: Users,
    number: "03",
    title: "Crewing Services",
    subtitle: "Experienced Greek maritime professionals",
    description:
      "There is no substitute for local knowledge. Our captains have spent their careers navigating these specific waters — they know where the meltemi blows hardest, which bays offer perfect shelter in a southerly, and which taverna on which island will give you the meal of your life.",
    longDescription:
      "Every ALMA crew member is rigorously vetted, fully licensed, and deeply passionate about sharing the best of Greece with their guests. Our skippers hold internationally recognised qualifications; our onboard chefs are trained in Greek and Mediterranean cuisine. We match crew to guest preferences carefully — a young, active couple planning to sail hard will receive a different crew recommendation than a multigenerational family looking for a relaxed, food-focused voyage.",
    features: [
      "RYA/MCA certified captains and first mates",
      "Professional onboard chefs on request",
      "Crew trained in first aid and safety procedures",
      "Local guides and dive instructors available",
      "Multilingual crew options (English, Greek, French, German)",
      "Careful crew-to-guest personality matching",
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
  },
  {
    id: "concierge",
    icon: Star,
    number: "04",
    title: "Concierge & Extras",
    subtitle: "Curated island experiences",
    description:
      "The yacht is your floating home. The Greek islands are your playground. Our concierge team exists to ensure that everything beyond the water — and much of what happens on it — meets the same standard of excellence that defines the ALMA experience.",
    longDescription:
      "From the moment you land at Athens airport to the moment you depart, ALMA's concierge service manages every logistical detail. We handle restaurant reservations at sought-after island tables, organise private wine tastings at Santorini's finest estates, arrange helicopter transfers for those who want to maximise their time afloat, and source water sports equipment, dive charters, and private guides for shore excursions. Nothing is too complex; everything is handled with discretion and care.",
    features: [
      "Priority restaurant reservations across the islands",
      "Private wine tours and archaeological site visits",
      "Helicopter and seaplane transfers",
      "Water sports and diving equipment",
      "Private chefs and event catering on board",
      "Bespoke wedding and celebration packages",
    ],
    image: "https://images.unsplash.com/photo-1590080875-aced2f3bc4ff?w=1200&q=80",
  },
];

const whyAlma = [
  {
    stat: "10+",
    label: "Years in the Aegean",
    description: "Over a decade of navigating these waters",
  },
  {
    stat: "300+",
    label: "Happy Guests",
    description: "Guests who return season after season",
  },
  {
    stat: "5",
    label: "Premium Vessels",
    description: "Maintained to the highest standard",
  },
  {
    stat: "24h",
    label: "Response Time",
    description: "We're always reachable when you need us",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <div
        className="relative flex items-end overflow-hidden"
        style={{ height: "60vh", minHeight: "420px" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1590080875-aced2f3bc4ff?w=1920&q=80"
          alt="Luxury yacht services"
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
            03 / Services
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
            What We Offer
          </h1>
          <p
            style={{
              fontFamily: "var(--font-cormorant-garamond), serif",
              fontStyle: "italic",
              fontSize: "clamp(16px, 2vw, 21px)",
              color: "rgba(245,240,235,0.65)",
              fontWeight: 300,
            }}
          >
            A complete suite of maritime services, delivered with Greek warmth.
          </p>
        </div>
      </div>

      {/* Services — alternating layout */}
      <div style={{ background: "#F5F0EB" }}>
        {services.map((service, i) => {
          const Icon = service.icon;
          const isReverse = i % 2 === 1;
          return (
            <section
              key={service.id}
              id={service.id}
              className="section-pad"
              style={{
                background: i % 2 === 0 ? "#F5F0EB" : "#fff",
              }}
            >
              <div className="container-xl">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}
                >
                  {/* Image */}
                  <div
                    className={`relative overflow-hidden img-hover-zoom ${
                      isReverse ? "lg:order-2" : ""
                    }`}
                    style={{ aspectRatio: "4/3" }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Number badge */}
                    <div
                      className="absolute bottom-0 right-0 flex items-center justify-center w-16 h-16"
                      style={{ background: "#C4965A" }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-barlow-condensed), sans-serif",
                          fontWeight: 800,
                          fontSize: "20px",
                          color: "#fff",
                        }}
                      >
                        {service.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={isReverse ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="flex items-center justify-center w-10 h-10"
                        style={{ border: "1px solid rgba(196,150,90,0.4)" }}
                      >
                        <Icon size={18} style={{ color: "#C4965A" }} />
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-dm-mono), monospace",
                          fontSize: "10px",
                          letterSpacing: "0.18em",
                          color: "#C4965A",
                          textTransform: "uppercase",
                        }}
                      >
                        {service.subtitle}
                      </span>
                    </div>

                    <h2
                      className="mb-4"
                      style={{
                        fontFamily: "var(--font-barlow-condensed), sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(38px, 4.5vw, 58px)",
                        color: "#2C2C2C",
                        textTransform: "uppercase",
                        letterSpacing: "-0.01em",
                        lineHeight: 1,
                      }}
                    >
                      {service.title}
                    </h2>

                    <p
                      className="mb-4"
                      style={{
                        fontFamily: "var(--font-cormorant-garamond), serif",
                        fontSize: "17px",
                        color: "rgba(44,44,44,0.8)",
                        lineHeight: "1.8",
                      }}
                    >
                      {service.description}
                    </p>

                    <p
                      className="mb-8"
                      style={{
                        fontFamily: "var(--font-cormorant-garamond), serif",
                        fontSize: "16px",
                        color: "rgba(44,44,44,0.6)",
                        lineHeight: "1.8",
                      }}
                    >
                      {service.longDescription}
                    </p>

                    <ul className="space-y-3 mb-8 list-none p-0 m-0">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div
                            className="flex items-center justify-center w-5 h-5 mt-0.5 shrink-0"
                            style={{ background: "rgba(196,150,90,0.12)" }}
                          >
                            <Check size={11} style={{ color: "#C4965A" }} />
                          </div>
                          <span
                            style={{
                              fontFamily: "var(--font-cormorant-garamond), serif",
                              fontSize: "16px",
                              color: "rgba(44,44,44,0.7)",
                              lineHeight: "1.5",
                            }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/contact" className="btn-dark">
                      Enquire About This Service
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Why Choose ALMA */}
      <section
        className="section-pad grain-overlay"
        style={{ background: "#0A1628" }}
      >
        <div className="container-xl">
          <div className="text-center mb-16">
            <SectionTitle
              label="Why ALMA"
              heading="The ALMA Difference"
              subtitle="We're not a booking platform. We're a team of passionate sailors who happen to run a company."
              align="center"
              light
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {whyAlma.map((item) => (
              <div
                key={item.stat}
                className="p-8 text-center"
                style={{ background: "#0A1628" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-barlow-condensed), sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(40px, 5vw, 64px)",
                    color: "#C4965A",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {item.stat}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-barlow-condensed), sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "#F5F0EB",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: "6px",
                  }}
                >
                  {item.label}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    fontSize: "14px",
                    color: "rgba(245,240,235,0.4)",
                    lineHeight: "1.5",
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/contact" className="btn-primary">
              Begin Your Journey
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
