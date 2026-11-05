/**
 * Records form enquiries in WordPress (Enquiries menu) so none are lost,
 * even when the notification email cannot be sent.
 */

const WP_URL = (process.env.WP_URL || "https://cms.almayachting.com").replace(/\/+$/, "");

export interface Enquiry {
  name: string;
  email: string;
  phone?: string;
  yacht?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  message?: string;
  /** Page the form was sent from, e.g. "/fleet/lagoon-55". */
  source?: string;
}

function headers() {
  return {
    "Content-Type": "application/json",
    "x-alma-secret": process.env.REVALIDATE_SECRET ?? "",
  };
}

/** Returns the WordPress enquiry ID, or null if it could not be recorded. */
export async function recordEnquiry(enquiry: Enquiry): Promise<number | null> {
  try {
    const res = await fetch(`${WP_URL}/wp-json/alma/v1/enquiries`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(enquiry),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`Recording enquiry failed: WordPress responded ${res.status}`);
      return null;
    }
    return ((await res.json()) as { id: number }).id;
  } catch (err) {
    console.error("Recording enquiry failed:", err);
    return null;
  }
}

export async function markEnquiryDelivery(id: number, emailStatus: "sent" | "failed"): Promise<void> {
  try {
    await fetch(`${WP_URL}/wp-json/alma/v1/enquiries/${id}/delivery`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ emailStatus }),
      cache: "no-store",
    });
  } catch (err) {
    console.error("Updating enquiry delivery failed:", err);
  }
}
