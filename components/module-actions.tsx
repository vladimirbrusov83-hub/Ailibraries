"use client";

import { useState } from "react";

// Opens the device share sheet, or copies the link where there is none. Returns true when copied.
export async function sharePage(title: string): Promise<boolean> {
  const url = window.location.href;
  if (navigator.share) {
    try {
      await navigator.share({ title, url });
    } catch {
      /* user cancelled — ignore */
    }
    return false;
  }
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    /* clipboard unavailable — ignore */
    return false;
  }
}

export default function ModuleActions({
  title,
  accent,
}: {
  title: string;
  accent: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (await sharePage(title)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const buttonStyle = { borderColor: `${accent}40`, color: accent, "--c": accent } as React.CSSProperties;

  return (
    <>
      <button
        type="button"
        onClick={() => window.print()}
        className="btn-soft inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold"
        style={buttonStyle}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" />
        </svg>
        Print
      </button>
      <button
        type="button"
        onClick={handleShare}
        className="btn-soft inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold"
        style={buttonStyle}
      >
        {copied ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        )}
        {copied ? "Link copied" : "Share"}
      </button>
    </>
  );
}
