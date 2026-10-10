"use client";

import { useMemo } from "react";
import { pathModules } from "@/lib/audience";
import type { ModuleSummary } from "@/lib/module-index";
import { useProgress } from "@/lib/progress";
import { useResume } from "@/lib/resume";
import { useSavedRole, type SavedRole } from "@/lib/role-memory";

export type ContinueTarget = {
  module: ModuleSummary;
  section?: { id: string; heading: string };
  href: string;
  started: boolean;
  // 0-1: how far through this module the reader has scrolled (1 once marked complete).
  progress: number;
};

// Everything the app screens need about this learner, read from this device only.
export function useLearning(index: ModuleSummary[]) {
  const { completed, ready, isComplete } = useProgress();
  const resume = useResume();
  const role = useSavedRole();

  return useMemo(() => {
    const loaded = ready && resume !== null && role !== undefined;
    const bySlug = new Map(index.map((m) => [m.slug, m]));

    const moduleProgress = (m: ModuleSummary) => {
      if (completed.has(m.slug)) return 1;
      const reached = resume?.reached[m.slug];
      if (reached === undefined || m.sections.length === 0) return 0;
      return Math.min(1, (reached + 1) / m.sections.length);
    };

    const lastModule = resume?.last ? bySlug.get(resume.last.slug) : undefined;
    const target: ContinueTarget = lastModule
      ? (() => {
          const section = lastModule.sections.find((s) => s.id === resume?.last?.section);
          return {
            module: lastModule,
            section,
            href: `/module/${lastModule.slug}${section ? `#${section.id}` : ""}`,
            started: true,
            progress: moduleProgress(lastModule),
          };
        })()
      : { module: index[0], href: `/module/${index[0].slug}`, started: false, progress: 0 };

    const trackFor = (r: SavedRole | null | undefined) =>
      r === "practicing" || r === "digital" ? pathModules(index, r) : index;
    const track = trackFor(role);
    const trackDone = track.filter((m) => completed.has(m.slug)).length;
    const nextInTrack = track.find((m) => !completed.has(m.slug));

    return {
      loaded,
      role: role ?? null,
      completed,
      isComplete,
      target,
      track,
      trackDone,
      nextInTrack,
      totalDone: index.filter((m) => completed.has(m.slug)).length,
      moduleProgress,
    };
  }, [index, completed, ready, isComplete, resume, role]);
}
