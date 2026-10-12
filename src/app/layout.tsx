import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Condensed, Special_Elite } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { TopoBackground } from "@/components/topo-background";
import { site } from "@/lib/site";
import "./globals.css";

const plexSans = IBM_Plex_Sans({ variable: "--font-plex-sans", subsets: ["latin"], weight: ["400", "500", "600"] });
const plexCondensed = IBM_Plex_Sans_Condensed({ variable: "--font-plex-condensed", subsets: ["latin"], weight: ["600", "700"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "600"] });
const specialElite = Special_Elite({ variable: "--font-special-elite", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Odokal · Ride. Mark. Remember.", template: "%s · Odokal" },
  description: site.description,
  applicationName: "Odokal",
  referrer: "strict-origin-when-cross-origin",
  openGraph: {
    title: "Odokal · Ride. Mark. Remember.",
    description: site.description,
    url: `${site.basePath}/`,
    siteName: "Odokal",
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Odokal · Ride. Mark. Remember.", description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dde3da" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1915" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${plexSans.variable} ${plexCondensed.variable} ${plexMono.variable} ${specialElite.variable} antialiased`}
    >
      <body className="relative isolate flex min-h-screen flex-col">
        <TopoBackground />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
