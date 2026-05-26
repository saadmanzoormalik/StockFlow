import { mockPicks } from "@/data/mock-picks";
import { rankPicks } from "@/lib/scoring";
import { PersonalizedPick, RankedPick, RiskLevel, StrategyType, UserInvestorProfile } from "@/lib/types";

export const demoInvestorProfile: UserInvestorProfile = {
  timeHorizon: "3-12 months",
  drawdownComfort: "Medium",
  experienceLevel: "Beginner",
  preferredStrategy: "Balanced",
  riskAppetite: "Balanced Growth",
  connectedPortfolio: true,
  currentHoldings: ["NVDA", "MSFT", "QQQ"],
  avoidedSectors: []
};

const riskPenalty: Record<RiskLevel, Record<UserInvestorProfile["drawdownComfort"], number>> = {
  Low: { Low: 2, Medium: 1, High: 0 },
  Medium: { Low: -6, Medium: 2, High: 2 },
  High: { Low: -14, Medium: -5, High: 4 }
};

const strategyFit: Record<StrategyType, Record<UserInvestorProfile["preferredStrategy"], number>> = {
  Conservative: { Conservative: 7, Balanced: 2, Aggressive: -4 },
  Balanced: { Conservative: 2, Balanced: 7, Aggressive: 1 },
  Aggressive: { Conservative: -8, Balanced: -2, Aggressive: 8 }
};

function portfolioFit(pick: RankedPick, profile: UserInvestorProfile) {
  if (!profile.connectedPortfolio) {
    return {
      score: 0,
      reason: "Connect a portfolio to personalize overlap, concentration, and missing-exposure alerts."
    };
  }

  const alreadyOwnsAiCompute = profile.currentHoldings.some((ticker) => ["NVDA", "AMD", "AVGO", "MSFT", "QQQ"].includes(ticker));
  const pickAddsPowerExposure = ["Cooling/Power", "Grid/Electrical Infrastructure", "Electricity Generation"].includes(pick.rotationTheme);

  if (alreadyOwnsAiCompute && pickAddsPowerExposure) {
    return {
      score: 6,
      reason: "Adds power-infrastructure exposure against an AI compute-heavy portfolio."
    };
  }

  if (profile.currentHoldings.includes(pick.ticker)) {
    return {
      score: -5,
      reason: "Already owned, so the app would monitor position risk instead of pushing another buy signal."
    };
  }

  return {
    score: 1,
    reason: "Adds a differentiated idea relative to the connected portfolio."
  };
}

export function inferRiskAppetite(profile: Pick<UserInvestorProfile, "drawdownComfort" | "timeHorizon" | "experienceLevel">): UserInvestorProfile["riskAppetite"] {
  if (profile.drawdownComfort === "High" && profile.timeHorizon === "12+ months") {
    return "High Upside";
  }

  if (profile.drawdownComfort === "Low" || profile.experienceLevel === "Beginner") {
    return "Capital Protection";
  }

  return "Balanced Growth";
}

export function personalizePick(pick: RankedPick, profile: UserInvestorProfile): PersonalizedPick {
  const portfolio = portfolioFit(pick, profile);
  const riskScore = riskPenalty[pick.riskLevel][profile.drawdownComfort];
  const strategyScore = strategyFit[pick.strategyType][profile.preferredStrategy];
  const personalizationBoost = riskScore + strategyScore + portfolio.score;
  const personalizedScore = Math.round(Math.max(0, Math.min(100, pick.finalScore + personalizationBoost)) * 10) / 10;

  return {
    ...pick,
    personalizedScore,
    personalizationReasons: [
      `${pick.strategyType} strategy fit adjusted for ${profile.preferredStrategy.toLowerCase()} preference.`,
      `${pick.riskLevel} risk adjusted for ${profile.drawdownComfort.toLowerCase()} drawdown comfort.`,
      portfolio.reason
    ],
    agentRationale: {
      strategyAgent: `Ranks ${pick.ticker} as a ${pick.strategyType.toLowerCase()} fit based on growth, valuation, and rotation factors.`,
      riskAgent: `Checks expected return range, timeline, and ${pick.riskLevel.toLowerCase()} risk against the user's stated drawdown comfort.`,
      portfolioAgent: portfolio.reason,
      learningAgent: "Learns from saves, dismissals, connected holdings, and review outcomes to improve future ranking weights."
    }
  };
}

export function getPersonalizedTopPicks(profile: UserInvestorProfile = demoInvestorProfile): PersonalizedPick[] {
  return rankPicks(mockPicks)
    .map((pick) => personalizePick(pick, profile))
    .sort((a, b) => b.personalizedScore - a.personalizedScore)
    .map((pick, index) => ({ ...pick, rank: index + 1 }));
}

export function getLearningLoopSummary() {
  return {
    loop: "User input -> portfolio context -> personalized top picks -> user action -> learning signal -> updated ranking weights",
    globalImprovement: "Aggregate saves, dismissals, overrides, and realized performance improve the model's stock-ranking policy.",
    personalImprovement: "Each user's risk answers, holdings, and actions tune their future strategy mix and alert thresholds.",
    governance: "Production should validate candidate model updates before deployment instead of silently changing recommendations."
  };
}
