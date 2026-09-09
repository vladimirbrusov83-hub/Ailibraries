import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources - AI for Academic Libraries",
  description:
    "Curated resources for academic librarians learning AI - official frameworks, active communities, practical tools, and verified research. Updated regularly.",
};

const resourceSections = [
  {
    id: "frameworks",
    title: "Official Frameworks & Standards",
    description: "The documents that ground professional practice",
    resources: [
      {
        title: "ACRL AI Competencies for Academic Library Workers",
        org: "Association of College and Research Libraries",
        date: "October 2025",
        url: "https://www.ala.org/acrl/standards/ai",
        description:
          "The foundational professional framework. Defines four competency areas (Ethical Considerations, Knowledge & Understanding, Analysis & Evaluation, Use & Application) and five guiding mindsets. Sub-competency level detail makes it actionable.",
        tag: "Essential",
        tagColor: "#0F6E56",
        tagBg: "#E1F5EE",
      },
      {
        title: "Guidance on the Use of Artificial Intelligence in Libraries",
        org: "American Library Association",
        date: "2026",
        url: "https://www.ala.org/tools/standards-and-guidelines/guidance-use-artificial-intelligence-libraries",
        description:
          "ALA's values-based framework for library AI, built on six core values: Public Good, Intellectual Freedom, Privacy, Sustainability, Diversity/Equity/Inclusion/Access, and Labor. Directs libraries to treat AI output as drafts needing human review, prohibits entering patron data into unapproved tools, and provides a concrete vendor data-review checklist. The anchor for the ethics, privacy, discovery, and vendor-evaluation modules in this curriculum.",
        tag: "Essential",
        tagColor: "#0F6E56",
        tagBg: "#E1F5EE",
      },
      {
        title: "Research Libraries Guiding Principles for Artificial Intelligence",
        org: "Association of Research Libraries",
        date: "April 2024",
        url: "https://www.arl.org/resources/research-libraries-guiding-principles-for-artificial-intelligence/",
        description:
          "Seven guiding principles including the essential 'No Human, No AI' - consequential decisions must not be delegated entirely to AI. Required reading for anyone developing library AI policy. Still the April 2024 edition with no revision issued; ARL's newer AI work appears below in the 2026 workshop report and quick poll.",
        tag: "Essential",
        tagColor: "#0F6E56",
        tagBg: "#E1F5EE",
      },
      {
        title: "Strategic Implications of AI Futures for Research Libraries",
        org: "Karen Estlund & Cynthia Hudson Vitale \u00b7 ARL + CNI \u00b7 CC BY 4.0",
        date: "March 2026",
        url: "https://doi.org/10.29242/report.futurescape2026",
        description:
          "Scenario-planning report stress-testing library strategy against four divergent 2035 AI futures, with a year-later scan of what libraries have actually done. Its four near-term priorities: invest in the workforce now, leverage unique collections, lead on governance and ethics, and build partnerships. Names agentic AI governance, vendor-embedded AI features, and provenance tracking as the least developed areas in practice. Openly licensed and free to quote.",
        tag: "Essential",
        tagColor: "#0F6E56",
        tagBg: "#E1F5EE",
      },
      {
        title: "ACRL Framework for Information Literacy",
        org: "Association of College and Research Libraries",
        date: "2016 (still current)",
        url: "https://www.ala.org/acrl/standards/ilframework",
        description:
          "Not AI-specific, but directly applicable to AI literacy instruction. The six frames provide an existing vocabulary for teaching critical evaluation of AI output.",
        tag: "Reference",
        tagColor: "#57534e",
        tagBg: "#f5f5f4",
      },
    ],
  },
  {
    id: "courses",
    title: "Courses & Curricula",
    description: "Free courses for building AI fluency and teaching AI literacy",
    resources: [
      {
        title: "AI Fluency: Framework & Foundations",
        org: "Rick Dakan & Joseph Feller · Anthropic Academy · CC BY-NC-SA 4.0",
        date: "2025",
        url: "https://anthropic.skilljar.com/ai-fluency-framework-foundations",
        description:
          "A free 12-lesson course built around the 4D Framework for human-AI collaboration: Delegation, Description, Discernment, and Diligence. Tool-agnostic and designed to remain useful as AI evolves - not a list of prompts that will be outdated next month. The three-mode model (Automation, Augmentation, Agency) and the product/process/performance layers from this course are referenced throughout this curriculum. Full course with exercises and certificate at Anthropic Academy; video-only access via the YouTube playlist.",
        tag: "Free",
        tagColor: "#0F6E56",
        tagBg: "#E1F5EE",
      },
    ],
  },
  {
    id: "communities",
    title: "Communities & Ongoing Learning",
    description: "Where the conversation is happening",
    resources: [
      {
        title: "LibTech Insights (LTI)",
        org: "Clarivate / Choice",
        date: null,
        url: "https://www.choice360.org/libtech-insights/",
        description:
          "The best continuous source for AI in libraries news and analysis. Weekly content. The Clarivate partnership with ACRL/Choice means strong institutional grounding.",
        tag: "Follow",
        tagColor: "#185FA5",
        tagBg: "#E6F1FB",
      },
      {
        title: "OCUL AI Tools for Academic Libraries Series",
        org: "Ontario Council of University Libraries + LibTech Insights",
        date: "Launched August 2025",
        url: "https://www.choice360.org/libtech-insights/category/oculs-ai-tools-for-academic-libraries/",
        description:
          "Bimonthly blog posts evaluating AI tools for library work. Practical, current, neutral tone. Individual installments cover research assistants, speech-to-text, coding tools, task management, and more.",
        tag: "Follow",
        tagColor: "#185FA5",
        tagBg: "#E6F1FB",
      },
      {
        title: "AIRUS: AI in Reference & User Services Interest Group",
        org: "ALA / RUSA",
        date: null,
        url: "https://www.ala.org/rusa/sections/brass/brasspubs/rusq/rusqissues/rusqindex",
        description:
          "The professional interest group specifically for AI in reference and user services. Programming, discussions, and community for practitioners doing this work.",
        tag: "Community",
        tagColor: "#6d28d9",
        tagBg: "#f5f3ff",
      },
      {
        title: "Pulse of the Library Survey",
        org: "Clarivate",
        date: "Annual - most recent: 2026",
        url: "https://clarivate.com/pulse-of-the-library/",
        description:
          "Annual global survey of library technology adoption, now in its third year. The authoritative benchmark data for AI adoption rates, training gaps, and institutional confidence. Key 2026 findings (n = 1,876): librarian confidence has stalled at 3.2 out of 5, unchanged from 2025; 33% of libraries remain at the exploration and evaluation stage and only 3% are in active implementation; 49% have no defined strategic position on AI; 30% report no institutional focus on AI literacy, and 50% of librarians learn AI on their own. Top concerns are now privacy and security (64%), misinformation (60%), and research and academic integrity (53%).",
        tag: "Data",
        tagColor: "#57534e",
        tagBg: "#f5f5f4",
      },
      {
        title: "ARL AI Quick Poll",
        org: "Association of Research Libraries",
        date: "Fielded January 2026, published May 2026",
        url: "https://www.arl.org/blog/tracking-the-ai-evolution-in-research-libraries-findings-from-arls-2026-ai-quick-poll/",
        description:
          "Snapshot of where ARL member libraries stand: implementation is outpacing governance, only a minority report formal enforced generative AI policies, and staff attitudes vary within teams rather than splitting into camps. Asked what support they need, leaders named governance templates, readiness assessment tools, culture-change support, and peer examples - not more AI tools. Read as directional only: 39 completed responses from 125 member libraries, and ARL itself flags likely selection bias.",
        tag: "Data",
        tagColor: "#57534e",
        tagBg: "#f5f5f4",
      },
    ],
  },
  {
    id: "tools-research",
    title: "Tools: Research Support",
    description: "AI tools relevant to library research assistance",
    resources: [
      {
        title: "Connected Papers",
        org: "Independent",
        date: null,
        url: "https://www.connectedpapers.com",
        description:
          "Visualizes the citation network around a research paper. Not generative AI, but AI-enhanced discovery. Excellent for showing students how scholarship is connected - a strong instruction tool.",
        tag: "Free",
        tagColor: "#0F6E56",
        tagBg: "#E1F5EE",
      },
      {
        title: "Elicit",
        org: "Ought Inc.",
        date: null,
        url: "https://elicit.com",
        description:
          "AI research assistant that searches Semantic Scholar (real papers) and returns AI-summarized results. Lower hallucination risk than general AI because it grounds responses in actual search results. Strong for systematic review workflows.",
        tag: "Free tier",
        tagColor: "#0F6E56",
        tagBg: "#E1F5EE",
      },
      {
        title: "Consensus",
        org: "Consensus AI",
        date: null,
        url: "https://consensus.app",
        description:
          "Searches peer-reviewed papers and synthesizes empirical findings. Good for quick evidence checks: 'Does exercise improve sleep quality?' - returns real papers with synthesized findings. Free tier available.",
        tag: "Free tier",
        tagColor: "#0F6E56",
        tagBg: "#E1F5EE",
      },
      {
        title: "Perplexity",
        org: "Perplexity AI",
        date: null,
        url: "https://www.perplexity.ai",
        description:
          "Combines AI generation with web search and citations. Every answer includes sources. Better for factual research queries than ChatGPT. Academic mode available. Lower hallucination risk on factual questions. Free tier functional.",
        tag: "Free tier",
        tagColor: "#0F6E56",
        tagBg: "#E1F5EE",
      },
    ],
  },
  {
    id: "tools-general",
    title: "Tools: General Purpose AI",
    description: "The major tools you'll encounter and use most",
    resources: [
      {
        title: "Claude (Anthropic)",
        org: "Anthropic",
        date: null,
        url: "https://claude.ai",
        description:
          "Strong for long documents, nuanced writing, and instruction design. Handles large context windows well - paste in a full policy document and ask questions. More conservative tone by default. Claude for Work includes stronger data privacy protections.",
        tag: "Free + Paid",
        tagColor: "#57534e",
        tagBg: "#f5f5f4",
      },
      {
        title: "ChatGPT (OpenAI)",
        org: "OpenAI",
        date: null,
        url: "https://chatgpt.com",
        description:
          "Most widely used. GPT-4o is capable for most library tasks. Largest user base means the most tutorials, community examples, and third-party guidance available. Free tier rate-limited; paid tier ($20/mo) gives access to more capable models.",
        tag: "Free + Paid",
        tagColor: "#57534e",
        tagBg: "#f5f5f4",
      },
      {
        title: "Gemini (Google)",
        org: "Google",
        date: null,
        url: "https://gemini.google.com",
        description:
          "Best integration with Google Workspace - Docs, Drive, Gmail. Real advantage if your library runs on Google. Access to Google Search reduces factual errors on current-events queries. Review your institutional Google agreement for privacy terms.",
        tag: "Free + Paid",
        tagColor: "#57534e",
        tagBg: "#f5f5f4",
      },
    ],
  },
  {
    id: "tools-building",
    title: "Tools: Building Without Code",
    description: "For Level 3 - vibe coding and workflow automation",
    resources: [
      {
        title: "Lovable",
        org: "Lovable AI",
        date: null,
        url: "https://lovable.dev",
        description:
          "AI app builder for non-programmers. Describe what you want in plain language; Lovable builds a working web app. Good starting point for library tool-building. Used in Module 14.",
        tag: "Level 3",
        tagColor: "#854F0B",
        tagBg: "#FAEEDA",
      },
      {
        title: "Replit",
        org: "Replit",
        date: null,
        url: "https://replit.com",
        description:
          "Development environment with strong AI assistance. Good for iterating on small tools with AI help. Free tier available. Widely recommended in library AI literacy contexts (HKU LibGuide).",
        tag: "Level 3",
        tagColor: "#854F0B",
        tagBg: "#FAEEDA",
      },
      {
        title: "Zapier",
        org: "Zapier",
        date: null,
        url: "https://zapier.com",
        description:
          "No-code workflow automation connecting 6,000+ apps. Now includes AI actions and integrations. For library automation: connecting forms to spreadsheets, triggering emails, routing data between systems. Free tier for simple automations.",
        tag: "Level 3",
        tagColor: "#854F0B",
        tagBg: "#FAEEDA",
      },
      {
        title: "Make (formerly Integromat)",
        org: "Make",
        date: null,
        url: "https://www.make.com",
        description:
          "Visual workflow automation platform, more powerful than Zapier for complex workflows. Better for multi-step automations. Has strong AI integrations. Free tier available for low-volume workflows.",
        tag: "Level 3",
        tagColor: "#854F0B",
        tagBg: "#FAEEDA",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
          Resources
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed max-w-xl">
          Curated resources - official frameworks, ongoing communities, and practical tools for library AI work. No affiliate links. No sponsored content.
        </p>
      </header>

      {/* Sections */}
      {resourceSections.map((section) => (
        <section key={section.id} className="mb-14">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-stone-900 mb-1">
              {section.title}
            </h2>
            <p className="text-sm text-stone-500">{section.description}</p>
          </div>

          <div className="space-y-4">
            {section.resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block card card-hover group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="font-semibold text-stone-900 group-hover:underline text-sm leading-snug">
                        {resource.title}
                      </h3>
                      <span
                        className="flex-shrink-0 px-2 py-0.5 rounded-md text-xs font-medium"
                        style={{
                          color: resource.tagColor,
                          backgroundColor: resource.tagBg,
                        }}
                      >
                        {resource.tag}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mb-2">
                      {resource.org}
                      {resource.date && ` · ${resource.date}`}
                    </p>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {resource.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-stone-300 group-hover:text-stone-500 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}

      {/* Suggest a resource */}
      <div className="rounded-xl border border-stone-200 bg-stone-50 p-6 text-center">
        <h2 className="font-semibold text-stone-900 mb-2">
          Know a resource that should be here?
        </h2>
        <p className="text-sm text-stone-600 mb-4">
          This list is kept current by ongoing professional reading and community input.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm font-medium"
          style={{ color: "#0F6E56" }}
        >
          Contact us to suggest resources →
        </Link>
      </div>
    </div>
  );
}
