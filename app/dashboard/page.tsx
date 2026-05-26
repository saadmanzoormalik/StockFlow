import { AlertTriangle, TrendingUp } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { Nav } from "@/components/Nav";
import { PickCard } from "@/components/PickCard";
import { PicksTable } from "@/components/PicksTable";
import { DailyIntelligenceFeed } from "@/components/DailyIntelligenceFeed";
import { morningBriefing } from "@/data/daily-intelligence";
import { alerts, mockPicks } from "@/data/mock-picks";
import { demoInvestorProfile, getPersonalizedTopPicks } from "@/lib/personalization";
import { getMarketRotationSignal, rankPicks } from "@/lib/scoring";

export default function DashboardPage() {
  const picks = rankPicks(mockPicks);
  const balanced = rankPicks(mockPicks, "Balanced")[0];
  const aggressive = rankPicks(mockPicks, "Aggressive")[0];
  const conservative = rankPicks(mockPicks, "Conservative")[0];
  const topPick = picks[0];
  const personalizedTopPick = getPersonalizedTopPicks(demoInvestorProfile)[0];
  const rotation = getMarketRotationSignal();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-7xl space-y-6 px-4 pb-28 pt-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-signal dark:text-sky-300">Decision: which stock deserves attention today?</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">Stock Pick Dashboard</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
              SQL-style facts plus deterministic rotation rules rank mock picks by bottleneck exposure, growth, guidance, valuation, and risk.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">Market Outperformance Score</p>
            <p className="mt-1 text-3xl font-bold text-growth dark:text-emerald-300">82/100</p>
          </div>
        </section>

        <section className="rounded-lg border border-line bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-semibold text-signal dark:text-sky-300">Personalized AI top pick</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight">{personalizedTopPick.ticker} fits your sample profile</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Agentic AI adapts the ranking from a generic top-pick list into a portfolio-aware recommendation using risk appetite, strategy preference, connected holdings, and learning signals.
              </p>
            </div>
            <div className="rounded-lg bg-panel px-4 py-3 text-right dark:bg-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">Personal score</p>
              <p className="text-2xl font-bold text-growth dark:text-emerald-300">{personalizedTopPick.personalizedScore}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {Object.entries(personalizedTopPick.agentRationale).map(([agent, rationale]) => (
              <div key={agent} className="rounded-lg bg-panel p-3 dark:bg-slate-800">
                <p className="text-sm font-semibold capitalize">{agent.replace("Agent", " Agent")}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{rationale}</p>
              </div>
            ))}
          </div>
        </section>

        <DailyIntelligenceFeed briefing={morningBriefing} />

        <section className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-4">
          <div className="w-[84vw] shrink-0 snap-start md:w-auto">
          <PickCard title="Top Pick Today" pick={topPick} />
          </div>
          <div className="w-[84vw] shrink-0 snap-start md:w-auto">
          <PickCard title="Best Balanced Pick" pick={balanced} />
          </div>
          <div className="w-[84vw] shrink-0 snap-start md:w-auto">
          <PickCard title="Best Aggressive Pick" pick={aggressive} />
          </div>
          <div className="w-[84vw] shrink-0 snap-start md:w-auto">
          <PickCard title="Best Conservative Pick" pick={conservative} />
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_380px]">
          <article className="rounded-lg border border-line bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-growth dark:text-emerald-300" size={22} />
              <h2 className="text-lg font-bold sm:text-xl">Next Rotation Alert</h2>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Current hot area</p>
            <p className="font-semibold">{rotation.currentHot}</p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Likely next bottleneck</p>
            <p className="font-semibold">{rotation.likelyNext}</p>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{rotation.rule}</p>
          </article>
          <article className="rounded-lg border border-line bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-caution" size={22} />
              <h2 className="text-lg font-bold sm:text-xl">Alerts</h2>
            </div>
            <div className="mt-4 space-y-3">
              {alerts.slice(0, 3).map((alert) => (
                <div key={alert.title} className="rounded-lg bg-panel p-3 dark:bg-slate-800">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{alert.title}</p>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{alert.createdAt}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{alert.message}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <PicksTable picks={picks} />
        <Disclaimer />
      </main>
    </>
  );
}
