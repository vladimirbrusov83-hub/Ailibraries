"use client";

import { useMemo, useState } from "react";
import ModuleCard from "@/components/module-card";
import type { Module } from "@/lib/types";
import type { RoleFilter } from "@/lib/audience";

export default function CurriculumSearch({
  modules,
  role,
  children,
}: {
  modules: Module[];
  role: RoleFilter | null;
  // The normal level-grouped layout, shown when the search box is empty.
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return modules.filter((m) => {
      const haystack = [
        m.title,
        m.description,
        m.level,
        ...(m.topics ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [q, modules]);

  return (
    <div>
      <div className="mb-10">
        <label htmlFor="module-search" className="sr-only">
          Search modules
        </label>
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
          <input
            id="module-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search modules by topic, title, or keyword..."
            className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-4 text-sm text-stone-800 placeholder:text-stone-500 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-stone-500 hover:text-stone-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {q ? (
        results.length > 0 ? (
          <section className="mb-16">
            <p className="mb-6 text-sm text-stone-500">
              {results.length} module{results.length === 1 ? "" : "s"} matching{" "}
              <span className="font-medium text-stone-700">
                &ldquo;{query.trim()}&rdquo;
              </span>
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((m) => (
                <ModuleCard key={m.slug} module={m} role={role} />
              ))}
            </div>
          </section>
        ) : (
          <div className="mb-16 rounded-xl border border-stone-200 bg-stone-50 p-10 text-center">
            <p className="text-sm text-stone-600">
              No modules match{" "}
              <span className="font-medium text-stone-800">
                &ldquo;{query.trim()}&rdquo;
              </span>
              .
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-3 text-sm font-medium text-stone-500 underline underline-offset-2 hover:text-stone-800"
            >
              Clear search
            </button>
          </div>
        )
      ) : (
        children
      )}
    </div>
  );
}
