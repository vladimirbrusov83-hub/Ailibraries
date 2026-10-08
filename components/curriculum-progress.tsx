"use client";

import { useProgress } from "@/lib/progress";

export default function CurriculumProgress({
  slugs,
}: {
  // Slugs of every published module, so the count matches what's readable today.
  slugs: string[];
}) {
  const { completed, ready, reset } = useProgress();
  const total = slugs.length;
  const done = ready ? slugs.filter((s) => completed.has(s)).length : 0;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="card-soft mb-8 rounded-xl border border-stone-200 bg-white p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-stone-900">Your progress</p>
        <p className="text-sm text-stone-500">
          <span className="font-semibold text-stone-800">{done}</span> of {total}{" "}
          complete
        </p>
      </div>
      <div
        className="mt-3 h-2 w-full overflow-hidden rounded-full bg-stone-100"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Modules completed"
      >
        <div
          className="h-full rounded-full transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%`, backgroundColor: "#0F6E56" }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-stone-500">
          {done === 0
            ? "Mark modules complete as you finish them - saved in this browser."
            : done === total
            ? "Every published module complete. Nicely done."
            : `${pct}% of the way through.`}
        </p>
        {done > 0 && (
          <button
            type="button"
            onClick={reset}
            className="text-xs font-medium text-stone-500 underline underline-offset-2 hover:text-stone-600"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
