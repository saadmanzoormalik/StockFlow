import { ArrowRight } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { Nav } from "@/components/Nav";
import { RiskBadge } from "@/components/Badges";
import { rotationTimeline } from "@/data/mock-picks";

export default function RotationPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-7xl space-y-6 px-4 pb-28 pt-6 sm:px-6 sm:py-8 lg:px-8">
        <section>
          <p className="text-sm font-semibold text-signal dark:text-sky-300">Macro-to-micro rotation model</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">Rotation Timeline</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
            The app looks for the next mandatory bottleneck instead of simply chasing the hottest ticker today.
          </p>
        </section>

        <section className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:px-0 md:grid-cols-2 lg:grid-cols-4">
          {["AI Compute", "AI Networking", "Cooling/Power", "Grid/Electrical Infrastructure", "Electricity Generation", "Nuclear/Uranium", "Physical AI/Robotics", "Strategic Materials"].map((step, index, arr) => (
            <div key={step} className="flex min-w-[210px] items-center gap-3 rounded-lg border border-line bg-white p-3 shadow-sm sm:min-w-0 dark:border-slate-800 dark:bg-slate-900">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-white dark:bg-white dark:text-ink">{index + 1}</div>
              <p className="text-sm font-semibold leading-tight">{step}</p>
              {index < arr.length - 1 ? <ArrowRight className="ml-auto hidden text-slate-400 sm:block" size={18} /> : null}
            </div>
          ))}
        </section>

        <section className="grid gap-3 lg:hidden">
          {rotationTimeline.map((row) => (
            <article key={row.window} className="rounded-lg border border-line bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-signal dark:text-sky-300">{row.window}</p>
                  <h2 className="mt-1 text-xl font-bold leading-tight">{row.theme}</h2>
                </div>
                <RiskBadge risk={row.riskLevel} />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{row.whyItMatters}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-panel p-3 dark:bg-slate-800">
                  <p className="text-slate-500 dark:text-slate-400">Best stocks</p>
                  <p className="mt-1 font-semibold">{row.bestStocks.join(", ")}</p>
                </div>
                <div className="rounded-lg bg-panel p-3 dark:bg-slate-800">
                  <p className="text-slate-500 dark:text-slate-400">Gain range</p>
                  <p className="mt-1 font-semibold">{row.expectedGainRange}</p>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold">{row.cta}</p>
            </article>
          ))}
        </section>

        <section className="hidden overflow-hidden rounded-lg border border-line bg-white shadow-sm lg:block dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-left text-sm">
              <thead className="bg-panel text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3">Window</th>
                  <th className="px-4 py-3">Rotation Theme</th>
                  <th className="px-4 py-3">Why It Matters</th>
                  <th className="px-4 py-3">Best Stocks</th>
                  <th className="px-4 py-3">Expected Gain Range</th>
                  <th className="px-4 py-3">Risk</th>
                  <th className="px-4 py-3">CTA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line dark:divide-slate-800">
                {rotationTimeline.map((row) => (
                  <tr key={row.window} className="align-top">
                    <td className="px-4 py-4 font-semibold">{row.window}</td>
                    <td className="px-4 py-4">{row.theme}</td>
                    <td className="max-w-md px-4 py-4 text-slate-600 dark:text-slate-300">{row.whyItMatters}</td>
                    <td className="px-4 py-4 font-semibold">{row.bestStocks.join(", ")}</td>
                    <td className="px-4 py-4">{row.expectedGainRange}</td>
                    <td className="px-4 py-4"><RiskBadge risk={row.riskLevel} /></td>
                    <td className="px-4 py-4">{row.cta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <Disclaimer />
      </main>
    </>
  );
}
