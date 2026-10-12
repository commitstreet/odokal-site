/**
 * A strip of road rolling past: dashed centre line, roadside milestones with yellow caps,
 * and place names. Pure CSS animation; it stops for reduced motion.
 */
const STONES = [
  { place: "Mudigere", km: 12 },
  { place: "Charmadi", km: 38 },
  { place: "Agumbe", km: 64 },
  { place: "Sakleshpur", km: 91 },
  { place: "Madikeri", km: 117 },
  { place: "Munnar", km: 143 },
  { place: "Kolli Hills", km: 170 },
  { place: "Chikmagalur", km: 196 },
];

function Stone({ place, km }: { place: string; km: number }) {
  return (
    <span className="mx-10 inline-flex shrink-0 items-end gap-3">
      <svg viewBox="0 0 40 52" width="34" height="44" aria-hidden="true" className="shrink-0">
        <path d="M4 50V20a16 16 0 0 1 32 0v30z" fill="#F4F6F1" stroke="#16241F" strokeWidth="2" />
        <path d="M4 24v-4a16 16 0 0 1 32 0v4z" fill="#F2C230" stroke="#16241F" strokeWidth="2" />
        <text x="20" y="40" fontSize="10" textAnchor="middle" fill="#16241F" style={{ fontFamily: "var(--font-plex-mono)", fontWeight: 600 }}>
          {km}
        </text>
      </svg>
      <span className="pb-1 font-brand text-lg whitespace-nowrap text-[#DDE3DA]">{place}</span>
    </span>
  );
}

export function RoadTicker() {
  const row = (
    <div className="flex shrink-0 items-end py-4" aria-hidden="true">
      {STONES.map((s) => (
        <Stone key={s.place} {...s} />
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden bg-[#1A221E]" role="presentation">
      <div className="road-scroll flex w-max">
        {row}
        {row}
      </div>
      <div className="relative h-10 overflow-hidden bg-[#232B27]">
        <div className="road-dash absolute top-1/2 left-0 h-1 w-[200%] -translate-y-1/2" />
      </div>
    </div>
  );
}
