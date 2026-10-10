import { useEffect, useState } from "react";
import { isRoleFilter, type RoleFilter } from "@/lib/audience";

// The role a learner last picked on this device: a RoleFilter, or "all" for no highlight.
const ROLE_KEY = "ail-role-v1";
const CHANGE_EVENT = "ail-role-change";

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
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// `undefined` until mounted; `null` when nothing has been picked yet.
export function useSavedRole(): SavedRole | null | undefined {
  const [role, setRole] = useState<SavedRole | null | undefined>(undefined);
  useEffect(() => {
    const sync = () => setRole(readSavedRole());
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return role;
}
