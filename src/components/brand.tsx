const MONO = { fontFamily: "var(--font-plex-mono), ui-monospace, monospace", fontWeight: 600 } as const;

/** App icon: odometer with the last digit rolling from 0 to 1 (docs/BRAND.md). Fixed colours in both themes. */
export function AppIcon({ size = 48, className = "" }: { size?: number; className?: string }) {
  const windows = [0, 1, 2].map((i) => {
    const x = 20 + i * 21;
    return (
      <g key={i}>
        <rect x={x} y={46} width={18} height={28} rx={3} fill="#F4F6F1" />
        <text x={x + 9} y={67} fontSize={20} textAnchor="middle" fill="#16241F" style={MONO}>
          0
        </text>
      </g>
    );
  });
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      style={{ borderRadius: size * 0.22 }}
      role="img"
      aria-label="Odokal"
    >
      <defs>
        <clipPath id="odokal-roll">
          <rect x={83} y={46} width={18} height={28} rx={3} />
        </clipPath>
      </defs>
      <rect width={120} height={120} rx={26} fill="#16241F" />
      <rect x={14} y={40} width={92} height={40} rx={8} fill="#6E8B3D" />
      {windows}
      <rect x={83} y={46} width={18} height={28} rx={3} fill="#B4532A" />
      <g clipPath="url(#odokal-roll)" fontSize={20} textAnchor="middle" fill="#FFFFFF" style={MONO}>
        <text x={92} y={56}>0</text>
        <text x={92} y={82}>1</text>
      </g>
      <text x={60} y={99} fontSize={9.5} letterSpacing={3} textAnchor="middle" fill="#DDE3DA" style={{ ...MONO, fontWeight: 400 }}>
        ODOKAL
      </text>
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`tape ${className}`}>odokal.</span>;
}

export function Lockup({ size = 40 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-3">
      <AppIcon size={size} />
      <Wordmark className="text-2xl" />
    </span>
  );
}
