/** Long-form text pages (policies). */
export function Prose({ eyebrow, title, updated, children }: { eyebrow: string; title: string; updated: string; children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-5 pt-14 sm:px-8">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-2 font-head text-5xl font-bold uppercase">{title}</h1>
      <p className="mt-2 font-mono text-sm text-ink-2">Last updated {updated}</p>
      <div className="mt-8 grid gap-4 leading-relaxed text-ink-2 [&_h2]:mt-6 [&_h2]:font-head [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_h2]:uppercase [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink [&_ul]:grid [&_ul]:gap-2">
        {children}
      </div>
    </article>
  );
}
