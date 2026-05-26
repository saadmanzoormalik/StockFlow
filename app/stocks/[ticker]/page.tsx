import { notFound } from "next/navigation";
import { Disclaimer } from "@/components/Disclaimer";
import { Nav } from "@/components/Nav";
import { RiskBadge, StrategyBadge } from "@/components/Badges";
import { mockPicks } from "@/data/mock-picks";
import { calculateScore } from "@/lib/scoring";

export function generateStaticParams() {
  return mockPicks.map((pick) => ({ ticker: pick.ticker }));
}

export default function StockDetailPage({ params }: { params: { ticker: string } }) {
  const pick = mockPicks.find((item) => item.ticker === params.ticker.toUpperCase());

  if (!pick) {
    notFound();
  }

  const score = calculateScore(pick);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-7xl space-y-6 px-4 pb-28 pt-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StrategyBadge strategy={pick.strategyType} />
              <RiskBadge risk={pick.riskLevel} />
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{pick.expectedTimeline}</span>
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-none sm:text-5xl">{pick.ticker}</h1>
            <p className="mt-1 text-xl text-slate-600 dark:text-slate-300">{pick.company}</p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8 dark:text-slate-300">{pick.thesisSummary}</p>
          </div>
          <aside className="rounded-lg border border-line bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">Current score</p>
            <p className="mt-2 text-5xl font-bold text-growth dark:text-emerald-300">{score}</p>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-3"><span className="text-slate-500 dark:text-slate-400">Expected return</span><strong>{pick.expectedReturn}</strong></div>
              <div className="flex justify-between gap-3"><span className="text-slate-500 dark:text-slate-400">Confidence</span><strong>{pick.confidenceScore}%</strong></div>
              <div className="flex justify-between gap-3"><span className="text-slate-500 dark:text-slate-400">Rotation phase</span><strong className="text-right">{pick.rotationPhase}</strong></div>
            </div>
          </aside>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Revenue growth potential", pick.revenueGrowthPotential],
            ["EPS/revenue beat history", pick.beatHistory],
            ["Valuation vs growth", pick.valuationVsGrowth],
            ["Key catalyst", pick.keyCatalyst]
          ].map(([title, body]) => (
            <article key={title} className="rounded-lg border border-line bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{body}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["Bullish case", pick.bullishCase],
            ["Base case", pick.baseCase],
            ["Bear case", pick.bearCase]
          ].map(([title, body]) => (
            <article key={title} className="rounded-lg border border-line bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{body}</p>
            </article>
          ))}
        </section>

        <section className="rounded-lg border border-line bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold">Key Metrics To Watch</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {pick.metricsToWatch.map((metric) => (
              <span key={metric} className="rounded-full bg-panel px-3 py-1.5 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{metric}</span>
            ))}
          </div>
        </section>

        <Disclaimer />
      </main>
    </>
  );
}
