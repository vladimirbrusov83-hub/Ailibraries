import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSE_ANNOUNCED } from "@/lib/course";

export const metadata: Metadata = {
  title: "The Course (Coming Soon)",
  description:
    "A free, self-paced course edition of the AI for Academic Libraries curriculum: 18 modules with interactive visuals, 144 quiz questions, a final exam and a verifiable certificate. Coming soon.",
};

const GRADIENT = "linear-gradient(135deg, #0F6E56 0%, #185FA5 55%, #854F0B 100%)";

const features = [
  {
    n: "18",
    title: "Modules, each with an interactive visual",
    body: "The same three-level path as the free curriculum - Foundations, Applied, Advanced - with a hands-on visual in every module that shows the idea instead of only describing it.",
    color: "#0F6E56",
  },
  {
    n: "144",
    title: "Quiz questions with explained answers",
    body: "Eight questions at the end of each module. Every answer comes with a short explanation, so a wrong choice still teaches you something.",
    color: "#185FA5",
  },
  {
    n: "1",
    title: "Final exam drawn from every module",
    body: "Thirty questions drawn from a larger pool, with at least one from each module. Pass with 80% or more. If you miss, you can try again the next day.",
    color: "#854F0B",
  },
  {
    n: "✓",
    title: "Certificate with a public verification link",
    body: "Pass the final and you receive a certificate with its own link, so a supervisor or hiring committee can confirm it is real.",
    color: "#6d28d9",
  },
];

const levels = [
  {
    label: "Level 1: Foundations",
    count: "5 modules",
    body: "What AI actually is, talking to it effectively, picking the right tool, ethics and copyright, and critically evaluating what it gives you.",
    color: "#0F6E56",
    light: "#E1F5EE",
    href: "/level/foundations",
  },
  {
    label: "Level 2: Applied",
    count: "8 modules",
    body: "Research support, reference and instruction, metadata, digital collections, vendor evaluation, making the case to administration, and AI and library labor.",
    color: "#185FA5",
    light: "#E6F0FA",
    href: "/level/applied",
  },
  {
    label: "Level 3: Advanced",
    count: "5 modules",
    body: "Automating repetitive tasks, agentic AI, vibe coding for librarians, systems integration, and your own AI strategy.",
    color: "#854F0B",
    light: "#FBF0E1",
    href: "/level/advanced",
  },
];

export default function CoursePage() {
  if (!COURSE_ANNOUNCED) notFound();
  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="text-white" style={{ background: GRADIENT }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/30 text-xs font-semibold uppercase tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse" aria-hidden="true" />
            Coming soon
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            AI for Academic Libraries: The Course
          </h1>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-8">
            The full curriculum as a free, self-paced course - with quizzes, a final exam and a certificate you can show your library.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <span
              className="inline-flex items-center justify-center gap-2 bg-white/90 text-stone-700 font-semibold px-6 py-3 rounded-xl text-base cursor-not-allowed"
              aria-disabled="true"
            >
              Enrollment opens soon
            </span>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/60 hover:bg-white/10 font-medium px-6 py-3 rounded-xl text-base transition-colors"
            >
              Tell me when it opens
            </Link>
          </div>
          <p className="text-sm text-white/80 mt-5">Free. Sign in with email or Google.</p>
        </div>
      </section>

      {/* ─── What you get ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">What the course adds</h2>
            <p className="text-stone-500 text-base max-w-2xl mx-auto">
              The free curriculum stays free and open on this site. The course wraps the same content in a structure that checks what you learned and gives you something to show for it.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-stone-200 p-6">
                <span className="block text-3xl font-bold mb-2" style={{ color: f.color }}>
                  {f.n}
                </span>
                <h3 className="text-lg font-semibold text-stone-900 mb-1.5">{f.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Levels ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-stone-50 border-y border-stone-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">Three levels, one path</h2>
            <p className="text-stone-500 text-base max-w-2xl mx-auto">
              Mapped to the ACRL AI Competencies for Academic Library Workers (2025) and aligned with ALA&apos;s AI Guidance (2026).
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {levels.map((l) => (
              <div
                key={l.label}
                className="rounded-xl border p-6 bg-white"
                style={{ borderColor: l.light, borderTop: `4px solid ${l.color}` }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: l.color }}>
                  {l.count}
                </p>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{l.label}</h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-4">{l.body}</p>
                <Link href={l.href} className="text-sm font-semibold" style={{ color: l.color }}>
                  Read the modules now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8 text-center">How it will work</h2>
          <ol className="space-y-5">
            {[
              ["Create a free account", "Sign in with email and password or with Google. Your progress is saved across devices."],
              ["Work through the modules", "Read each module at your own pace and take its quiz when you are ready."],
              ["Take the final exam", "Once you have passed every module quiz, the final exam unlocks."],
              ["Get your certificate", "Pass the final and download a certificate with a public verification link."],
            ].map(([title, body], i) => (
              <li key={title} className="flex gap-4">
                <span
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: GRADIENT }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-stone-900">{title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed mt-0.5">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Closing CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-t border-stone-100 bg-stone-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-stone-900 mb-3">Don&apos;t want to wait?</h2>
          <p className="text-stone-600 leading-relaxed mb-6">
            Every module is already free to read on this site. Start reading now and the course will feel like a review when it opens.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/level/foundations"
              className="text-white font-semibold px-6 py-3 rounded-xl text-base"
              style={{ backgroundColor: "#0F6E56" }}
            >
              Start with Level 1: Foundations
            </Link>
            <Link
              href="/contact"
              className="border border-stone-300 text-stone-700 hover:border-stone-400 font-medium px-6 py-3 rounded-xl text-base"
            >
              Ask a question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
