// Line icons for the app layout. Decorative: callers supply the accessible label.
type P = { className?: string };
const base = {
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const HomeIcon = ({ className = "w-6 h-6" }: P) => (
  <svg className={className} {...base}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
  </svg>
);

export const BookIcon = ({ className = "w-6 h-6" }: P) => (
  <svg className={className} {...base}>
    <path d="M12 6.25v13m0-13C10.83 5.48 9.25 5 7.5 5S4.17 5.48 3 6.25v13C4.17 18.48 5.75 18 7.5 18s3.33.48 4.5 1.25m0-13C13.17 5.48 14.75 5 16.5 5c1.75 0 3.33.48 4.5 1.25v13C19.83 18.48 18.25 18 16.5 18c-1.75 0-3.33.48-4.5 1.25" />
  </svg>
);

export const PlayIcon = ({ className = "w-6 h-6" }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.6v12.8a1 1 0 0 0 1.52.85l10.2-6.4a1 1 0 0 0 0-1.7L9.52 4.75A1 1 0 0 0 8 5.6Z" />
  </svg>
);

export const LinkIcon = ({ className = "w-6 h-6" }: P) => (
  <svg className={className} {...base}>
    <path d="M10 14a4.5 4.5 0 0 0 6.36 0l3-3a4.5 4.5 0 0 0-6.36-6.36l-1 1" />
    <path d="M14 10a4.5 4.5 0 0 0-6.36 0l-3 3a4.5 4.5 0 0 0 6.36 6.36l1-1" />
  </svg>
);

export const MoreIcon = ({ className = "w-6 h-6" }: P) => (
  <svg className={className} {...base}>
    <circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const BackIcon = ({ className = "w-6 h-6" }: P) => (
  <svg className={className} {...base}>
    <path d="M15 19l-7-7 7-7" />
  </svg>
);

export const ListIcon = ({ className = "w-6 h-6" }: P) => (
  <svg className={className} {...base}>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <circle cx="4.5" cy="6" r="1" fill="currentColor" />
    <circle cx="4.5" cy="12" r="1" fill="currentColor" />
    <circle cx="4.5" cy="18" r="1" fill="currentColor" />
  </svg>
);

export const DownloadIcon = ({ className = "w-6 h-6" }: P) => (
  <svg className={className} {...base}>
    <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 10l5 5 5-5M12 15V3" />
  </svg>
);

export const ShareIcon = ({ className = "w-6 h-6" }: P) => (
  <svg className={className} {...base}>
    <path d="M12 3v12M8 7l4-4 4 4" />
    <path d="M7 10H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1" />
  </svg>
);

export const CheckIcon = ({ className = "w-4 h-4" }: P) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export const CloseIcon = ({ className = "w-5 h-5" }: P) => (
  <svg className={className} {...base}>
    <path d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ChevronIcon = ({ className = "w-4 h-4" }: P) => (
  <svg className={className} {...base}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);
