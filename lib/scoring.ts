import { RankedPick, ScoreFactors, StockPick, StrategyType } from "@/lib/types";

export const factorWeights: Record<keyof ScoreFactors, number> = {
  bottleneckScore: 0.1,
  revenueGrowthAcceleration: 0.1,
  hyperscalerCapexExposure: 0.08,
  rotationAdjacencyScore: 0.07,
  forecastedRevenueGrowth: 0.07,
  governmentPolicyAlignment: 0.07,
  institutionalFlow: 0.06,
  geopoliticalImportance: 0.06,
  epsRevisionScore: 0.06,
  supplyChainConstraints: 0.05,
  backlogScore: 0.05,
  undervaluationVsGrowth: 0.05,
  guidanceUpgradeScore: 0.05,
  electricityPowerLeverage: 0.05,
  relativeStrength: 0.04,
  revenueBeatScore: 0.04,
  grossMarginExpansion: 0.03,
  epsBeatScore: 0.03,
  volumeAcceleration: 0.03,
  tamExpansion: 0.04,
  balanceSheetScore: 0.04,
  narrativeAcceleration: 0.03,
  rAndDIntensity: 0.02,
  customerStickiness: 0.02,
  insiderOwnership: 0.02
};

const strategyBias: Record<StrategyType, number> = {
  Conservative: 0.96,
  Balanced: 1,
  Aggressive: 1.03
};

export function calculateScore(pick: StockPick): number {
  const weightedTotal = Object.entries(factorWeights).reduce((sum, [factor, weight]) => {
    const value = pick.factors[factor as keyof ScoreFactors] ?? 0;
    return sum + value * weight;
  }, 0);
  const totalWeight = Object.values(factorWeights).reduce((sum, weight) => sum + weight, 0);
  const normalizedScore = weightedTotal / totalWeight;

  return Math.round(Math.min(100, normalizedScore * strategyBias[pick.strategyType]) * 10) / 10;
}

export function rankPicks(picks: StockPick[], strategy?: StrategyType): RankedPick[] {
  return picks
    .filter((pick) => (strategy ? pick.strategyType === strategy : true))
    .map((pick) => ({ ...pick, finalScore: calculateScore(pick), rank: 0 }))
    .sort((a, b) => b.finalScore - a.finalScore)
    .map((pick, index) => ({ ...pick, rank: index + 1 }));
}

export function getMarketRotationSignal() {
  return {
    currentHot: "AI compute and AI networking",
    likelyNext: "Cooling, power, grid, and electricity generation",
    rule: "When compute/networking leaders become extended, reduce chase score and increase bottleneck scores for mandatory infrastructure.",
    allocationTilt: "Balanced allocation favors power infrastructure now, with small aggressive exposure to physical AI and nuclear optionality."
  };
}
