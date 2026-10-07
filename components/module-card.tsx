import Link from "next/link";
import type { Module } from "@/lib/types";
import { audienceState, type RoleFilter } from "@/lib/audience";
import {
  AudienceBadge,
  AcrlBadge,
  GapBadge,
  ComingSoonBadge,
  RecommendedBadge,
} from "@/components/badges";
import CompletionCheck from "@/components/completion-check";

const moduleLaunchDates: Record<number, string> = {
  12: "June 8",
  13: "June 15",
  14: "June 22",
  17: "July 6",
};

const levelColors: Record<
  string,
  { border: string; hoverBorder: string; numBg: string; numText: string }
> = {
  foundations: {
    border: "border-stone-200 hover:border-green-300",
    hoverBorder: "hover:shadow-green-50",
    numBg: "#E1F5EE",
    numText: "#0F6E56",
  },
  applied: {
    border: "border-stone-200 hover:border-blue-300",
    hoverBorder: "hover:shadow-blue-50",
    numBg: "#E6F1FB",
    numText: "#185FA5",
  },
  advanced: {
    border: "border-stone-200 hover:border-amber-300",
    hoverBorder: "hover:shadow-amber-50",
    numBg: "#FAEEDA",
    numText: "#854F0B",
  },
};

export default function ModuleCard({
  module,
  role = null,
}: {
  module: Module;
  role?: RoleFilter | null;
}) {
  const colors = levelColors[module.level];
  const isLocked = module.status === "coming-soon";

  const state = audienceState(module, role);
  // Ring color literals must live in this scanned file so Tailwind does not purge them.
  const recommendedRing =
    state === "recommended" && role
      ? role === "practicing"
        ? "ring-2 ring-offset-1 ring-violet-400"
        : "ring-2 ring-offset-1 ring-cyan-400"
      : "";
  const mutedClass = state === "muted" ? "opacity-60" : "";

  const cardContent = (
    <div
      className={`card mc-refined ${colors.border} ${colors.hoverBorder} h-full flex flex-col ${recommendedRing}`}
      style={{ "--lvl": colors.numText } as React.CSSProperties}
    >
      {/* Header row */}
      <div className="flex items-start gap-4 mb-4">
        <span
          className="mc-num flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
          style={{ backgroundColor: colors.numBg, color: colors.numText }}
          aria-hidden="true"
        >
          {String(module.id).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-stone-900 text-base leading-snug mb-2">
            {module.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {state === "recommended" && role ? (
              <RecommendedBadge role={role} />
            ) : (
              <AudienceBadge audience={module.audience} size="xs" />
            )}
            {module.isGap && <GapBadge />}
            {isLocked && <ComingSoonBadge />}
            {!isLocked && <CompletionCheck slug={module.slug} />}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-stone-600 leading-relaxed mb-4 flex-1">
        {module.description}
      </p>

      {/* ACRL badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {module.acrlCompetencies.map((c) => (
          <AcrlBadge key={c} competency={c} size="xs" />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
        <span className="text-xs text-stone-400">
          {module.estimatedMinutes} min
        </span>
        {isLocked ? (
          <span className="text-xs text-stone-400 font-medium">
            {moduleLaunchDates[module.id] ? `Available ${moduleLaunchDates[module.id]}` : "Contact us →"}
          </span>
        ) : (
          <span
            className="arrow-nudge text-xs font-medium"
            style={{ color: colors.numText }}
          >
            Read module <span>→</span>
          </span>
        )}
      </div>
    </div>
  );

  if (isLocked) {
    return (
      <Link
        href="/contact"
        className={`block h-full opacity-85 hover:opacity-100 transition-opacity ${mutedClass}`}
        aria-label={`${module.title} - coming soon. Contact us for more information.`}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <Link
      href={`/module/${module.slug}`}
      className={`block h-full transition-opacity ${mutedClass}`}
      aria-label={`Read module: ${module.title}`}
    >
      {cardContent}
    </Link>
  );
}
