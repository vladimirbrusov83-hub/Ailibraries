"use client";

import LogoGlyph from "@/components/logo-glyph";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { detectInstallContext, type InstallContext } from "@/lib/install/detect";
import { NUDGE_DELAY_MS, dismissNudge, recordVisit, shouldNudge } from "@/lib/install/nudge";
import { useInstallPrompt } from "@/lib/install/prompt";
import { getGuide } from "@/components/install/steps";
import InstallGuide from "@/components/install/install-guide";

type Qr = { d: string; viewBox: number };

// Website-only install offer: a dismissible card at the bottom on phones, a slim bar at
// the top on computers. Never in the app, never on /install, never on the first second
// of a first visit (only after a module has been opened or on a second visit).
export default function InstallNudge({ phoneQr }: { phoneQr: Qr }) {
  const pathname = usePathname();
  const [ctx, setCtx] = useState<InstallContext | null>(null);
  const [show, setShow] = useState(false);
  const [popover, setPopover] = useState<null | "how" | "phone">(null);
  const { available, prompt, justInstalled } = useInstallPrompt();
  const [toast, setToast] = useState(false);

  useEffect(() => {
    recordVisit();
    setCtx(detectInstallContext());
  }, []);

  useEffect(() => {
    if (!ctx || ctx.installed || !ctx.canInstall || pathname === "/install") {
      setShow(false);
      return;
    }
    const t = window.setTimeout(() => setShow(shouldNudge()), NUDGE_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [ctx, pathname]);

  useEffect(() => {
    if (!justInstalled) return;
    setShow(false);
    setToast(true);
    const t = window.setTimeout(() => setToast(false), 8000);
    return () => window.clearTimeout(t);
  }, [justInstalled]);

  function close(days: 7 | 30) {
    dismissNudge(days);
    setShow(false);
    setPopover(null);
  }

  async function install() {
    const result = await prompt();
    if (result === "dismissed") close(7);
  }

  const doneToast = toast && (
    <div className="install-toast" role="status">
      {ctx?.mobile ? "Done. Find it on your home screen." : "Done. Find it with your other apps."}
    </div>
  );

  if (!ctx || !show) return <>{doneToast}</>;
  const guide = getGuide(ctx.guide, ctx.iosVersion);
  const canPrompt = guide.promptable && available;

  if (ctx.mobile) {
    return (
      <>
        {doneToast}
        <section
          className="install-card site-only no-print"
          aria-labelledby="install-card-title"
          onKeyDown={(e) => {
            if (e.key === "Escape") close(7);
          }}
        >
          <button type="button" onClick={() => close(7)} className="install-x" aria-label="Close">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-start gap-3 pr-8">
            <span
              className="logo-mark flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: "#0F6E56" }}
              aria-hidden="true"
            >
              <LogoGlyph />
            </span>
            <div>
              <h2 id="install-card-title" className="text-base font-bold text-stone-900">
                {ctx.guide === "in-app" ? "Want this as an app?" : "Add this to your home screen"}
              </h2>
              <p className="mt-1 text-[15px] leading-relaxed text-stone-700">
                {canPrompt ? "Opens in one tap and picks up where you left off." : guide.short}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            {canPrompt ? (
              <button type="button" onClick={install} className="install-primary flex-1">
                Install
              </button>
            ) : (
              <Link href="/install" className="install-primary flex-1">
                Show me how
              </Link>
            )}
            <button type="button" onClick={() => close(30)} className="install-secondary">
              Not now
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {doneToast}
      <div
        className="install-bar site-only no-print"
        role="region"
        aria-label="Install the app"
        onKeyDown={(e) => {
          if (e.key !== "Escape") return;
          if (popover) setPopover(null);
          else close(7);
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6">
          <p className="flex-1 min-w-[220px] text-sm font-medium text-stone-800">
            Use AI for Academic Libraries as an app on this computer.
          </p>
          <div className="relative flex flex-wrap items-center gap-2">
            {canPrompt ? (
              <button type="button" onClick={install} className="install-primary install-sm">
                Install
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setPopover(popover === "how" ? null : "how")}
                aria-expanded={popover === "how"}
                aria-controls="install-how"
                className="install-primary install-sm"
              >
                How to install
              </button>
            )}
            <button
              type="button"
              onClick={() => setPopover(popover === "phone" ? null : "phone")}
              aria-expanded={popover === "phone"}
              aria-controls="install-phone"
              className="install-secondary install-sm"
            >
              Install it on your phone
            </button>
            <button type="button" onClick={() => close(30)} className="install-secondary install-sm">
              Not now
            </button>
            <button type="button" onClick={() => close(7)} className="install-x-sm" aria-label="Close">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {popover === "how" && (
              <Popover id="install-how" title={`Install with ${guide.browser}`} onClose={() => setPopover(null)}>
                <InstallGuide guide={guide} />
                <Link href="/install" className="mt-4 inline-block text-sm font-semibold text-[#0F6E56] underline underline-offset-2">
                  More help with installing
                </Link>
              </Popover>
            )}
            {popover === "phone" && (
              <Popover id="install-phone" title="Install it on your phone" onClose={() => setPopover(null)}>
                <p className="text-base text-stone-700">Point your phone&apos;s camera at this code. It opens the steps for your phone.</p>
                <div className="mt-4 flex justify-center">
                  <div className="rounded-xl border border-stone-200 bg-white p-3">
                    <svg
                      viewBox={`0 0 ${phoneQr.viewBox} ${phoneQr.viewBox}`}
                      shapeRendering="crispEdges"
                      className="block h-44 w-44"
                      role="img"
                      aria-label="QR code linking to the install page"
                    >
                      <rect width="100%" height="100%" fill="#ffffff" />
                      <path fill="#1c1917" d={phoneQr.d} />
                    </svg>
                  </div>
                </div>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Popover({ id, title, onClose, children }: { id: string; title: string; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    ref.current?.focus();
    const outside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (ref.current && !ref.current.contains(target) && !target.closest?.("[aria-controls]")) closeRef.current();
    };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  return (
    <div ref={ref} id={id} role="dialog" aria-label={title} tabIndex={-1} className="install-popover">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-stone-900">{title}</h2>
        <button type="button" onClick={onClose} className="install-x-sm" aria-label="Close">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {children}
    </div>
  );
}
