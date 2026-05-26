import { MorningBriefing } from "@/lib/types";

const actionStyles: Record<MorningBriefing["items"][number]["action"], string> = {
  Buy: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-800",
  Watch: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:ring-sky-800",
  Avoid: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-950 dark:text-red-300 dark:ring-red-800",
  Trim: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-800",
  Learn: "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
};

export function DailyIntelligenceFeed({ briefing }: { briefing: MorningBriefing }) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-signal dark:text-sky-300">Morning decision briefing</p>
        <h2 className="mt-1 text-2xl font-bold leading-tight">{briefing.primaryDecision}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {briefing.notificationBody}
        </p>
      </div>
      <div className="rounded-lg border border-line bg-ink p-4 text-white shadow-sm dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Nudge notification</p>
        <h3 className="mt-1 text-lg font-bold">{briefing.notificationTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-200">{briefing.balanceRule}</p>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {briefing.items.map((item) => (
          <article key={item.id} className="rounded-lg border border-line bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{item.category}</p>
                <h3 className="mt-1 text-lg font-bold leading-tight">{item.title}</h3>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${actionStyles[item.action]}`}>
                {item.action}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.summary}</p>
            <div className="mt-4 space-y-2 rounded-lg bg-panel p-3 text-xs leading-5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <p><strong className="text-ink dark:text-white">Model factor:</strong> {item.algorithmFactor}</p>
              <p><strong className="text-ink dark:text-white">Missing:</strong> {item.missingSignal}</p>
              <p><strong className="text-ink dark:text-white">Decision:</strong> {item.userDecision}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg bg-panel p-3 dark:bg-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">Confidence</p>
                <p className="mt-1 font-semibold">{item.confidence}%</p>
              </div>
              <div className="rounded-lg bg-panel p-3 dark:bg-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">Read time</p>
                <p className="mt-1 font-semibold">{item.timeToReadMinutes} min</p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">{item.decisionKpi}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
