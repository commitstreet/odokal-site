/** Build-time site settings. Leave a value empty to hide what depends on it. */
export const site = {
  name: "Odokal",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://odokal.commitstreet.com",
  /** Path prefix when served from a sub-path (GitHub Pages project site). "" on a custom domain. */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  tagline: "Ride. Mark. Remember.",
  description:
    "A riding companion for motorcycle crews in South India. Plan the route, ride together with live crew tracking, and keep every ride as a journal with milestones. Coming soon to Android.",
  /** POST {"email": string, "city"?: string} → 2xx. Empty: sign-ups shown as opening soon. */
  waitlistEndpoint: process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || "",
  /** Contact address for the privacy policy and footer. Empty: hidden. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
};

/** The current path without the base path, e.g. "/i/ABC123/". */
export function appPath(pathname: string): string {
  return site.basePath && pathname.startsWith(site.basePath) ? pathname.slice(site.basePath.length) || "/" : pathname;
}
