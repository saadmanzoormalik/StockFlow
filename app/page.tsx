import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Link2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { ThemeToggle } from "@/components/ThemeToggle";

const strategyOptions = [
  ["Conservative", "Lower volatility, stronger balance sheets, established revenue"],
  ["Balanced", "Best risk/reward across growth, valuation, and infrastructure exposure"],
  ["Aggressive", "Higher upside, earlier-stage themes, more volatility"]
];

const providerOptions = ["Plaid", "SnapTrade", "Yodlee", "MX"];
const valueCards: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Target,
    title: "Top pick first",
    body: "The product starts with the recommendation, then explains the reason."
  },
  {
    icon: BarChart3,
    title: "Adaptive fit",
    body: "Risk answers and connected holdings personalize the ranking."
  },
  {
    icon: ShieldCheck,
    title: "Learns safely",
    body: "User actions become learning signals with validation gates."
  }
];

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-white text-ink dark:bg-slate-950 dark:text-white">
      <section className="relative overflow-hidden border-b border-line dark:border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#E6FFFA_0%,#FFFFFF_48%,#EBF8FF_100%)] dark:bg-[linear-gradient(135deg,#102A43_0%,#101820_52%,#0F2A2E_100%)]" />
        <div className="absolute right-4 top-4 z-10">
          <ThemeToggle />
        </div>

        <div className="relative mx-auto grid min-h-screen max-w-7xl content-center gap-6 px-4 pb-8 pt-20 sm:px-6 lg:grid-cols-[1fr_430px] lg:gap-10 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-signal shadow-sm ring-1 ring-line dark:bg-slate-900 dark:text-sky-300 dark:ring-slate-700">
              <Sparkles size={16} />
              Personalized top stock picks
            </div>
            <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.98] sm:text-6xl">
              Get your top stock pick for how you invest.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8 dark:text-slate-300">
              Agentic AI measures your risk appetite, reads your portfolio context, and explains why each pick fits your strategy.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/account" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-ink px-6 font-semibold text-white dark:bg-white dark:text-ink">
                Start Free Trial
                <ArrowRight size={18} />
              </Link>
              <Link href="/dashboard" className="inline-flex h-12 items-center justify-center rounded-lg border border-line bg-white px-6 font-semibold text-ink shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                See My Sample Pick
              </Link>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">$29.99/month after a 3-4 day free trial. Cancel anytime.</p>
          </div>

          <aside className="rounded-[18px] border border-line bg-white p-4 shadow-soft sm:p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Personalized top pick</p>
                <h2 className="mt-1 text-4xl font-bold leading-none">VRT</h2>
              </div>
              <div className="rounded-xl bg-panel px-3 py-2 text-right dark:bg-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">Fit</p>
                <p className="text-xl font-bold text-growth dark:text-emerald-300">86</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-panel p-4 dark:bg-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-growth dark:text-emerald-300">
                <TrendingUp size={17} />
                Why the AI picked it
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                Your profile is balanced, your sample portfolio is AI-compute heavy, and VRT adds cooling/power exposure with a clear 3-9 month catalyst window.
              </p>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {strategyOptions.map(([title, body], index) => (
                <div key={title} className={`min-w-[210px] rounded-2xl border p-3 ${index === 1 ? "border-ink bg-ink text-white dark:border-white dark:bg-white dark:text-ink" : "border-line bg-white dark:border-slate-700 dark:bg-slate-900"}`}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold">{title}</p>
                    {index === 1 ? <CheckCircle2 size={18} /> : null}
                  </div>
                  <p className={`mt-1 text-xs leading-5 ${index === 1 ? "text-slate-200 dark:text-slate-700" : "text-slate-500 dark:text-slate-400"}`}>{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-line p-4 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Link2 size={18} className="text-signal dark:text-sky-300" />
                <h3 className="font-bold">Portfolio-aware alerts</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Connect so the system can adapt picks around holdings, overlap, missing exposure, and changing risk appetite.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {providerOptions.map((provider) => (
                  <span key={provider} className="rounded-full bg-panel px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {provider}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
        {valueCards.map(({ icon: Icon, title, body }) => (
          <article key={title} className="rounded-lg border border-line bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <Icon className="text-signal dark:text-sky-300" size={24} />
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{body}</p>
          </article>
        ))}
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Disclaimer />
      </div>
    </main>
  );
}
