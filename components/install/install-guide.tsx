import type { Guide } from "@/components/install/steps";

// The full step-by-step list: big text, one action per step, real list markup.
export default function InstallGuide({ guide, headingId }: { guide: Guide; headingId?: string }) {
  return (
    <div>
      <ol className="space-y-3" aria-labelledby={headingId}>
        {guide.steps.map((step, i) => (
          <li key={i} className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
            <span
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0F6E56] text-base font-bold text-white"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <p className="flex-1 text-lg leading-relaxed text-stone-800">{step}</p>
          </li>
        ))}
      </ol>
      {guide.note && <p className="mt-4 rounded-xl bg-stone-100 px-4 py-3 text-base leading-relaxed text-stone-700">{guide.note}</p>}
    </div>
  );
}
