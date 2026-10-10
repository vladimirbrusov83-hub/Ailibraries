import type { Module } from "@/lib/types";

// The two roles a user can actually pick. "both" is a module tag, never a selection.
export type RoleFilter = "practicing" | "digital";

export const roleMeta: Record<
  RoleFilter,
  { label: string; short: string; color: string }
> = {
  practicing: {
    label: "Practicing Librarian",
    short: "Practicing",
    color: "#6d28d9",
  },
  digital: {
    label: "Digital Librarian",
    short: "Digital",
    color: "#0369a1",
  },
};

export function isRoleFilter(value: string | null | undefined): value is RoleFilter {
  return value === "practicing" || value === "digital";
}

export type AudienceState = "recommended" | "muted" | "neutral";

export function audienceState(module: Module, role: RoleFilter | null): AudienceState {
  if (!role) return "neutral";
  if (module.audience === role) return "recommended";
  if (module.audience === "both") return "neutral";
  return "muted"; // module is tagged for the other role
}

// A role's track: every module tagged for that role or for both, in module order.
export function pathModules<T extends Pick<Module, "id" | "audience">>(modules: T[], role: RoleFilter): T[] {
  return modules
    .filter((m) => m.audience === role || m.audience === "both")
    .sort((a, b) => a.id - b.id);
}

// "01–07, 10–16, 18" from a sorted list of module ids.
export function formatModuleRanges(ids: number[]): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const out: string[] = [];
  for (let i = 0; i < ids.length; i++) {
    const start = ids[i];
    while (i + 1 < ids.length && ids[i + 1] === ids[i] + 1) i++;
    out.push(ids[i] === start ? pad(start) : `${pad(start)}–${pad(ids[i])}`);
  }
  return out.join(", ");
}
