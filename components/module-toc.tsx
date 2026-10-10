"use client";

import { useEffect, useState } from "react";

// Tracks which section heading the reader is in, from the same scroll band the contents list uses.
export function useActiveHeading(headings: { id: string }[]) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  return [activeId, setActiveId] as const;
}

export default function ModuleToc({
  headings,
  accent,
}: {
  headings: { id: string; text: string }[];
  accent: string;
}) {
  const [activeId, setActiveId] = useActiveHeading(headings);

  function handleClick(e: React.MouseEvent, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
    history.replaceState(null, "", `#${id}`);
  }

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-3">
        On this page
      </p>
      <ul className="space-y-2 border-l border-stone-200">
        {headings.map((h) => {
          const active = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                aria-current={active ? "true" : undefined}
                className={`block -ml-px border-l-2 pl-3 leading-snug transition-colors ${
                  active
                    ? "font-medium"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
                style={
                  active
                    ? { borderColor: accent, color: accent }
                    : undefined
                }
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
