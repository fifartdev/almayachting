import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, yacht, checkIn, checkOut, guests, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "ALMA Yachting <enquiries@almayachting.com>",
    to: ["info@almayachting.com"],
    replyTo: email,
    subject: `Charter Enquiry from ${name}`,
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
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
