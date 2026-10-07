"use client";

import { useProgress } from "@/lib/progress";

export default function CompleteButton({
  slug,
  accent,
}: {
  slug: string;
  accent: string;
}) {
  const { isComplete, toggle } = useProgress();
  const done = isComplete(slug);
  const buttonStyle = {
    ...(done
      ? { backgroundColor: accent, borderColor: accent, color: "#fff" }
      : { backgroundColor: "#fff", borderColor: `${accent}55`, color: accent }),
    "--c": accent,
  } as unknown as React.CSSProperties;

  return (
    <div className="rv mt-12 flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={done}
        className="btn-complete inline-flex items-center gap-2.5 rounded-full border px-6 py-3 text-sm font-semibold"
        style={
buttonStyle
        }
      >
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full border"
          style={
            done
              ? { backgroundColor: "#fff", borderColor: "#fff" }
              : { borderColor: `${accent}80` }
          }
          aria-hidden="true"
        >
          {done && (
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill={accent}>
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
        {done ? "Completed" : "Mark this module complete"}
      </button>
      <p className="text-xs text-stone-400">
        {done
          ? "Saved in this browser. Tap again to undo."
          : "Tracks your progress on this device - no account needed."}
      </p>
    </div>
  );
}
