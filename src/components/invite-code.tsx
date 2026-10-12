"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Code from /i/<code>/, or "" when it is missing or malformed. Null while prerendering. */
function readCode(): string {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const raw = parts[0] === "i" ? parts[1] : undefined;
  return raw && /^[A-Za-z0-9_-]{4,32}$/.test(raw) ? raw : "";
}

/** The static host serves this page for every /i/* path; the code is read in the browser. */
export function InviteCode() {
  const code = useSyncExternalStore(subscribe, readCode, () => null);

  if (code === null) return null;
  if (code === "") return <p className="text-ink-2">This invite link looks incomplete. Ask your crew to send it again.</p>;
  return (
    <p className="text-ink-2">
      Invite code <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-ink select-all">{code}</span>. Keep
      this link: it will open the crew in the app once you have it installed.
    </p>
  );
}
