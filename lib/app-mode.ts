// True when the site was launched as an installed app (home screen icon or dock),
// not opened in a normal browser tab. The inline head script in app/layout.tsx runs the
// same test before first paint and sets html.app-mode.
export function isAppMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true
    );
  } catch {
    return false;
  }
}
