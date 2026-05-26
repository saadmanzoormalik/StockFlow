import { CheckCircle2, CreditCard, Link2, LockKeyhole, ShieldCheck } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { Nav } from "@/components/Nav";

const providers = [
  {
    name: "Plaid",
    role: "Bank and brokerage connectivity"
  },
  {
    name: "SnapTrade",
    role: "Brokerage holdings and account sync"
  },
  {
    name: "Yodlee",
    role: "Financial account aggregation"
  },
  {
    name: "MX",
    role: "Consumer finance data access"
  }
];

export default function AccountPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-4xl space-y-6 px-4 pb-28 pt-6 sm:px-6 sm:py-8 lg:px-8">
        <section>
          <p className="text-sm font-semibold text-signal dark:text-sky-300">Start trial and connect portfolio</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">Make your picks portfolio-aware.</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
            The paid experience should begin by linking a brokerage account, then ranking picks around what the user already owns, their risk setting, and missing sector exposure.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-line bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <LockKeyhole className="text-signal dark:text-sky-300" size={22} />
              <h2 className="text-xl font-bold">1. Create Trial</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Demo mode grants access without real authentication. Production should connect Supabase Auth or Clerk before launch.
            </p>
            <div className="mt-4 rounded-lg bg-panel p-3 text-sm dark:bg-slate-800">
              Status: <strong>Demo trial active</strong>
            </div>
          </article>

          <article className="rounded-lg border border-line bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <CreditCard className="text-growth dark:text-emerald-300" size={22} />
              <h2 className="text-xl font-bold">2. Activate Subscription</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              $29.99/month after a 3-4 day free trial. Production should use Stripe Checkout and a customer portal.
            </p>
            <button className="mt-4 h-11 rounded-lg bg-ink px-5 text-sm font-semibold text-white dark:bg-white dark:text-ink">
              Start Free Trial
            </button>
          </article>
        </section>

        <section className="rounded-lg border border-line bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <Link2 className="text-signal dark:text-sky-300" size={22} />
            <h2 className="text-xl font-bold">3. Connect Portfolio</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Provider buttons are placeholders for the MVP demo. In production, this step should securely sync holdings, cost basis where available, account type, and portfolio concentration so alerts become personally relevant.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {providers.map((provider) => (
              <button
                key={provider.name}
                className="flex min-h-16 items-center justify-between gap-3 rounded-lg border border-line bg-panel p-3 text-left dark:border-slate-700 dark:bg-slate-800"
              >
                <div>
                  <p className="font-semibold">{provider.name}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{provider.role}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-signal dark:bg-slate-900 dark:text-sky-300">Connect</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-panel p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <ShieldCheck size={17} className="mt-0.5 shrink-0 text-growth dark:text-emerald-300" />
            <span>Production should use read-only access, clear consent, token encryption, and provider-level disconnect controls.</span>
          </div>
        </section>

        <section className="rounded-lg border border-line bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold">Production Checklist</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
            {[
              "Create auth users and protected dashboard routes",
              "Create Stripe price for $29.99/month",
              "Store subscription state on the user profile",
              "Connect portfolio provider and sync holdings",
              "Generate missing-exposure and overlap alerts",
              "Gate premium pick details after trial expiration",
              "Log user actions for feedback and evaluation"
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-growth dark:text-emerald-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <Disclaimer />
      </main>
    </>
  );
}
