"use client";

import Link from "next/link";
import { useState } from "react";
import { roleMeta } from "@/lib/audience";
import type { ModuleSummary } from "@/lib/module-index";
import { levelAccent, pad2 } from "@/lib/module-index";
import { saveRole } from "@/lib/role-memory";
import { useLearning } from "@/components/app/use-learning";
import { ChevronIcon, PlayIcon } from "@/components/app/icons";

// Same subtitles as the "Start with your role" cards on the website home page.
const roleSubtitle = {
  practicing: "Reference, instruction, research support",
  digital: "Metadata, cataloging, systems, repositories",
};

// App-mode Home tab: Continue card and Your path card. Hidden in browser tabs.
export default function AppHome({ index }: { index: ModuleSummary[] }) {
  const l = useLearning(index);
  const [switching, setSwitching] = useState(false);
  const t = l.target;
  const accent = levelAccent[t.module.level];

  return (
    <div className="app-only max-w-2xl mx-auto px-4 sm:px-6 pt-6 pb-8 space-y-4">
      <div className="flex items-center gap-2.5 pb-1">
        <span
          className="logo-mark w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
          style={{ backgroundColor: "#0F6E56" }}
          aria-hidden="true"
        >
          AI
        </span>
        <h1 className="text-base font-semibold text-stone-900">AI for Academic Libraries</h1>
      </div>

      {/* Continue */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_1px_2px_rgba(28,25,23,.04),0_8px_24px_-12px_rgba(28,25,23,.12)]" aria-labelledby="continue-title">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          {!l.loaded ? " " : t.started ? "Continue where you left off" : "Start here"}
        </p>
        <div className="mt-3 flex items-start gap-3">
          <span
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
            style={{ backgroundColor: `${accent}14`, color: accent }}
            aria-hidden="true"
          >
            {pad2(t.module.id)}
          </span>
          <div className="min-w-0">
            <h2 id="continue-title" className="text-lg font-bold leading-snug tracking-[-0.01em] text-stone-900">
              <span className="sr-only">Module {pad2(t.module.id)}: </span>
              {t.module.title}
            </h2>
            <p className="mt-0.5 text-sm text-stone-600">
              {l.loaded && t.section ? t.section.heading : `${t.module.minutes} min read`}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div
            className="h-2 flex-1 overflow-hidden rounded-full bg-stone-100"
            role="progressbar"
            aria-label={`Progress in Module ${pad2(t.module.id)}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round((l.loaded ? t.progress : 0) * 100)}
          >
            <div className="h-full rounded-full" style={{ width: `${(l.loaded ? t.progress : 0) * 100}%`, backgroundColor: accent }} />
          </div>
          <span className="text-xs font-semibold tabular-nums text-stone-500">{Math.round((l.loaded ? t.progress : 0) * 100)}%</span>
        </div>
        <Link
          href={t.href}
          className="mt-4 flex min-h-[48px] items-center justify-center gap-2 rounded-xl text-[15px] font-semibold text-white"
          style={{ background: "linear-gradient(150deg, #14876a, #0F6E56 55%, #0b5745)" }}
        >
          <PlayIcon className="w-4 h-4" />
          {t.started ? "Continue reading" : "Start Module 01"}
        </Link>
      </section>

      {/* Your path */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5" aria-labelledby="path-title">
        {!l.loaded ? (
          <div className="h-32" aria-hidden="true" />
        ) : l.role === null || switching ? (
          <>
            <h2 id="path-title" className="text-base font-bold text-stone-900">
              Pick your path
            </h2>
            <p className="mt-1 text-sm text-stone-600">We&apos;ll keep track of the modules for your role.</p>
            <div className="mt-4 grid gap-3">
              {(["practicing", "digital"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    saveRole(r);
                    setSwitching(false);
                  }}
                  className="flex min-h-[64px] items-center gap-3 rounded-xl border-2 px-4 py-3 text-left"
                  style={{ borderColor: `${roleMeta[r].color}40`, backgroundColor: `${roleMeta[r].color}08` }}
                >
                  <span className="flex-1">
                    <span className="block text-[15px] font-bold" style={{ color: roleMeta[r].color }}>
                      {roleMeta[r].label}
                    </span>
                    <span className="block text-xs text-stone-600">{roleSubtitle[r]}</span>
                  </span>
                  <ChevronIcon className="w-5 h-5 text-stone-400" />
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  saveRole("all");
                  setSwitching(false);
                }}
                className="min-h-[44px] rounded-xl text-sm font-semibold text-stone-600 underline underline-offset-2"
              >
                Show all modules
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Your path</p>
                <h2
                  id="path-title"
                  className="mt-0.5 text-base font-bold"
                  style={{ color: l.role === "all" ? "#1c1917" : roleMeta[l.role].color }}
                >
                  {l.role === "all" ? "All modules" : roleMeta[l.role].label}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSwitching(true)}
                className="min-h-[44px] px-2 text-sm font-semibold text-stone-600 underline underline-offset-2"
              >
                Switch path
              </button>
            </div>
            <p className="mt-3 text-sm text-stone-700">
              <span className="font-bold text-stone-900">{l.trackDone}</span> of {l.track.length} complete
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-100" aria-hidden="true">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(l.trackDone / l.track.length) * 100}%`,
                  backgroundColor: l.role === "all" ? "#0F6E56" : roleMeta[l.role].color,
                }}
              />
            </div>
            {l.nextInTrack ? (
              <Link
                href={`/module/${l.nextInTrack.slug}`}
                className="mt-4 flex min-h-[56px] items-center gap-3 rounded-xl bg-stone-50 border border-stone-200 px-4 py-3"
              >
                <span className="flex-1 min-w-0">
                  <span className="block text-xs font-semibold text-stone-500">Next on your path · Module {pad2(l.nextInTrack.id)}</span>
                  <span className="block text-[15px] font-semibold leading-snug text-stone-900">{l.nextInTrack.title}</span>
                </span>
                <ChevronIcon className="w-5 h-5 text-stone-400" />
              </Link>
            ) : (
              <p className="mt-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm font-semibold text-green-800">
                Every module on this path is complete.
              </p>
            )}
          </>
        )}
        {l.loaded && l.role !== null && switching && (
          <button
            type="button"
            onClick={() => setSwitching(false)}
            className="mt-1 w-full min-h-[44px] rounded-xl text-sm font-semibold text-stone-500"
          >
            Cancel
          </button>
        )}
      </section>
    </div>
  );
}
