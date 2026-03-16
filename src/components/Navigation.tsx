"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Menu, X, Anchor } from "lucide-react";

const navLinks = [
  { href: "/fleet", label: "Fleet" },
  { href: "/destinations", label: "Destinations" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  // Determine if we're on a page that needs a dark nav immediately
  const isDarkPage = pathname !== "/";

  useEffect(() => {
    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3 }
      );

      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { y: -10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
            delay: 0.6,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isTransparent = !scrolled && !isDarkPage && !menuOpen;

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: isTransparent
            ? "transparent"
            : "rgba(44, 44, 44, 0.97)",
          backdropFilter: isTransparent ? "none" : "blur(12px)",
          borderBottom: isTransparent
            ? "1px solid transparent"
            : "1px solid rgba(196, 150, 90, 0.15)",
        }}
      >
        <div className="container-xl">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div ref={logoRef}>
                <Image
                  src="/alma-logo.png"
                  alt="ALMA Yachting"
                  width={140}
                  height={48}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <ul
              ref={linksRef}
              className="hidden md:flex items-center gap-8 list-none m-0 p-0"
            >
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="nav-link"
                      style={{
                        color: isActive ? "#8A9BA8" : "rgba(245,240,235,0.85)",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-300"
                style={{
                  fontFamily: "var(--font-barlow-condensed), sans-serif",
                  background: "#C4965A",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#a87a42";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#C4965A";
                }}
              >
                Enquire Now
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 transition-colors"
                style={{ color: "rgba(245,240,235,0.9)" }}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-500"
        style={{
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: "rgba(10, 22, 40, 0.7)",
            opacity: menuOpen ? 1 : 0,
          }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className="absolute top-0 right-0 h-full w-[300px] flex flex-col transition-transform duration-500"
          style={{
            background: "rgba(44, 44, 44, 0.98)",
            backdropFilter: "blur(20px)",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            borderLeft: "1px solid rgba(138, 155, 168, 0.2)",
          }}
        >
          <div className="flex items-center justify-between px-6 h-[72px]">
            <span
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.2em",
                color: "#8A9BA8",
              }}
            >
              MENU
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ color: "rgba(245,240,235,0.7)" }}
            >
              <X size={20} />
            </button>
          </div>

          <div className="w-[40px] h-[1px] mx-6" style={{ background: "rgba(138, 155, 168, 0.2)" }} />

          <nav className="flex-1 px-6 py-8">
            <ul className="space-y-1 list-none p-0 m-0">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-4 transition-colors duration-200 group"
                      style={{
                        borderBottom: "1px solid rgba(245, 240, 235, 0.06)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-barlow-condensed), sans-serif",
                          fontWeight: 700,
                          fontSize: "22px",
                          letterSpacing: "0.05em",
                          color: isActive ? "#8A9BA8" : "rgba(245,240,235,0.85)",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {link.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-barlow-condensed), sans-serif",
                          fontWeight: 400,
                          fontSize: "11px",
                          color: "rgba(138,155,168,0.5)",
                        }}
                      >
                        0{i + 1}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-6 pb-10">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full justify-center"
            >
              <Anchor size={14} />
              Enquire Now
            </Link>
            <p
              className="mt-6 text-center"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "10px",
                letterSpacing: "0.1em",
                color: "rgba(138,155,168,0.6)",
              }}
            >
              ATHENS, GREECE
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
