"use client";

import { useId, useRef, useState } from "react";
import type { ModuleQuizQuestion } from "@/content/module-quizzes";

// Optional three-question self-check at the end of a module. Nothing is saved or graded.
// One question at a time; the numbered steps let people answer in any order. Picking an
// answer shows the right one and its explanation straight away.
export default function ModuleQuiz({ questions, accent }: { questions: ModuleQuizQuestion[]; accent: string }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const promptRef = useRef<HTMLParagraphElement>(null);
  const panelId = useId();
  const answered = picked.filter((p) => p !== null).length;
  const correct = picked.filter((p, i) => p === questions[i].answer).length;
  const allDone = answered === questions.length;

  const q = questions[current];
  const choice = picked[current];
  const done = choice !== null;
  const right = choice === q.answer;
  // Next question still to answer, looking forward first and then wrapping around.
  const nextOpen = questions.map((_, k) => (current + 1 + k) % questions.length).find((i) => picked[i] === null);

  function goTo(i: number) {
    setCurrent(i);
    requestAnimationFrame(() => promptRef.current?.focus({ preventScroll: true }));
  }

  function restart() {
    setPicked(questions.map(() => null));
    goTo(0);
  }

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
          <div className="pt-6">
            <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: accent }}>
                  Question {current + 1} of {questions.length}
                </p>
                <ol className="flex gap-2" aria-label="Choose a question">
                  {questions.map((item, i) => {
                    const p = picked[i];
                    const state = p === null ? "open" : p === item.answer ? "right" : "wrong";
                    return (
                      <li key={i}>
                        <button
                          type="button"
                          onClick={() => goTo(i)}
                          aria-current={i === current ? "step" : undefined}
                          aria-label={`Question ${i + 1}${state === "right" ? ", answered correctly" : state === "wrong" ? ", answered incorrectly" : ""}`}
                          className={`quiz-step is-${state} ${i === current ? "is-current" : ""}`}
                          style={{ "--c": accent } as React.CSSProperties}
                        >
                          {state === "right" ? "✓" : state === "wrong" ? "✕" : i + 1}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div key={current} className="quiz-slide">
                <p ref={promptRef} tabIndex={-1} className="mt-3 font-semibold text-stone-900 leading-snug focus:outline-none">
                  {q.prompt}
                </p>
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
                          onClick={() => setPicked((prev) => prev.map((p, i) => (i === current ? oi : p)))}
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
                      <p className={`text-sm font-bold ${right ? "text-green-800" : "text-red-800"}`}>{right ? "Correct." : "Not quite."}</p>
                      <p className="mt-1 text-sm leading-relaxed text-stone-700">{q.explanation}</p>
                    </div>
                  )}
                </div>
              </div>

              {done && (
                <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {allDone ? (
                    <>
                      <p className="text-sm font-semibold text-stone-800" role="status">
                        You got {correct} of {questions.length} right{correct === questions.length ? " - nicely done." : "."}
                      </p>
                      <button
                        type="button"
                        onClick={restart}
                        className="min-h-[44px] rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-700 hover:border-stone-400"
                      >
                        Try again
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => nextOpen !== undefined && goTo(nextOpen)}
                      className="quiz-next sm:ml-auto"
                      style={{ "--c": accent } as React.CSSProperties}
                    >
                      Next question
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
