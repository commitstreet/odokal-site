/** Build-time site settings. Leave a value empty to hide what depends on it. */
export const site = {
  name: "Odokal",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://odokal.commitstreet.com",
  tagline: "Ride. Mark. Remember.",
  description:
    "A riding companion for motorcycle crews in South India. Plan the route, ride together with live crew tracking, and keep every ride as a journal with milestones. Coming soon to Android.",
  /** POST {"email": string, "city"?: string} → 2xx. Empty: sign-ups shown as opening soon. */
  waitlistEndpoint: process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || "",
  /** Contact address for the privacy policy and footer. Empty: hidden. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
};
