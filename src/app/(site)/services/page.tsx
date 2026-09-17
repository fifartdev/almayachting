import Image from "next/image";
import Link from "next/link";
import { Ship, Anchor, Users, Star, ArrowRight, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import type { Metadata } from "next";
import { getServices } from "@/lib/services";
import { getServicesPage } from "@/lib/globals";

export const metadata: Metadata = {
  title: "Services",
  description:
    "ALMA Yachting provides luxury yacht charter, fleet management, crewing services, and bespoke concierge experiences across Greece.",
};

const serviceIcons: LucideIcon[] = [Ship, Anchor, Users, Star];
const fallbackImages = [
  "/images/services/yacht-charter.jpg",
  "/images/services/fleet-management.jpg",
  "/images/services/crewing-services.jpg",
  "/images/services/concierge-extras.jpg",
];

export default async function ServicesPage() {
  const [services, servicesPage] = await Promise.all([getServices(), getServicesPage()]);
  return (
    <>
      {/* Hero */}
      <div
        className="relative flex items-end overflow-hidden"
        style={{ height: "60vh", minHeight: "420px" }}
      >
        <Image
          src="/images/various/hero.jpg"
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
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 500,
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "#8A9BA8",
              textTransform: "uppercase",
            }}
          >
            {servicesPage.pageLabel}
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
            {servicesPage.pageHeading}
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
            {servicesPage.pageSubheading}
          </p>
        </div>
      </div>

      {/* Services — alternating layout */}
      <div style={{ background: "#F5F0EB" }}>
        {services.map((service, i) => {
          const Icon = serviceIcons[i % serviceIcons.length];
          const image = service.image || fallbackImages[i % fallbackImages.length];
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
                      src={image}
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
                          fontFamily:
                            "var(--font-barlow-condensed), sans-serif",
                          fontWeight: 800,
                          fontSize: "20px",
                          color: "#fff",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={isReverse ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="flex items-center justify-center w-10 h-10"
                        style={{ border: "1px solid rgba(10,22,40,0.4)" }}
                      >
                        <Icon size={18} style={{ color: "#0A1628" }} />
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-barlow-condensed), sans-serif",
                          fontWeight: 500,
                          fontSize: "10px",
                          letterSpacing: "0.18em",
                          color: "#0A1628",
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
                            style={{ background: "rgba(10,22,40,0.08)" }}
                          >
                            <Check size={11} style={{ color: "#0A1628" }} />
                          </div>
                          <span
                            style={{
                              fontFamily:
                                "var(--font-cormorant-garamond), serif",
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
              label={servicesPage.whyAlmaLabel}
              heading={servicesPage.whyAlmaHeading}
              subtitle={servicesPage.whyAlmaSubtitle}
              align="center"
              light
            />
          </div>

          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {servicesPage.whyAlmaStats.map((item) => (
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
                    color: "#8A9BA8",
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
