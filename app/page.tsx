import { Disclaimer } from "@/components/Disclaimer";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-white text-ink dark:bg-slate-950 dark:text-white">
      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>
      <OnboardingFlow />
      <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6 lg:px-8">
        <Disclaimer />
      </div>
    </main>
  );
}
