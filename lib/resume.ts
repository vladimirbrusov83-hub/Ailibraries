"use client";

import { useEffect, useState } from "react";

// Where the learner left off, on this device only: module slug and section id, nothing personal.
const RESUME_KEY = "ail-resume-v1";
const CHANGE_EVENT = "ail-resume-change";

export type Resume = {
  last?: { slug: string; section?: string };
  // Furthest section index reached in each module.
  reached: Record<string, number>;
};

export function readResume(): Resume {
  try {
    const raw = window.localStorage.getItem(RESUME_KEY);
    const data = raw ? (JSON.parse(raw) as Partial<Resume>) : {};
    return {
      last: data.last && typeof data.last.slug === "string" ? data.last : undefined,
      reached: data.reached && typeof data.reached === "object" ? data.reached : {},
    };
  } catch {
    return { reached: {} };
  }
}

function write(resume: Resume) {
  try {
    window.localStorage.setItem(RESUME_KEY, JSON.stringify(resume));
  } catch {
    // Private mode / storage disabled - Continue just falls back to Module 01.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function saveVisit(slug: string) {
  const r = readResume();
  if (r.last?.slug === slug) return;
  r.last = { slug };
  write(r);
}

export function saveSection(slug: string, section: string, index: number) {
  const r = readResume();
  r.last = { slug, section };
  r.reached[slug] = Math.max(r.reached[slug] ?? -1, index);
  write(r);
}

export function useResume(): Resume | null {
  const [resume, setResume] = useState<Resume | null>(null);
  useEffect(() => {
    const sync = () => setResume(readResume());
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return resume;
}
