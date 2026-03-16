import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for ALMA Yachting — how we collect, use, and protect your personal data.",
};

const sections = [
  {
    title: "Information We Collect",
    body: `When you submit an enquiry through our website or contact us directly, we collect personal information including your name, email address, phone number, and any details you provide about your intended charter. We also collect standard website analytics data (pages visited, time on site, browser type) through anonymised tools to help us improve your experience.`,
  },
  {
    title: "How We Use Your Information",
    body: `We use the information you provide solely to respond to your enquiry, manage your charter booking, and communicate relevant updates about your voyage. We will never use your data for unsolicited marketing without your explicit consent. We do not sell, trade, or otherwise transfer your personal information to third parties.`,
  },
  {
    title: "Data Retention",
    body: `We retain your personal data for as long as necessary to fulfil the purposes for which it was collected — typically for the duration of our business relationship and for a period of five years thereafter, as required by Greek and EU commercial law. You may request deletion of your data at any time by contacting us.`,
  },
  {
    title: "Cookies",
    body: `Our website uses only essential cookies required for the site to function correctly. We do not use advertising or tracking cookies. By using this website you consent to the use of these essential cookies. You may disable cookies in your browser settings, though this may affect certain site functionality.`,
  },
  {
    title: "Your Rights Under GDPR",
    body: `As a resident of the European Union or European Economic Area, you have the right to access, correct, or delete the personal data we hold about you. You also have the right to restrict or object to processing, and the right to data portability. To exercise any of these rights, please contact us at the details below. You have the right to lodge a complaint with the Hellenic Data Protection Authority (HDPA) if you believe your rights have not been respected.`,
  },
  {
    title: "Data Security",
    body: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or disclosure. Our website uses industry-standard SSL encryption for all data transmissions. Access to personal data is restricted to staff members who require it to perform their duties.`,
  },
  {
    title: "Third-Party Services",
    body: `Our website may link to third-party websites. We are not responsible for the privacy practices of those sites and recommend you review their privacy policies independently. Our email infrastructure uses Resend, a GDPR-compliant transactional email service, to deliver communications.`,
  },
  {
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices or in applicable law. Any updates will be published on this page with a revised effective date. We encourage you to review this page periodically.`,
  },
  {
    title: "Contact Us",
    body: `If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us:\n\nALMA Yachting\n46 Archimidous str., 17563\nPaleo Faliro, Athens, Greece\n\nPhone: +30 210 300 1618\nEmail: info@almayachting.com`,
  },
];

export default function PrivacyPage() {
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
            Privacy Policy
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
            At ALMA Yachting, we are committed to protecting your privacy and
            handling your personal data with transparency and care. This policy
            explains how we collect, use, and safeguard the information you
            share with us.
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
            <Link
              href="/contact"
              className="btn-primary"
            >
              Contact Us
            </Link>
            <Link
              href="/terms"
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
              View Terms & Conditions →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
