"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suf ?? "";
  const start = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / 1200);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  el.textContent = "0" + suffix;
  requestAnimationFrame(step);
}

export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("rv-ready");
    const items = Array.from(document.querySelectorAll<HTMLElement>(".rv:not(.in)"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("in");
          el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
          io.unobserve(el);
        }),
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
