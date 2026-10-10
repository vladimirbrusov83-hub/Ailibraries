"use client";

import { useId, useState } from "react";
import type { ModuleQuizQuestion } from "@/content/module-quizzes";

// Optional three-question self-check at the end of a module. Nothing is saved or graded:
// pick an answer and the right one and its explanation show straight away.
export default function ModuleQuiz({ questions, accent }: { questions: ModuleQuizQuestion[]; accent: string }) {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const panelId = useId();
  const answered = picked.filter((p) => p !== null).length;
  const correct = picked.filter((p, i) => p === questions[i].answer).length;

  return (
    <section className="no-print mt-12 flex flex-col items-center" aria-label="Module quiz">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`quiz-toggle ${open ? "is-open" : ""}`}
        style={{ "--c": accent } as React.CSSProperties}
      >
        <span className="quiz-toggle-icon" aria-hidden="true">
          ?
        </span>
        Quiz
        <span className="quiz-toggle-count">{questions.length} questions</span>
        <svg className="quiz-toggle-chevron h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <p className="mt-2 text-xs text-stone-500">Optional · not graded · answers show right away</p>

      <div id={panelId} className="quiz-panel w-full" data-open={open}>
        <div className="min-h-0 overflow-hidden">
          <div className="pt-6 space-y-4">
            {questions.map((q, qi) => {
              const choice = picked[qi];
              const done = choice !== null;
              const right = choice === q.answer;
              return (
                <div key={qi} className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: accent }}>
                    Question {qi + 1} of {questions.length}
                  </p>
                  <p className="mt-1.5 font-semibold text-stone-900 leading-snug">{q.prompt}</p>
                  <ul className="mt-4 space-y-2">
                    {q.options.map((opt, oi) => {
                      const isAnswer = oi === q.answer;
                      const isChoice = oi === choice;
                      const state = !done ? "idle" : isAnswer ? "right" : isChoice ? "wrong" : "faded";
                      return (
                        <li key={oi}>
                          <button
                            type="button"
                            disabled={done}
                            onClick={() => setPicked((prev) => prev.map((p, i) => (i === qi ? oi : p)))}
                            className={`quiz-option is-${state}`}
                            style={{ "--c": accent } as React.CSSProperties}
                          >
                            <span className="quiz-option-mark" aria-hidden="true">
                              {state === "right" ? "✓" : state === "wrong" ? "✕" : String.fromCharCode(65 + oi)}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {state === "right" && <span className="sr-only"> (correct answer)</span>}
                            {state === "wrong" && <span className="sr-only"> (your answer, incorrect)</span>}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <div role="status" aria-live="polite">
                    {done && (
                      <div
                        className="quiz-feedback mt-4 rounded-xl border px-4 py-3"
                        style={{ borderColor: right ? "#bbf7d0" : "#fecaca", backgroundColor: right ? "#f0fdf4" : "#fef2f2" }}
                      >
                        <p className={`text-sm font-bold ${right ? "text-green-800" : "text-red-800"}`}>
                          {right ? "Correct." : "Not quite."}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-stone-700">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {answered === questions.length && (
              <div className="quiz-feedback flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4">
                <p className="text-sm font-semibold text-stone-800" role="status">
                  You got {correct} of {questions.length} right
                  {correct === questions.length ? " - nicely done." : "."}
                </p>
                <button
                  type="button"
                  onClick={() => setPicked(questions.map(() => null))}
                  className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:border-stone-400"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
