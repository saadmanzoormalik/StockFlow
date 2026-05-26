import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase/server";
import { demoInvestorProfile, inferRiskAppetite } from "@/lib/personalization";
import { StrategyType, UserInvestorProfile } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const userId = body.userId ?? "00000000-0000-0000-0000-000000000001";
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

  if (!hasSupabaseConfig()) {
    return NextResponse.json({
      persisted: false,
      reason: "Supabase environment variables are not configured yet.",
      profile
    });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase!
    .from("user_investor_profiles")
    .insert({
      user_id: userId,
      preferred_strategy: profile.preferredStrategy,
      inferred_risk_appetite: profile.riskAppetite,
      time_horizon: profile.timeHorizon,
      drawdown_comfort: profile.drawdownComfort,
      experience_level: profile.experienceLevel,
      onboarding_answers_json: body
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ persisted: false, error: error.message, profile }, { status: 500 });
  }

  return NextResponse.json({ persisted: true, profile, row: data });
}
