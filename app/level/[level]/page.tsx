import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { modules, levelMeta } from "@/content/modules";
import ModuleCard from "@/components/module-card";

type Level = "foundations" | "applied" | "advanced";

const validLevels: Level[] = ["foundations", "applied", "advanced"];

export function generateStaticParams() {
  return validLevels.map((level) => ({ level }));
}

export async function generateMetadata({
  params,
}: {
  params: { level: string };
}): Promise<Metadata> {
  const level = params.level as Level;
  if (!validLevels.includes(level)) return {};

  const meta = levelMeta[level];
  return {
    title: `${meta.label} - AI for Academic Libraries`,
    description: meta.description,
  };
}

const levelConfig = {
  foundations: {
    accent: "#0F6E56",
    bg: "#E1F5EE",
    border: "#b2e8d4",
    who: "All librarians - both practicing and digital.",
    audience:
      "This level is for everyone. Whether you work at a reference desk or in a systems role, these five modules give you the mental models and skills you need before anything else.",
    prerequisite: null,
    next: "applied",
  },
  applied: {
    accent: "#185FA5",
    bg: "#E6F1FB",
    border: "#b8d5f2",
    who: "Role-split. Some modules for practicing librarians, some for digital librarians, some for both.",
    audience:
      "Level 2 modules are role-specific. Practicing librarians will focus on research support, instruction, and reference. Digital librarians will focus on metadata, cataloging, and systems.",
    prerequisite: "foundations",
    next: "advanced",
  },
  advanced: {
    accent: "#854F0B",
    bg: "#FAEEDA",
    border: "#f0d4a0",
    who: "Both audiences. Technical comfort from Level 2 recommended.",
    audience:
      "Advanced topics that are still emerging in library AI practice: workflow automation, agentic AI, vibe coding, and systems integration. Every module is available now.",
    prerequisite: "applied",
    next: null,
  },
};

const SITE_URL = "https://ai-in-academic-libraries.vercel.app";

export default function LevelPage({ params }: { params: { level: string } }) {
  const level = params.level as Level;
  if (!validLevels.includes(level)) notFound();

  const meta = levelMeta[level];
  const config = levelConfig[level];
  const levelModules = modules.filter((m) => m.level === level);
  const publishedModules = levelModules.filter((m) => m.status === "published");
  const isAdvanced = level === "advanced";

  const levelJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: meta.label,
    description: meta.description,
    url: `${SITE_URL}/level/${level}`,
    isAccessibleForFree: true,
    inLanguage: "en-US",
    educationalLevel: "Professional Development",
    audience: { "@type": "Audience", audienceType: meta.audience },
    provider: { "@type": "Person", name: "Yulia Brusova", url: `${SITE_URL}/about` },
    isPartOf: { "@type": "Course", name: "AI for Academic Libraries", url: `${SITE_URL}/curriculum` },
    hasPart: publishedModules.map((m) => ({
      "@type": "LearningResource",
      name: m.title,
      url: `${SITE_URL}/module/${m.slug}`,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(levelJsonLd) }}
      />
      {/* Level hero */}
      <div
        className="border-b"
        style={{ backgroundColor: config.bg, borderColor: config.border }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="rv flex items-center gap-2 mb-3">
            <Link
              href="/curriculum"
              className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
            >
              Curriculum
            </Link>
            <span className="text-stone-300" aria-hidden="true">/</span>
            <span className="text-sm font-medium" style={{ color: config.accent }}>
              {meta.label}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-xl">
              <h1
                className="rv w2 text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-balance mb-3"
                style={{ color: config.accent }}
              >
                {meta.label}
              </h1>
              <p className="rv w3 text-stone-700 leading-relaxed text-base">
                {meta.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Audience guidance */}
        <div className="rv card-soft rounded-xl border border-stone-200 bg-stone-50 p-5 mb-10">
          <p className="text-sm font-semibold text-stone-700 mb-0.5">Who this level is for</p>
          <p className="text-sm text-stone-600">{config.audience}</p>
        </div>

        {/* Modules */}
        {isAdvanced ? (
          /* Advanced - first-in-field, now fully available */
          <div>
            <div className="rv card-soft rounded-xl border p-8 mb-8 text-center" style={{ borderColor: config.border, backgroundColor: config.bg }}>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl"
                style={{ backgroundColor: "#854F0B", color: "white" }}
                aria-hidden="true"
              >
                ★
              </div>
              <h2 className="text-xl font-bold text-stone-900 mb-2">
                Level 3 is here
              </h2>
              <p className="text-stone-600 text-sm max-w-md mx-auto mb-6">
                These {publishedModules.length} modules cover advanced topics that are still emerging in library AI practice. Every one is published and ready to read.
              </p>
              {publishedModules[0] && (
                <Link
                  href={`/module/${publishedModules[0].slug}`}
                  className="btn-level arrow-nudge inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
                  style={{ backgroundColor: "#854F0B", "--c": "#854F0B" } as React.CSSProperties}
                >
                  Start Level 3 <span>→</span>
                </Link>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {levelModules.map((m, i) => (
                <div key={m.slug} className={`rv w${(i % 3) + 2}`}>
                  <ModuleCard module={m} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {levelModules.map((m, i) => (
              <div key={m.slug} className={`rv w${(i % 3) + 2}`}>
                <ModuleCard module={m} />
              </div>
            ))}
          </div>
        )}

        {/* Navigation between levels */}
        <div className="rv mt-14 pt-8 border-t border-stone-200 flex flex-col sm:flex-row justify-between gap-4">
          {config.prerequisite && (
            <Link
              href={`/level/${config.prerequisite}`}
              className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {levelMeta[config.prerequisite as Level].label}
            </Link>
          )}
          {config.next && (
            <Link
              href={`/level/${config.next}`}
              className="flex items-center gap-2 text-sm font-medium transition-colors group ml-auto"
              style={{ color: config.accent }}
            >
              {levelMeta[config.next as Level].label}
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
