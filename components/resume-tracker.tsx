"use client";

import { useEffect, useRef } from "react";
import { useActiveHeading } from "@/components/module-toc";
import { saveSection, saveVisit } from "@/lib/resume";

// Remembers the module and the last section heading scrolled past, for the Continue button.
export default function ResumeTracker({ slug, headings }: { slug: string; headings: { id: string }[] }) {
  const [activeId] = useActiveHeading(headings);
  const scrolled = useRef(false);

  useEffect(() => {
    saveVisit(slug);
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      scrolled.current = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Ignore the default first heading until the reader has actually scrolled.
    if (!activeId || !scrolled.current) return;
    const index = headings.findIndex((h) => h.id === activeId);
    if (index < 0) return;
    const t = window.setTimeout(() => saveSection(slug, activeId, index), 800);
    return () => window.clearTimeout(t);
  }, [activeId, slug, headings]);

  return null;
}
