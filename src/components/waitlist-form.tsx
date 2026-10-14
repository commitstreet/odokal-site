"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "joined"; email: string }
  | { kind: "saving"; email: string }
  | { kind: "done" }
  | { kind: "error"; message: string; email?: string };

const CITIES = ["Bengaluru", "Chennai", "Hyderabad", "Kochi", "Mysuru", "Coimbatore", "Mangaluru", "Other"];
const CREW = [
  { value: "have_crew", label: "I ride with a crew" },
  { value: "find_crew", label: "I'd like to find one" },
  { value: "solo", label: "I ride solo" },
] as const;

const input =
  "h-12 min-w-0 rounded-xl border border-line bg-surface px-4 text-ink placeholder:text-ink-2 disabled:opacity-60";

/**
 * Beta waitlist. Step one takes the email (and city on the full form); step two asks for a few
 * optional details. Both post to NEXT_PUBLIC_WAITLIST_ENDPOINT, which updates the same row when
 * the email repeats. Without an endpoint, sign-ups are shown as opening soon.
 */
export function WaitlistForm({ compact = false, source = compact ? "footer" : "hero" }: { compact?: boolean; source?: string }) {
  const id = useId();
  const [state, setState] = useState<State>({ kind: "idle" });
  const [crew, setCrew] = useState("");
  const open = Boolean(site.waitlistEndpoint);

  async function send(payload: Record<string, string | undefined>) {
    // text/plain keeps this a "simple" request with no CORS preflight (Google Apps Script can't answer one).
    const res = await fetch(site.waitlistEndpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(String(res.status));
    const body = (await res.json().catch(() => ({ ok: true }))) as { ok?: boolean; error?: string };
    if (body.ok === false) throw new Error(body.error ?? "rejected");
  }

  async function join(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!open) return;
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    setState({ kind: "sending" });
    try {
      await send({
        email,
        city: String(data.get("city") ?? "") || undefined,
        source,
        website: String(data.get("website") ?? "") || undefined,
      });
      setState({ kind: "joined", email });
    } catch (err) {
      setState({
        kind: "error",
        message:
          (err as Error).message === "invalid_email"
            ? "That email doesn't look right. Check it and try again."
            : "That didn't go through. Check your connection and try again.",
      });
    }
  }

  async function details(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = state.kind === "joined" || state.kind === "error" ? state.email : undefined;
    if (!email) return;
    const data = new FormData(e.currentTarget);
    const field = (k: string) => String(data.get(k) ?? "").trim() || undefined;
    setState({ kind: "saving", email });
    try {
      await send({
        email,
        name: field("name"),
        city: field("city"),
        bike: field("bike"),
        crew: crew || undefined,
        crewName: crew === "have_crew" ? field("crewName") : undefined,
      });
      setState({ kind: "done" });
    } catch {
      setState({ kind: "error", email, message: "Couldn't save that. You're still on the list; try again or skip." });
    }
  }

  if (state.kind === "done") {
    return (
      <p className="w-full max-w-lg rounded-xl bg-primary px-4 py-3 text-on-primary" role="status">
        Thanks, you&apos;re all set. We&apos;ll email you when the Android beta opens.
      </p>
    );
  }

  // Step two: optional details, filed against the email that just joined.
  if (state.kind === "joined" || state.kind === "saving" || (state.kind === "error" && state.email)) {
    const busy = state.kind === "saving";
    return (
      <form key="details" onSubmit={details} className="grid w-full max-w-lg gap-3" aria-labelledby={`${id}-more`}>
        <p id={`${id}-more`} className="rounded-xl bg-primary px-4 py-3 text-on-primary" role="status">
          You&apos;re on the list. Tell us a little about how you ride? <span className="opacity-80">(optional)</span>
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          <label className="sr-only" htmlFor={`${id}-name`}>
            First name
          </label>
          <input id={`${id}-name`} name="name" autoComplete="given-name" maxLength={60} placeholder="First name" disabled={busy} className={input} />
          <label className="sr-only" htmlFor={`${id}-city2`}>
            City you ride from
          </label>
          <select id={`${id}-city2`} name="city" defaultValue="" disabled={busy} className={`${input} px-3`}>
            <option value="">City</option>
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <label className="sr-only" htmlFor={`${id}-bike`}>
            What you ride
          </label>
          <input
            id={`${id}-bike`}
            name="bike"
            maxLength={60}
            placeholder="What you ride, e.g. Himalayan 450"
            disabled={busy}
            className={`${input} sm:col-span-2`}
          />
        </div>
        <fieldset className="grid gap-2" disabled={busy}>
          <legend className="mb-1 text-sm text-ink-2">Riding with a crew?</legend>
          <div className="flex flex-wrap gap-2">
            {CREW.map((c) => (
              <button
                key={c.value}
                type="button"
                aria-pressed={crew === c.value}
                onClick={() => setCrew(crew === c.value ? "" : c.value)}
                className={`h-10 rounded-full border px-4 text-sm ${crew === c.value ? "border-accent bg-accent text-on-accent" : "border-line bg-surface text-ink"}`}
              >
                {c.label}
              </button>
            ))}
          </div>
          {crew === "have_crew" && (
            <>
              <label className="sr-only" htmlFor={`${id}-crewName`}>
                Crew name
              </label>
              <input id={`${id}-crewName`} name="crewName" maxLength={60} placeholder="Crew name (optional)" className={input} />
            </>
          )}
        </fieldset>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={busy}
            className="h-12 rounded-xl bg-accent px-5 font-head text-base font-bold tracking-wider text-on-accent uppercase disabled:opacity-60"
          >
            {busy ? "Saving…" : "Save"}
          </button>
          <button type="button" disabled={busy} onClick={() => setState({ kind: "done" })} className="h-12 px-3 text-ink-2 underline underline-offset-4">
            Skip
          </button>
        </div>
        {state.kind === "error" && (
          <p className="text-sm text-ink-2" role="alert">
            {state.message}
          </p>
        )}
      </form>
    );
  }

  const busy = state.kind === "sending";
  return (
    <form key="join" onSubmit={join} className="relative grid w-full max-w-lg gap-2" aria-describedby={`${id}-note`}>
      {/* Honeypot: hidden from people, filled in by bots. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
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
          disabled={!open || busy}
          className={input}
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
              disabled={!open || busy}
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
          disabled={!open || busy}
          className="h-12 rounded-xl bg-accent px-5 font-head text-base font-bold tracking-wider text-on-accent uppercase disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Joining…" : "Join the beta"}
        </button>
      </div>
      <p id={`${id}-note`} className="text-sm text-ink-2" role={state.kind === "error" ? "alert" : undefined}>
        {state.kind === "error" ? (
          state.message
        ) : open ? (
          <>
            One email when the beta opens. No spam, never shared.{" "}
            <Link href="/privacy/" className="underline underline-offset-4">
              How we use it
            </Link>
            .
          </>
        ) : (
          "Beta sign-ups open soon. Android first, for riders in South India."
        )}
      </p>
    </form>
  );
}
