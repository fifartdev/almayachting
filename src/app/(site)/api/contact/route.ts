import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { markEnquiryDelivery, recordEnquiry } from "@/lib/enquiries";

/** Visitor input is untrusted: escape it before it goes into the email HTML. */
function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_PATTERN = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const raw = body as Record<string, unknown>;

  // Honeypot: a hidden field real visitors never fill in. Pretend success so bots move on.
  if (raw.website) {
    return NextResponse.json({ success: true });
  }

  if (!raw.name || !raw.email || !EMAIL_PATTERN.test(String(raw.email))) {
    return NextResponse.json({ error: "Please enter your name and a valid email address." }, { status: 400 });
  }

  const text = (v: unknown, max = 200) => (typeof v === "string" || typeof v === "number" ? String(v).slice(0, max) : "");

  // Record first, so the enquiry is kept in WordPress even if the email fails.
  const enquiryId = await recordEnquiry({
    name: text(raw.name),
    email: text(raw.email),
    phone: text(raw.phone),
    yacht: text(raw.yacht),
    checkIn: text(raw.checkIn),
    checkOut: text(raw.checkOut),
    guests: text(raw.guests),
    message: text(raw.message, 5000),
    source: text(raw.source),
  });

  const [name, email, phone, yacht, checkIn, checkOut, guests, message] = [
    raw.name,
    raw.email,
    raw.phone,
    raw.yacht,
    raw.checkIn,
    raw.checkOut,
    raw.guests,
    raw.message,
  ].map((v) => (v ? escapeHtml(v) : ""));

  // Created here, not up front: a missing key must not stop the enquiry being recorded.
  const sendEmail = (payload: Parameters<Resend["emails"]["send"]>[0]) =>
    new Resend(process.env.RESEND_API_KEY).emails.send(payload);

  const { error } = await Promise.resolve()
    .then(() => sendEmail({
    from: "ALMA Yachting <enquiries@almayachting.com>",
    to: ["info@almayachting.com"],
    replyTo: String(raw.email),
    subject: `Charter Enquiry from ${String(raw.name).replace(/[\r\n]+/g, " ").slice(0, 120)}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; color: #2C2C2C;">
        <div style="background: #2C2C2C; padding: 32px 40px;">
          <p style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.2em; color: #8A9BA8; text-transform: uppercase; margin: 0 0 8px;">New Enquiry</p>
          <h1 style="font-family: Arial, sans-serif; font-size: 28px; font-weight: 800; color: #F5F0EB; text-transform: uppercase; letter-spacing: -0.01em; margin: 0;">ALMA Yachting</h1>
        </div>

        <div style="padding: 40px; background: #F5F0EB;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(10,22,40,0.1); font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(10,22,40,0.5); width: 140px;">Full Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(10,22,40,0.1); font-family: Georgia, serif; font-size: 16px; color: #2C2C2C;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(10,22,40,0.1); font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(10,22,40,0.5);">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(10,22,40,0.1); font-family: Georgia, serif; font-size: 16px; color: #2C2C2C;"><a href="mailto:${email}" style="color: #0A1628;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(10,22,40,0.1); font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(10,22,40,0.5);">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(10,22,40,0.1); font-family: Georgia, serif; font-size: 16px; color: #2C2C2C;">${phone}</td>
            </tr>` : ""}
            ${yacht ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(10,22,40,0.1); font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(10,22,40,0.5);">Preferred Yacht</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(10,22,40,0.1); font-family: Georgia, serif; font-size: 16px; color: #2C2C2C;">${yacht}</td>
            </tr>` : ""}
            ${checkIn ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(10,22,40,0.1); font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(10,22,40,0.5);">Departure</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(10,22,40,0.1); font-family: Georgia, serif; font-size: 16px; color: #2C2C2C;">${checkIn}</td>
            </tr>` : ""}
            ${checkOut ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(10,22,40,0.1); font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(10,22,40,0.5);">Return</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(10,22,40,0.1); font-family: Georgia, serif; font-size: 16px; color: #2C2C2C;">${checkOut}</td>
            </tr>` : ""}
            ${guests ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(10,22,40,0.1); font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(10,22,40,0.5);">Guests</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(10,22,40,0.1); font-family: Georgia, serif; font-size: 16px; color: #2C2C2C;">${guests}</td>
            </tr>` : ""}
          </table>

          <div style="margin-top: 32px;">
            <p style="font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(10,22,40,0.5); margin: 0 0 12px;">Message</p>
            <p style="font-family: Georgia, serif; font-size: 16px; color: #2C2C2C; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>

        <div style="background: #2C2C2C; padding: 20px 40px; text-align: center;">
          <p style="font-family: Arial, sans-serif; font-size: 9px; letter-spacing: 0.15em; color: rgba(245,240,235,0.35); text-transform: uppercase; margin: 0;">ALMA YACHTING · ATHENS, GREECE · almayachting.com</p>
        </div>
      </div>
    `,
  }))
    .catch((err: unknown) => ({ data: null, error: { message: String(err) } }));

  if (error) console.error("Enquiry email failed:", error.message);
  if (enquiryId) await markEnquiryDelivery(enquiryId, error ? "failed" : "sent");

  // Success as long as the enquiry reached the office one way or the other.
  if (error && !enquiryId) {
    return NextResponse.json(
      { error: "Sorry, your enquiry could not be sent. Please email or call us directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
