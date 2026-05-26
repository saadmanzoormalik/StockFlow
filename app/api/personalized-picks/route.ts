import { NextRequest, NextResponse } from "next/server";
import { demoInvestorProfile, getPersonalizedTopPicks, inferRiskAppetite } from "@/lib/personalization";
import { StrategyType, UserInvestorProfile } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const profile: UserInvestorProfile = {
    ...demoInvestorProfile,
    ...body,
    preferredStrategy: (body.preferredStrategy ?? demoInvestorProfile.preferredStrategy) as StrategyType,
    riskAppetite: inferRiskAppetite({
      drawdownComfort: body.drawdownComfort ?? demoInvestorProfile.drawdownComfort,
      timeHorizon: body.timeHorizon ?? demoInvestorProfile.timeHorizon,
      experienceLevel: body.experienceLevel ?? demoInvestorProfile.experienceLevel
    })
  };

  return NextResponse.json({
    profile,
    picks: getPersonalizedTopPicks(profile),
    agenticWorkflow: [
      "Risk Appetite Agent measures user risk comfort from onboarding inputs.",
      "Portfolio Agent compares top picks against connected holdings.",
      "Strategy Agent ranks Conservative, Balanced, and Aggressive fits.",
      "Decision Agent creates a personalized top-pick recommendation.",
      "Learning Agent records user actions for recursive improvement."
    ],
    disclaimer: "This is educational information, not financial advice. Investing involves risk. Past performance does not guarantee future results."
  });
}

export function GET() {
  return NextResponse.json({
    profile: demoInvestorProfile,
    picks: getPersonalizedTopPicks(demoInvestorProfile)
  });
}
