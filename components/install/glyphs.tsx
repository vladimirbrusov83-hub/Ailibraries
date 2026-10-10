// Small drawings of the browser buttons people need to tap, shown inline in the steps.
// Each one has a text label for screen readers.

export type GlyphName =
  | "ios-share"
  | "ios-more"
  | "ios-page-menu"
  | "ios-plus-square"
  | "toggle-on"
  | "kebab"
  | "dots"
  | "hamburger"
  | "install-desktop"
  | "edge-app"
  | "samsung-install"
  | "mac-share"
  | "copy";

const labels: Record<GlyphName, string> = {
  "ios-share": "Share button: a square with an arrow pointing up",
  "ios-more": "More button: three dots in a circle",
  "ios-page-menu": "Page Menu button: three short lines",
  "ios-plus-square": "Add to Home Screen icon: a plus sign in a square",
  "toggle-on": "a switch turned on",
  kebab: "More button: three dots stacked up and down",
  dots: "Menu button: three dots in a row",
  hamburger: "Menu button: three lines",
  "install-desktop": "Install icon: a screen with a down arrow",
  "edge-app": "App available icon: four small squares",
  "samsung-install": "Install icon: an arrow pointing down into a tray",
  "mac-share": "Share button: a square with an arrow pointing up",
  copy: "Copy link",
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Art({ name }: { name: GlyphName }) {
  switch (name) {
    case "ios-share":
    case "mac-share":
      return (
        <svg viewBox="0 0 24 24" {...stroke} stroke="#0a84ff">
          <path d="M12 3v11.5M8 7l4-4 4 4" />
          <path d="M8.5 10H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1.5" />
        </svg>
      );
    case "ios-more":
      return (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#e7e5e4" />
          <circle cx="7.5" cy="12" r="1.6" fill="#44403c" />
          <circle cx="12" cy="12" r="1.6" fill="#44403c" />
          <circle cx="16.5" cy="12" r="1.6" fill="#44403c" />
        </svg>
      );
    case "ios-page-menu":
      return (
        <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2.2} stroke="#44403c">
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      );
    case "ios-plus-square":
      return (
        <svg viewBox="0 0 24 24" {...stroke} stroke="#1c1917">
          <rect x="4" y="4" width="16" height="16" rx="3.5" />
          <path d="M12 8.5v7M8.5 12h7" />
        </svg>
      );
    case "toggle-on":
      return (
        <svg viewBox="0 0 34 20">
          <rect x="1" y="1" width="32" height="18" rx="9" fill="#34c759" />
          <circle cx="24" cy="10" r="7.5" fill="#fff" />
        </svg>
      );
    case "kebab":
      return (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="5.5" r="1.8" fill="#44403c" />
          <circle cx="12" cy="12" r="1.8" fill="#44403c" />
          <circle cx="12" cy="18.5" r="1.8" fill="#44403c" />
        </svg>
      );
    case "dots":
      return (
        <svg viewBox="0 0 24 24">
          <circle cx="5.5" cy="12" r="1.8" fill="#44403c" />
          <circle cx="12" cy="12" r="1.8" fill="#44403c" />
          <circle cx="18.5" cy="12" r="1.8" fill="#44403c" />
        </svg>
      );
    case "hamburger":
      return (
        <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2.2} stroke="#44403c">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "install-desktop":
      return (
        <svg viewBox="0 0 24 24" {...stroke} stroke="#44403c">
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 7.5v6M9.5 11l2.5 2.5 2.5-2.5" />
        </svg>
      );
    case "edge-app":
      return (
        <svg viewBox="0 0 24 24" {...stroke} stroke="#44403c">
          <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
          <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
          <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
          <path d="M16.75 14v5.5M14 16.75h5.5" />
        </svg>
      );
    case "samsung-install":
      return (
        <svg viewBox="0 0 24 24" {...stroke} stroke="#44403c">
          <path d="M12 4v10M8 10l4 4 4-4" />
          <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
        </svg>
      );
    case "copy":
      return (
        <svg viewBox="0 0 24 24" {...stroke} stroke="#44403c">
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
      );
  }
}

export default function Glyph({ name, size = "md" }: { name: GlyphName; size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-9 min-w-[2.25rem]" : "h-7 min-w-[1.75rem]";
  const art = name === "toggle-on" ? (size === "lg" ? "h-5 w-9" : "h-4 w-7") : size === "lg" ? "h-6 w-6" : "h-5 w-5";
  return (
    <span
      role="img"
      aria-label={labels[name]}
      className={`inline-flex ${box} items-center justify-center rounded-lg border border-stone-300 bg-white px-1 align-middle shadow-[0_1px_0_#d6d3d1] mx-0.5`}
    >
      <span className={`${art} [&>svg]:h-full [&>svg]:w-full`}>
        <Art name={name} />
      </span>
    </span>
  );
}
