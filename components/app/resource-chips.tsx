"use client";

import { useEffect, useState } from "react";

// App-mode Resources: the section headings as scrolling filter chips. Same items, same links.
export default function ResourceChips({ sections }: { sections: { id: string; title: string }[] }) {
  const [active, setActive] = useState("all");

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-res-section]").forEach((el) => {
      el.hidden = active !== "all" && el.id !== active;
    });
  }, [active]);

  useEffect(
    () => () => document.querySelectorAll<HTMLElement>("[data-res-section]").forEach((el) => (el.hidden = false)),
    []
  );

  return (
    <div className="app-only app-chips no-print" role="group" aria-label="Filter resources">
      {[{ id: "all", title: "All" }, ...sections].map((s) => (
        <button
          key={s.id}
          type="button"
          className="app-chip"
          aria-pressed={active === s.id}
          onClick={() => {
            setActive(s.id);
            window.scrollTo({ top: 0 });
          }}
        >
          {s.title}
        </button>
      ))}
    </div>
  );
}
