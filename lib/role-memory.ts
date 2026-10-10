import { isRoleFilter, type RoleFilter } from "@/lib/audience";

// The role a learner last picked on this device: a RoleFilter, or "all" for no highlight.
const ROLE_KEY = "ail-role-v1";

export type SavedRole = RoleFilter | "all";

export function readSavedRole(): SavedRole | null {
  try {
    const value = window.localStorage.getItem(ROLE_KEY);
    return value === "all" || isRoleFilter(value) ? value : null;
  } catch {
    return null;
  }
}

export function saveRole(role: SavedRole) {
  try {
    window.localStorage.setItem(ROLE_KEY, role);
  } catch {
    // Private mode / storage disabled - the choice just won't be remembered.
  }
}
