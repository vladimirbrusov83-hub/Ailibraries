import Link from "next/link";
import { modules, moduleReviewDates, siteUpdates } from "@/content/modules";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const levelTint: Record<string, { c: string; t: string }> = {
  foundations: { c: "#0F6E56", t: "#E1F5EE" },
  applied: { c: "#185FA5", t: "#E6F1FB" },
  advanced: { c: "#854F0B", t: "#FAEEDA" },
};

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function monthIndex(label: string) {
  const [month, year] = label.split(" ");
  return Number(year) * 12 + MONTHS.indexOf(month);
}

export default function RecentUpdates() {
  const latest = siteUpdates[0];
  const [ly, lm] = latest.date.split("-").map(Number);
  const cutoff = ly * 12 + (lm - 1) - 2;
  const cutoffLabel = `${MONTHS[((lm - 1 - 2) % 12 + 12) % 12]} ${lm - 2 < 1 ? ly - 1 : ly}`;
  const published = modules.filter((m) => m.status === "published").sort((a, b) => a.id - b.id);
  const recent = published.filter((m) => moduleReviewDates[m.id] && monthIndex(moduleReviewDates[m.id]) >= cutoff).length;
  const slugFor = (id: number) => modules.find((m) => m.id === id);

  const renderEntry = (u: (typeof siteUpdates)[number], i: number, reveal: boolean) => (
    <li key={`${u.date}-${u.title}`} className={`${reveal ? `rv w${Math.min(i + 2, 4)} ` : ""}relative pl-8 pb-7 last:pb-0`}>
      <span
        className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-[3px] bg-white ${i === 0 ? "update-dot-new" : ""}`}
        style={{ borderColor: i === 0 ? "#0F6E56" : "#d6d3d1" }}
        aria-hidden="true"
      />
      <p className="text-xs font-medium text-stone-400 tabular-nums">
        <time dateTime={u.date}>{formatDate(u.date)}</time>
        {i === 0 && (
          <span className="ml-2 align-middle inline-block px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide" style={{ backgroundColor: "#E1F5EE", color: "#0F6E56" }}>
            Latest
          </span>
        )}
      </p>
      <h3 className="mt-1 text-base font-semibold text-stone-900 leading-snug">{u.title}</h3>
      <p className="mt-1.5 text-sm text-stone-600 leading-relaxed">{u.summary}</p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {u.modules.map((id) => {
          const m = slugFor(id);
          if (!m) return null;
          const tint = levelTint[m.level];
          return (
            <Link
              key={id}
              href={`/module/${m.slug}`}
              title={m.title}
              className="review-chip px-2 py-0.5 rounded-md text-xs font-semibold tabular-nums"
              style={{ backgroundColor: tint.t, color: tint.c, "--c": tint.c } as React.CSSProperties}
            >
              Module {String(id).padStart(2, "0")}
            </Link>
          );
        })}
      </div>
    </li>
  );

  return (
    <section id="updates" className="py-[72px] sm:py-24 bg-stone-50 border-y border-stone-100 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rv mb-10 sm:mb-12 max-w-2xl">
          <span className="eyebrow-dash text-xs font-semibold uppercase mb-1.5" style={{ color: "#0F6E56" }}>
            Kept current
          </span>
          <h2 className="text-2xl sm:text-[28px] sm:leading-[34px] font-bold tracking-[-0.03em] text-stone-900 mb-3">
            What changed recently
          </h2>
          <p className="text-stone-500 leading-relaxed text-pretty">
            AI guidance, vendor tools and professional standards change fast. Every module is reviewed against new sources, and each change is logged here so you can see the material is current before you teach from it.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 lg:gap-10 items-start">
          {/* Status + review grid */}
          <div className="rv w2 rounded-[14px] border border-stone-200 bg-white p-6 shadow-[0_1px_2px_rgba(28,25,23,0.04),0_8px_24px_-12px_rgba(28,25,23,0.12)]">
            <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: "#0F6E56" }}>
              <span className="pill-dot w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
              Up to date
            </div>
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-stone-400">Last content update</p>
            <p className="text-2xl sm:text-[28px] font-bold tracking-[-0.03em] text-stone-900 tabular-nums">
              {formatDate(latest.date)}
            </p>
            <p className="mt-1 text-sm text-stone-500">
              <span className="font-semibold text-stone-800">{recent} of {published.length}</span> modules reviewed since {cutoffLabel}
            </p>

            <p className="mt-5 pt-4 border-t border-stone-100 text-xs text-stone-400 leading-relaxed">
              Each module page also shows its review date under the title.
            </p>
          </div>

          {/* Change log */}
          <div>
            <ol className="rv w3 update-log relative">
              {siteUpdates.slice(0, 2).map((u, i) => renderEntry(u, i, true))}
            </ol>
            {siteUpdates.length > 2 && (
              <details className="update-more group mt-7">
                <summary className="update-more-btn inline-flex items-center gap-2 ml-8 px-3.5 py-2 rounded-lg border border-stone-200 bg-white text-sm font-medium text-stone-600 cursor-pointer list-none select-none">
                  <span className="group-open:hidden">Show {siteUpdates.length - 2} earlier updates</span>
                  <span className="hidden group-open:inline">Hide earlier updates</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <ol className="update-log update-more-list relative mt-7">
                  {siteUpdates.slice(2).map((u, i) => renderEntry(u, i + 2, false))}
                </ol>
              </details>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
