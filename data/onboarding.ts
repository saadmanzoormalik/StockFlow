export type OnboardingQuestion = {
  id: "strategy" | "drawdown" | "timeline";
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
  }
];

export const onboardingValueStory = {
  headline: "What if $1,000 could become $1,600?",
  subhead: "See hypothetical upside scenarios, clear risk, and AI-ranked stock picks before you act.",
  exampleInvestment: 1000,
  exampleReturn: 600,
  exampleTimeline: "3 months",
  disclaimer: "Hypothetical example only. Not a guarantee or financial advice."
};
