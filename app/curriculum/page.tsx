import type { Metadata } from "next";
import Link from "next/link";
import { modules, levelMeta } from "@/content/modules";
import ModuleCard from "@/components/module-card";
import CurriculumSearch from "@/components/curriculum-search";
import CurriculumProgress from "@/components/curriculum-progress";
import RoleToggle from "@/components/role-toggle";
import RoleMemory from "@/components/role-memory";
import { isRoleFilter, roleMeta, type RoleFilter } from "@/lib/audience";

export const metadata: Metadata = {
  title: "Full Curriculum - 18 Modules Across 3 Levels",
  description:
    "Browse all 18 modules in the AI for Academic Libraries curriculum. Three levels from foundations to advanced - mapped to ACRL AI Competencies and open to both practicing and digital librarians.",
};

const levels = ["foundations", "applied", "advanced"] as const;

const levelStyles: Record<
  (typeof levels)[number],
  { accent: string; bg: string; border: string }
> = {
  foundations: { accent: "#0F6E56", bg: "#E1F5EE", border: "#b2e8d4" },
  applied: { accent: "#185FA5", bg: "#E6F1FB", border: "#b8d5f2" },
  advanced: { accent: "#854F0B", bg: "#FAEEDA", border: "#f0d4a0" },
};

const toggleOptions: { value: RoleFilter | null; href: string; label: string }[] =
  [
    { value: null, href: "/curriculum", label: "All modules" },
    {
      value: "practicing",
      href: "/curriculum?role=practicing",
      label: "Practicing Librarian",
    },
    {
      value: "digital",
      href: "/curriculum?role=digital",
      label: "Digital Librarian",
    },
  ];

const SITE_URL = "https://ai-in-academic-libraries.vercel.app";

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI for Academic Libraries",
  description:
    "An 18-module, ACRL AI Competencies-aligned curriculum for academic library workers covering AI fundamentals, practical workflows, and advanced automation. Three progressive levels: Foundations, Applied, and Advanced.",
  url: `${SITE_URL}/curriculum`,
  isAccessibleForFree: true,
  inLanguage: "en-US",
  educationalLevel: "Professional Development",
  audience: {
    "@type": "Audience",
    audienceType: "Academic Library Workers",
  },
  provider: {
    "@type": "Person",
    name: "Yulia Brusova",
    url: `${SITE_URL}/about`,
  },
  hasPart: [
    { "@type": "Course", name: "Level 1: Foundations", url: `${SITE_URL}/level/foundations` },
    { "@type": "Course", name: "Level 2: Applied", url: `${SITE_URL}/level/applied` },
    { "@type": "Course", name: "Level 3: Advanced", url: `${SITE_URL}/level/advanced` },
  ],
};

export default function CurriculumPage({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  const role: RoleFilter | null = isRoleFilter(searchParams.role)
    ? searchParams.role
    : null;
  const recommendedCount = role
    ? modules.filter((m) => m.audience === role).length
    : 0;
  const totalMinutes = modules
    .filter((m) => m.status === "published")
    .reduce((sum, m) => sum + m.estimatedMinutes, 0);
  const totalHours = Math.round(totalMinutes / 60);

  const publishedSlugs = modules
    .filter((m) => m.status === "published")
    .map((m) => m.slug);
  // Strip heavy `content` before sending modules to the client search component.
  const searchIndex = modules.map((m) => ({ ...m, content: undefined }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <h1 className="rv text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-stone-900 mb-4">
          Full Curriculum
        </h1>
        <p className="rv w2 text-stone-600 leading-relaxed text-lg">
          18 modules across three levels - from AI basics to building your own tools. Choose your path or work through every module in order.
        </p>
        <p className="rv w3 mt-3 text-sm font-medium text-stone-500">
          {modules.length} modules · ~{totalHours} hours of material · self-paced
        </p>
      </div>

      <RoleMemory role={role} />
      <CurriculumProgress slugs={publishedSlugs} />

      {/* Path selector callout */}
      <div className="rv card-soft grid sm:grid-cols-2 gap-4 mb-10 p-6 rounded-xl bg-stone-50 border border-stone-200">
        <div>
          <h2 className="font-semibold text-stone-900 mb-1.5">
            Not sure where to start?
          </h2>
          <p className="text-sm text-stone-600">
            Modules tagged <span className="font-medium text-violet-700">Practicing</span> focus on reference, instruction, and research support. Modules tagged <span className="font-medium text-cyan-700">Digital</span> focus on metadata, systems, and cataloging. All are tagged for both or one audience.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <Link
            href="/level/foundations"
            className="btn-lift btn-green arrow-nudge flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
            style={{ backgroundColor: "#0F6E56" }}
          >
            Start with Foundations <span>→</span>
          </Link>
          <Link
            href="/module/what-is-ai-for-librarians"
            className="btn-lift btn-ghost arrow-nudge flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-medium border border-stone-300 text-stone-700 hover:border-stone-400 bg-white"
          >
            Jump to Module 01 <span>→</span>
          </Link>
        </div>
      </div>

      {/* Role highlight toggle */}
      <div className="rv mb-12">
        <p className="text-sm font-medium text-stone-700 mb-2">
          Highlight modules for your role
        </p>
        <RoleToggle
          active={role}
          options={toggleOptions.map((opt) => ({
            ...opt,
            color: opt.value ? roleMeta[opt.value].color : "#0F6E56",
          }))}
        />
        {role && (
          <p key={role} className="fade-in-soft text-sm text-stone-500 mt-3">
            Highlighting {recommendedCount} module
            {recommendedCount === 1 ? "" : "s"} recommended for{" "}
            <span className="font-medium text-stone-700">
              {roleMeta[role].label}s
            </span>
            . Modules for all librarians stay relevant to you.
          </p>
        )}
      </div>

      {/* Search + levels */}
      <CurriculumSearch modules={searchIndex} role={role}>
      {levels.map((levelKey) => {
        const meta = levelMeta[levelKey];
        const levelModules = modules.filter((m) => m.level === levelKey);
        const publishedCount = levelModules.filter(
          (m) => m.status === "published"
        ).length;
        const levelStyle = levelStyles[levelKey];

        return (
          <section key={levelKey} className="mb-16">
            {/* Level header */}
            <div
              className="rv card-soft rounded-xl p-6 mb-7 border"
              style={{
                backgroundColor: levelStyle.bg,
                borderColor: levelStyle.border,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2
                      className="text-xl font-bold"
                      style={{ color: levelStyle.accent }}
                    >
                      {meta.label}
                    </h2>
                    {levelKey === "advanced" && (
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-md text-white"
                        style={{ backgroundColor: levelStyle.accent }}
                      >
                        ★ Emerging topics
                      </span>
                    )}
                  </div>
                  <p className="text-stone-700 text-sm">{meta.description}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm font-medium text-stone-700">
                    {publishedCount}/{levelModules.length} modules available
                  </p>
                  <Link
                    href={`/level/${levelKey}`}
                    className="arrow-nudge text-xs font-medium mt-0.5 inline-block transition-colors"
                    style={{ color: levelStyle.accent }}
                  >
                    View level hub <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Module grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {levelModules.map((m, i) => (
                <div key={m.slug} className={`rv w${(i % 3) + 2}`}>
                  <ModuleCard module={m} role={role} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
      </CurriculumSearch>

      {/* ACRL footer note */}
      <div className="rv border-t border-stone-200 pt-8 text-center">
        <p className="text-sm text-stone-500">
          All modules are mapped to the{" "}
          <a
            href="https://www.ala.org/acrl/standards/ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-stone-800 transition-colors"
          >
            ACRL AI Competencies for Academic Library Workers (October 2025)
          </a>{" "}
          at the sub-competency level.
        </p>
        <p className="text-xs text-stone-500 italic mt-2">
          Modules and content are subject to change and ongoing updates as the AI landscape evolves.
        </p>
      </div>
    </div>
  );
}
