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
    primaryAction: "Brief me",
    secondaryActions: ["What moved?", "What is missing?"],
    features: ["Morning nudge", "News consensus", "Algorithm factor delta"],
    decisionOutput: "A clear reason to watch, ignore, or investigate today's top setup."
  },
  {
    id: "decide",
    label: "Decide",
    promise: "Turn the signal into a simple pick, pass, or compare decision.",
    primaryAction: "Review pick",
    secondaryActions: ["Save", "Compare"],
    features: ["Top stock pick", "Expected return range", "Agentic rationale"],
    decisionOutput: "A probability-weighted recommendation matched to the user's profile."
  },
  {
    id: "protect",
    label: "Protect",
    promise: "Keep the user inside their real risk appetite.",
    primaryAction: "Risk fit",
    secondaryActions: ["Bear case", "Retune risk"],
    features: ["Risk appetite meter", "Drawdown comfort", "Key risk alerts"],
    decisionOutput: "A guardrail that can shrink, delay, or escalate a recommendation."
  },
  {
    id: "connect",
    label: "Connect",
    promise: "Make picks personal by reading the portfolio context.",
    primaryAction: "Connect",
    secondaryActions: ["Overlap", "Gaps"],
    features: ["Provider connection", "Concentration check", "Exposure gaps"],
    decisionOutput: "A portfolio-aware pick that avoids accidental overconcentration."
  },
  {
    id: "improve",
    label: "Improve",
    promise: "Use every save, skip, and override to improve future picks.",
    primaryAction: "Tune feed",
    secondaryActions: ["Less like this", "More like this"],
    features: ["Feedback capture", "Personalization weights", "Evaluation gate"],
    decisionOutput: "A governed learning signal for better personalization and model updates."
  }
];
