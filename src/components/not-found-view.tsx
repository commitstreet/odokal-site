"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { appPath } from "@/lib/site";
import { InviteView } from "./invite-view";

const subscribe = () => () => {};

/**
 * GitHub Pages serves 404.html for any unknown path, including crew invite links
 * (/i/<code>). Those get the invite page; everything else gets the off-route message.
 */
export function NotFoundView() {
  const isInvite = useSyncExternalStore(
    subscribe,
    () => /^\/i\/[^/]+\/?$/.test(appPath(window.location.pathname)),
    () => false,
  );
  if (isInvite) return <InviteView />;
  return (
    <section className="mx-auto grid max-w-2xl justify-items-start gap-4 px-5 pt-20 sm:px-8">
      <p className="eyebrow">Off route</p>
      <h1 className="font-head text-5xl font-bold uppercase">This road doesn&apos;t go anywhere</h1>
      <p className="text-ink-2">The page you followed isn&apos;t here.</p>
      <Link href="/" className="rounded-xl bg-accent px-5 py-3 font-head font-bold tracking-wider text-on-accent uppercase">
        Back to the start
      </Link>
    </section>
  );
}
