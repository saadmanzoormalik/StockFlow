export type ProductProcess = {
  id: "discover" | "decide" | "protect" | "connect" | "improve";
  label: string;
  promise: string;
  primaryAction: string;
  secondaryActions: string[];
  features: string[];
  decisionOutput: string;
};

export const productProcesses: ProductProcess[] = [
  {
    id: "discover",
    label: "Discover",
    promise: "Find the one signal that matters this morning.",
    primaryAction: "Open briefing",
    secondaryActions: ["What changed", "Missing signal"],
    features: ["Morning nudge", "News consensus", "Algorithm factor delta"],
    decisionOutput: "A clear reason to watch, ignore, or investigate today's top setup."
  },
  {
    id: "decide",
    label: "Decide",
    promise: "Turn the signal into a simple pick, pass, or compare decision.",
    primaryAction: "Review top pick",
    secondaryActions: ["Save pick", "Compare ideas"],
    features: ["Top stock pick", "Expected return range", "Agentic rationale"],
    decisionOutput: "A probability-weighted recommendation matched to the user's profile."
  },
  {
    id: "protect",
    label: "Protect",
    promise: "Keep the user inside their real risk appetite.",
    primaryAction: "Check risk fit",
    secondaryActions: ["View bear case", "Adjust comfort"],
    features: ["Risk appetite meter", "Drawdown comfort", "Key risk alerts"],
    decisionOutput: "A guardrail that can shrink, delay, or escalate a recommendation."
  },
  {
    id: "connect",
    label: "Connect",
    promise: "Make picks personal by reading the portfolio context.",
    primaryAction: "Connect portfolio",
    secondaryActions: ["Check overlap", "Find missing exposure"],
    features: ["Provider connection", "Concentration check", "Exposure gaps"],
    decisionOutput: "A portfolio-aware pick that avoids accidental overconcentration."
  },
  {
    id: "improve",
    label: "Improve",
    promise: "Use every save, skip, and override to improve future picks.",
    primaryAction: "Tune my feed",
    secondaryActions: ["Dismiss idea", "Update model candidate"],
    features: ["Feedback capture", "Personalization weights", "Evaluation gate"],
    decisionOutput: "A governed learning signal for better personalization and model updates."
  }
];
