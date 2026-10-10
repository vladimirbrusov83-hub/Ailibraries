"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useActiveHeading } from "@/components/module-toc";
import { sharePage } from "@/components/module-actions";
import { useProgress } from "@/lib/progress";
import { pad2 } from "@/lib/module-index";
import { BackIcon, CheckIcon, CloseIcon, DownloadIcon, ListIcon, ShareIcon } from "@/components/app/icons";

type Neighbour = { id: number; slug: string; title: string; accent: string } | null;

// App-mode module top bar (back, module number, contents, PDF, share), a thin reading
// progress line, and the "On this page" contents as a bottom sheet.
export default function ModuleAppBar({
  id,
  slug,
  title,
  accent,
  pdfHref,
  headings,
  prev,
  next,
}: {
  id: number;
  slug: string;
  title: string;
  accent: string;
  pdfHref: string;
  headings: { id: string; text: string }[];
  prev: Neighbour;
  next: Neighbour;
}) {
  const router = useRouter();
  const sheet = useRef<HTMLDialogElement>(null);
  const [activeId, setActiveId] = useActiveHeading(headings);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const { isComplete, toggle } = useProgress();
  const done = isComplete(slug);
  const activeIndex = headings.findIndex((h) => h.id === activeId);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? Math.min(100, Math.max(0, (doc.scrollTop / scrollable) * 100)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  function goBack() {
    const fromHere = document.referrer && new URL(document.referrer).origin === window.location.origin;
    if (fromHere && window.history.length > 1) router.back();
    else router.push("/curriculum");
  }

  function jumpTo(hid: string) {
    sheet.current?.close();
    const el = document.getElementById(hid);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(hid);
    history.replaceState(null, "", `#${hid}`);
  }

  async function share() {
    if (await sharePage(title)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="app-only app-modbar no-print">
      <button type="button" onClick={goBack} className="app-icon-btn" aria-label="Back">
        <BackIcon />
      </button>
      <p className="flex-1 min-w-0 truncate text-sm font-semibold" style={{ color: accent }}>
        Module {pad2(id)}
        <span className="sr-only">: {title}</span>
      </p>
      {headings.length > 0 && (
        <button
          type="button"
          onClick={() => sheet.current?.showModal()}
          className="app-icon-btn app-modbar-toc"
          aria-label="On this page"
          aria-haspopup="dialog"
        >
          <ListIcon />
        </button>
      )}
      <a href={pdfHref} download className="app-icon-btn" aria-label="Download PDF">
        <DownloadIcon />
      </a>
      <button type="button" onClick={share} className="app-icon-btn" aria-label={copied ? "Link copied" : "Share"}>
        {copied ? <CheckIcon className="w-5 h-5" /> : <ShareIcon />}
      </button>
      <div className="app-modbar-progress" style={{ width: `${progress}%`, backgroundColor: accent }} aria-hidden="true" />

      <dialog
        ref={sheet}
        className="app-sheet"
        aria-labelledby="toc-sheet-title"
        onClick={(e) => {
          if (e.target === sheet.current) sheet.current?.close();
        }}
      >
        <div className="app-sheet-body">
          <div className="app-sheet-handle" aria-hidden="true" />
          <div className="flex items-center justify-between mb-1">
            <h2 id="toc-sheet-title" className="text-lg font-bold text-stone-900">
              On this page
            </h2>
            <button type="button" onClick={() => sheet.current?.close()} className="app-icon-btn" aria-label="Close">
              <CloseIcon />
            </button>
          </div>
          <ol className="mb-5">
            {headings.map((h, i) => {
              const passed = activeIndex > i;
              const here = activeIndex === i;
              return (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      jumpTo(h.id);
                    }}
                    aria-current={here ? "location" : undefined}
                    className={`flex items-start gap-3 rounded-xl px-3 py-3 min-h-[48px] text-[15px] leading-snug ${
                      here ? "font-semibold text-stone-900" : passed ? "text-stone-500" : "text-stone-700"
                    }`}
                    style={here ? { backgroundColor: `${accent}12` } : undefined}
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                      style={
                        passed
                          ? { backgroundColor: accent, color: "#fff" }
                          : here
                          ? { border: `2px solid ${accent}`, color: accent }
                          : { border: "1.5px solid #d6d3d1", color: "#78716c" }
                      }
                      aria-hidden="true"
                    >
                      {passed ? <CheckIcon className="w-3 h-3" /> : i + 1}
                    </span>
                    <span className="flex-1">
                      {h.text}
                      {passed && <span className="sr-only"> (read)</span>}
                      {here && (
                        <span className="mt-1 block text-xs font-semibold" style={{ color: accent }}>
                          You are here
                        </span>
                      )}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>

          <button
            type="button"
            onClick={() => toggle(slug)}
            aria-pressed={done}
            className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl border text-[15px] font-semibold"
            style={done ? { backgroundColor: accent, borderColor: accent, color: "#fff" } : { borderColor: `${accent}55`, color: accent }}
          >
            {done && <CheckIcon className="w-4 h-4" />}
            {done ? "Completed" : "Mark this module complete"}
          </button>

          {(prev || next) && (
            <nav className="mt-4 grid grid-cols-2 gap-3" aria-label="Module navigation">
              {prev ? (
                <Link href={`/module/${prev.slug}`} className="rounded-xl border border-stone-200 p-3 min-h-[48px]">
                  <span className="block text-xs font-medium text-stone-500">← Module {pad2(prev.id)}</span>
                  <span className="block text-sm font-semibold leading-snug text-stone-800">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  href={`/module/${next.slug}`}
                  className="rounded-xl border p-3 text-right min-h-[48px]"
                  style={{ borderColor: `${next.accent}40`, backgroundColor: `${next.accent}0a` }}
                >
                  <span className="block text-xs font-medium" style={{ color: next.accent }}>
                    Module {pad2(next.id)} →
                  </span>
                  <span className="block text-sm font-semibold leading-snug text-stone-900">{next.title}</span>
                </Link>
              )}
            </nav>
          )}
        </div>
      </dialog>
    </div>
  );
}
