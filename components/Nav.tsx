import Link from "next/link";
import { BarChart3, Bell, Gauge, LineChart, Sparkles, UserCircle } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/rotation", label: "Rotation", icon: Bell },
  { href: "/performance", label: "Performance", icon: LineChart },
  { href: "/account", label: "Account", icon: UserCircle }
];

export function Nav() {
  return (
    <>
    <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-white dark:bg-white dark:text-ink">
              <Sparkles size={18} />
            </span>
            <span className="leading-tight">Stock Pick Check</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <item.icon size={17} />
                <span>{item.label}</span>
              </Link>
            ))}
            <ThemeToggle />
          </nav>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <BarChart3 size={15} />
            <span className="leading-5">Retail-friendly rotation intelligence</span>
          </div>
          <div className="hidden md:block">
            <Disclaimer compact />
          </div>
        </div>
      </div>
    </header>
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-[0_-12px_30px_rgba(21,32,43,0.08)] backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-semibold text-slate-600 active:bg-slate-100 dark:text-slate-300 dark:active:bg-slate-800"
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
    </>
  );
}
