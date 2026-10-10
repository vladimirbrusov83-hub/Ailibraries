import Link from "next/link";
import LogoGlyph from "@/components/logo-glyph";
import { siteUpdates } from "@/content/modules";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const [ly, lm, ld] = siteUpdates[0].date.split("-").map(Number);
const lastUpdated = `${MONTHS[lm - 1]} ${ld}, ${ly}`;

export default function Footer() {
  return (
    <footer className="site-only border-t border-stone-200 bg-stone-50 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="logo-mark w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: "#0F6E56" }}
                aria-hidden="true"
              >
                <LogoGlyph />
              </span>
              <span className="font-semibold text-stone-900 text-sm">
                AI for Academic Libraries
              </span>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed">
              A learning portal aligned with the ACRL AI Competencies (2025) and ALA&apos;s AI Guidance (2026).
            </p>
          </div>

          {/* Curriculum links */}
          <div>
            <h2 className="text-sm font-semibold text-stone-700 mb-3">
              Curriculum
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/level/foundations"
                  className="foot-link text-sm text-stone-500"
                >
                  Level 1: Foundations
                </Link>
              </li>
              <li>
                <Link
                  href="/level/applied"
                  className="foot-link text-sm text-stone-500"
                >
                  Level 2: Applied
                </Link>
              </li>
              <li>
                <Link
                  href="/level/advanced"
                  className="foot-link text-sm text-stone-500"
                >
                  Level 3: Advanced
                </Link>
              </li>
              <li>
                <Link
                  href="/curriculum"
                  className="foot-link text-sm text-stone-500"
                >
                  Full Curriculum
                </Link>
              </li>
            </ul>
          </div>

          {/* Site links */}
          <div>
            <h2 className="text-sm font-semibold text-stone-700 mb-3">Site</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="foot-link text-sm text-stone-500"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="foot-link text-sm text-stone-500"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="foot-link text-sm text-stone-500"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-fine mt-10 pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-stone-500">
            Aligned with{" "}
            <a
              href="https://www.ala.org/acrl/standards/ai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-stone-600 transition-colors"
            >
              ACRL AI Competencies for Academic Library Workers (2025)
            </a>
            ,{" "}
            <a
              href="https://www.ala.org/tools/standards-and-guidelines/guidance-use-artificial-intelligence-libraries"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-stone-600 transition-colors"
            >
              ALA AI Guidance (2026)
            </a>
            , and{" "}
            <a
              href="https://www.arl.org/resources/research-libraries-guiding-principles-for-artificial-intelligence/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-stone-600 transition-colors"
            >
              ARL Guiding Principles (2024)
            </a>
            . An independent project, not affiliated with or endorsed by ACRL, ALA, ARL, or Anthropic.
          </p>
          <p className="text-xs text-stone-500">
            Content last updated{" "}
            <Link href="/#updates">{lastUpdated}</Link>
            {" · "}© 2026 Iuliia Brusova.{" "}
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-stone-600 transition-colors"
            >
              CC BY-NC-SA 4.0
            </a>
          </p>
        </div>

        <div className="foot-fine mt-6 pt-5 border-t border-stone-100">
          <p className="text-xs text-stone-500 leading-relaxed max-w-3xl">
            This course was intentionally developed using an AI-assisted authoring process - the same kind of directed, human-led AI use it teaches. The author designed the framework and guided the content throughout. That process is itself an example of the{" "}
            <Link
              href="/module/what-is-ai-for-librarians"
              className="underline hover:text-stone-600 transition-colors"
            >
              augmentation mode described in Module 01
            </Link>
            : the author as the expert, AI as the writing partner.
          </p>
        </div>
      </div>
    </footer>
  );
}
