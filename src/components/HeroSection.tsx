"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation timeline
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      )
        .fromTo(
          headlineRef.current,
          { y: 60, opacity: 0, skewY: 2 },
          { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );

      // Parallax on scroll
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* Background Image with Parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{ top: "-20%", bottom: "-20%", height: "140%" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&q=80"
          alt="Luxury catamaran sailing the Aegean Sea"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.35) 40%, rgba(10,22,40,0.7) 100%)",
          zIndex: 1,
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,22,40,0.4) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col justify-center h-full container-xl"
        style={{ zIndex: 2 }}
      >
        <div className="max-w-4xl">
          {/* Label */}
          <div
            ref={labelRef}
            className="flex items-center gap-4 mb-8"
          >
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "#C4965A",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: "rgba(196,150,90,0.9)",
                textTransform: "uppercase",
              }}
            >
              Greece · Mediterranean · Aegean
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="mb-6 leading-none"
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(52px, 9vw, 120px)",
              color: "#F5F0EB",
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
            }}
          >
            Sail the
            <br />
            <span style={{ color: "#C4965A" }}>Mediterranean</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mb-10 max-w-lg"
            style={{
              fontFamily: "var(--font-cormorant-garamond), serif",
              fontStyle: "italic",
              fontSize: "clamp(18px, 2.2vw, 24px)",
              fontWeight: 300,
              color: "rgba(245,240,235,0.8)",
              lineHeight: "1.6",
            }}
          >
            Bespoke yacht charters across the Greek islands. Where the Aegean
            meets luxury.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <Link href="/fleet" className="btn-primary">
              Explore Our Fleet
              <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="btn-outline">
              Plan Your Journey
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            borderTop: "1px solid rgba(245,240,235,0.1)",
          }}
        >
          <div className="container-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {[
                { value: "5", label: "Premium Yachts" },
                { value: "8+", label: "Destinations" },
                { value: "300+", label: "Happy Guests" },
                { value: "10+", label: "Years Experience" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="px-6 py-5 text-center"
                >
                  <div
                    style={{
                      fontFamily: "var(--font-barlow-condensed), sans-serif",
                      fontWeight: 700,
                      fontSize: "28px",
                      color: "#C4965A",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "9px",
                      letterSpacing: "0.15em",
                      color: "rgba(245,240,235,0.45)",
                      textTransform: "uppercase",
                      marginTop: "4px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute right-8 bottom-32 hidden md:flex flex-col items-center gap-3"
        style={{ zIndex: 2 }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "rgba(245,240,235,0.4)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Scroll
        </span>
        <div
          className="animate-scroll-bounce"
          style={{ color: "rgba(196,150,90,0.6)" }}
        >
          <ArrowDown size={16} />
        </div>
      </div>
    </div>
  );
}
