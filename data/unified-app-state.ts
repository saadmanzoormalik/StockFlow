import { demoInvestorProfile, getPersonalizedTopPicks } from "@/lib/personalization";
import { ActiveAppState, BrokerProvider, MarketSynthesisSignal, RankedStockOption } from "@/lib/types";

const rankedPicks = getPersonalizedTopPicks(demoInvestorProfile);

const rankedOptions: RankedStockOption[] = rankedPicks.slice(0, 4).map((pick) => ({
  rank: pick.rank,
  ticker: pick.ticker,
  company: pick.company,
  theme: pick.rotationTheme,
  fitLabel: pick.rank === 1 ? "Best fit" : pick.riskLevel === "Low" ? "Safer" : pick.rotationTheme.includes("Grid") ? "Grid" : "Energy",
  reason: pick.whyPicked,
  action: pick.rank === 1 ? "Watch" : pick.riskLevel === "Low" ? "Compare" : "Explore",
  expectedReturn: pick.expectedReturn,
  expectedTimeline: pick.expectedTimeline,
  riskLevel: pick.riskLevel,
  personalizedScore: pick.personalizedScore
}));

export const marketSynthesisSignals: MarketSynthesisSignal[] = [
  {
    id: "macro-ai-power-bottleneck",
    category: "Macro",
    headline: "AI demand is moving from chips to electricity",
    summary: "The biggest market pressure point is shifting from compute supply toward the power, grid, and cooling infrastructure needed to run AI data centers.",
    userTranslation: "Look for companies with real exposure to electrical infrastructure, cooling, backlog, and contracted power demand.",
    confidence: 86,
    sourceType: "mock"
  },
  {
    id: "rates-valuation-proof",
    category: "Rates",
    headline: "Higher-for-longer rates reward proof over hype",
    summary: "When discount rates stay firm, expensive growth stories need clearer earnings, backlog, and guidance support.",
    userTranslation: "Favor profitable infrastructure names over speculative AI-adjacent stories unless upside is unusually strong.",
    confidence: 78,
    sourceType: "mock"
  },
  {
    id: "policy-grid-reliability",
    category: "Policy",
    headline: "Grid reliability is becoming strategic policy",
    summary: "Power reliability, domestic infrastructure, and energy security are moving from utility issues into national competitiveness issues.",
    userTranslation: "Grid contractors, electrical equipment, and reliable generation may deserve more attention than another chip chase.",
    confidence: 82,
    sourceType: "mock"
  },
  {
    id: "geopolitics-energy-security",
    category: "Geopolitics",
    headline: "Energy security affects AI capacity",
    summary: "Countries and companies with reliable power access can support more AI infrastructure buildout.",
    userTranslation: "Electricity scarcity can turn power suppliers and grid builders into AI beneficiaries.",
    confidence: 80,
    sourceType: "mock"
  }
];

export const brokerProviders: BrokerProvider[] = [
  { id: "robinhood", name: "Robinhood", connectionStatus: "available", authPattern: "aggregator", purpose: "Fast retail brokerage validation" },
  { id: "schwab", name: "Schwab", connectionStatus: "available", authPattern: "aggregator", purpose: "Brokerage holdings and concentration checks" },
  { id: "fidelity", name: "Fidelity", connectionStatus: "available", authPattern: "aggregator", purpose: "Long-term portfolio exposure checks" },
  { id: "etrade", name: "E*TRADE", connectionStatus: "available", authPattern: "aggregator", purpose: "Brokerage holdings validation" },
  { id: "webull", name: "Webull", connectionStatus: "available", authPattern: "aggregator", purpose: "Active-trader portfolio context" },
  { id: "manual", name: "Manual import", connectionStatus: "available", authPattern: "manual", purpose: "CSV/manual fallback for users without a provider connection" }
];

export const activeAppState: ActiveAppState = {
  schemaVersion: "2026-05-27.1",
  stateDate: "2026-05-27",
  modelVersion: "stock-pick-check-demo-v1",
  userId: "demo-user-balanced",
  profile: demoInvestorProfile,
  activeSurface: "Discover",
  discover: {
    worldSynthesis: "AI infrastructure demand is shifting the market conversation from chips toward electricity, grid capacity, cooling, and reliable power.",
    primaryTheme: "Power infrastructure",
    signals: marketSynthesisSignals,
    nextSurface: "Decide"
  },
  decide: {
    selectedTheme: "Power infrastructure",
    rankedOptions,
    nextBestAction: "Watch VRT first, compare ETN for lower-risk exposure, then connect portfolio before acting.",
    nextSurface: "Connect"
  },
  connect: {
    reasonToConnect: "Validate whether the selected pick adds useful exposure or overlaps with existing AI/mega-cap holdings.",
    providers: brokerProviders,
    portfolioChecks: ["AI compute overlap", "Power infrastructure gap", "Single-stock concentration", "Risk-profile fit", "Existing holding conflict"]
  },
  learning: {
    acceptedEvents: ["view", "save", "dismiss", "portfolio_connect", "risk_update", "trial_start"],
    lastUpdateSummary: "Demo state uses onboarding answers, sample holdings, stock scoring, and saved/dismissed actions as learning inputs.",
    nextModelCandidate: "personalization-policy-v2-candidate"
  },
  evaluation: {
    requiredChecks: ["disclaimer_present", "personalized_reason_present", "risk_fit_explained", "portfolio_context_used", "ranked_options_present"],
    passThreshold: 0.8
  },
  disclaimer: "This is educational information, not financial advice. Investing involves risk. Past performance does not guarantee future results."
};
