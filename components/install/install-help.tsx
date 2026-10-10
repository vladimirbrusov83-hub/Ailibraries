"use client";

import { useEffect, useRef, useState } from "react";
import { detectInstallContext, type GuideId, type InstallContext } from "@/lib/install/detect";
import { useInstallPrompt } from "@/lib/install/prompt";
import { getGuide, guideMenu } from "@/components/install/steps";
import InstallGuide from "@/components/install/install-guide";
import Glyph from "@/components/install/glyphs";

type Qr = { d: string; viewBox: number };

const SEPARATE_PROGRESS: GuideId[] = ["ios-safari", "ios-chrome", "ios-edge", "ios-firefox", "ios-other", "mac-safari"];

export default function InstallHelp({ phoneQr, siteUrl }: { phoneQr: Qr; siteUrl: string }) {
  const [ctx, setCtx] = useState<InstallContext | null>(null);
  const [chosen, setChosen] = useState<GuideId | null>(null);
  const [picking, setPicking] = useState(false);
  const [copied, setCopied] = useState(false);
  const { available, prompt, justInstalled } = useInstallPrompt();
  const stepsRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => setCtx(detectInstallContext()), []);

  if (!ctx) return <div className="min-h-[50vh]" aria-busy="true" />;

  if (ctx.installed) {
    return (
      <p className="rounded-2xl border border-green-200 bg-green-50 p-5 text-lg text-green-900">
        You&apos;re already using the app. Your progress is saved on this device.
      </p>
    );
  }

  const id = chosen ?? ctx.guide;
  const guide = getGuide(id, chosen ? null : ctx.iosVersion);
  const isDetected = id === ctx.guide;
  const showPrompt = isDetected && guide.promptable && available;
  const needsLink = ["in-app", "ios-other", "android-other"].includes(id) || id === "ios-safari";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${siteUrl}/install`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable */
    }
  }

  const copyButton = (
    <button type="button" onClick={copyLink} className="install-secondary gap-2">
      <Glyph name="copy" />
      {copied ? "Link copied" : "Copy link"}
    </button>
  );

  return (
    <div className="space-y-12">
      {justInstalled && (
        <p role="status" className="rounded-2xl border border-green-200 bg-green-50 p-5 text-lg font-semibold text-green-900">
          Done. Find it on your {ctx.mobile ? "home screen" : "computer with your other apps"}.
        </p>
      )}

      <section aria-labelledby="steps-title">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#0F6E56]">{isDetected ? "Steps for your device" : "Steps for"}</p>
        <h2 id="steps-title" ref={stepsRef} tabIndex={-1} className="mt-1 text-2xl font-bold tracking-[-0.02em] text-stone-900 focus:outline-none">
          {id === "in-app"
            ? `Inside ${ctx.inAppName ?? "another app"}`
            : `${guide.device} · ${guide.browser}`}
        </h2>

        {id === "in-app" && (
          <p className="mt-3 text-lg leading-relaxed text-stone-700">
            You opened this page inside {ctx.inAppName ?? "another app"}. Installing doesn&apos;t work in there. Open it in your
            regular browser first.
          </p>
        )}

        {SEPARATE_PROGRESS.includes(id) && (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-base leading-relaxed text-amber-900">
            <strong className="font-semibold">Good to know before you start:</strong> on{" "}
            {id === "mac-safari" ? "a Mac" : "iPhone and iPad"} the app keeps its own progress, separate from Safari. Modules you
            marked complete here won&apos;t show as complete in the app.
          </p>
        )}

        {showPrompt && (
          <div className="mt-5">
            <button type="button" onClick={() => void prompt()} className="install-primary w-full text-lg sm:w-auto sm:px-10">
              Install the app
            </button>
            <p className="mt-3 text-base text-stone-600">One tap. Your browser will ask you to confirm. Or follow these steps:</p>
          </div>
        )}

        <div className="mt-5">
          <InstallGuide guide={guide} headingId="steps-title" />
        </div>

        {needsLink && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {id === "ios-safari" && (
              <p className="w-full text-base text-stone-600">
                Opened this from Gmail or another app and don&apos;t see these buttons? Copy the link and open it in Safari.
              </p>
            )}
            {copyButton}
          </div>
        )}

        <div className="mt-6">
          <button
            type="button"
            onClick={() => setPicking(!picking)}
            aria-expanded={picking}
            aria-controls="device-list"
            className="install-secondary"
          >
            Show steps for another device
          </button>
          {picking && (
            <ul id="device-list" className="mt-3 grid gap-2 sm:grid-cols-2">
              {guideMenu.map((g) => (
                <li key={g.id}>
                  <button
                    type="button"
                    aria-pressed={g.id === id}
                    onClick={() => {
                      setChosen(g.id);
                      setPicking(false);
                      requestAnimationFrame(() => stepsRef.current?.focus());
                    }}
                    className={`w-full min-h-[48px] rounded-xl border px-4 py-2 text-left text-base font-medium ${
                      g.id === id ? "border-[#0F6E56] bg-[#E1F5EE] text-stone-900" : "border-stone-200 bg-white text-stone-700"
                    }`}
                  >
                    {g.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {!ctx.mobile && (
        <section aria-labelledby="phone-title" className="flex flex-col items-center gap-6 rounded-2xl border border-stone-200 bg-white p-6 sm:flex-row">
          <div className="rounded-xl border border-stone-200 bg-white p-3">
            <svg
              viewBox={`0 0 ${phoneQr.viewBox} ${phoneQr.viewBox}`}
              shapeRendering="crispEdges"
              className="block h-40 w-40"
              role="img"
              aria-label="QR code linking to this page"
            >
              <rect width="100%" height="100%" fill="#ffffff" />
              <path fill="#1c1917" d={phoneQr.d} />
            </svg>
          </div>
          <div>
            <h2 id="phone-title" className="text-xl font-bold text-stone-900">
              Install it on your phone
            </h2>
            <p className="mt-2 text-lg leading-relaxed text-stone-700">
              Point your phone&apos;s camera at the code. This page opens on your phone with the steps for it.
            </p>
          </div>
        </section>
      )}

      <section aria-labelledby="why-title">
        <h2 id="why-title" className="text-xl font-bold text-stone-900">
          Why install?
        </h2>
        <ul className="mt-3 space-y-2 text-lg text-stone-700">
          <li className="flex gap-3">
            <span className="text-[#0F6E56]" aria-hidden="true">✓</span>One tap to open, right from your home screen or dock.
          </li>
          <li className="flex gap-3">
            <span className="text-[#0F6E56]" aria-hidden="true">✓</span>Picks up where you left off.
          </li>
          <li className="flex gap-3">
            <span className="text-[#0F6E56]" aria-hidden="true">✓</span>Your path and progress in one place.
          </li>
        </ul>
      </section>

      <section aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-xl font-bold text-stone-900">
          Questions
        </h2>
        <dl className="mt-3 divide-y divide-stone-200 border-y border-stone-200">
          <Faq q="Is it free?">Yes.</Faq>
          <Faq q="Does it take space on my phone?">Almost none. It&apos;s the same website.</Faq>
          <Faq q="Do I need an account?">No.</Faq>
          <Faq q="How do I remove it?">
            <ul className="mt-1 space-y-2">
              <li>
                <strong className="font-semibold">iPhone or iPad:</strong> press and hold the icon, tap “Remove App”, then confirm.
              </li>
              <li>
                <strong className="font-semibold">Android:</strong> press and hold the icon and tap “Uninstall”. Or go to Settings, then
                Apps, tap AI Libraries, and tap “Uninstall”.
              </li>
              <li>
                <strong className="font-semibold">Chrome on a computer:</strong> open the app, click <Glyph name="kebab" /> at the top
                right, choose “Uninstall AI for Academic Libraries”, then “Remove”.
              </li>
              <li>
                <strong className="font-semibold">Edge on a computer:</strong> type edge://apps in the address bar, click “Details” on
                AI for Academic Libraries, then “Uninstall”.
              </li>
              <li>
                <strong className="font-semibold">Mac (Safari):</strong> in Finder, choose Go, then Home, open the Applications folder,
                and drag the app to the Trash.
              </li>
            </ul>
          </Faq>
          <Faq q="Will my checkmarks come with me?">
            <strong className="font-semibold">On iPhone and iPad, no.</strong> The app keeps its own progress, separate from Safari.
            The same goes for Safari on a Mac. In Chrome or Edge, the app and the browser share the same progress.
          </Faq>
        </dl>
      </section>
    </div>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="py-4">
      <dt className="text-lg font-semibold text-stone-900">{q}</dt>
      <dd className="mt-1 text-lg leading-relaxed text-stone-700">{children}</dd>
    </div>
  );
}
