"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { onboardingQuestions } from "@/data/onboarding";

type Answers = Record<string, string>;

export function OnboardingFlow() {
  const defaults = useMemo(
    () => Object.fromEntries(onboardingQuestions.map((question) => [question.id, question.defaultOption])),
    []
  );
  const [answers, setAnswers] = useState<Answers>(defaults);

  const riskLabel = answers.drawdown === "Low" ? "Lower risk" : answers.drawdown === "High" ? "Higher risk" : "Medium risk";
  const fitScore = answers.strategy === "Aggressive" ? 82 : answers.strategy === "Conservative" ? 79 : 86;
  const action = answers.drawdown === "High" ? "Watch for breakout" : "Watch";

  return (
    <section className="grid min-h-screen content-center gap-5 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <p className="text-sm font-semibold uppercase text-signal dark:text-sky-300">Start here</p>
        <h1 className="mt-2 max-w-2xl text-4xl font-bold leading-none sm:text-6xl">
          Get your top stock pick for how you invest.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
          Four quick answers personalize the daily briefing, risk fit, and portfolio-aware picks.
        </p>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-3">
            {onboardingQuestions.map((question, index) => (
              <article key={question.id} className="rounded-lg border border-line bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-bold">{index + 1}. {question.label}</h2>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{question.helper}</span>
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                      className={`h-10 shrink-0 rounded-full px-4 text-sm font-semibold ring-1 ${
                        answers[question.id] === option
                          ? "bg-ink text-white ring-ink dark:bg-white dark:text-ink dark:ring-white"
                          : "bg-white text-slate-700 ring-line dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-lg border border-line bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Your sample outcome</p>
                <h2 className="mt-1 text-5xl font-bold leading-none">VRT</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Vertiv</p>
              </div>
              <div className="rounded-lg bg-panel px-3 py-2 text-right dark:bg-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">Fit</p>
                <p className="text-2xl font-bold text-growth dark:text-emerald-300">{fitScore}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:ring-teal-800">{answers.strategy}</span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-800">{riskLabel}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
              AI likes cooling and power exposure for your profile, but marks it as {action} until stronger catalyst evidence appears.
            </p>
            <Link href="/dashboard#today" className="mt-5 flex h-12 items-center justify-center rounded-lg bg-ink font-semibold text-white dark:bg-white dark:text-ink">
              Enter app
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
