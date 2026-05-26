"use client";

import Link from "next/link";
import { ArrowRight, Clock, Target, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { RiskBadge, StrategyBadge } from "@/components/Badges";
import { StrategyFilter } from "@/components/StrategyFilter";
import { RankedPick, StrategyType } from "@/lib/types";

export function PicksTable({ picks }: { picks: RankedPick[] }) {
  const [strategy, setStrategy] = useState<StrategyType | "All">("All");

  const filtered = useMemo(
    () => picks.filter((pick) => (strategy === "All" ? true : pick.strategyType === strategy)),
    [picks, strategy]
  );

  return (
    <section className="space-y-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold leading-tight">Ranked Stock Picks</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Probability-weighted picks from the mock rotation model.
          </p>
        </div>
        <StrategyFilter active={strategy} onChange={setStrategy} />
      </div>

      <div className="grid gap-3 lg:hidden">
        {filtered.map((pick) => (
          <Link
            key={pick.ticker}
            href={`/stocks/${pick.ticker}`}
            className="rounded-lg border border-line bg-white p-4 shadow-sm active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-ink px-2 py-1 text-xs font-bold text-white dark:bg-white dark:text-ink">#{pick.rank}</span>
                  <StrategyBadge strategy={pick.strategyType} />
                </div>
                <h3 className="mt-3 text-2xl font-bold leading-none">{pick.ticker}</h3>
                <p className="mt-1 truncate text-sm text-slate-600 dark:text-slate-300">{pick.company}</p>
              </div>
              <div className="shrink-0 rounded-lg bg-panel px-3 py-2 text-right dark:bg-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">Score</p>
                <p className="text-xl font-bold text-growth dark:text-emerald-300">{pick.finalScore}</p>
              </div>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{pick.rotationTheme}</p>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{pick.whyPicked}</p>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg bg-panel p-3 dark:bg-slate-800">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Target size={15} />
                  <span>Return</span>
                </div>
                <p className="mt-1 font-semibold">{pick.expectedReturn}</p>
              </div>
              <div className="rounded-lg bg-panel p-3 dark:bg-slate-800">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Clock size={15} />
                  <span>Timeline</span>
                </div>
                <p className="mt-1 font-semibold">{pick.expectedTimeline}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <RiskBadge risk={pick.riskLevel} />
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-signal dark:text-sky-300">
                Details <ArrowRight size={16} />
              </span>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-lg bg-panel p-3 text-xs leading-5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <Zap size={15} className="mt-0.5 shrink-0 text-caution" />
              <span>{pick.keyCatalyst}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-lg border border-line bg-white shadow-sm lg:block dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-[1120px] w-full text-left text-sm">
            <thead className="bg-panel text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Ticker</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Strategy</th>
                <th className="px-4 py-3">Theme</th>
                <th className="px-4 py-3">Why It Was Picked</th>
                <th className="px-4 py-3">Return</th>
                <th className="px-4 py-3">Timeline</th>
                <th className="px-4 py-3">Risk</th>
                <th className="px-4 py-3">Confidence</th>
                <th className="px-4 py-3">Catalyst</th>
                <th className="px-4 py-3">Key Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line dark:divide-slate-800">
              {filtered.map((pick) => (
                <tr key={pick.ticker} className="align-top">
                  <td className="px-4 py-4 font-semibold">#{pick.rank}</td>
                  <td className="px-4 py-4">
                    <Link href={`/stocks/${pick.ticker}`} className="font-bold text-signal dark:text-sky-300">
                      {pick.ticker}
                    </Link>
                  </td>
                  <td className="px-4 py-4">{pick.company}</td>
                  <td className="px-4 py-4"><StrategyBadge strategy={pick.strategyType} /></td>
                  <td className="px-4 py-4">{pick.rotationTheme}</td>
                  <td className="max-w-xs px-4 py-4 text-slate-600 dark:text-slate-300">{pick.whyPicked}</td>
                  <td className="px-4 py-4 font-semibold">{pick.expectedReturn}</td>
                  <td className="px-4 py-4">{pick.expectedTimeline}</td>
                  <td className="px-4 py-4"><RiskBadge risk={pick.riskLevel} /></td>
                  <td className="px-4 py-4">{pick.confidenceScore}%</td>
                  <td className="px-4 py-4">{pick.keyCatalyst}</td>
                  <td className="px-4 py-4">{pick.keyRisk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
