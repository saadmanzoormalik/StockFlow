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

export type DailyAction = "Buy" | "Watch" | "Avoid" | "Trim" | "Learn";

export type DailyIntelligenceItem = {
  id: string;
  title: string;
  ticker?: string;
  action: DailyAction;
  category: "Top Pick" | "Portfolio" | "News Consensus" | "Risk" | "Learning";
  summary: string;
  whyItMatters: string;
  algorithmFactor: string;
  missingSignal: string;
  userDecision: string;
  timeToReadMinutes: number;
  decisionKpi: string;
  confidence: number;
};

export type MorningBriefing = {
  notificationTitle: string;
  notificationBody: string;
  primaryDecision: string;
  balanceRule: string;
  items: DailyIntelligenceItem[];
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

export type AppSurface = "Discover" | "Decide" | "Connect" | "Menu";

export type MarketSynthesisSignal = {
  id: string;
  category: "Macro" | "Trade" | "Geopolitics" | "Policy" | "Rates" | "Earnings" | "Capital Flow";
  headline: string;
  summary: string;
  userTranslation: string;
  confidence: number;
  sourceType: "mock" | "news" | "filing" | "market_data" | "analyst_consensus";
};

export type RankedStockOption = {
  rank: number;
  ticker: string;
  company: string;
  theme: string;
  fitLabel: string;
  reason: string;
  action: "Watch" | "Compare" | "Explore" | "Pass";
  expectedReturn: string;
  expectedTimeline: string;
  riskLevel: RiskLevel;
  personalizedScore: number;
};

export type BrokerProvider = {
  id: string;
  name: string;
  connectionStatus: "available" | "connected" | "coming_soon";
  authPattern: "oauth" | "aggregator" | "manual";
  purpose: string;
};

export type ActiveAppState = {
  schemaVersion: string;
  stateDate: string;
  modelVersion: string;
  userId: string;
  profile: UserInvestorProfile;
  activeSurface: AppSurface;
  discover: {
    worldSynthesis: string;
    primaryTheme: string;
    signals: MarketSynthesisSignal[];
    nextSurface: "Decide";
  };
  decide: {
    selectedTheme: string;
    rankedOptions: RankedStockOption[];
    nextBestAction: string;
    nextSurface: "Connect";
  };
  connect: {
    reasonToConnect: string;
    providers: BrokerProvider[];
    portfolioChecks: string[];
  };
  learning: {
    acceptedEvents: LearningEvent["eventType"][];
    lastUpdateSummary: string;
    nextModelCandidate: string;
  };
  evaluation: {
    requiredChecks: string[];
    passThreshold: number;
  };
  disclaimer: string;
};

export type SourceCadence = "30m" | "60m" | "daily" | "event";

export type DataSourceRegistryEntry = {
  id: string;
  name: string;
  provider: string;
  sourceFamily: "premium_news" | "open_filings" | "macro_data" | "market_data" | "fundamentals" | "portfolio";
  accessModel: "licensed" | "api_key" | "public" | "sandbox";
  cadence: SourceCadence;
  qualityTier: "enterprise" | "official" | "commercial" | "prototype";
  endpointPattern: string;
  envKeys: string[];
  facets: Array<"macro" | "trade" | "geopolitics" | "earnings" | "rates" | "policy" | "price_volume" | "fundamentals" | "portfolio">;
  lineagePolicy: string;
  enabledForMvp: boolean;
};

export type IngestionRunStatus = "queued" | "running" | "completed" | "failed" | "skipped";

export type IngestionTraceRecord = {
  runId: string;
  sourceId: string;
  status: IngestionRunStatus;
  startedAt: string;
  completedAt?: string;
  recordsSeen: number;
  recordsAccepted: number;
  recordsRejected: number;
  outputTables: string[];
  notes: string;
};
