/**
 * Faint contour lines behind the whole page, like a survey map of the ghats.
 * Drawn once at build time from a few seeded wave functions.
 */
function contour(i: number): string {
  const base = 40 + i * 46;
  const pts: string[] = [];
  for (let x = -20; x <= 1460; x += 40) {
    const y =
      base +
      Math.sin(x / 140 + i * 0.7) * 22 +
      Math.sin(x / 61 + i * 1.9) * 9 +
      Math.cos(x / 310 - i * 0.4) * 30;
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
}

export function TopoBackground() {
  const lines = Array.from({ length: 22 }, (_, i) => contour(i));
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <svg className="topo-drift h-full w-full" viewBox="0 0 1440 1040" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="var(--line)" strokeWidth="1.1" strokeLinejoin="round" opacity="0.7">
          {lines.map((d, i) => (
            <path key={i} d={d} strokeDasharray={i % 5 === 0 ? "0" : i % 2 ? "6 5" : "0"} strokeWidth={i % 5 === 0 ? 1.6 : 1} />
          ))}
        </g>
      </svg>
    </div>
  );
}
