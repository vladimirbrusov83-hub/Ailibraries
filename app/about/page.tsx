import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About - AI for Academic Libraries",
  description:
    "About Yulia Brusova - library associate at St. Louis Community College, MLIS, and creator of this ACRL-aligned AI curriculum for library professionals.",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yulia Brusova",
  jobTitle: "Library Associate",
  worksFor: {
    "@type": "EducationalOrganization",
    name: "St. Louis Community College",
  },
  alumniOf: [
    { "@type": "EducationalOrganization", name: "Valdosta State University" },
    { "@type": "EducationalOrganization", name: "University of Missouri-Columbia" },
    {
      "@type": "EducationalOrganization",
      name: "State Conservatory, Nizhny Novgorod, Russia",
    },
  ],
  url: "https://ai-in-academic-libraries.vercel.app/about",
  image: "https://ai-in-academic-libraries.vercel.app/yulia-brusova.jpg",
  sameAs: [
    "https://ai-in-academic-libraries.vercel.app",
    "https://www.linkedin.com/in/yulia-brusova-24804641/",
  ],
  knowsAbout: [
    "AI in academic libraries",
    "ACRL AI Competencies",
    "Information literacy",
    "Library science",
    "Vibe coding",
  ],
};

const education = [
  {
    degree: "Master of Library and Information Science (MLIS), 2026",
    school: "Valdosta State University — ALA-accredited program",
  },
  {
    degree: "Master of Arts in Musicology, 2016",
    school: "University of Missouri–Columbia",
  },
  {
    degree: "Bachelor’s and Master’s Degrees in Music Education, 2011",
    school: "State Conservatory, Nizhny Novgorod, Russia",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
          About this portal
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed">
          Built from everyday library experience - at the desk, not from a distance.
        </p>
      </header>

      {/* Main story */}
      <article className="prose-library mb-12">
        <div className="not-prose mb-8 flex flex-col sm:flex-row sm:items-start gap-6">
          <div className="shrink-0">
            <h2 className="text-2xl font-semibold leading-tight text-stone-900 m-0 mb-4">
              Who I am
            </h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/yulia-brusova.jpg"
              alt="Yulia Brusova"
              width={176}
              height={176}
              className="w-40 sm:w-44 h-auto rounded-2xl shadow-sm"
            />
          </div>
          <div className="flex-1 min-w-0 sm:pt-[2.875rem]">
            <ul className="list-none pl-0 m-0 space-y-3">
              {education.map((item) => (
                <li key={item.degree}>
                  <span className="block font-semibold leading-snug text-stone-800">
                    {item.degree}
                  </span>
                  <span className="block text-sm leading-snug text-stone-600">
                    {item.school}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p>
          I&apos;m Yulia Brusova, a library associate at St. Louis Community College. My day-to-day work at the circulation desk keeps me in direct contact with students and with the everyday workflows that AI tools are meant to support.
        </p>
        <p>
          I started using AI seriously in 2024 - first out of curiosity, then out of a growing conviction that these tools matter for library work. I also practice vibe coding: using natural-language prompts to build functional tools without traditional programming. That hands-on experience changed how I think about AI - not as something to observe from a distance, but as something to build with, test, question, and understand from the inside.
        </p>
        <p>
          That experience led me to create this practitioner-first resource. It is grounded in real library work, candid about what AI can and cannot do, and aligned with the professional frameworks developed for this moment. My goal is to help library workers develop a critical, practical, and well-calibrated relationship with AI - one that strengthens the work they already care about.
        </p>
        <p>
          You can find me on{" "}
          <a
            href="https://www.linkedin.com/in/yulia-brusova-24804641/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-stone-700 transition-colors"
          >
            LinkedIn
          </a>
          .
        </p>

        <h2>Why this curriculum</h2>
        <p>
          The ACRL published its AI Competencies for Academic Library Workers in October 2025. It provides an important framework for understanding what library workers need to know, but a competency framework is not the same as a curriculum: it identifies the destination without necessarily showing how to get there.
        </p>
        <p>
          The Pulse of the Library survey (Clarivate, 2026), which analyzed responses from more than 1,800 librarians worldwide, found that confidence in AI concepts and terminology has stalled at an average of 3.2 out of 5, unchanged from the previous year. Thirty percent of libraries report no institutional focus on AI literacy at all, and half of librarians are building these skills independently, without dedicated time or formal training. Meanwhile, Clarivate&apos;s parallel user experience research found that 31% of students now begin a research project in a general AI assistant such as ChatGPT, Claude, or Gemini, while only 1% ask a librarian. This portal was created to help address that gap through structured, accessible, and professionally relevant learning.
        </p>
        <p>
          The curriculum moves from foundational AI literacy to practical library applications and advanced topics such as workflow automation, agentic AI, vibe coding, and library-systems integration. These advanced modules are written specifically for library practitioners, including those without programming backgrounds.
        </p>

        <h2>A practitioner&apos;s perspective</h2>
        <p>
          I write from experience, not abstraction. When I refer to the circulation desk, I mean a real environment with students asking real questions and staff managing real workflows. When I describe a process, I have used it - or something close to it - in practice.
        </p>
        <p>
          That also means being honest about failure. AI can fabricate citations, produce confidently incorrect answers, reproduce bias, and create more work when applied poorly. These limitations are not reasons to ignore AI; they are reasons to learn how to use it critically, responsibly, and with appropriate human oversight.
        </p>

        <h2>ACRL alignment</h2>
        <p>
          Every module is mapped at the sub-competency level to the{" "}
          <a
            href="https://www.ala.org/acrl/standards/ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-stone-700 transition-colors"
          >
            ACRL AI Competencies for Academic Library Workers (2025)
          </a>
          , not merely to its broad categories.
        </p>
        <p>
          The curriculum also draws on the{" "}
          <a
            href="https://www.arl.org/resources/research-libraries-guiding-principles-for-artificial-intelligence/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-stone-700 transition-colors"
          >
            ARL Guiding Principles for Artificial Intelligence (2024)
          </a>
          , particularly the principle &ldquo;No Human, No AI,&rdquo; and aligns with{" "}
          <a
            href="https://www.ala.org/tools/standards-and-guidelines/guidance-use-artificial-intelligence-libraries"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-stone-700 transition-colors"
          >
            ALA&apos;s Guidance on the Use of Artificial Intelligence in Libraries
          </a>
          . ALA&apos;s six core values - Public Good, Intellectual Freedom, Privacy, Sustainability, DEIA, and Labor - inform the modules addressing ethics, privacy, discovery, vendor evaluation, and library labor.
        </p>
        <p>
          Together, these frameworks connect practical AI skills with the professional values that should guide their use.
        </p>
        <p className="text-sm text-stone-400 italic">
          Modules and content are subject to change and ongoing updates as the AI landscape evolves.
        </p>

        <h2>Who this portal is for</h2>
        <p>
          This portal is designed primarily for academic library workers in community colleges, liberal arts colleges, and research universities. Its examples and workflows address areas such as circulation, reference, instruction, research support, metadata, digital collections, discovery, and library systems.
        </p>
        <p>
          Library professionals in public, school, and other settings may also find parts of the curriculum useful, particularly the foundational modules, although the primary context remains academic librarianship.
        </p>

        <h2>What&apos;s next</h2>
        <p>
          All 18 modules are now available, including the complete advanced track on workflow automation, agentic AI, vibe coding, systems integration, and AI strategy, as well as an applied module on AI, labor, and the library worker.
        </p>
        <p>
          Because AI tools, policies, and professional guidance continue to change, the curriculum is reviewed and updated over time. If you have a question, correction, or suggestion, please use the contact form.
        </p>
      </article>

      {/* Affiliation note */}
      <div className="rounded-xl border border-stone-200 bg-stone-50 p-5 mb-10">
        <p className="text-sm text-stone-600 leading-relaxed">
          <strong className="text-stone-800">No vendor relationships.</strong>{" "}
          No affiliate links. No sponsored content. Tool mentions reflect genuine evaluation for library use - the same evaluation I&apos;d apply professionally.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/level/foundations"
          className="flex-1 text-center px-5 py-3 rounded-xl font-semibold text-white text-sm"
          style={{ backgroundColor: "#0F6E56" }}
        >
          Start with Level 1: Foundations
        </Link>
        <Link
          href="/curriculum"
          className="flex-1 text-center px-5 py-3 rounded-xl font-medium border border-stone-300 text-stone-700 hover:border-stone-400 text-sm bg-white"
        >
          Browse the full curriculum
        </Link>
        <Link
          href="/contact"
          className="flex-1 text-center px-5 py-3 rounded-xl font-medium border border-stone-300 text-stone-700 hover:border-stone-400 text-sm bg-white"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
