import { NextResponse } from "next/server";
import { getLearningLoopSummary, getPersonalizedTopPicks } from "@/lib/personalization";

export function GET() {
  const [topPick] = getPersonalizedTopPicks();

  return NextResponse.json({
    evaluationVersion: "local-eval-v0.1",
    target: "Personalized top stock pick quality",
    summary: {
      topPick: topPick.ticker,
      personalizedScore: topPick.personalizedScore,
      agentRationaleCount: Object.keys(topPick.agentRationale).length,
      personalizationReasonCount: topPick.personalizationReasons.length
    },
    metrics: [
      {
        metric: "Top pick explanation completeness",
        target: ">= 90%",
        current: "Mock pass",
        action: "Connect LangSmith evaluator after agent workflow is live."
      },
      {
        metric: "Risk-fit explanation",
        target: "Present on 100% of recommendations",
        current: "Mock pass",
        action: "Persist onboarding answers and test against user profiles."
      },
      {
        metric: "Portfolio-context use",
        target: "Used when portfolio is connected",
        current: "Mock pass",
        action: "Connect Plaid/SnapTrade sandbox holdings."
      },
      {
        metric: "Learning signal capture",
        target: ">= 95% of user actions",
        current: "API scaffold",
        action: "Persist events to Supabase learning_events."
      }
    ],
    learningLoop: getLearningLoopSummary()
  });
}
