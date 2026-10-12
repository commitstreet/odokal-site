import Link from "next/link";
import { site } from "@/lib/site";
import { Lockup } from "./brand";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 pt-6 sm:px-8">
      <Link href="/" aria-label="Odokal home" className="rounded-lg">
        <Lockup size={40} />
      </Link>
      <span className="rounded-full border border-line px-3 py-1 font-mono text-xs tracking-widest text-ink-2 uppercase">
        Coming soon · Android
      </span>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-dashed border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-ink-2 sm:px-8">
        <span>
          <span className="font-brand text-ink">odokal.</span> {site.tagline} Made for riders in South India.
        </span>
        <nav className="flex flex-wrap gap-5" aria-label="Footer">
          <Link href="/privacy/" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/terms/" className="hover:text-ink">
            Terms
          </Link>
          {site.contactEmail && <span className="select-all">{site.contactEmail}</span>}
        </nav>
      </div>
    </footer>
  );
}
