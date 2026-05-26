export type OnboardingQuestion = {
  id: "strategy" | "drawdown" | "timeline" | "portfolio";
  label: string;
  helper: string;
  options: string[];
  defaultOption: string;
};

export const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: "strategy",
    label: "What is your style?",
    helper: "Strategy",
    options: ["Conservative", "Balanced", "Aggressive"],
    defaultOption: "Balanced"
  },
  {
    id: "drawdown",
    label: "How much volatility is okay?",
    helper: "Risk",
    options: ["Low", "Medium", "High"],
    defaultOption: "Medium"
  },
  {
    id: "timeline",
    label: "What timeline do you prefer?",
    helper: "Horizon",
    options: ["0-3 mo", "3-12 mo", "12+ mo"],
    defaultOption: "3-12 mo"
  },
  {
    id: "portfolio",
    label: "Connect portfolio?",
    helper: "Optional",
    options: ["Use sample", "Connect"],
    defaultOption: "Use sample"
  }
];
