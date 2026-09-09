import type { Metadata } from "next";
import Link from "next/link";
import { modules, levelMeta } from "@/content/modules";
import ModuleCard from "@/components/module-card";
import ContactForm from "@/components/contact-form";

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
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-xs font-medium mb-6" style={{ color: "#0F6E56" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
            Aligned with ACRL AI Competencies (2025) &amp; ALA AI Guidance (2026)
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-3">
            AI for Academic Libraries
          </h1>

          <p className="text-base font-semibold mb-5" style={{ color: "#0F6E56" }}>
            The leading AI knowledge portal for library professionals.
          </p>

          <p className="text-lg sm:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto mb-8">
            A structured learning path from AI literacy to building your own tools - mapped to ACRL AI Competencies (2025), aligned with ALA&apos;s AI Guidance (2026), and grounded in the 4D Framework from Anthropic&apos;s{" "}
            <a
              href="https://anthropic.skilljar.com/ai-fluency-framework-foundations"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80 transition-opacity"
              style={{ color: "#0F6E56" }}
            >
              AI Fluency course
            </a>
            .
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/level/foundations"
              className="btn-primary text-white font-semibold px-6 py-3 rounded-xl text-base"
              style={{ backgroundColor: "#0F6E56" }}
            >
              Start with Level 1: Foundations
            </Link>
            <Link
              href="/curriculum"
              className="btn-outline border-stone-300 text-stone-700 hover:border-stone-400 font-medium px-6 py-3 rounded-xl text-base"
            >
              Browse the full curriculum
            </Link>
          </div>

          <p className="text-xs text-stone-400 mt-4">
            Modules are subject to change as the field evolves.
          </p>

          <p className="text-lg sm:text-2xl font-medium text-stone-700 leading-relaxed text-balance max-w-2xl mx-auto mt-10">
            The free curriculum that turns the{" "}
            <span className="font-semibold text-stone-900">ACRL AI Competencies</span> and{" "}
            <span className="font-semibold text-stone-900">ALA&apos;s AI guidance</span> into skills you can use.
          </p>
        </div>
      </section>

      {/* ─── Social proof bar ──────────────────────────────────────────────── */}
      <section className="border-b border-stone-100 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-stone-900">30+</p>
              <p className="text-sm text-stone-500 mt-0.5">
                countries reached. An international resource, used in the United States, India, Egypt, Canada, United Kingdom, Kenya, United Arab Emirates, Kazakhstan, Bulgaria, and more.
              </p>
            </div>
            <div className="sm:border-x border-stone-200">
              <p className="text-2xl font-bold text-stone-900">1000+</p>
              <p className="text-sm text-stone-500 mt-0.5">
                librarians have used this curriculum to date
              </p>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-medium mb-1" style={{ backgroundColor: "#E1F5EE", borderColor: "#b2e8d4", color: "#0F6E56" }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ACRL Aligned
              </div>
              <p className="text-sm text-stone-500">
                Sub-competency level mapping across all 18 modules
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why this exists: 2026 evidence ───────────────────────────────── */}
      <section className="bg-white border-b border-stone-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
              Why this exists
            </h2>
            <p className="text-stone-500 text-base max-w-2xl mx-auto">
              Library users have moved faster than library instruction. The 2026 sector data shows the gap is not willingness - it is structured support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="rounded-xl border border-stone-200 p-5">
              <p className="text-3xl font-bold text-stone-900">31%</p>
              <p className="text-sm text-stone-600 leading-relaxed mt-2">
                of students start a research project in a general AI assistant such as ChatGPT, Claude, or Gemini. Just 10% start at the library website. <span className="font-semibold text-stone-900">1% ask a librarian.</span>
              </p>
              <p className="text-xs text-stone-400 mt-3">
                Clarivate user experience research, 2026
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 p-5">
              <p className="text-3xl font-bold text-stone-900">3.2<span className="text-lg font-semibold text-stone-400"> / 5</span></p>
              <p className="text-sm text-stone-600 leading-relaxed mt-2">
                Average librarian confidence in AI concepts and terminology - unchanged since 2025. A third of libraries are still at the exploration and evaluation stage.
              </p>
              <p className="text-xs text-stone-400 mt-3">
                Pulse of the Library 2026 (n = 1,876)
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 p-5">
              <p className="text-3xl font-bold text-stone-900">30%</p>
              <p className="text-sm text-stone-600 leading-relaxed mt-2">
                of libraries report no institutional focus on AI literacy, and half of librarians are building these skills on their own.
              </p>
              <p className="text-xs text-stone-400 mt-3">
                Pulse of the Library 2026 (n = 1,876)
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-stone-500 mt-8 max-w-2xl mx-auto">
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
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
              Start with your role
            </h2>
            <p className="text-stone-500 text-base max-w-xl mx-auto">
              The curriculum covers both paths. Pick the one that matches your work and we&apos;ll highlight your recommended modules across the curriculum - or browse everything.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            {audiencePaths.map((path) => (
              <div
                key={path.id}
                className="rounded-xl border p-6 transition-all hover:shadow-md"
                style={{
                  borderColor: path.borderColor,
                  backgroundColor: path.lightColor,
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-0.5"
                  style={{ color: path.color }}
                >
                  {path.subtitle}
                </p>
                <h3 className="text-xl font-bold text-stone-900 mb-2">
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
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                    style={{ color: path.color }}
                  >
                    See your recommended path
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href={`/module/${path.startModule}`}
                    className="text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors"
                  >
                    Start with Module 01
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-stone-500 mb-6">
            Role shapes confidence. General librarians report the lowest confidence in AI of any role (3.14 out of 5), while systems librarians report the highest (3.59){" "}
            <span className="text-stone-400">- Pulse of the Library 2026</span>. Both paths here start from the same foundations, so the gap is a starting point, not a ceiling.
          </p>

          <p className="text-center text-sm text-stone-500">
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
      <section className="py-16 sm:py-20 bg-stone-50 border-y border-stone-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <span
                className="inline-block text-xs font-semibold uppercase tracking-wide mb-1.5"
                style={{ color: "#0F6E56" }}
              >
                Start here
              </span>
              <h2 className="text-2xl font-bold text-stone-900">
                Level 1: Foundations
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Five modules. Both audiences. Available now.
              </p>
            </div>
            <Link
              href="/level/foundations"
              className="flex-shrink-0 text-sm font-medium transition-colors"
              style={{ color: "#0F6E56" }}
            >
              All 5 modules →
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-6">
            {level1Modules.map((m) => (
              <ModuleCard key={m.slug} module={m} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/level/foundations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
              style={{ backgroundColor: "#0F6E56" }}
            >
              View all Foundations modules
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Preview of Level 2 ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <span
                className="inline-block text-xs font-semibold uppercase tracking-wide mb-1.5"
                style={{ color: "#185FA5" }}
              >
                Next step
              </span>
              <h2 className="text-2xl font-bold text-stone-900">
                Level 2: Applied
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Eight modules. Practical workflows for daily library work.
              </p>
            </div>
            <Link
              href="/level/applied"
              className="flex-shrink-0 text-sm font-medium transition-colors"
              style={{ color: "#185FA5" }}
            >
              All 8 modules →
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-6">
            {level2Modules.map((m) => (
              <ModuleCard key={m.slug} module={m} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/level/applied"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
              style={{ backgroundColor: "#185FA5" }}
            >
              View all Applied modules
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Preview of Level 3 ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-stone-50 border-y border-stone-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <span
                className="inline-block text-xs font-semibold uppercase tracking-wide mb-1.5"
                style={{ color: "#854F0B" }}
              >
                Advanced
              </span>
              <h2 className="text-2xl font-bold text-stone-900">
                Level 3: Advanced
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Five modules. Automation, vibe coding, agentic AI, and systems integration.
              </p>
            </div>
            <Link
              href="/level/advanced"
              className="flex-shrink-0 text-sm font-medium transition-colors"
              style={{ color: "#854F0B" }}
            >
              All 5 modules →
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-6">
            {level3Modules.map((m) => (
              <ModuleCard key={m.slug} module={m} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/level/advanced"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
              style={{ backgroundColor: "#854F0B" }}
            >
              View all Advanced modules
            </Link>
          </div>
        </div>
      </section>

      {/* ─── About the author ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-t border-stone-100 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            Taught by someone who actually works in a library
          </h2>
          <p className="text-stone-600 leading-relaxed mb-3">
            I hold an MLIS and work as a library associate at a community college in St. Louis. I used these tools throughout my graduate research and MLIS coursework, and I use them every day in the work of the circulation desk.
          </p>
          <p className="text-stone-600 leading-relaxed mb-6">
            This curriculum is what I wish had existed when I started. It&apos;s mapped to the ACRL AI Competencies framework - not because the framework makes things credible, but because the framework is actually good and deserves to be taught well.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: "#0F6E56" }}
          >
            More about this project →
          </Link>
        </div>
      </section>

      {/* ─── Contact CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <div className="bg-stone-100 border border-stone-200 rounded-2xl p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-stone-900 mb-2">Contact Us</h2>
            <p className="text-stone-500 mb-8">Questions, speaking inquiries, or collaboration - send a message.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
