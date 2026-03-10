"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send, Anchor } from "lucide-react";
import { yachts } from "@/lib/yachts";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    yacht: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <>
      {/* Hero */}
      <div
        className="relative flex items-end overflow-hidden"
        style={{ height: "50vh", minHeight: "360px" }}
      >
        <Image
          src="/images/various/hero.jpg"
          alt="Athens harbour"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,22,40,0.3) 0%, rgba(10,22,40,0.82) 100%)",
          }}
        />
        <div className="relative container-xl pb-14" style={{ zIndex: 1 }}>
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
            07 / Contact
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
            Get in Touch
          </h1>
        </div>
      </div>

      {/* Main section */}
      <section className="section-pad" style={{ background: "#F5F0EB" }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Left: contact info */}
            <div className="lg:col-span-2">
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: "#C4965A",
                  marginBottom: "28px",
                }}
              />
              <h2
                className="mb-4"
                style={{
                  fontFamily: "var(--font-barlow-condensed), sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(32px, 4vw, 48px)",
                  color: "#2C2C2C",
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                }}
              >
                Begin Your
                <br />
                Journey
              </h2>
              <p
                className="mb-10"
                style={{
                  fontFamily: "var(--font-cormorant-garamond), serif",
                  fontSize: "17px",
                  color: "rgba(44,44,44,0.65)",
                  lineHeight: "1.8",
                }}
              >
                Whether you have a specific voyage in mind or simply want to
                explore the possibilities, our team is here to help. We respond
                to all enquiries within 24 hours.
              </p>

              <div className="space-y-7">
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 shrink-0 mt-0.5"
                    style={{ border: "1px solid rgba(196,150,90,0.4)" }}
                  >
                    <MapPin size={16} style={{ color: "#C4965A" }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "9px",
                        letterSpacing: "0.18em",
                        color: "#C4965A",
                        textTransform: "uppercase",
                        marginBottom: "6px",
                      }}
                    >
                      Office Address
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant-garamond), serif",
                        fontSize: "16px",
                        color: "#2C2C2C",
                        lineHeight: "1.6",
                      }}
                    >
                      Alimos Marina, Athens
                      <br />
                      Athens, Greece 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 shrink-0 mt-0.5"
                    style={{ border: "1px solid rgba(196,150,90,0.4)" }}
                  >
                    <Phone size={16} style={{ color: "#C4965A" }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "9px",
                        letterSpacing: "0.18em",
                        color: "#C4965A",
                        textTransform: "uppercase",
                        marginBottom: "6px",
                      }}
                    >
                      Phone
                    </p>
                    <a
                      href="tel:+302101234567"
                      style={{
                        fontFamily: "var(--font-cormorant-garamond), serif",
                        fontSize: "17px",
                        color: "#2C2C2C",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "#C4965A")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "#2C2C2C")
                      }
                    >
                      +30 210 123 4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 shrink-0 mt-0.5"
                    style={{ border: "1px solid rgba(196,150,90,0.4)" }}
                  >
                    <Mail size={16} style={{ color: "#C4965A" }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "9px",
                        letterSpacing: "0.18em",
                        color: "#C4965A",
                        textTransform: "uppercase",
                        marginBottom: "6px",
                      }}
                    >
                      Email
                    </p>
                    <a
                      href="mailto:info@almayachting.com"
                      style={{
                        fontFamily: "var(--font-cormorant-garamond), serif",
                        fontSize: "17px",
                        color: "#2C2C2C",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "#C4965A")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "#2C2C2C")
                      }
                    >
                      info@almayachting.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 shrink-0 mt-0.5"
                    style={{ border: "1px solid rgba(196,150,90,0.4)" }}
                  >
                    <Clock size={16} style={{ color: "#C4965A" }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "9px",
                        letterSpacing: "0.18em",
                        color: "#C4965A",
                        textTransform: "uppercase",
                        marginBottom: "6px",
                      }}
                    >
                      Office Hours
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant-garamond), serif",
                        fontSize: "16px",
                        color: "#2C2C2C",
                        lineHeight: "1.6",
                      }}
                    >
                      Monday – Friday: 9:00 – 18:00
                      <br />
                      Saturday: 10:00 – 14:00
                      <br />
                      <span
                        style={{
                          color: "rgba(44,44,44,0.5)",
                          fontSize: "14px",
                        }}
                      >
                        (EET / UTC+2)
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className="mt-10 relative overflow-hidden"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src="/images/various/marina.jpg"
                  alt="Athens marina"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "rgba(10,22,40,0.3)" }}
                >
                  <div
                    className="flex items-center gap-2 px-4 py-2"
                    style={{
                      background: "rgba(44,44,44,0.85)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Anchor size={14} style={{ color: "#C4965A" }} />
                    <span
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        color: "#F5F0EB",
                        textTransform: "uppercase",
                      }}
                    >
                      Alimos Marina, Athens
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <div
                className="p-8 lg:p-12"
                style={{ background: "#fff", border: "1px solid #E8E4DF" }}
              >
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div
                      className="flex items-center justify-center w-16 h-16 mb-6"
                      style={{
                        border: "1px solid #C4965A",
                        background: "rgba(196,150,90,0.08)",
                      }}
                    >
                      <Anchor size={24} style={{ color: "#C4965A" }} />
                    </div>
                    <h3
                      className="mb-4"
                      style={{
                        fontFamily: "var(--font-barlow-condensed), sans-serif",
                        fontWeight: 700,
                        fontSize: "28px",
                        color: "#2C2C2C",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Enquiry Received
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant-garamond), serif",
                        fontSize: "18px",
                        color: "rgba(44,44,44,0.65)",
                        lineHeight: "1.7",
                        maxWidth: "360px",
                      }}
                    >
                      Thank you for reaching out. A member of our team will be
                      in contact within 24 hours to begin planning your voyage.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <p
                        style={{
                          fontFamily: "var(--font-dm-mono), monospace",
                          fontSize: "9px",
                          letterSpacing: "0.2em",
                          color: "#C4965A",
                          textTransform: "uppercase",
                          marginBottom: "10px",
                        }}
                      >
                        Charter Enquiry
                      </p>
                      <h2
                        style={{
                          fontFamily:
                            "var(--font-barlow-condensed), sans-serif",
                          fontWeight: 800,
                          fontSize: "32px",
                          color: "#2C2C2C",
                          textTransform: "uppercase",
                          letterSpacing: "-0.01em",
                          lineHeight: 1,
                        }}
                      >
                        Plan Your Voyage
                      </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                      {/* Name + Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        <div>
                          <label
                            htmlFor="name"
                            style={{
                              display: "block",
                              fontFamily: "var(--font-dm-mono), monospace",
                              fontSize: "9px",
                              letterSpacing: "0.18em",
                              color: "rgba(44,44,44,0.45)",
                              textTransform: "uppercase",
                              marginBottom: "8px",
                            }}
                          >
                            Full Name *
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            style={{
                              display: "block",
                              fontFamily: "var(--font-dm-mono), monospace",
                              fontSize: "9px",
                              letterSpacing: "0.18em",
                              color: "rgba(44,44,44,0.45)",
                              textTransform: "uppercase",
                              marginBottom: "8px",
                            }}
                          >
                            Email Address *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="form-input"
                          />
                        </div>
                      </div>

                      {/* Phone + Yacht */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        <div>
                          <label
                            htmlFor="phone"
                            style={{
                              display: "block",
                              fontFamily: "var(--font-dm-mono), monospace",
                              fontSize: "9px",
                              letterSpacing: "0.18em",
                              color: "rgba(44,44,44,0.45)",
                              textTransform: "uppercase",
                              marginBottom: "8px",
                            }}
                          >
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 234 567 8900"
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="yacht"
                            style={{
                              display: "block",
                              fontFamily: "var(--font-dm-mono), monospace",
                              fontSize: "9px",
                              letterSpacing: "0.18em",
                              color: "rgba(44,44,44,0.45)",
                              textTransform: "uppercase",
                              marginBottom: "8px",
                            }}
                          >
                            Preferred Yacht
                          </label>
                          <select
                            id="yacht"
                            name="yacht"
                            value={formData.yacht}
                            onChange={handleChange}
                            className="form-input"
                            style={{
                              color: formData.yacht
                                ? "#2C2C2C"
                                : "rgba(138,155,168,0.8)",
                            }}
                          >
                            <option value="">No preference</option>
                            {yachts.map((y) => (
                              <option key={y.id} value={y.slug}>
                                {y.name} — {y.length}, {y.guests} guests
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        <div>
                          <label
                            htmlFor="checkIn"
                            style={{
                              display: "block",
                              fontFamily: "var(--font-dm-mono), monospace",
                              fontSize: "9px",
                              letterSpacing: "0.18em",
                              color: "rgba(44,44,44,0.45)",
                              textTransform: "uppercase",
                              marginBottom: "8px",
                            }}
                          >
                            Departure Date
                          </label>
                          <input
                            id="checkIn"
                            name="checkIn"
                            type="date"
                            value={formData.checkIn}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="checkOut"
                            style={{
                              display: "block",
                              fontFamily: "var(--font-dm-mono), monospace",
                              fontSize: "9px",
                              letterSpacing: "0.18em",
                              color: "rgba(44,44,44,0.45)",
                              textTransform: "uppercase",
                              marginBottom: "8px",
                            }}
                          >
                            Return Date
                          </label>
                          <input
                            id="checkOut"
                            name="checkOut"
                            type="date"
                            value={formData.checkOut}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                      </div>

                      {/* Guests */}
                      <div>
                        <label
                          htmlFor="guests"
                          style={{
                            display: "block",
                            fontFamily: "var(--font-dm-mono), monospace",
                            fontSize: "9px",
                            letterSpacing: "0.18em",
                            color: "rgba(44,44,44,0.45)",
                            textTransform: "uppercase",
                            marginBottom: "8px",
                          }}
                        >
                          Number of Guests
                        </label>
                        <select
                          id="guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="form-input"
                          style={{
                            color: formData.guests
                              ? "#2C2C2C"
                              : "rgba(138,155,168,0.8)",
                          }}
                        >
                          <option value="">Select number of guests</option>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? "guest" : "guests"}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          style={{
                            display: "block",
                            fontFamily: "var(--font-dm-mono), monospace",
                            fontSize: "9px",
                            letterSpacing: "0.18em",
                            color: "rgba(44,44,44,0.45)",
                            textTransform: "uppercase",
                            marginBottom: "8px",
                          }}
                        >
                          Your Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your ideal voyage — destinations, special requirements, or any questions you have..."
                          className="form-input"
                          style={{ resize: "none" }}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <p
                          style={{
                            fontFamily: "var(--font-dm-mono), monospace",
                            fontSize: "9px",
                            letterSpacing: "0.12em",
                            color: "rgba(44,44,44,0.35)",
                            textTransform: "uppercase",
                          }}
                        >
                          We reply within 24 hours
                        </p>
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn-primary"
                          style={{
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? "not-allowed" : "pointer",
                          }}
                        >
                          {loading ? (
                            "Sending..."
                          ) : (
                            <>
                              <Send size={13} />
                              Send Enquiry
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
