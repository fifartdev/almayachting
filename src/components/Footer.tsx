"use client";

import Link from "next/link";
import Image from "next/image";
import { Anchor, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const companyLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/services", label: "Services" },
  { href: "/destinations", label: "Destinations" },
  { href: "/contact", label: "Contact Us" },
];

const fleetLinks = [
  { href: "/fleet/lagoon-55", label: "Lagoon 55" },
  { href: "/fleet/lagoon-51", label: "Lagoon 51" },
  { href: "/fleet/lagoon-46", label: "Lagoon 46" },
  { href: "/fleet/fountaine-pajot-51", label: "Fountaine Pajot 51" },
  { href: "/fleet/fountaine-pajot-44", label: "Fountaine Pajot 44" },
];

const destinationLinks = [
  { href: "/destinations#mykonos", label: "Mykonos" },
  { href: "/destinations#santorini", label: "Santorini" },
  { href: "/destinations#corfu", label: "Corfu" },
  { href: "/destinations#rhodes", label: "Rhodes" },
  { href: "/destinations#hydra", label: "Hydra" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "#2C2C2C", color: "rgba(245,240,235,0.75)" }}>
      {/* Top section */}
      <div className="container-xl py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-6 w-fit">
              <Image
                src="/alma-logo.png"
                alt="ALMA Yachting"
                width={240}
                height={80}
                className="h-20 w-auto object-contain"
              />
            </Link>

            <p
              className="text-sm leading-relaxed mb-6"
              style={{
                fontFamily: "var(--font-cormorant-garamond), serif",
                fontSize: "15px",
                color: "rgba(245,240,235,0.55)",
              }}
            >
              Bespoke luxury yacht charter and fleet management services across
              the Greek islands. Sail the Aegean with ALMA.
            </p>

            <div className="flex items-center gap-2 mb-8">
              <Anchor size={14} style={{ color: "#C4965A", flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "rgba(196,150,90,0.7)",
                }}
              >
                ATHENS, GREECE
              </span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 border transition-all duration-300 hover:border-gold"
                style={{
                  border: "1px solid rgba(196,150,90,0.25)",
                  color: "rgba(245,240,235,0.5)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#C4965A";
                  el.style.color = "#C4965A";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(196,150,90,0.25)";
                  el.style.color = "rgba(245,240,235,0.5)";
                }}
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 border transition-all duration-300"
                style={{
                  border: "1px solid rgba(196,150,90,0.25)",
                  color: "rgba(245,240,235,0.5)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#C4965A";
                  el.style.color = "#C4965A";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(196,150,90,0.25)";
                  el.style.color = "rgba(245,240,235,0.5)";
                }}
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4
              className="mb-5"
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: "#C4965A",
                textTransform: "uppercase",
              }}
            >
              Company
            </h4>
            <ul className="space-y-3 list-none p-0 m-0">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-cormorant-garamond), serif",
                      fontSize: "15px",
                      color: "rgba(245,240,235,0.55)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#F5F0EB";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(245,240,235,0.55)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fleet */}
          <div>
            <h4
              className="mb-5"
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: "#C4965A",
                textTransform: "uppercase",
              }}
            >
              Our Fleet
            </h4>
            <ul className="space-y-3 list-none p-0 m-0">
              {fleetLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-cormorant-garamond), serif",
                      fontSize: "15px",
                      color: "rgba(245,240,235,0.55)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#F5F0EB";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(245,240,235,0.55)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div
              className="mt-6"
              style={{
                width: "30px",
                height: "1px",
                background: "rgba(196,150,90,0.4)",
              }}
            />

            <h4
              className="mt-6 mb-5"
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: "#C4965A",
                textTransform: "uppercase",
              }}
            >
              Destinations
            </h4>
            <ul className="space-y-3 list-none p-0 m-0">
              {destinationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-cormorant-garamond), serif",
                      fontSize: "15px",
                      color: "rgba(245,240,235,0.55)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#F5F0EB";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(245,240,235,0.55)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="mb-5"
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: "#C4965A",
                textTransform: "uppercase",
              }}
            >
              Contact
            </h4>
            <ul className="space-y-4 list-none p-0 m-0">
              <li className="flex items-start gap-3">
                <MapPin
                  size={14}
                  className="mt-1 flex-shrink-0"
                  style={{ color: "#C4965A" }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    fontSize: "15px",
                    color: "rgba(245,240,235,0.55)",
                    lineHeight: "1.6",
                  }}
                >
                  Alimos Marina,
                  <br />
                  Athens, Greece 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  size={14}
                  className="flex-shrink-0"
                  style={{ color: "#C4965A" }}
                />
                <a
                  href="tel:+302101234567"
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    fontSize: "15px",
                    color: "rgba(245,240,235,0.55)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#F5F0EB";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(245,240,235,0.55)";
                  }}
                >
                  +30 210 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  size={14}
                  className="flex-shrink-0"
                  style={{ color: "#C4965A" }}
                />
                <a
                  href="mailto:info@almayachting.com"
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    fontSize: "15px",
                    color: "rgba(245,240,235,0.55)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#F5F0EB";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(245,240,235,0.55)";
                  }}
                >
                  info@almayachting.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(196,150,90,0.12)" }}>
        <div className="container-xl py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "rgba(245,240,235,0.3)",
              }}
            >
              &copy; {currentYear} ALMA YACHTING. ALL RIGHTS RESERVED.
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant-garamond), serif",
                fontSize: "13px",
                fontStyle: "italic",
                color: "rgba(196,150,90,0.5)",
                letterSpacing: "0.04em",
              }}
            >
              Designed for the Mediterranean
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/privacy"
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "rgba(245,240,235,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(245,240,235,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(245,240,235,0.3)";
                }}
              >
                PRIVACY
              </Link>
              <Link
                href="/terms"
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "rgba(245,240,235,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(245,240,235,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(245,240,235,0.3)";
                }}
              >
                TERMS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
