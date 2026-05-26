import { DailyIntelligenceItem, MorningBriefing } from "@/lib/types";

export const dailyIntelligence: DailyIntelligenceItem[] = [
  {
    id: "today-top-pick-vrt",
    title: "Your top pick today: VRT",
    ticker: "VRT",
    action: "Watch",
    category: "Top Pick",
    summary: "Vertiv remains the strongest personalized fit because cooling and power demand are still improving while your sample portfolio is already AI-compute heavy.",
    whyItMatters: "The system is not just chasing AI winners. It is looking for the next infrastructure bottleneck that improves portfolio balance.",
    algorithmFactor: "Bottleneck score + hyperscaler CAPEX exposure + portfolio diversification",
    missingSignal: "No confirmed buy trigger yet; watch for order/backlog or guidance acceleration.",
    userDecision: "Decide whether VRT belongs on today's watchlist.",
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
    algorithmFactor: "Portfolio overlap + rotation adjacency + concentration risk",
    missingSignal: "Connect live holdings to replace sample portfolio assumptions.",
    userDecision: "Decide whether to connect portfolio before acting on new picks.",
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
    algorithmFactor: "Media narrative acceleration + catalyst freshness + evidence coverage",
    missingSignal: "Needs live news/RAG connection before production use.",
    userDecision: "Decide whether the story strengthened, weakened, or stayed the same since yesterday.",
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
    algorithmFactor: "Risk appetite + volatility tolerance + expected timeline",
    missingSignal: "Needs an updated risk check after major drawdowns or big gains.",
    userDecision: "Decide whether you still want Balanced, or if your comfort shifted.",
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
    algorithmFactor: "User feedback + personalization weights + candidate model update",
    missingSignal: "Needs enough user actions before any model update should be trusted.",
    userDecision: "Save, dismiss, or watch so the app learns your preference.",
    timeToReadMinutes: 2,
    decisionKpi: "Save rate, dismiss rate, future recommendation fit",
    confidence: 80
  }
];

export const morningBriefing: MorningBriefing = {
  notificationTitle: "Your market briefing is ready",
  notificationBody: "VRT still fits your profile. AI power demand strengthened, but no buy trigger yet.",
  primaryDecision: "Should VRT stay on your watchlist today?",
  balanceRule: "Show one action, one risk, one missing signal, and one learning opportunity. Avoid overwhelming the user.",
  items: dailyIntelligence
};
