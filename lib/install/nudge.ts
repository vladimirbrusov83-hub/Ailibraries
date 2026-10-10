import { readResume } from "@/lib/resume";

// When to offer the install card/bar: after someone has opened a module or on their
// second visit, never right away, and not again for a while after they dismiss it.
const NUDGE_KEY = "ail-install-nudge-v1";
const VISITS_KEY = "ail-visits-v1";
const SESSION_KEY = "ail-visit-counted";
const DAY = 24 * 60 * 60 * 1000;

export const NUDGE_DELAY_MS = 4000;

export function recordVisit() {
  try {
    if (window.sessionStorage.getItem(SESSION_KEY)) return;
    window.sessionStorage.setItem(SESSION_KEY, "1");
    const visits = Number(window.localStorage.getItem(VISITS_KEY) ?? "0") || 0;
    window.localStorage.setItem(VISITS_KEY, String(visits + 1));
  } catch {
    // Storage blocked - the nudge then only appears after a module is opened.
  }
}

function hiddenUntil(): number {
  try {
    const raw = window.localStorage.getItem(NUDGE_KEY);
    const data = raw ? (JSON.parse(raw) as { hideUntil?: number }) : {};
    return typeof data.hideUntil === "number" ? data.hideUntil : 0;
  } catch {
    return 0;
  }
}

export function shouldNudge(): boolean {
  if (Date.now() < hiddenUntil()) return false;
  let visits = 0;
  try {
    visits = Number(window.localStorage.getItem(VISITS_KEY) ?? "0") || 0;
  } catch {
    visits = 0;
  }
  return visits >= 2 || Boolean(readResume().last);
}

// "Not now" hides it for 30 days; closing with X for 7.
export function dismissNudge(days: 7 | 30) {
  try {
    window.localStorage.setItem(NUDGE_KEY, JSON.stringify({ hideUntil: Date.now() + days * DAY }));
  } catch {
    // Storage blocked - it will just come back next visit.
  }
}
