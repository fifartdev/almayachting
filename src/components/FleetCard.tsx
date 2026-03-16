import Image from "next/image";
import Link from "next/link";
import { Users, Bed, Ruler, ArrowRight } from "lucide-react";
import type { Yacht } from "@/lib/yachts";

interface FleetCardProps {
  yacht: Yacht;
}

export default function FleetCard({ yacht }: FleetCardProps) {
  return (
    <Link
      href={`/fleet/${yacht.slug}`}
      className="group block bg-white luxury-card"
      style={{
        border: "1px solid rgba(232, 228, 223, 0.8)",
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <div className="img-hover-zoom relative" style={{ aspectRatio: "4/3" }}>
        <Image
          src={`${yacht.heroImage.split("?")[0]}`}
          alt={yacht.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Year badge */}
        <div
          className="absolute top-4 left-4"
          style={{
            background: "rgba(10,22,40,0.8)",
            backdropFilter: "blur(8px)",
            padding: "5px 12px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 500,
              fontSize: "10px",
              letterSpacing: "0.15em",
              color: "#8A9BA8",
            }}
          >
            {yacht.year}
          </span>
        </div>

        {/* Gold overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to top, rgba(196,150,90,0.25) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Type label */}
        <p
          className="mb-2"
          style={{
            fontFamily: "var(--font-barlow-condensed), sans-serif",
            fontWeight: 500,
            fontSize: "9px",
            letterSpacing: "0.18em",
            color: "rgba(10,22,40,0.5)",
            textTransform: "uppercase",
          }}
        >
          {yacht.type}
        </p>

        {/* Name */}
        <h3
          className="mb-4"
          style={{
            fontFamily: "var(--font-barlow-condensed), sans-serif",
            fontWeight: 700,
            fontSize: "26px",
            color: "#2C2C2C",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
          }}
        >
          {yacht.name}
        </h3>

        {/* Specs row */}
        <div
          className="flex items-center gap-5 mb-5 pb-5"
          style={{ borderBottom: "1px solid #E8E4DF" }}
        >
          <div className="flex items-center gap-1.5">
            <Ruler size={13} style={{ color: "#8A9BA8" }} />
            <span
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                color: "#8A9BA8",
              }}
            >
              {yacht.length}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={13} style={{ color: "#8A9BA8" }} />
            <span
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                color: "#8A9BA8",
              }}
            >
              {yacht.guests} guests
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed size={13} style={{ color: "#8A9BA8" }} />
            <span
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                color: "#8A9BA8",
              }}
            >
              {yacht.cabins} cabins
            </span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 500,
                fontSize: "10px",
                letterSpacing: "0.1em",
                color: "#8A9BA8",
              }}
            >
              FROM
            </span>
            <div
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                color: "#2C2C2C",
              }}
            >
              €{yacht.startingPrice.toLocaleString()}
              <span
                style={{
                  fontFamily: "var(--font-barlow-condensed), sans-serif",
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "#8A9BA8",
                  marginLeft: "4px",
                }}
              >
                /week
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#0A1628",
            }}
          >
            View Details
            <ArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>

      {/* Bottom border on hover */}
      <div
        className="h-[2px] transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100"
        style={{ background: "#0A1628" }}
      />
    </Link>
  );
}
