import { AlertTriangle, TrendingUp } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { Nav } from "@/components/Nav";
import { PickCard } from "@/components/PickCard";
import { PicksTable } from "@/components/PicksTable";
import { DailyIntelligenceFeed } from "@/components/DailyIntelligenceFeed";
import { MobileConstructTabs } from "@/components/MobileConstructTabs";
import { morningBriefing } from "@/data/daily-intelligence";
import { alerts, mockPicks } from "@/data/mock-picks";
import { productProcesses } from "@/data/product-processes";
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
            <p className="text-sm font-semibold text-signal dark:text-sky-300">Decision system: discover, decide, protect, connect, improve</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">Your Daily Stock Pick OS</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
              A mobile-first flow that turns market noise into one personalized stock decision, then adapts from portfolio context and feedback.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">Market Outperformance Score</p>
            <p className="mt-1 text-3xl font-bold text-growth dark:text-emerald-300">82/100</p>
          </div>
        </section>

        <MobileConstructTabs />

        <section id="discover">
          <DailyIntelligenceFeed briefing={morningBriefing} />
        </section>

        <section className="grid gap-3 md:grid-cols-5">
          {productProcesses.map((process) => (
            <article key={process.id} className="rounded-lg border border-line bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-bold">{process.label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{process.promise}</p>
              <a href={`#${process.id}`} className="mt-4 flex min-h-11 items-center justify-center rounded-lg bg-ink px-3 text-sm font-bold text-white dark:bg-white dark:text-ink">
                {process.primaryAction}
              </a>
            </article>
          ))}
        </section>

        <section id="decide" className="rounded-lg border border-line bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-semibold text-signal dark:text-sky-300">Decide: personalized AI top pick</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight">{personalizedTopPick.ticker} fits your sample profile</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                The Decision Agent converts discovery signals into a simple review: expected range, timeline, confidence, catalyst, and what would change the recommendation.
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
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {productProcesses[1].secondaryActions.map((action) => (
              <button key={action} className="min-h-11 rounded-lg border border-line bg-white px-3 text-sm font-bold dark:border-slate-700 dark:bg-slate-900">
                {action}
              </button>
            ))}
            <button className="min-h-11 rounded-lg bg-panel px-3 text-sm font-bold dark:bg-slate-800">Pass today</button>
          </div>
        </section>

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

        <section id="protect" className="grid gap-4 lg:grid-cols-[1fr_380px]">
          <article className="rounded-lg border border-line bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-growth dark:text-emerald-300" size={22} />
              <h2 className="text-lg font-bold sm:text-xl">Protect: risk and rotation guardrail</h2>
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
              <h2 className="text-lg font-bold sm:text-xl">Unique actions</h2>
            </div>
            <div className="mt-4 space-y-3">
              {alerts.slice(0, 2).map((alert) => (
                <div key={alert.title} className="rounded-lg bg-panel p-3 dark:bg-slate-800">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{alert.title}</p>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{alert.createdAt}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{alert.message}</p>
                </div>
              ))}
              {productProcesses[2].secondaryActions.map((action) => (
                <button key={action} className="w-full min-h-11 rounded-lg border border-line bg-white px-3 text-sm font-bold dark:border-slate-700 dark:bg-slate-900">
                  {action}
                </button>
              ))}
            </div>
          </article>
        </section>

        <section id="connect" className="rounded-lg border border-line bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold text-signal dark:text-sky-300">Connect: portfolio context</p>
          <h2 className="mt-1 text-2xl font-bold">Connect holdings to adapt the picks.</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            The portfolio layer should detect overlap, concentration, missing exposure, and whether a new pick improves balance.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {productProcesses[3].secondaryActions.map((action) => (
              <button key={action} className="min-h-11 rounded-lg border border-line bg-white px-3 text-sm font-bold dark:border-slate-700 dark:bg-slate-900">
                {action}
              </button>
            ))}
            <button className="min-h-11 rounded-lg bg-ink px-3 text-sm font-bold text-white dark:bg-white dark:text-ink">Connect securely</button>
          </div>
        </section>

        <section id="improve" className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-signal dark:text-sky-300">Improve: recursive learning loop</p>
            <h2 className="mt-1 text-2xl font-bold">The system gets sharper from validated user behavior.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Saves, skips, connected holdings, and risk changes become feedback events. Production model updates still pass evaluation and governance gates before deployment.
            </p>
          </div>
          <PicksTable picks={picks} />
        </section>
        <Disclaimer />
      </main>
    </>
  );
}
