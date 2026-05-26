import { DailyIntelligenceItem } from "@/lib/types";

export const dailyIntelligence: DailyIntelligenceItem[] = [
  {
    id: "today-top-pick-vrt",
    title: "Your top pick today: VRT",
    ticker: "VRT",
    action: "Watch",
    category: "Top Pick",
    summary: "Vertiv remains the strongest personalized fit because cooling and power demand are still improving while your sample portfolio is already AI-compute heavy.",
    whyItMatters: "The system is not just chasing AI winners. It is looking for the next infrastructure bottleneck that improves portfolio balance.",
    timeToReadMinutes: 2,
    decisionKpi: "Personalized score 87, medium risk, 3-9 month timeline",
    confidence: 87
  },
  {
    id: "portfolio-overlap-ai-compute",
    title: "You may already have enough AI compute exposure",
    action: "Learn",
    category: "Portfolio",
    summary: "Sample holdings NVDA, MSFT, and QQQ suggest the next useful decision is not more compute exposure, but adjacent infrastructure exposure.",
    whyItMatters: "Portfolio-aware alerts help reduce accidental concentration and make recommendations feel personal.",
    timeToReadMinutes: 2,
    decisionKpi: "Overlap risk detected across AI compute and mega-cap growth",
    confidence: 82
  },
  {
    id: "news-consensus-power-demand",
    title: "News consensus: power demand remains the AI pressure point",
    action: "Watch",
    category: "News Consensus",
    summary: "The app would summarize news and analyst commentary into a simple consensus: AI data centers need more cooling, grid capacity, and reliable electricity.",
    whyItMatters: "Daily consensus keeps users engaged without forcing them to read long research reports.",
    timeToReadMinutes: 3,
    decisionKpi: "Evidence coverage and catalyst freshness",
    confidence: 78
  },
  {
    id: "risk-check-medium-drawdown",
    title: "Risk check: medium drawdown comfort still fits balanced picks",
    action: "Learn",
    category: "Risk",
    summary: "Your risk profile supports balanced infrastructure picks, but aggressive nuclear or robotics names should stay smaller until confidence improves.",
    whyItMatters: "Risk appetite should be measured repeatedly because user comfort changes after market moves.",
    timeToReadMinutes: 1,
    decisionKpi: "Risk-fit accuracy and user override rate",
    confidence: 84
  },
  {
    id: "learning-loop-save-dismiss",
    title: "The app learns from what you save and dismiss",
    action: "Learn",
    category: "Learning",
    summary: "Saving VRT-like picks increases future weighting toward balanced infrastructure exposure. Dismissing high-risk ideas lowers aggressive suggestions.",
    whyItMatters: "Recursive learning should improve both the global model and each user's personalized ranking over time.",
    timeToReadMinutes: 2,
    decisionKpi: "Save rate, dismiss rate, future recommendation fit",
    confidence: 80
  }
];
