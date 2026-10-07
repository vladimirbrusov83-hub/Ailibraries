import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  modules,
  getModuleBySlug,
  levelMeta,
  acrlCompetencyMeta,
  moduleReviewDates,
} from "@/content/modules";
import { moduleReferences } from "@/content/references";
import { LevelBadge, AudienceBadge, AcrlBadge, GapBadge } from "@/components/badges";
import ReadingProgress from "@/components/reading-progress";
import ModuleToc from "@/components/module-toc";
import CompleteButton from "@/components/complete-button";
import ModuleActions from "@/components/module-actions";
import { slugify } from "@/lib/slugify";
import type { Level } from "@/lib/types";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const mod = getModuleBySlug(params.slug);
  if (!mod) return {};
  return {
    title: `${mod.title} - AI for Academic Libraries`,
    description: mod.description,
  };
}

const moduleLaunchDates: Record<number, string> = {
  17: "July 6",
};

const SITE_URL = "https://ai-in-academic-libraries.vercel.app";

const levelAccent: Record<string, string> = {
  foundations: "#0F6E56",
  applied: "#185FA5",
  advanced: "#854F0B",
};

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*\[[^\]]+\]\(https?:\/\/[^)]+\)\*\*|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\(https?:\/\/[^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**[")) {
      const match = part.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*$/);
      if (match)
        return <strong key={i} className="font-semibold text-stone-900"><a href={match[2]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-900 transition-colors">{match[1]}</a></strong>;
    }
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i} className="font-semibold text-stone-900">{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*"))
      return <em key={i}>{part.slice(1, -1)}</em>;
    if (part.startsWith("[")) {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match)
        return <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-900 transition-colors">{match[1]}</a>;
    }
    return part;
  });
}

function renderBody(text: string) {
  const paragraphs = text.split("\n\n").filter(Boolean);
  return paragraphs.map((para, i) => {
    if (para.startsWith("> ")) {
      const inner = para.replace(/^> ?/gm, "");
      const segs = inner.split("\n- ");
      return (
        <aside
          key={i}
          className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4"
        >
          {segs[0] && (
            <p className="text-red-900 leading-relaxed font-semibold mb-2">
              {renderInline(segs[0])}
            </p>
          )}
          {segs.length > 1 && (
            <ul className="space-y-1.5 pl-5">
              {segs.slice(1).map((item, j) => (
                <li key={j} className="text-stone-700 leading-relaxed list-disc">
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          )}
        </aside>
      );
    }
    if (para.includes("\n- ")) {
      const parts = para.split("\n- ");
      return (
        <div key={i} className="mb-5">
          {parts[0] && (
            <p className="text-stone-700 leading-relaxed mb-2">{renderInline(parts[0])}</p>
          )}
          <ul className="space-y-1.5 pl-5">
            {parts.slice(1).map((item, j) => (
              <li key={j} className="text-stone-700 leading-relaxed list-disc">
                {renderInline(item)}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <p key={i} className="text-stone-700 leading-relaxed mb-5">
        {renderInline(para)}
      </p>
    );
  });
}

export default function ModulePage({ params }: { params: { slug: string } }) {
  const mod = getModuleBySlug(params.slug);
  if (!mod) notFound();

  const accent = levelAccent[mod.level];
  const meta = levelMeta[mod.level as Level];
  const pdfHref = `/pdfs/module-${String(mod.id).padStart(2, "0")}-${mod.slug}.pdf`;

  const relatedModuleData = mod.relatedModules
    .map((slug) => modules.find((m) => m.slug === slug))
    .filter(Boolean) as typeof modules;

  const headings =
    mod.content?.sections.map((s) => ({
      id: slugify(s.heading),
      text: s.heading,
    })) ?? [];
  const reviewedDate = moduleReviewDates[mod.id];

  if (mod.status === "coming-soon") {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <nav className="flex items-center gap-1.5 mb-8 text-sm" aria-label="Breadcrumb">
          <Link href="/curriculum" className="text-stone-400 hover:text-stone-600 transition-colors">
            Curriculum
          </Link>
          <span className="text-stone-300" aria-hidden="true">/</span>
          <Link href={`/level/${mod.level}`} className="text-stone-400 hover:text-stone-600 transition-colors">
            {meta.shortLabel}
          </Link>
          <span className="text-stone-300" aria-hidden="true">/</span>
          <span className="text-stone-600 truncate">{mod.title}</span>
        </nav>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <LevelBadge level={mod.level} />
            <AudienceBadge audience={mod.audience} />
            {mod.isGap && <GapBadge />}
          </div>
          <h1 className="rv text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-balance text-stone-900 mb-3">{mod.title}</h1>
          <p className="text-lg text-stone-600 leading-relaxed">{mod.description}</p>
        </div>

        <div className="rv w2 card card-soft mb-8">
          <h2 className="font-semibold text-stone-900 mb-4">
            What you&apos;ll be able to do after this module
          </h2>
          <ul className="space-y-2">
            {mod.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-3 text-stone-600 text-sm">
                <span
                  className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: accent }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                {obj}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rv card-soft rounded-xl border p-6 mb-8 text-center"
          style={{ borderColor: `${accent}40`, backgroundColor: `${accent}08` }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: accent }}>
            Coming soon
          </p>
          {moduleLaunchDates[mod.id] ? (
            <p className="text-2xl font-bold text-stone-900">Will be available {moduleLaunchDates[mod.id]}</p>
          ) : (
            <Link
              href="/contact"
              className="btn-level arrow-nudge inline-flex items-center gap-1.5 mt-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: accent, "--c": accent } as React.CSSProperties}
            >
              Contact us <span>→</span>
            </Link>
          )}
        </div>

        <div className="rv mt-8 p-4 rounded-lg bg-stone-50 border border-stone-200">
          <p className="text-xs font-medium text-stone-600 mb-2">
            ACRL AI Competencies covered in this module
          </p>
          <div className="flex flex-wrap gap-2">
            {mod.acrlCompetencies.map((c) => (
              <AcrlBadge key={c} competency={c} />
            ))}
          </div>
          <p className="text-xs text-stone-400 mt-2">
            Sub-competencies: {mod.acrlSubCompetencies.join(", ")}
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            Back to top
          </a>
        </div>
      </div>
    );
  }

  const moduleJsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: mod.title,
    description: mod.description,
    url: `${SITE_URL}/module/${mod.slug}`,
    learningResourceType: "Module",
    isAccessibleForFree: true,
    inLanguage: "en-US",
    educationalLevel: "Professional Development",
    ...(mod.estimatedMinutes && { timeRequired: `PT${mod.estimatedMinutes}M` }),
    teaches: mod.objectives,
    author: { "@type": "Person", name: "Yulia Brusova", url: `${SITE_URL}/about` },
    isPartOf: { "@type": "Course", name: "AI for Academic Libraries", url: `${SITE_URL}/curriculum` },
    about: mod.acrlCompetencies.map((c) => ({ "@type": "DefinedTerm", name: acrlCompetencyMeta[c].label })),
  };

  return (
    <>
      <ReadingProgress accent={accent} />
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(moduleJsonLd) }}
      />
      <nav className="flex items-center gap-1.5 mb-8 text-sm" aria-label="Breadcrumb">
        <Link href="/curriculum" className="text-stone-400 hover:text-stone-600 transition-colors">
          Curriculum
        </Link>
        <span className="text-stone-300" aria-hidden="true">/</span>
        <Link href={`/level/${mod.level}`} className="text-stone-400 hover:text-stone-600 transition-colors">
          {meta.shortLabel}
        </Link>
        <span className="text-stone-300" aria-hidden="true">/</span>
        <span className="text-stone-600 truncate">{mod.title}</span>
      </nav>

      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          <LevelBadge level={mod.level} />
          <AudienceBadge audience={mod.audience} />
          {mod.isGap && <GapBadge />}
        </div>
        <h1 className="rv text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-balance text-stone-900 mb-3">{mod.title}</h1>
        <div className="rv w2 flex flex-wrap items-center gap-2 mt-4">
          <span className="meta-chip">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {mod.estimatedMinutes} min read
          </span>
          <span className="meta-chip">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25v13m0-13C10.83 5.48 9.25 5 7.5 5S4.17 5.48 3 6.25v13C4.17 18.48 5.75 18 7.5 18s3.33.48 4.5 1.25m0-13C13.17 5.48 14.75 5 16.5 5c1.75 0 3.33.48 4.5 1.25v13C19.83 18.48 18.25 18 16.5 18c-1.75 0-3.33.48-4.5 1.25" />
            </svg>
            Module {String(mod.id).padStart(2, "0")}
          </span>
          {reviewedDate && (
            <span
              className="meta-chip meta-chip-reviewed"
              style={{ color: accent, backgroundColor: `${accent}10`, borderColor: `${accent}40` }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Reviewed {reviewedDate}
            </span>
          )}
        </div>
        <div className="rv w3 no-print flex flex-wrap items-center gap-3 mt-5">
          <a
            href={pdfHref}
            download
            className="btn-soft inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold"
            style={{ borderColor: `${accent}40`, color: accent, "--c": accent } as React.CSSProperties}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download PDF
          </a>
          <ModuleActions title={mod.title} accent={accent} />
        </div>
      </header>

      <div
        className="rv w3 card-soft rounded-xl p-6 mb-10 border"
        style={{ borderColor: `${accent}30`, backgroundColor: `${accent}08` }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: accent }}>
          What you&apos;ll be able to do
        </h2>
        <ul className="space-y-2">
          {mod.objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-stone-700">
              <span
                className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: accent }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {mod.content && (
        <div className="xl:relative">
        <article className="prose-library">
          <div className="border-l-4 pl-5 py-1 mb-8 italic" style={{ borderColor: accent }}>
            <p className="text-stone-700 leading-relaxed m-0">{mod.content.intro}</p>
          </div>

          {mod.content.sections.map((section, i) => (
            <section key={i} className="mb-10">
              <h2
                id={slugify(section.heading)}
                className="text-xl font-semibold text-stone-900 mb-4 scroll-mt-24"
              >
                {section.heading}
              </h2>
              <div>{renderBody(section.body)}</div>
            </section>
          ))}


          {mod.content.summary && mod.content.summary.length > 0 && (
            <div className="rv card-soft rounded-xl p-6 mt-10 border border-stone-200 bg-stone-50">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-4">
                Key takeaways
              </p>
              <ul className="space-y-3">
                {mod.content.summary.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: accent }}
                      aria-hidden="true"
                    />
                    <p className="text-sm text-stone-700 leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {moduleReferences[mod.id] && (
            <details className="rv refs-card card-soft mt-8 group border border-stone-200 rounded-xl overflow-hidden bg-white">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none select-none text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors">
                <span>References</span>
                <svg
                  className="w-4 h-4 text-stone-400 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-1 border-t border-stone-100">
                <p className="text-xs text-stone-400 mb-4">APA 7th edition</p>
                <ol className="space-y-4">
                  {moduleReferences[mod.id].map((ref, i) => (
                    <li key={i} className="text-sm text-stone-600 leading-relaxed pl-6 -indent-6">
                      {renderInline(ref.text)}{" "}
                      {ref.url && (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-500 underline underline-offset-2 hover:text-stone-800 transition-colors break-all"
                        >
                          {ref.url}
                        </a>
                      )}
                      {ref.note && (
                        <span className="block mt-1 text-xs text-stone-400 italic pl-0 indent-0">{ref.note}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </details>
          )}
        </article>
          {headings.length > 0 && (
            <aside className="hidden xl:block absolute top-0 left-full ml-6 w-52 h-full">
              <div className="sticky top-24">
                <ModuleToc headings={headings} accent={accent} />
              </div>
            </aside>
          )}
        </div>
      )}

      <div className="rv card-soft mt-12 p-5 rounded-xl bg-stone-50 border border-stone-200">
        <h2 className="text-sm font-semibold text-stone-700 mb-3">ACRL AI Competencies covered</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {mod.acrlCompetencies.map((c) => (
            <span key={c} className="px-3 py-1 rounded-md text-sm font-medium bg-white border border-stone-200 text-stone-700">
              {acrlCompetencyMeta[c].label}
            </span>
          ))}
        </div>
        <p className="text-xs text-stone-400">
          Sub-competencies: {mod.acrlSubCompetencies.join(", ")} ·{" "}
          <a
            href="https://www.ala.org/acrl/standards/ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-stone-600 transition-colors"
          >
            ACRL AI Competencies (2025)
          </a>
        </p>
      </div>

      {relatedModuleData.length > 0 && (
        <div className="mt-10">
          <h2 className="rv text-sm font-semibold text-stone-700 mb-4">Continue learning</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {relatedModuleData.map((related, i) => (
              <div key={related.slug} className={`rv w${Math.min(i + 2, 4)}`}>
              <Link
                href={related.status === "coming-soon" ? "/newsletter" : `/module/${related.slug}`}
                className="related-card block h-full p-4 bg-white border border-stone-200"
                style={{ "--lvl": levelAccent[related.level] } as React.CSSProperties}
              >
                <p className="text-xs text-stone-400 mb-1">Module {String(related.id).padStart(2, "0")}</p>
                <p className="text-sm font-medium text-stone-800 leading-snug">{related.title}</p>
                {related.status === "coming-soon" && (
                  <p className="text-xs text-stone-400 mt-1">Coming soon</p>
                )}
              </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <CompleteButton slug={mod.slug} accent={accent} />

      <div className="mt-10 flex justify-center">
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          Back to top
        </a>
      </div>

      <nav className="rv mt-8 pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="Module navigation">
        {mod.id > 1 && (() => {
          const prev = modules.find((m) => m.id === mod.id - 1);
          return prev ? (
            <Link
              href={prev.status === "coming-soon" ? `/level/${prev.level}` : `/module/${prev.slug}`}
              className="pager-card group flex items-center gap-3 p-4 rounded-xl border border-stone-200 bg-white"
              style={{ "--c": levelAccent[prev.level] } as React.CSSProperties}
            >
              <span className="pager-arrow flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-stone-100 text-stone-500" aria-hidden="true">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-medium text-stone-400">
                  Previous · Module {String(prev.id).padStart(2, "0")}
                </span>
                <span className="block text-sm font-semibold text-stone-800 leading-snug">{prev.title}</span>
              </span>
            </Link>
          ) : null;
        })()}

        {mod.id < modules.length && (() => {
          const next = modules.find((m) => m.id === mod.id + 1);
          return next ? (
            <Link
              href={next.status === "coming-soon" ? `/newsletter` : `/module/${next.slug}`}
              className="pager-card pager-next group flex items-center justify-end gap-3 p-4 rounded-xl border text-right sm:col-start-2"
              style={{ "--c": levelAccent[next.level], borderColor: `${levelAccent[next.level]}40`, backgroundColor: `${levelAccent[next.level]}0a` } as React.CSSProperties}
            >
              <span className="min-w-0">
                <span className="block text-xs font-medium" style={{ color: levelAccent[next.level] }}>
                  Next · Module {String(next.id).padStart(2, "0")}
                </span>
                <span className="block text-sm font-semibold text-stone-900 leading-snug">{next.title}</span>
              </span>
              <span className="pager-arrow flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: levelAccent[next.level] }} aria-hidden="true">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ) : null;
        })()}
      </nav>
    </div>
    </>
  );
}
