"use client";

import { StrategyType } from "@/lib/types";

const strategies: Array<StrategyType | "All"> = ["All", "Conservative", "Balanced", "Aggressive"];

export function StrategyFilter({
  active,
  onChange
}: {
  active: StrategyType | "All";
  onChange: (strategy: StrategyType | "All") => void;
}) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      {strategies.map((strategy) => (
        <button
          key={strategy}
          type="button"
          onClick={() => onChange(strategy)}
          className={`h-11 shrink-0 rounded-lg px-4 text-sm font-semibold ring-1 transition ${
            active === strategy
              ? "bg-ink text-white ring-ink dark:bg-white dark:text-ink dark:ring-white"
              : "bg-white text-slate-700 ring-line hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800"
          }`}
        >
          {strategy}
        </button>
      ))}
    </div>
  );
}
