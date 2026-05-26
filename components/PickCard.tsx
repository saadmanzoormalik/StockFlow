import Link from "next/link";
import { ArrowRight, Clock, Target } from "lucide-react";
import { RiskBadge, StrategyBadge } from "@/components/Badges";
import { RankedPick } from "@/lib/types";

export function PickCard({ title, pick }: { title: string; pick: RankedPick }) {
  return (
    <article className="rounded-lg border border-line bg-white p-4 shadow-soft sm:p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="mt-2 text-2xl font-bold leading-none">{pick.ticker}</h3>
          <p className="mt-1 truncate text-sm text-slate-600 dark:text-slate-300">{pick.company}</p>
        </div>
        <div className="shrink-0 rounded-lg bg-panel px-3 py-2 text-right dark:bg-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">Score</p>
          <p className="text-xl font-bold text-growth dark:text-emerald-300">{pick.finalScore}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <StrategyBadge strategy={pick.strategyType} />
        <RiskBadge risk={pick.riskLevel} />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-300">{pick.whyPicked}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm sm:gap-3">
        <div className="rounded-lg bg-panel p-3 dark:bg-slate-800">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Target size={15} />
            <span className="leading-tight">Expected range</span>
          </div>
          <p className="mt-1 font-semibold">{pick.expectedReturn}</p>
        </div>
        <div className="rounded-lg bg-panel p-3 dark:bg-slate-800">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Clock size={15} />
            <span className="leading-tight">Timeline</span>
          </div>
          <p className="mt-1 font-semibold">{pick.expectedTimeline}</p>
        </div>
      </div>
      <Link href={`/stocks/${pick.ticker}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-signal dark:text-sky-300">
        Why this stock?
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
