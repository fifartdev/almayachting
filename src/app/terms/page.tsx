import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for ALMA Yachting charter and fleet management services.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: `By enquiring about, booking, or using any service provided by ALMA Yachting, you agree to be bound by these Terms and Conditions. ALMA Yachting is a yacht charter and fleet management company registered in Greece, operating from 46 Archimidous str., 17563, Paleo Faliro, Athens, Greece. These terms apply to all charter agreements, fleet management contracts, and ancillary services offered by ALMA Yachting.`,
  },
  {
    title: "Charter Bookings & Reservations",
    body: `A charter booking is confirmed upon receipt of a signed charter agreement and the required deposit, as specified in your booking proposal. Deposits are non-refundable unless cancellation is initiated by ALMA Yachting. The remaining balance is due no later than 30 days prior to the charter commencement date. ALMA Yachting reserves the right to cancel a booking in the event of force majeure, vessel damage, or circumstances beyond its reasonable control, in which case a full refund of all payments received will be issued.`,
  },
  {
    title: "Cancellation Policy",
    body: `Cancellations made by the charterer are subject to the following schedule:\n\n• More than 60 days before departure: deposit forfeited\n• 30–60 days before departure: 50% of total charter fee\n• Less than 30 days before departure: 100% of total charter fee\n\nALMA Yachting strongly recommends that all charterers obtain comprehensive travel and cancellation insurance prior to departure.`,
  },
  {
    title: "Charter Conduct & Responsibilities",
    body: `The lead charterer accepts full responsibility for the conduct of all guests aboard during the charter period. All guests must comply with the instructions of the captain and crew at all times. The vessel must not be operated beyond the agreed cruising area without prior written consent. The charterer is responsible for any damage caused to the vessel or third parties through negligence or misconduct. ALMA Yachting and its crew are not liable for personal injury, loss, or damage to personal property unless caused by proven negligence on the part of the company or its employees.`,
  },
  {
    title: "Security Deposit",
    body: `A refundable security deposit is required prior to boarding, the amount of which is specified in the charter agreement for each vessel. The deposit will be returned within 7 business days of the charter's end, following inspection of the vessel and deduction of any damages, fuel shortfalls, or outstanding charges. ALMA Yachting will provide a written account of any deductions made.`,
  },
  {
    title: "Fleet Management Services",
    body: `Fleet management agreements are governed by separate contracts agreed between ALMA Yachting and the vessel owner. All management services — including maintenance scheduling, marina arrangements, crewing, and charter revenue management — are subject to the specific terms outlined in the individual fleet management agreement. ALMA Yachting will exercise reasonable professional care in the management of client vessels and will maintain appropriate insurance cover for all managed vessels.`,
  },
  {
    title: "Limitation of Liability",
    body: `To the maximum extent permitted by Greek and EU law, ALMA Yachting's total liability in connection with any charter or service shall not exceed the total amount paid by the client for that specific booking or service. ALMA Yachting is not liable for indirect, consequential, or special damages of any kind. Nothing in these terms excludes liability for death or personal injury caused by ALMA Yachting's negligence.`,
  },
  {
    title: "Governing Law & Disputes",
    body: `These Terms and Conditions are governed by the laws of the Hellenic Republic (Greece). Any dispute arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Athens, Greece. ALMA Yachting will always attempt to resolve disputes informally in the first instance and welcomes direct communication at the contact details below.`,
  },
  {
    title: "Modifications to Terms",
    body: `ALMA Yachting reserves the right to update these Terms and Conditions at any time. Updated terms will be published on this page with a revised effective date. Continued use of our services following such updates constitutes acceptance of the revised terms. We recommend reviewing this page before confirming any booking.`,
  },
  {
    title: "Contact & Governing Entity",
    body: `For all enquiries regarding these terms or any ALMA Yachting service:\n\nALMA Yachting\n46 Archimidous str., 17563\nPaleo Faliro, Athens, Greece\n\nPhone: +30 210 300 1618\nEmail: info@almayachting.com`,
  },
];

export default function TermsPage() {
  return (
    <div style={{ background: "#F5F0EB", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: "#2C2C2C",
          paddingTop: "120px",
          paddingBottom: "60px",
        }}
      >
        <div className="container-xl">
          <p
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 500,
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "#8A9BA8",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Legal · ALMA Yachting
          </p>
          <h1
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(40px, 6vw, 80px)",
              color: "#F5F0EB",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            Terms &amp; Conditions
          </h1>
          <p
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 400,
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "rgba(138,155,168,0.6)",
              textTransform: "uppercase",
              marginTop: "20px",
            }}
          >
            Effective date: January 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-xl" style={{ paddingTop: "80px", paddingBottom: "100px" }}>
        <div style={{ maxWidth: "760px" }}>
          <p
            style={{
              fontFamily: "var(--font-cormorant-garamond), serif",
              fontStyle: "italic",
              fontSize: "20px",
              fontWeight: 300,
              color: "rgba(44,44,44,0.75)",
              lineHeight: "1.75",
              marginBottom: "60px",
            }}
          >
            These Terms and Conditions govern the relationship between ALMA
            Yachting and its clients across all charter bookings, fleet
            management agreements, and ancillary services. Please read them
            carefully before confirming any booking.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {sections.map((section, i) => (
              <div key={section.title}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-barlow-condensed), sans-serif",
                      fontWeight: 500,
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      color: "rgba(10,22,40,0.4)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "rgba(10,22,40,0.1)",
                    }}
                  />
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-barlow-condensed), sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "#2C2C2C",
                    marginBottom: "14px",
                  }}
                >
                  {section.title}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    fontSize: "17px",
                    color: "rgba(44,44,44,0.7)",
                    lineHeight: "1.8",
                    whiteSpace: "pre-line",
                  }}
                >
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "64px",
              paddingTop: "40px",
              borderTop: "1px solid rgba(10,22,40,0.1)",
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
            <Link
              href="/privacy"
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#0A1628",
                display: "flex",
                alignItems: "center",
              }}
            >
              View Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
