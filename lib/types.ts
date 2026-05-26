export type StrategyType = "Conservative" | "Balanced" | "Aggressive";
export type RiskLevel = "Low" | "Medium" | "High";
export type RiskAppetite = "Capital Protection" | "Balanced Growth" | "High Upside";

export type UserInvestorProfile = {
  timeHorizon: "0-3 months" | "3-12 months" | "12+ months";
  drawdownComfort: "Low" | "Medium" | "High";
  experienceLevel: "Beginner" | "Intermediate" | "Advanced";
  preferredStrategy: StrategyType;
  riskAppetite: RiskAppetite;
  connectedPortfolio: boolean;
  currentHoldings: string[];
  avoidedSectors: string[];
};

export type ScoreFactors = {
  bottleneckScore: number;
  revenueGrowthAcceleration: number;
  hyperscalerCapexExposure: number;
  rotationAdjacencyScore: number;
  forecastedRevenueGrowth: number;
  governmentPolicyAlignment: number;
  institutionalFlow: number;
  geopoliticalImportance: number;
  epsRevisionScore: number;
  supplyChainConstraints: number;
  backlogScore: number;
  undervaluationVsGrowth: number;
  guidanceUpgradeScore: number;
  electricityPowerLeverage: number;
  relativeStrength: number;
  revenueBeatScore: number;
  grossMarginExpansion: number;
  epsBeatScore: number;
  volumeAcceleration: number;
  tamExpansion: number;
  balanceSheetScore: number;
  narrativeAcceleration: number;
  rAndDIntensity: number;
  customerStickiness: number;
  insiderOwnership: number;
};

export type StockPick = {
  ticker: string;
  company: string;
  strategyType: StrategyType;
  sector: string;
  rotationTheme: string;
  whyPicked: string;
  expectedReturn: string;
  expectedTimeline: string;
  riskLevel: RiskLevel;
  confidenceScore: number;
  keyCatalyst: string;
  keyRisk: string;
  thesisSummary: string;
  revenueGrowthPotential: string;
  beatHistory: string;
  valuationVsGrowth: string;
  rotationPhase: string;
  bullishCase: string;
  baseCase: string;
  bearCase: string;
  metricsToWatch: string[];
  factors: ScoreFactors;
};

export type RankedPick = StockPick & {
  rank: number;
  finalScore: number;
};

export type PersonalizedPick = RankedPick & {
  personalizedScore: number;
  personalizationReasons: string[];
  agentRationale: {
    strategyAgent: string;
    riskAgent: string;
    portfolioAgent: string;
    learningAgent: string;
  };
};

export type LearningEvent = {
  eventType: "view" | "save" | "dismiss" | "portfolio_connect" | "risk_update" | "trial_start";
  signal: string;
  weightAdjustment: number;
};

export type RotationWindow = {
  window: string;
  theme: string;
  whyItMatters: string;
  bestStocks: string[];
  expectedGainRange: string;
  riskLevel: RiskLevel;
  cta: string;
};

export type Alert = {
  title: string;
  message: string;
  severity: "Positive" | "Watch" | "Risk";
  createdAt: string;
};

export type PerformancePoint = {
  month: string;
  appPortfolio: number;
  sp500: number;
  nasdaq: number;
  dow: number;
};
