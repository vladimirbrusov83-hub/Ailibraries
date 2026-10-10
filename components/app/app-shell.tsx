"use client";

import LogoGlyph from "@/components/logo-glyph";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ModuleSummary } from "@/lib/module-index";
import { levelAccent, levelShort, pad2 } from "@/lib/module-index";
import { roleMeta } from "@/lib/audience";
import { saveRole, type SavedRole } from "@/lib/role-memory";
import { useLearning } from "@/components/app/use-learning";
import {
  BookIcon,
  CheckIcon,
  ChevronIcon,
  CloseIcon,
  HomeIcon,
  LinkIcon,
  MoreIcon,
  PlayIcon,
  ShareIcon,
} from "@/components/app/icons";

type Qr = { d: string; viewBox: number };
type Tab = "home" | "curriculum" | "resources" | "more" | null;

const OPEN_MORE = "ail-open-more";
const LEVELS = ["foundations", "applied", "advanced"] as const;

function activeTab(pathname: string): Tab {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/curriculum") || pathname.startsWith("/level") || pathname.startsWith("/module")) return "curriculum";
  if (pathname.startsWith("/resources")) return "resources";
  if (pathname.startsWith("/about") || pathname.startsWith("/contact") || pathname.startsWith("/course")) return "more";
  return null;
}

// App-only frame: bottom tab bar on phones, sidebar on laptops, and the More sheet.
// Rendered on every page but hidden by CSS unless the site was launched as an installed app.
export default function AppShell({ index, qr, siteUrl }: { index: ModuleSummary[]; qr: Qr; siteUrl: string }) {
  const pathname = usePathname();
  const tab = activeTab(pathname);
  const learning = useLearning(index);
  const currentSlug = pathname.startsWith("/module/") ? pathname.split("/")[2] : null;
  const openMore = () => window.dispatchEvent(new Event(OPEN_MORE));

  return (
    <>
      <TabBar tab={tab} continueHref={learning.target.href} onMore={openMore} />
      <aside className="app-only app-sidebar no-print" aria-label="App navigation">
        <Link href="/" className="flex items-center gap-2.5 px-2 font-semibold text-stone-900">
          <span
            className="logo-mark w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: "#0F6E56" }}
            aria-hidden="true"
          >
            <LogoGlyph />
          </span>
          <span className="text-sm leading-tight">AI for Academic Libraries</span>
        </Link>

        <Link href={learning.target.href} className="app-continue-btn mt-5">
          <span className="app-continue-btn-icon" aria-hidden="true">
            <PlayIcon className="w-4 h-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold">{learning.target.started ? "Continue" : "Start learning"}</span>
            <span className="block truncate text-xs text-white/80">
              Module {pad2(learning.target.module.id)}
              {learning.target.section ? ` · ${learning.target.section.heading}` : ` · ${learning.target.module.title}`}
            </span>
          </span>
        </Link>

        <nav className="mt-5 space-y-0.5" aria-label="Sections">
          <SideLink href="/" active={tab === "home"} icon={<HomeIcon className="w-5 h-5" />} label="Home" />
          <SideLink href="/curriculum" active={tab === "curriculum"} icon={<BookIcon className="w-5 h-5" />} label="Curriculum" />
          <SideLink href="/resources" active={tab === "resources"} icon={<LinkIcon className="w-5 h-5" />} label="Resources" />
          <button type="button" onClick={openMore} className={`app-side-link w-full ${tab === "more" ? "is-active" : ""}`}>
            <MoreIcon className="w-5 h-5" />
            More
          </button>
        </nav>

        <div className="mt-6 px-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-2">Your path</p>
          <PathSwitch role={learning.role} />
          <p className="mt-3 text-xs text-stone-600">
            <span className="font-semibold text-stone-900">{learning.loaded ? learning.trackDone : 0}</span> of {learning.track.length} complete
          </p>
          <div className="mt-1.5 h-1.5 rounded-full bg-stone-200 overflow-hidden" aria-hidden="true">
            <div
              className="h-full rounded-full bg-[#0F6E56]"
              style={{ width: `${learning.loaded ? (learning.trackDone / learning.track.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        <nav className="mt-6 pb-6" aria-label="Modules">
          {LEVELS.map((level) => (
            <div key={level} className="mb-4">
              <p className="px-2 mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: levelAccent[level] }}>
                {levelShort[level]}
              </p>
              <ul>
                {index
                  .filter((m) => m.level === level)
                  .map((m) => {
                    const current = m.slug === currentSlug;
                    const done = learning.loaded && learning.isComplete(m.slug);
                    const offPath =
                      (learning.role === "practicing" || learning.role === "digital") &&
                      m.audience !== "both" &&
                      m.audience !== learning.role;
                    return (
                      <li key={m.slug}>
                        <Link
                          href={`/module/${m.slug}`}
                          aria-current={current ? "page" : undefined}
                          className={`app-side-module ${current ? "is-current" : ""} ${offPath ? "is-off" : ""}`}
                          style={{ "--c": levelAccent[m.level] } as React.CSSProperties}
                        >
                          <span className="app-side-num">{pad2(m.id)}</span>
                          <span className="flex-1 min-w-0 leading-snug">{m.title}</span>
                          {done && (
                            <span className="text-green-700" aria-label="Completed">
                              <CheckIcon className="w-4 h-4" />
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <MoreSheet qr={qr} siteUrl={siteUrl} />
    </>
  );
}

function SideLink({ href, active, icon, label }: { href: string; active: boolean; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={`app-side-link ${active ? "is-active" : ""}`}>
      {icon}
      {label}
    </Link>
  );
}

export function PathSwitch({ role, size = "sm" }: { role: SavedRole | null; size?: "sm" | "lg" }) {
  const options: { value: SavedRole; label: string }[] = [
    { value: "practicing", label: roleMeta.practicing.short },
    { value: "digital", label: roleMeta.digital.short },
    { value: "all", label: "All" },
  ];
  return (
    <div className={`app-segmented ${size === "lg" ? "is-lg" : ""}`} role="group" aria-label="Choose your path">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={role === o.value}
          onClick={() => saveRole(o.value)}
          style={o.value !== "all" ? ({ "--c": roleMeta[o.value].color } as React.CSSProperties) : undefined}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function TabBar({ tab, continueHref, onMore }: { tab: Tab; continueHref: string; onMore: () => void }) {
  return (
    <nav className="app-only app-tabbar no-print" aria-label="App">
      <TabLink href="/" active={tab === "home"} icon={<HomeIcon />} label="Home" />
      <TabLink href="/curriculum" active={tab === "curriculum"} icon={<BookIcon />} label="Curriculum" />
      <Link href={continueHref} className="app-tab app-tab-continue">
        <span className="app-tab-continue-btn" aria-hidden="true">
          <PlayIcon className="w-6 h-6 translate-x-[1px]" />
        </span>
        <span className="app-tab-label">Continue</span>
      </Link>
      <TabLink href="/resources" active={tab === "resources"} icon={<LinkIcon />} label="Resources" />
      <button type="button" onClick={onMore} className={`app-tab ${tab === "more" ? "is-active" : ""}`} aria-haspopup="dialog">
        <MoreIcon />
        <span className="app-tab-label">More</span>
      </button>
    </nav>
  );
}

function TabLink({ href, active, icon, label }: { href: string; active: boolean; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={`app-tab ${active ? "is-active" : ""}`}>
      {icon}
      <span className="app-tab-label">{label}</span>
    </Link>
  );
}

function MoreSheet({ qr, siteUrl }: { qr: Qr; siteUrl: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const open = () => ref.current?.showModal();
    window.addEventListener(OPEN_MORE, open);
    return () => window.removeEventListener(OPEN_MORE, open);
  }, []);

  useEffect(() => {
    ref.current?.close();
  }, [pathname]);

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "AI for Academic Libraries", url: siteUrl });
      } catch {
        /* cancelled */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  const items = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/course", label: "The Course", note: "Coming soon" },
  ];

  return (
    <dialog
      ref={ref}
      className="app-sheet no-print"
      aria-labelledby="more-title"
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      <div className="app-sheet-body">
        <div className="app-sheet-handle" aria-hidden="true" />
        <div className="flex items-center justify-between mb-2">
          <h2 id="more-title" className="text-lg font-bold text-stone-900">
            More
          </h2>
          <button type="button" onClick={() => ref.current?.close()} className="app-icon-btn" aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        <ul className="divide-y divide-stone-100 border-y border-stone-100">
          {items.map((it) => (
            <li key={it.href}>
              <Link href={it.href} className="flex items-center gap-3 py-3.5 min-h-[48px] text-[15px] font-medium text-stone-800">
                <span className="flex-1">{it.label}</span>
                {it.note && (
                  <span className="rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-stone-900">
                    {it.note}
                  </span>
                )}
                <ChevronIcon className="w-4 h-4 text-stone-400" />
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-5 rounded-2xl border border-stone-200 p-5 text-center" aria-labelledby="share-title">
          <h3 id="share-title" className="text-sm font-semibold text-stone-900 mb-1">
            Share this site
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed mb-4">Point a camera at the code to open the curriculum.</p>
          <div className="inline-block bg-white border border-stone-200 rounded-xl p-3">
            <svg
              viewBox={`0 0 ${qr.viewBox} ${qr.viewBox}`}
              shapeRendering="crispEdges"
              className="w-36 h-36 block"
              role="img"
              aria-label={`QR code linking to ${siteUrl}`}
            >
              <rect width="100%" height="100%" fill="#ffffff" />
              <path fill="#1c1917" d={qr.d} />
            </svg>
          </div>
          <div className="mt-4">
            <button type="button" onClick={share} className="app-pill-btn">
              <ShareIcon className="w-4 h-4" />
              {copied ? "Link copied" : "Share link"}
            </button>
          </div>
        </section>

        <p className="mt-5 text-center text-xs text-stone-500">Your progress is saved on this device.</p>
      </div>
    </dialog>
  );
}
