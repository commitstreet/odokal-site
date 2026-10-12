"use client";

import { useId, useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string };

const CITIES = ["Bengaluru", "Chennai", "Hyderabad", "Kochi", "Mysuru", "Coimbatore", "Mangaluru", "Other"];

/** Beta waitlist. Posts to NEXT_PUBLIC_WAITLIST_ENDPOINT; without one, sign-ups are shown as opening soon. */
export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const [state, setState] = useState<State>({ kind: "idle" });
  const open = Boolean(site.waitlistEndpoint);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!open) return;
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const city = String(data.get("city") ?? "");
    setState({ kind: "sending" });
    try {
      const res = await fetch(site.waitlistEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, city: city || undefined }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState({ kind: "done" });
    } catch {
      setState({ kind: "error", message: "That didn't go through. Check your connection and try again." });
    }
  }

  if (state.kind === "done") {
    return (
      <p className="rounded-xl bg-primary px-4 py-3 text-on-primary" role="status">
        You&apos;re on the list. We&apos;ll email you when the Android beta opens.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid w-full max-w-lg gap-2" aria-describedby={`${id}-note`}>
      <div className={`grid gap-2 ${compact ? "sm:grid-cols-[1fr_auto]" : "sm:grid-cols-[1fr_10rem_auto]"}`}>
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          disabled={!open || state.kind === "sending"}
          className="h-12 min-w-0 rounded-xl border border-line bg-surface px-4 text-ink placeholder:text-ink-2 disabled:opacity-60"
        />
        {!compact && (
          <>
            <label htmlFor={`${id}-city`} className="sr-only">
              City you ride from
            </label>
            <select
              id={`${id}-city`}
              name="city"
              defaultValue=""
              disabled={!open || state.kind === "sending"}
              className="h-12 rounded-xl border border-line bg-surface px-3 text-ink disabled:opacity-60"
            >
              <option value="">City (optional)</option>
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </>
        )}
        <button
          type="submit"
          disabled={!open || state.kind === "sending"}
          className="h-12 rounded-xl bg-accent px-5 font-head text-base font-bold tracking-wider text-on-accent uppercase disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.kind === "sending" ? "Joining…" : "Join the beta"}
        </button>
      </div>
      <p id={`${id}-note`} className="text-sm text-ink-2" role={state.kind === "error" ? "alert" : undefined}>
        {state.kind === "error"
          ? state.message
          : open
            ? "One email when the beta opens. No spam, and we never share your address."
            : "Beta sign-ups open soon. Android first, for riders in South India."}
      </p>
    </form>
  );
}
