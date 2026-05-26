import { Disclaimer } from "@/components/Disclaimer";
import { Nav } from "@/components/Nav";
import { PerformanceChart } from "@/components/PerformanceChart";
import { performance } from "@/data/mock-picks";

const stats = [
  ["App portfolio", "+17.6%", "Historically outperformed in mock backtest"],
  ["S&P 500", "+7.5%", "Broad market benchmark"],
  ["Nasdaq", "+10.6%", "Growth-heavy benchmark"],
  ["Dow", "+5.1%", "Large industrial benchmark"],
  ["Win rate", "67%", "Monthly app portfolio outperformance rate"],
  ["Max drawdown", "-4.8%", "Largest mock monthly peak-to-trough decline"]
];

export default function PerformancePage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-7xl space-y-6 px-4 pb-28 pt-6 sm:px-6 sm:py-8 lg:px-8">
        <section>
          <p className="text-sm font-semibold text-signal dark:text-sky-300">Historical performance comparison</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">Performance Dashboard</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
            Mock backtest view comparing the app portfolio against S&P 500, Nasdaq, and Dow. This is demo data for MVP evaluation design.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(([label, value, description]) => (
            <article key={label} className="rounded-lg border border-line bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
              <p className="mt-2 text-3xl font-bold">{value}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
            </article>
          ))}
        </section>

        <div className="-mx-4 sm:mx-0">
          <PerformanceChart data={performance} />
        </div>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-line bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold">Best Picks</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li><strong className="text-ink dark:text-white">VRT:</strong> cooling/power exposure benefited from AI infrastructure demand.</li>
              <li><strong className="text-ink dark:text-white">ETN:</strong> electrical systems theme supported conservative compounding.</li>
              <li><strong className="text-ink dark:text-white">CEG:</strong> electricity scarcity narrative improved investor attention.</li>
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold">Worst Picks</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li><strong className="text-ink dark:text-white">SMR:</strong> nuclear optionality remained volatile and headline-dependent.</li>
              <li><strong className="text-ink dark:text-white">SYM:</strong> physical AI exposure had higher execution and valuation risk.</li>
            </ul>
          </article>
        </section>

        <Disclaimer />
      </main>
    </>
  );
}
