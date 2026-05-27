import { productProcesses } from "@/data/product-processes";

export function MobileConstructTabs() {
  return (
    <nav className="-mx-4 flex gap-2 overflow-x-auto border-y border-line bg-white px-4 py-2 md:mx-0 md:rounded-lg md:border dark:border-slate-800 dark:bg-slate-900">
      {productProcesses.map((process, index) => (
        <a
          key={process.id}
          href={`#${process.id}`}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
            index === 0
              ? "bg-ink text-white dark:bg-white dark:text-ink"
              : "border border-line text-slate-600 dark:border-slate-700 dark:text-slate-300"
          }`}
        >
          {process.label}
        </a>
      ))}
    </nav>
  );
}
