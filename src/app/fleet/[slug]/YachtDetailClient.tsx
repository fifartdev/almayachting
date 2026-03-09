"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Users,
  Bed,
  Ruler,
  Bath,
  Anchor,
  ArrowRight,
  ChevronRight,
  Send,
} from "lucide-react";
import type { Yacht } from "@/lib/yachts";
import FleetCard from "@/components/FleetCard";

interface Props {
  yacht: Yacht;
  related: Yacht[];
}

export default function YachtDetailClient({ yacht, related }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <div
        className="relative flex items-end overflow-hidden"
        style={{ height: "80vh", minHeight: "500px" }}
      >
        <Image
          src={yacht.heroImage}
          alt={yacht.name}
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

        {/* Breadcrumb */}
        <div
          className="absolute top-24 left-0 right-0"
          style={{ zIndex: 1 }}
        >
          <div className="container-xl">
            <div
              className="flex items-center gap-2"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "rgba(245,240,235,0.5)",
                textTransform: "uppercase",
              }}
            >
              <Link
                href="/fleet"
                style={{ color: "rgba(245,240,235,0.5)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#C4965A")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(245,240,235,0.5)")
                }
              >
                Fleet
              </Link>
              <ChevronRight size={12} />
              <span style={{ color: "#C4965A" }}>{yacht.name}</span>
            </div>
          </div>
        </div>

        <div className="relative container-xl pb-16" style={{ zIndex: 1 }}>
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "#C4965A",
            }}
          >
            {yacht.type} · {yacht.year}
          </p>
          <h1
            className="leading-none mb-4"
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(52px, 8vw, 100px)",
              color: "#F5F0EB",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
            }}
          >
            {yacht.name}
          </h1>

          {/* Quick specs */}
          <div className="flex flex-wrap gap-6">
            {[
              { icon: Ruler, label: yacht.length },
              { icon: Users, label: `${yacht.guests} Guests` },
              { icon: Bed, label: `${yacht.cabins} Cabins` },
              { icon: Bath, label: `${yacht.bathrooms} Bathrooms` },
            ].map((spec) => {
              const Icon = spec.icon;
              return (
                <div key={spec.label} className="flex items-center gap-2">
                  <Icon size={14} style={{ color: "#C4965A" }} />
                  <span
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "11px",
                      color: "rgba(245,240,235,0.75)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {spec.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content + sidebar */}
      <div className="section-pad" style={{ background: "#F5F0EB" }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left: content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-12">
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: "#C4965A",
                    marginBottom: "24px",
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    fontSize: "18px",
                    color: "rgba(44,44,44,0.8)",
                    lineHeight: "1.8",
                  }}
                >
                  {yacht.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="mb-12">
                <h2
                  className="mb-6"
                  style={{
                    fontFamily: "var(--font-barlow-condensed), sans-serif",
                    fontWeight: 700,
                    fontSize: "22px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#2C2C2C",
                  }}
                >
                  Highlights
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 m-0">
                  {yacht.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "1px solid #C4965A",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "3px",
                        }}
                      >
                        <div
                          style={{
                            width: "4px",
                            height: "4px",
                            background: "#C4965A",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-cormorant-garamond), serif",
                          fontSize: "16px",
                          color: "rgba(44,44,44,0.75)",
                          lineHeight: "1.5",
                        }}
                      >
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications Table */}
              <div className="mb-12">
                <h2
                  className="mb-6"
                  style={{
                    fontFamily: "var(--font-barlow-condensed), sans-serif",
                    fontWeight: 700,
                    fontSize: "22px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#2C2C2C",
                  }}
                >
                  Technical Specifications
                </h2>
                <div
                  style={{
                    border: "1px solid #E8E4DF",
                    background: "#fff",
                  }}
                >
                  {[
                    { label: "Length Overall", value: yacht.specifications.loa },
                    { label: "Beam", value: yacht.specifications.beam },
                    { label: "Draft", value: yacht.specifications.draft },
                    { label: "Displacement", value: yacht.specifications.displacement },
                    ...(yacht.specifications.sailArea
                      ? [{ label: "Sail Area", value: yacht.specifications.sailArea }]
                      : []),
                    { label: "Engines", value: yacht.specifications.engines },
                    { label: "Fuel Capacity", value: yacht.specifications.fuelCapacity },
                    { label: "Water Capacity", value: yacht.specifications.waterCapacity },
                    { label: "Max Speed", value: yacht.specifications.maxSpeed },
                    { label: "Cruising Speed", value: yacht.specifications.cruisingSpeed },
                    { label: "Guests", value: `${yacht.guests} persons` },
                    { label: "Cabins", value: `${yacht.cabins} cabins` },
                    { label: "Bathrooms", value: `${yacht.bathrooms} en-suite` },
                    { label: "Base Port", value: yacht.basePort },
                  ].map((row, i) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between px-6 py-3"
                      style={{
                        borderBottom: i < 13 ? "1px solid #E8E4DF" : "none",
                        background: i % 2 === 0 ? "#fff" : "#faf8f5",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-dm-mono), monospace",
                          fontSize: "10px",
                          letterSpacing: "0.12em",
                          color: "#8A9BA8",
                          textTransform: "uppercase",
                        }}
                      >
                        {row.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-cormorant-garamond), serif",
                          fontSize: "16px",
                          color: "#2C2C2C",
                          fontWeight: 500,
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Gallery */}
              <div>
                <h2
                  className="mb-6"
                  style={{
                    fontFamily: "var(--font-barlow-condensed), sans-serif",
                    fontWeight: 700,
                    fontSize: "22px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#2C2C2C",
                  }}
                >
                  Gallery
                </h2>
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={12}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                  }}
                  className="yacht-gallery-swiper"
                  style={{ paddingBottom: "40px" }}
                >
                  {yacht.images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <div
                        className="relative overflow-hidden"
                        style={{ aspectRatio: "4/3" }}
                      >
                        <Image
                          src={`${img.split("?")[0]}?w=800&q=80`}
                          alt={`${yacht.name} — image ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Right: sticky enquiry sidebar */}
            <div className="lg:col-span-1">
              <div
                className="lg:sticky lg:top-28"
                style={{
                  background: "#2C2C2C",
                  border: "1px solid rgba(196,150,90,0.2)",
                }}
              >
                {/* Price header */}
                <div
                  className="px-7 py-6"
                  style={{ borderBottom: "1px solid rgba(196,150,90,0.15)" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      color: "rgba(196,150,90,0.6)",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    Starting from
                  </p>
                  <div
                    style={{
                      fontFamily: "var(--font-barlow-condensed), sans-serif",
                      fontWeight: 700,
                      fontSize: "36px",
                      color: "#F5F0EB",
                      lineHeight: 1,
                    }}
                  >
                    €{yacht.startingPrice.toLocaleString()}
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "rgba(245,240,235,0.45)",
                        marginLeft: "6px",
                        fontFamily: "var(--font-dm-mono), monospace",
                      }}
                    >
                      / week
                    </span>
                  </div>
                </div>

                {/* Form */}
                <div className="px-7 py-6">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div
                        className="flex items-center justify-center w-12 h-12 mx-auto mb-4"
                        style={{ border: "1px solid #C4965A" }}
                      >
                        <Anchor size={20} style={{ color: "#C4965A" }} />
                      </div>
                      <p
                        style={{
                          fontFamily: "var(--font-barlow-condensed), sans-serif",
                          fontWeight: 700,
                          fontSize: "18px",
                          color: "#F5F0EB",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          marginBottom: "8px",
                        }}
                      >
                        Enquiry Sent
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-cormorant-garamond), serif",
                          fontSize: "15px",
                          color: "rgba(245,240,235,0.55)",
                          lineHeight: "1.6",
                        }}
                      >
                        We&apos;ll be in touch within 24 hours to begin planning your voyage.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <p
                        style={{
                          fontFamily: "var(--font-barlow-condensed), sans-serif",
                          fontWeight: 700,
                          fontSize: "14px",
                          letterSpacing: "0.12em",
                          color: "#F5F0EB",
                          textTransform: "uppercase",
                          marginBottom: "16px",
                        }}
                      >
                        Request Availability
                      </p>

                      {[
                        { name: "name", label: "Full Name", type: "text", required: true },
                        { name: "email", label: "Email Address", type: "email", required: true },
                        { name: "phone", label: "Phone Number", type: "tel", required: false },
                      ].map((field) => (
                        <div key={field.name}>
                          <label
                            htmlFor={`sidebar-${field.name}`}
                            style={{
                              display: "block",
                              fontFamily: "var(--font-dm-mono), monospace",
                              fontSize: "9px",
                              letterSpacing: "0.15em",
                              color: "rgba(196,150,90,0.6)",
                              textTransform: "uppercase",
                              marginBottom: "6px",
                            }}
                          >
                            {field.label}
                            {field.required && " *"}
                          </label>
                          <input
                            id={`sidebar-${field.name}`}
                            type={field.type}
                            required={field.required}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={(e) =>
                              setFormData((p) => ({
                                ...p,
                                [field.name]: e.target.value,
                              }))
                            }
                            className="form-input"
                            style={{
                              color: "#F5F0EB",
                              borderBottomColor: "rgba(196,150,90,0.25)",
                            }}
                          />
                        </div>
                      ))}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="sidebar-checkin"
                            style={{
                              display: "block",
                              fontFamily: "var(--font-dm-mono), monospace",
                              fontSize: "9px",
                              letterSpacing: "0.15em",
                              color: "rgba(196,150,90,0.6)",
                              textTransform: "uppercase",
                              marginBottom: "6px",
                            }}
                          >
                            Check-in *
                          </label>
                          <input
                            id="sidebar-checkin"
                            type="date"
                            required
                            value={formData.checkIn}
                            onChange={(e) =>
                              setFormData((p) => ({ ...p, checkIn: e.target.value }))
                            }
                            className="form-input"
                            style={{
                              color: "#F5F0EB",
                              borderBottomColor: "rgba(196,150,90,0.25)",
                              colorScheme: "dark",
                            }}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="sidebar-checkout"
                            style={{
                              display: "block",
                              fontFamily: "var(--font-dm-mono), monospace",
                              fontSize: "9px",
                              letterSpacing: "0.15em",
                              color: "rgba(196,150,90,0.6)",
                              textTransform: "uppercase",
                              marginBottom: "6px",
                            }}
                          >
                            Check-out *
                          </label>
                          <input
                            id="sidebar-checkout"
                            type="date"
                            required
                            value={formData.checkOut}
                            onChange={(e) =>
                              setFormData((p) => ({ ...p, checkOut: e.target.value }))
                            }
                            className="form-input"
                            style={{
                              color: "#F5F0EB",
                              borderBottomColor: "rgba(196,150,90,0.25)",
                              colorScheme: "dark",
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="sidebar-guests"
                          style={{
                            display: "block",
                            fontFamily: "var(--font-dm-mono), monospace",
                            fontSize: "9px",
                            letterSpacing: "0.15em",
                            color: "rgba(196,150,90,0.6)",
                            textTransform: "uppercase",
                            marginBottom: "6px",
                          }}
                        >
                          Number of Guests *
                        </label>
                        <select
                          id="sidebar-guests"
                          required
                          value={formData.guests}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, guests: e.target.value }))
                          }
                          className="form-input"
                          style={{
                            color: formData.guests ? "#F5F0EB" : "rgba(138,155,168,0.8)",
                            borderBottomColor: "rgba(196,150,90,0.25)",
                          }}
                        >
                          <option value="" disabled>
                            Select guests
                          </option>
                          {Array.from({ length: yacht.guests }, (_, i) => i + 1).map(
                            (n) => (
                              <option key={n} value={n}>
                                {n} {n === 1 ? "Guest" : "Guests"}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="sidebar-message"
                          style={{
                            display: "block",
                            fontFamily: "var(--font-dm-mono), monospace",
                            fontSize: "9px",
                            letterSpacing: "0.15em",
                            color: "rgba(196,150,90,0.6)",
                            textTransform: "uppercase",
                            marginBottom: "6px",
                          }}
                        >
                          Message
                        </label>
                        <textarea
                          id="sidebar-message"
                          rows={3}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, message: e.target.value }))
                          }
                          placeholder="Tell us about your ideal voyage..."
                          className="form-input"
                          style={{
                            color: "#F5F0EB",
                            borderBottomColor: "rgba(196,150,90,0.25)",
                            resize: "none",
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-primary w-full justify-center mt-2"
                      >
                        <Send size={13} />
                        Send Enquiry
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Yachts */}
      {related.length > 0 && (
        <section className="section-pad" style={{ background: "#fff" }}>
          <div className="container-xl">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "#C4965A",
                    textTransform: "uppercase",
                  }}
                >
                  Explore More
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-barlow-condensed), sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(32px, 4vw, 50px)",
                    color: "#2C2C2C",
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    lineHeight: 1,
                  }}
                >
                  Similar Vessels
                </h2>
              </div>
              <Link
                href="/fleet"
                className="hidden md:flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-barlow-condensed), sans-serif",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#C4965A",
                }}
              >
                View All Fleet
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((y) => (
                <FleetCard key={y.id} yacht={y} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
