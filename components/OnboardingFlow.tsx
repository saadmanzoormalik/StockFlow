"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Apple, Chrome, ChevronLeft, ChevronRight } from "lucide-react";
import { onboardingQuestions, onboardingValueStory } from "@/data/onboarding";

type Answers = Record<string, string>;

export function OnboardingFlow() {
  const defaults = useMemo(
    () => Object.fromEntries(onboardingQuestions.map((question) => [question.id, question.defaultOption])),
    []
  );
  const [answers, setAnswers] = useState<Answers>(defaults);
  const [step, setStep] = useState(0);

  const activeQuestion = onboardingQuestions[step - 2];
  const riskLabel = answers.drawdown === "Low" ? "Lower risk" : answers.drawdown === "High" ? "Higher risk" : "Medium risk";
  const fitScore = answers.strategy === "Aggressive" ? 82 : answers.strategy === "Conservative" ? 79 : 86;
  const action = answers.drawdown === "High" ? "Watch for breakout" : answers.drawdown === "Low" ? "Wait for confirmation" : "Watch";

  function next() {
    setStep((current) => Math.min(5, current + 1));
  }

  function back() {
    setStep((current) => Math.max(0, current - 1));
  }

  return (
    <section className="grid min-h-screen content-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-semibold uppercase text-signal dark:text-sky-300">
            {step === 0 ? "Start here" : step === 1 ? "Create account" : step < 5 ? `Question ${step - 1} of 3` : "Your outcome"}
          </p>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{step + 1}/6</p>
        </div>

        {step === 0 ? (
          <div className="space-y-5">
            <div className="rounded-lg border border-line bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <h1 className="text-5xl font-bold leading-none">{onboardingValueStory.headline}</h1>
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{onboardingValueStory.subhead}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-panel p-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Example</p>
                  <p className="mt-1 text-xl font-bold">$1,000</p>
                </div>
                <div className="rounded-lg bg-panel p-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Hypothetical upside</p>
                  <p className="mt-1 text-xl font-bold text-growth dark:text-emerald-300">+$600</p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">{onboardingValueStory.disclaimer}</p>
            </div>
            <button onClick={next} className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-ink font-semibold text-white dark:bg-white dark:text-ink">
              See my potential pick <ChevronRight size={18} />
            </button>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-5">
            <div>
              <h1 className="text-4xl font-bold leading-none">Save your picks in seconds.</h1>
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Sign up so your risk profile, watchlist, and daily briefings can adapt over time.
              </p>
            </div>
            <button onClick={next} className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-ink font-semibold text-white dark:bg-white dark:text-ink">
              <Apple size={18} /> Continue with Apple
            </button>
            <button onClick={next} className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-line bg-white font-semibold text-ink dark:border-slate-700 dark:bg-slate-900 dark:text-white">
              <Chrome size={18} /> Continue with Google
            </button>
            <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
              Demo buttons advance the prototype. Production will use Apple/Google auth.
            </p>
          </div>
        ) : null}

        {activeQuestion ? (
          <div className="space-y-5">
            <div>
              <h1 className="text-4xl font-bold leading-none">{activeQuestion.label}</h1>
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                One tap. This helps personalize your pick without turning onboarding into homework.
              </p>
            </div>
            <div className="grid gap-3">
              {activeQuestion.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setAnswers((current) => ({ ...current, [activeQuestion.id]: option }));
                    next();
                  }}
                  className={`min-h-14 rounded-lg border px-4 text-left font-semibold ${
                    answers[activeQuestion.id] === option
                      ? "border-ink bg-ink text-white dark:border-white dark:bg-white dark:text-ink"
                      : "border-line bg-white text-ink dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 5 ? (
          <div className="space-y-5">
            <div className="rounded-lg border border-line bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Your free sample picks</p>
              <h1 className="mt-2 text-5xl font-bold leading-none">VRT</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Vertiv</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:ring-teal-800">{answers.strategy}</span>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-800">{riskLabel}</span>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:ring-sky-800">{action}</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-panel p-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Fit</p>
                  <p className="mt-1 text-xl font-bold text-growth dark:text-emerald-300">{fitScore}</p>
                </div>
                <div className="rounded-lg bg-panel p-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Expected range</p>
                  <p className="mt-1 text-xl font-bold">12%-28%</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Hypothetical story: a $1,000 position with a 12%-28% move would imply $120-$280 upside before losses, taxes, and fees. Higher examples are possible historically, never guaranteed.
              </p>
            </div>
            <Link href="/dashboard#today" className="flex h-12 w-full items-center justify-center rounded-lg bg-ink font-semibold text-white dark:bg-white dark:text-ink">
              Start 7-day free trial
            </Link>
            <Link href="/dashboard#today" className="flex h-12 w-full items-center justify-center rounded-lg border border-line bg-white font-semibold text-ink dark:border-slate-700 dark:bg-slate-900 dark:text-white">
              Enter app
            </Link>
          </div>
        ) : null}

        {step > 0 && step < 5 ? (
          <button onClick={back} className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <ChevronLeft size={16} /> Back
          </button>
        ) : null}
      </div>
    </section>
  );
}
