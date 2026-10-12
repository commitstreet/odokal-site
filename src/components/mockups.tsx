/**
 * Static illustrations of the app, drawn from the brand kit. They are design previews, not screenshots.
 */

const PLEX_MONO = "var(--font-plex-mono), ui-monospace, monospace";
const BRAND = "var(--font-special-elite), 'Courier New', monospace";

export type RiderStatus = { name: string; status: string; tone: "ok" | "ahead" | "behind" | "off" };

export type RideReadout = {
  speed: number;
  kmDone: number;
  elevation: number;
  progress: number;
  clock: string;
  roster: RiderStatus[];
};

export const DEFAULT_READOUT: RideReadout = {
  speed: 64,
  kmDone: 118.6,
  elevation: 842,
  progress: 0.58,
  clock: "02:14",
  roster: [
    { name: "Vinay", status: "With group", tone: "ok" },
    { name: "Rahul", status: "0.3 km ahead", tone: "ahead" },
    { name: "Mohit", status: "2.8 km behind", tone: "behind" },
    { name: "Sameer", status: "No signal · 12 min", tone: "off" },
  ],
};

const TONE: Record<RiderStatus["tone"], string> = {
  ok: "bg-[#20391F] text-[#A6D97A]",
  ahead: "bg-[#22303D] text-[#A9C6F5]",
  behind: "bg-[#3E3014] text-[#F2BF4C]",
  off: "bg-[#262B28] text-[#9EA6A0]",
};

/** Riding mode is always dark and high-contrast, whatever the site theme. */
export function RidingPhone({ r = DEFAULT_READOUT }: { r?: RideReadout }) {
  return (
    <div
      className="w-full max-w-[300px] rounded-[34px] border-[9px] border-[#24302B] bg-[#0B0F0D] p-4 text-[#F2F4F0] shadow-2xl"
      aria-label="Riding mode preview"
      role="img"
    >
      <div className="flex justify-between font-mono text-[11px] text-[#A9B2AC]">
        <span>WESTERN GHATS RUN</span>
        <span>
          <span className="live-dot text-[#E5392F]">●</span> LIVE · {r.clock}
        </span>
      </div>
      <div className="mt-3 font-mono text-[72px] leading-[0.9] font-semibold tabular-nums">
        {r.speed}
        <span className="ml-1.5 text-[15px] font-normal text-[#A9B2AC]">km/h</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5 font-mono tabular-nums">
        {[
          [r.kmDone.toFixed(1), "km done"],
          [`${r.elevation} m`, "elevation"],
          ["11:40", "ETA"],
        ].map(([v, l]) => (
          <div key={l} className="grid">
            <b className="text-[17px]">{v}</b>
            <span className="font-sans text-[10px] tracking-widest text-[#A9B2AC] uppercase">{l}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded bg-[#263029]">
        <i className="block h-full bg-[#8FB84E] transition-[width] duration-1000" style={{ width: `${r.progress * 100}%` }} />
      </div>
      <p className="mt-3 text-[13px] text-[#D5DBD6]">
        Next stop <b className="text-[#8FB84E]">Fuel · Hassan</b> · {Math.max(0, 132.6 - r.kmDone).toFixed(0)} km
      </p>
      <div className="mt-3 grid gap-1.5">
        {r.roster.map((p) => (
          <div key={p.name} className="flex items-center justify-between rounded-lg bg-[#161D19] px-2.5 py-2 text-sm">
            {p.name}
            <em className={`rounded px-1.5 py-0.5 font-mono text-[11px] not-italic transition-colors duration-500 ${TONE[p.tone]}`}>
              {p.status}
            </em>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 font-head text-[17px] font-bold tracking-wider">
        <span className="grid h-14 place-items-center rounded-xl bg-[#C2281F] text-white">HOLD · SOS</span>
        <span className="grid h-14 place-items-center rounded-xl border border-[#3A443E] bg-[#1D2420]">FINISH</span>
      </div>
    </div>
  );
}

function RouteMap() {
  return (
    <svg viewBox="0 0 240 120" className="block h-auto w-full rounded-lg" aria-hidden="true">
      <rect width="240" height="120" fill="var(--surface-2)" />
      <g fill="none" stroke="var(--bg)" strokeWidth="1.2">
        <path d="M-10 90C40 70 70 100 120 80S200 60 250 75" />
        <path d="M-10 70C40 50 80 80 130 58S210 40 250 52" />
        <path d="M-10 48C50 30 90 58 140 38S210 20 250 30" />
        <path d="M60 -5C80 30 70 60 95 125" />
        <path d="M170 -5C160 40 185 70 175 125" />
      </g>
      <path
        d="M22 98C48 92 52 70 78 66S104 82 126 64 150 30 172 34 204 52 218 22"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="98" r="5" fill="var(--primary)" />
      <circle cx="218" cy="22" r="5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="2" />
      <circle cx="126" cy="64" r="3.5" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
      <text x="30" y="112" fontSize="9" fill="var(--ink)" style={{ fontFamily: PLEX_MONO }}>
        BENGALURU
      </text>
      <text x="160" y="16" fontSize="9" fill="var(--ink)" style={{ fontFamily: PLEX_MONO }}>
        CHIKMAGALUR
      </text>
    </svg>
  );
}

type Tier = "bronze" | "steel" | "brass" | "gold";
const TIER: Record<Tier, string> = { bronze: "#A8693A", steel: "#8C969A", brass: "#C49A3A", gold: "#E0BC4A" };

/** Enamel milestone pin. The rim colour shows the tier; locked pins are flat grey. */
export function EnamelPin({
  big,
  small,
  tier,
  locked = false,
  glyph,
  size = 72,
}: {
  big?: string;
  small: string;
  tier: Tier;
  locked?: boolean;
  glyph?: "moon" | "drop" | "hairpin";
  size?: number;
}) {
  const rim = locked ? "#B9C2B6" : TIER[tier];
  const face = locked ? "#CDD5CA" : "#1F3B33";
  const fg = locked ? "#7E8A83" : "#F4F6F1";
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true" className="pin block">
      <circle cx="60" cy="60" r="54" fill={rim} />
      <circle cx="60" cy="60" r="46" fill={face} />
      <circle cx="60" cy="60" r="39" fill="none" stroke={fg} strokeOpacity=".55" strokeWidth="1.4" strokeDasharray="3 3" />
      {glyph === "moon" && <path d="M66 40a20 20 0 1 0 8 30a16 16 0 1 1-8-30z" fill={fg} />}
      {glyph === "drop" && <path d="M60 36c8 11 13 18 13 25a13 13 0 0 1-26 0c0-7 5-14 13-25z" fill={fg} />}
      {glyph === "hairpin" && (
        <path d="M48 74c0-9 24-7 24-15s-24-6-24-14 14-8 14-8" fill="none" stroke={fg} strokeWidth="5" strokeLinecap="round" />
      )}
      {big && (
        <text x="60" y="68" fontSize={big.length > 3 ? 24 : 30} textAnchor="middle" fill={fg} style={{ fontFamily: BRAND }}>
          {big}
        </text>
      )}
      <text x="60" y="86" fontSize="9.5" letterSpacing="2" textAnchor="middle" fill={fg} style={{ fontFamily: PLEX_MONO }}>
        {small}
      </text>
      {!locked && (
        <path d="M30 40a36 36 0 0 1 22-16" stroke="#fff" strokeOpacity=".28" strokeWidth="5" fill="none" strokeLinecap="round" />
      )}
    </svg>
  );
}

/** The ride record the app writes after a ride. */
export function JournalTicket() {
  return (
    <div className="w-full max-w-[340px] rounded-2xl bg-surface text-ink shadow-xl" role="img" aria-label="Ride journal preview">
      <div className="grid gap-3 p-4">
        <div className="eyebrow">Sun 5 Oct · 5 riders</div>
        <div className="font-brand text-2xl leading-tight">Western Ghats Run</div>
        <RouteMap />
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {[
            ["286.4", "km"],
            ["6h 42m", "ride time"],
            ["1,842 m", "highest point"],
            ["94", "top km/h"],
          ].map(([v, l]) => (
            <div key={l} className="grid">
              <b className="font-mono text-lg font-semibold tabular-nums">{v}</b>
              <span className="text-[10px] tracking-widest text-ink-2 uppercase">{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative border-t-2 border-dashed border-surface-2">
        <span className="absolute -top-2.5 -left-2.5 h-5 w-5 rounded-full bg-bg" />
        <span className="absolute -top-2.5 -right-2.5 h-5 w-5 rounded-full bg-bg" />
      </div>
      <div className="flex items-center gap-2 p-4">
        <EnamelPin big="100" small="KM" tier="bronze" size={52} />
        <EnamelPin big="200" small="KM" tier="steel" size={52} />
        <EnamelPin small="GHAT" tier="brass" glyph="hairpin" size={52} />
        <span className="ml-1 text-xs text-ink-2">3 milestones on this ride</span>
      </div>
    </div>
  );
}

/** Passport stamps: one per state ridden in. */
export function Stamps() {
  const states: [string, string | null, number][] = [
    ["KA", "2025", 0],
    ["KL", "2025", -9],
    ["TN", "2026", 6],
    ["GA", "2026", -4],
    ["AP", null, 0],
    ["TS", null, 0],
    ["PY", null, 0],
  ];
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
      {states.map(([code, year, rot]) =>
        year ? (
          <div
            key={code}
            className="stamp-in grid aspect-square place-items-center rounded-full border-2 border-accent text-center font-brand text-lg leading-none text-accent"
            style={{ transform: `rotate(${rot}deg)` }}
          >
            <span>
              {code}
              <small className="mt-0.5 block font-mono text-[8px] tracking-wider">{year}</small>
            </span>
          </div>
        ) : (
          <div
            key={code}
            className="grid aspect-square place-items-center rounded-full border-[1.5px] border-dashed border-line font-mono text-sm text-ink-2"
          >
            {code}
          </div>
        ),
      )}
    </div>
  );
}
