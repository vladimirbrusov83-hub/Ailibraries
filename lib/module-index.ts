import { modules } from "@/content/modules";
import { slugify } from "@/lib/slugify";
import type { Audience, Level } from "@/lib/types";

// A slim, ordered copy of the module list for app screens (no lesson text).
export type ModuleSummary = {
  id: number;
  slug: string;
  title: string;
  level: Level;
  audience: Audience;
  minutes: number;
  sections: { id: string; heading: string }[];
};

export function getModuleIndex(): ModuleSummary[] {
  return modules
    .filter((m) => m.status === "published")
    .sort((a, b) => a.id - b.id)
    .map((m) => ({
      id: m.id,
      slug: m.slug,
      title: m.title,
      level: m.level,
      audience: m.audience,
      minutes: m.estimatedMinutes,
      sections: (m.content?.sections ?? []).map((s) => ({ id: slugify(s.heading), heading: s.heading })),
    }));
}

export const levelAccent: Record<Level, string> = {
  foundations: "#0F6E56",
  applied: "#185FA5",
  advanced: "#854F0B",
};

export const levelShort: Record<Level, string> = {
  foundations: "Foundations",
  applied: "Applied",
  advanced: "Advanced",
};

export const pad2 = (n: number) => String(n).padStart(2, "0");
