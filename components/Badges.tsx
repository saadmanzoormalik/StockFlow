import { RiskLevel, StrategyType } from "@/lib/types";

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  const styles = {
    Low: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-800",
    Medium: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-800",
    High: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-950 dark:text-red-300 dark:ring-red-800"
  };

  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[risk]}`}>{risk} risk</span>;
}

export function StrategyBadge({ strategy }: { strategy: StrategyType }) {
  const styles = {
    Conservative: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:ring-sky-800",
    Balanced: "bg-teal-50 text-teal-700 ring-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:ring-teal-800",
    Aggressive: "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:ring-violet-800"
  };

  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[strategy]}`}>{strategy}</span>;
}
