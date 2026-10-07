import type { Metadata } from "next";
import Link from "next/link";
import { modules, levelMeta } from "@/content/modules";
import ModuleCard from "@/components/module-card";
import ContactPanel from "@/components/contact-panel";
import RecentUpdates from "@/components/recent-updates";
import { COURSE_ANNOUNCED } from "@/lib/course";

export const metadata: Metadata = {
  title: "AI for Academic Libraries",
  description:
    "A structured learning path from AI literacy to building your own tools - mapped to ACRL AI Competencies (2025), aligned with ALA's AI Guidance (2026), and grounded in the 4D Framework from Anthropic's AI Fluency course. Practitioner voice from a working community college librarian.",
};

const audiencePaths = [
  {
    id: "practicing",
    label: "Practicing Librarian",
    subtitle: "Reference, instruction, research support",
    description:
      "You sit at a reference desk or teach library sessions. You want AI to help you today - drafting emails, building lesson plans, supporting student researchers.",
    color: "#6d28d9",
    lightColor: "#f5f3ff",
    borderColor: "#ddd6fe",
    startModule: "what-is-ai-for-librarians",
    modules: ["01", "02", "03", "04", "05", "06", "07", "10", "11", "12", "13"],
  },
  {
    id: "digital",
    label: "Digital Librarian",
    subtitle: "Metadata, cataloging, systems, repositories",
    description:
      "You work with systems, metadata, digital collections, and institutional repositories. You want to understand where AI integrates with the tools you manage.",
    color: "#0369a1",
    lightColor: "#f0f9ff",
    borderColor: "#bae6fd",
    startModule: "what-is-ai-for-librarians",
    modules: ["01", "02", "03", "04", "05", "08", "09", "10", "11", "12", "13"],
  },
];

const level1Modules = modules.filter((m) => m.level === "foundations").slice(0, 3);
const level2Modules = modules.filter((m) => m.level === "applied").slice(0, 3);
const level3Modules = modules.filter((m) => m.level === "advanced").slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* ─── Course announcement ───────────────────────────────────────────── */}
      {COURSE_ANNOUNCED && (
      <section
        className="ann-shine text-white"
        style={{ background: "linear-gradient(135deg, #0F6E56 0%, #185FA5 55%, #854F0B 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-sm sm:text-base leading-snug">
            <span className="inline-block px-2 py-0.5 mr-2 rounded-full bg-yellow-300 text-stone-900 text-xs font-bold uppercase tracking-wide align-middle">
              Coming soon
            </span>
            <span className="font-semibold">The Course:</span> quizzes, a final exam and a verifiable certificate - free.
          </p>
          <Link
            href="/course"
            className="ann-btn flex-shrink-0 bg-white text-stone-900 font-bold px-5 py-2 rounded-xl text-sm hover:bg-yellow-100"
          >
            Enroll →
          </Link>
        </div>
      </section>
      )}

      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="hero-refined pt-16 pb-[72px] sm:pt-[104px] sm:pb-28 border-b border-stone-100">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="rv hero-pill inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-200 text-xs font-medium mb-6" style={{ color: "#0F6E56" }}>
            <span className="pill-dot w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
            Aligned with ACRL AI Competencies (2025) &amp; ALA AI Guidance (2026)
          </div>

          <h1 className="rv w2 text-[38px] leading-[1.08] sm:text-[3.75rem] sm:leading-[1.06] tracking-[-0.035em] text-balance font-bold text-stone-900 mb-4">
            AI for Academic Libraries
          </h1>

          <p className="rv w2 text-base sm:text-[17px] font-semibold mb-5 sm:mb-[22px]" style={{ color: "#0F6E56" }}>
            The leading AI knowledge portal for library professionals.
          </p>

          <p className="rv w3 text-lg sm:text-xl text-stone-600 leading-relaxed text-pretty max-w-2xl mx-auto mb-9">
            A structured learning path from AI literacy to building your own tools - mapped to ACRL AI Competencies (2025), aligned with ALA&apos;s AI Guidance (2026), and grounded in the 4D Framework from Anthropic&apos;s{" "}
            <a
              href="https://anthropic.skilljar.com/ai-fluency-framework-foundations"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-[3px] hover:opacity-80 transition-opacity"
              style={{ color: "#0F6E56" }}
            >
              AI Fluency course
            </a>
            .
          </p>

          <div className="rv w4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/level/foundations"
              className="btn-primary btn-lift btn-green text-white font-semibold px-6 py-3 rounded-xl text-base"
              style={{ backgroundColor: "#0F6E56" }}
            >
              Start with Level 1: Foundations
            </Link>
            <Link
              href="/curriculum"
              className="btn-outline btn-lift btn-ghost border-stone-300 text-stone-700 hover:border-stone-400 font-medium px-6 py-3 rounded-xl text-base"
            >
              Browse the full curriculum
            </Link>
            {COURSE_ANNOUNCED && (
            <Link
              href="/course"
              className="btn-primary btn-lift btn-grad text-white font-semibold px-6 py-3 rounded-xl text-base"
              style={{ background: "linear-gradient(135deg, #0F6E56 0%, #185FA5 55%, #854F0B 100%)" }}
            >
              Enroll in the course
              <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-wide bg-yellow-300 text-stone-900 px-1.5 py-0.5 rounded-full">
                Soon
              </span>
            </Link>
            )}
          </div>

          <p className="rv w4 text-xs text-stone-400 mt-[18px]">
            Modules are subject to change as the field evolves.
          </p>

          <p className="rv text-lg sm:text-[1.55rem] sm:leading-normal tracking-[-0.012em] font-medium text-stone-700 leading-relaxed text-balance max-w-2xl mx-auto mt-12">
            The free curriculum that turns the{" "}
            <span className="hl-mark font-semibold text-stone-900">ACRL AI Competencies</span> and{" "}
            <span className="hl-mark font-semibold text-stone-900">ALA&apos;s AI guidance</span> into skills you can use.
          </p>
        </div>
      </section>

      {/* ─── Social proof bar ──────────────────────────────────────────────── */}
      <section className="border-b border-stone-100 bg-gradient-to-b from-stone-50 to-[#fcfcfb]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-9 sm:py-11">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 sm:gap-8 text-center">
            <div className="rv">
              <p className="text-[36px] leading-[42px] tracking-[-0.035em] tabular-nums font-bold text-stone-900"><span data-count="30" data-suf="+">30+</span></p>
              <p className="text-sm leading-[1.55] text-stone-500 mt-1.5 max-w-[36ch] mx-auto">
                countries reached. An international resource, used in the United States, India, Egypt, Canada, United Kingdom, Kenya, United Arab Emirates, Kazakhstan, Bulgaria, and more.
              </p>
            </div>
            <div className="rv w2 sm:border-x border-stone-200">
              <p className="text-[36px] leading-[42px] tracking-[-0.035em] tabular-nums font-bold text-stone-900"><span data-count="1000" data-suf="+">1000+</span></p>
              <p className="text-sm leading-[1.55] text-stone-500 mt-1.5 max-w-[36ch] mx-auto">
                librarians have used this curriculum to date
              </p>
            </div>
            <div className="rv w3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-medium mb-2 shadow-[0_1px_2px_rgba(15,110,86,0.1)]" style={{ backgroundColor: "#E1F5EE", borderColor: "#b2e8d4", color: "#0F6E56" }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ACRL Aligned
              </div>
              <p className="text-sm leading-[1.55] text-stone-500 max-w-[36ch] mx-auto">
                Sub-competency level mapping across all 18 modules
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why this exists: 2026 evidence ───────────────────────────────── */}
      <section className="bg-white border-b border-stone-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="rv text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-stone-900 mb-3">
              Why this exists
            </h2>
            <p className="text-stone-500 text-base leading-relaxed text-pretty max-w-2xl mx-auto">
              Library users have moved faster than library instruction. The 2026 sector data shows the gap is not willingness - it is structured support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rv w2">
            <div className="ev-card lift h-full border bg-white p-6 pb-[22px]" style={{ "--c": "#0F6E56" } as React.CSSProperties}>
                <p className="text-[34px] leading-[40px] sm:text-[42px] sm:leading-[46px] tracking-[-0.04em] tabular-nums font-bold text-stone-900"><span data-count="31" data-suf="%">31%</span></p>
                <p className="text-sm text-stone-600 leading-relaxed mt-2.5">
                  of students start a research project in a general AI assistant such as ChatGPT, Claude, or Gemini. Just 10% start at the library website. <span className="font-semibold text-stone-900">1% ask a librarian.</span>
                </p>
                <p className="text-xs text-stone-400 mt-4 pt-3 border-t border-stone-100">
                  Clarivate user experience research, 2026
                </p>
            </div>
            </div>

            <div className="rv w3">
            <div className="ev-card lift h-full border bg-white p-6 pb-[22px]" style={{ "--c": "#185FA5" } as React.CSSProperties}>
                <p className="text-[34px] leading-[40px] sm:text-[42px] sm:leading-[46px] tracking-[-0.04em] tabular-nums font-bold text-stone-900">3.2<span className="text-lg font-semibold text-stone-400"> / 5</span></p>
                <p className="text-sm text-stone-600 leading-relaxed mt-2.5">
                  Average librarian confidence in AI concepts and terminology - unchanged since 2025. A third of libraries are still at the exploration and evaluation stage.
                </p>
                <p className="text-xs text-stone-400 mt-4 pt-3 border-t border-stone-100">
                  Pulse of the Library 2026 (n = 1,876)
                </p>
            </div>
            </div>

            <div className="rv w4">
            <div className="ev-card lift h-full border bg-white p-6 pb-[22px]" style={{ "--c": "#854F0B" } as React.CSSProperties}>
                <p className="text-[34px] leading-[40px] sm:text-[42px] sm:leading-[46px] tracking-[-0.04em] tabular-nums font-bold text-stone-900"><span data-count="30" data-suf="%">30%</span></p>
                <p className="text-sm text-stone-600 leading-relaxed mt-2.5">
                  of libraries report no institutional focus on AI literacy, and half of librarians are building these skills on their own.
                </p>
                <p className="text-xs text-stone-400 mt-4 pt-3 border-t border-stone-100">
                  Pulse of the Library 2026 (n = 1,876)
                </p>
            </div>
            </div>
          </div>

          <p className="rv text-center text-sm leading-relaxed text-stone-500 mt-10 max-w-2xl mx-auto">
            This curriculum is the structured support that most libraries do not yet provide - free, sequenced, and mapped to the ACRL competencies. Data from{" "}
            <a
              href="https://clarivate.com/pulse-of-the-library/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80 transition-opacity"
              style={{ color: "#0F6E56" }}
            >
              Pulse of the Library 2026
            </a>
            , Clarivate.
          </p>
        </div>
      </section>

      {/* ─── Choose your path ──────────────────────────────────────────────── */}
      <section className="py-[72px] sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rv text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-stone-900 mb-3">
              Start with your role
            </h2>
            <p className="text-stone-500 text-base leading-relaxed text-pretty max-w-xl mx-auto">
              The curriculum covers both paths. Pick the one that matches your work and we&apos;ll highlight your recommended modules across the curriculum - or browse everything.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {audiencePaths.map((path, i) => (
              <div key={path.id} className={`rv ${i === 0 ? "w2" : "w3"}`}>
              <div
                className="role-card lift group relative h-full border p-7 cursor-pointer"
                style={{
                  borderColor: path.borderColor,
                  backgroundColor: path.lightColor,
                  "--rc": path.color,
                } as React.CSSProperties}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-0.5"
                  style={{ color: path.color }}
                >
                  {path.subtitle}
                </p>
                <h3 className="text-xl sm:text-[22px] font-bold tracking-[-0.025em] text-stone-900 mb-2">
                  {path.label}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-4">
                  {path.description}
                </p>
                <p className="text-xs text-stone-500 mb-5">
                  <span className="font-semibold" style={{ color: path.color }}>
                    Your track:
                  </span>{" "}
                  {path.modules.length} modules — {path.modules.join(", ")}
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Link
                    href={`/curriculum?role=${path.id}`}
                    className="stretched-link arrow-nudge inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                    style={{ color: path.color }}
                  >
                    See your recommended path
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href={`/module/${path.startModule}`}
                    className="relative z-[2] text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors"
                  >
                    Start with Module 01
                  </Link>
                </div>
              </div>
              </div>
            ))}
          </div>

          <p className="rv text-center text-sm leading-relaxed text-stone-500 mb-6 max-w-3xl mx-auto">
            Role shapes confidence. General librarians report the lowest confidence in AI of any role (3.14 out of 5), while systems librarians report the highest (3.59){" "}
            <span className="text-stone-400">- Pulse of the Library 2026</span>. Both paths here start from the same foundations, so the gap is a starting point, not a ceiling.
          </p>

          <p className="rv text-center text-sm text-stone-500">
            Not sure?{" "}
            <Link
              href="/curriculum"
              className="font-medium underline hover:text-stone-800 transition-colors"
            >
              Browse the full curriculum
            </Link>{" "}
            and choose what interests you.
          </p>
        </div>
      </section>

      {/* ─── Preview of Level 1 ────────────────────────────────────────────── */}
      <section className="py-[72px] sm:py-24 bg-stone-50 border-y border-stone-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rv flex flex-col items-start sm:flex-row sm:items-end justify-between mb-9 gap-2.5 sm:gap-4">
            <div>
              <span
                className="eyebrow-dash text-xs font-semibold uppercase mb-1.5"
                style={{ color: "#0F6E56" }}
              >
                Start here
              </span>
              <h2 className="text-2xl sm:text-[28px] sm:leading-[34px] font-bold tracking-[-0.03em] text-stone-900">
                Level 1: Foundations
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Five modules. Both audiences. Available now.
              </p>
            </div>
            <Link
              href="/level/foundations"
              className="arrow-nudge flex-shrink-0 text-sm font-medium transition-colors"
              style={{ color: "#0F6E56" }}
            >
              All 5 modules <span>→</span>
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {level1Modules.map((m, i) => (
              <div key={m.slug} className={`rv w${i + 2}`}>
                <ModuleCard module={m} />
              </div>
            ))}
          </div>

          <div className="rv text-center">
            <Link
              href="/level/foundations"
              className="btn-level inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
              style={{ backgroundColor: "#0F6E56", "--c": "#0F6E56" } as React.CSSProperties}
            >
              View all Foundations modules
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Preview of Level 2 ────────────────────────────────────────────── */}
      <section className="py-[72px] sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rv flex flex-col items-start sm:flex-row sm:items-end justify-between mb-9 gap-2.5 sm:gap-4">
            <div>
              <span
                className="eyebrow-dash text-xs font-semibold uppercase mb-1.5"
                style={{ color: "#185FA5" }}
              >
                Next step
              </span>
              <h2 className="text-2xl sm:text-[28px] sm:leading-[34px] font-bold tracking-[-0.03em] text-stone-900">
                Level 2: Applied
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Eight modules. Practical workflows for daily library work.
              </p>
            </div>
            <Link
              href="/level/applied"
              className="arrow-nudge flex-shrink-0 text-sm font-medium transition-colors"
              style={{ color: "#185FA5" }}
            >
              All 8 modules <span>→</span>
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {level2Modules.map((m, i) => (
              <div key={m.slug} className={`rv w${i + 2}`}>
                <ModuleCard module={m} />
              </div>
            ))}
          </div>

          <div className="rv text-center">
            <Link
              href="/level/applied"
              className="btn-level inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
              style={{ backgroundColor: "#185FA5", "--c": "#185FA5" } as React.CSSProperties}
            >
              View all Applied modules
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Preview of Level 3 ────────────────────────────────────────────── */}
      <section className="py-[72px] sm:py-24 bg-stone-50 border-y border-stone-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rv flex flex-col items-start sm:flex-row sm:items-end justify-between mb-9 gap-2.5 sm:gap-4">
            <div>
              <span
                className="eyebrow-dash text-xs font-semibold uppercase mb-1.5"
                style={{ color: "#854F0B" }}
              >
                Advanced
              </span>
              <h2 className="text-2xl sm:text-[28px] sm:leading-[34px] font-bold tracking-[-0.03em] text-stone-900">
                Level 3: Advanced
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Five modules. Automation, vibe coding, agentic AI, and systems integration.
              </p>
            </div>
            <Link
              href="/level/advanced"
              className="arrow-nudge flex-shrink-0 text-sm font-medium transition-colors"
              style={{ color: "#854F0B" }}
            >
              All 5 modules <span>→</span>
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {level3Modules.map((m, i) => (
              <div key={m.slug} className={`rv w${i + 2}`}>
                <ModuleCard module={m} />
              </div>
            ))}
          </div>

          <div className="rv text-center">
            <Link
              href="/level/advanced"
              className="btn-level inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
              style={{ backgroundColor: "#854F0B", "--c": "#854F0B" } as React.CSSProperties}
            >
              View all Advanced modules
            </Link>
          </div>
        </div>
      </section>

      {/* ─── About the author ──────────────────────────────────────────────── */}
      <section className="py-[72px] sm:py-24 border-t border-stone-100 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="rv tri-rule text-2xl sm:text-[28px] sm:leading-[34px] font-bold tracking-[-0.03em] text-balance text-stone-900 mb-4">
            Taught by someone who actually works in a library
          </h2>
          <p className="rv w2 text-stone-600 sm:text-[17px] leading-[1.7] text-pretty mb-3">
            I hold an MLIS and work as a library associate at a community college in St. Louis. I used these tools throughout my graduate research and MLIS coursework, and I use them every day in the work of the circulation desk.
          </p>
          <p className="rv w3 text-stone-600 sm:text-[17px] leading-[1.7] text-pretty mb-6">
            This curriculum is what I wish had existed when I started. It&apos;s mapped to the ACRL AI Competencies framework - not because the framework makes things credible, but because the framework is actually good and deserves to be taught well.
          </p>
          <Link
            href="/about"
            className="rv w4 arrow-nudge inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: "#0F6E56" }}
          >
            More about this project <span>→</span>
          </Link>
        </div>
      </section>

      <RecentUpdates />

      {/* ─── Contact CTA ─────────────────────────────────────────────────── */}
      <section className="py-[72px] sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ContactPanel
            title="Contact Us"
            intro="Questions, speaking inquiries, or collaboration - send a message."
          />
        </div>
      </section>
    </>
  );
}
