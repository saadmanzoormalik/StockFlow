export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "text-xs text-slate-500 dark:text-slate-400" : "rounded-lg border border-line bg-white p-4 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"}>
      This is educational information, not financial advice. Investing involves risk. Past performance does not guarantee future results.
    </div>
  );
}
