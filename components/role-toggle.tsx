"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, useTransition } from "react";
import { isRoleFilter } from "@/lib/audience";
import { saveRole } from "@/lib/role-memory";

type Option = { value: string | null; href: string; label: string; color: string };

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function RoleToggle({ options, active }: { options: Option[]; active: string | null }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [selected, setSelected] = useState(active);
  const [box, setBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [animate, setAnimate] = useState(false);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => setSelected(active), [active]);

  useIsoLayoutEffect(() => {
    const measure = () => {
      const el = refs.current[options.findIndex((o) => o.value === selected)];
      if (el) setBox({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [selected, options]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const current = options.find((o) => o.value === selected) ?? options[0];

  return (
    <div className="relative inline-flex flex-wrap gap-1 p-1 rounded-xl bg-stone-100 border border-stone-200">
      {box && (
        <span
          aria-hidden="true"
          className="role-thumb absolute left-0 top-0 rounded-lg"
          style={{
            width: box.w,
            height: box.h,
            transform: `translate(${box.x}px, ${box.y}px)`,
            backgroundColor: current.color,
            boxShadow: `0 1px 2px rgba(28,25,23,.12), 0 6px 14px -6px ${current.color}`,
            transition: animate ? undefined : "none",
          }}
        />
      )}
      {options.map((opt, i) => {
        const isOn = opt.value === selected;
        return (
          <Link
            key={opt.label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            href={opt.href}
            scroll={false}
            aria-current={isOn ? "true" : undefined}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
              e.preventDefault();
              if (isOn) return;
              saveRole(isRoleFilter(opt.value) ? opt.value : "all");
              setSelected(opt.value);
              startTransition(() => router.push(opt.href, { scroll: false }));
            }}
            className={`role-toggle relative z-[1] px-4 py-2 rounded-lg text-sm font-medium ${
              isOn ? "text-white" : "text-stone-600 hover:text-stone-900"
            }`}
            style={!box && isOn ? { backgroundColor: opt.color } : undefined}
          >
            {opt.label}
          </Link>
        );
      })}
    </div>
  );
}
