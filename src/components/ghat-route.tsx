/**
 * A winding ghat road behind the "How it works" steps. The accent line draws itself as the
 * section scrolls into view (CSS scroll-driven animation; other browsers show it finished),
 * and a rider dot travels along it.
 */
const GHAT_PATH =
  "M10 150 C90 150 110 40 190 40 S290 170 370 160 S450 30 540 50 S640 170 720 150 S820 40 900 60 S1010 150 1090 120";

export function GhatRoute() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[168px] hidden lg:block" aria-hidden="true">
      <svg viewBox="0 0 1100 200" className="h-auto w-full">
        <path d={GHAT_PATH} fill="none" stroke="var(--surface-2)" strokeWidth="18" strokeLinecap="round" />
        <path d={GHAT_PATH} fill="none" stroke="var(--surface)" strokeWidth="1.5" strokeDasharray="8 10" />
        <path d={GHAT_PATH} fill="none" stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" pathLength={1} className="ghat-draw" />
        <g className="ghat-rider">
          <circle r="9" fill="var(--accent)" opacity="0.25">
            <animateMotion dur="14s" repeatCount="indefinite" path={GHAT_PATH} />
          </circle>
          <circle r="5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="2">
            <animateMotion dur="14s" repeatCount="indefinite" path={GHAT_PATH} />
          </circle>
        </g>
      </svg>
    </div>
  );
}
