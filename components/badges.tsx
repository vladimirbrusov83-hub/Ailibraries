import type { Audience, Level, AcrlCompetency } from "@/lib/types";

const audienceConfig: Record<
  Audience,
  { label: string; classes: string }
> = {
  practicing: {
    label: "Practicing Librarian",
    classes: "bg-violet-50 text-violet-700 border border-violet-200",
  },
  digital: {
    label: "Digital Librarian",
    classes: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  },
  both: {
    label: "All Librarians",
    classes: "bg-stone-100 text-stone-600 border border-stone-200",
  },
};

const levelConfig: Record<
  Level,
  { label: string; bg: string; text: string; border: string }
> = {
  foundations: {
    label: "Level 1: Foundations",
    bg: "#E1F5EE",
    text: "#0F6E56",
    border: "#b2e8d4",
  },
  applied: {
    label: "Level 2: Applied",
    bg: "#E6F1FB",
    text: "#185FA5",
    border: "#b8d5f2",
  },
  advanced: {
    label: "Level 3: Advanced",
    bg: "#FAEEDA",
    text: "#854F0B",
    border: "#f0d4a0",
  },
};

const acrlConfig: Record<AcrlCompetency, { label: string; short: string }> = {
  ethics: { label: "Ethical Considerations", short: "Ethics" },
  knowledge: { label: "Knowledge & Understanding", short: "Knowledge" },
  analysis: { label: "Analysis & Evaluation", short: "Analysis" },
  application: { label: "Use & Application", short: "Application" },
};

export function AudienceBadge({
  audience,
  size = "sm",
}: {
  audience: Audience;
  size?: "xs" | "sm";
}) {
  const config = audienceConfig[audience];
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${config.classes} ${
        size === "xs" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
      }`}
    >
      {config.label}
    </span>
  );
}

export function LevelBadge({
  level,
  size = "sm",
}: {
  level: Level;
  size?: "xs" | "sm";
}) {
  const config = levelConfig[level];
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${
        size === "xs" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
      }`}
      style={{
        backgroundColor: config.bg,
        color: config.text,
        borderColor: config.border,
      }}
    >
      {config.label}
    </span>
  );
}

export function AcrlBadge({
  competency,
  size = "sm",
}: {
  competency: AcrlCompetency;
  size?: "xs" | "sm";
}) {
  const config = acrlConfig[competency];
  return (
    <span
      className={`inline-flex items-center rounded-md bg-stone-100 text-stone-600 font-medium ${
        size === "xs" ? "px-1.5 py-0.5 text-xs" : "px-2 py-0.5 text-xs"
      }`}
      title={config.label}
    >
      {config.short}
    </span>
  );
}

export function RecommendedBadge({ role }: { role: "practicing" | "digital" }) {
  const classes =
    role === "practicing"
      ? "bg-violet-100 text-violet-800 border border-violet-200"
      : "bg-cyan-100 text-cyan-800 border border-cyan-200";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${classes}`}
    >
      <span aria-hidden="true">★</span>
      <span>Recommended for you</span>
    </span>
  );
}

export function GapBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium"
      style={{ backgroundColor: "#FAEEDA", color: "#854F0B" }}
      title="An emerging area in library AI practice"
    >
      <span aria-hidden="true">★</span>
      <span>Emerging topic</span>
    </span>
  );
}

export function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-500 border border-stone-200">
      Coming Soon
    </span>
  );
}
