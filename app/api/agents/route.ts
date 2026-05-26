import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    workflow: "personalized-top-pick-v0.1",
    status: "scaffolded",
    note: "These roles are represented in deterministic TypeScript logic today. Next step is implementing the graph in LangGraph or Dify.",
    agents: [
      {
        name: "Risk Appetite Agent",
        input: "Onboarding answers: drawdown comfort, time horizon, experience level",
        output: "Inferred risk appetite and risk-fit adjustment",
        failureMode: "Overstates user risk tolerance",
        evaluation: "Risk-fit explanation present and aligned with answers"
      },
      {
        name: "Portfolio Agent",
        input: "Connected holdings from Plaid/SnapTrade/Yodlee/MX",
        output: "Overlap, missing exposure, and concentration signals",
        failureMode: "Ignores existing holdings",
        evaluation: "Portfolio context used when connected"
      },
      {
        name: "Strategy Agent",
        input: "Preferred strategy and stock scoring factors",
        output: "Conservative/Balanced/Aggressive fit",
        failureMode: "Recommends high-risk ideas to conservative users",
        evaluation: "Strategy match score and reason"
      },
      {
        name: "Decision Agent",
        input: "Base score, risk fit, portfolio fit, strategy fit",
        output: "Personalized top stock pick",
        failureMode: "Produces unsupported recommendation",
        evaluation: "Rationale completeness and disclaimer presence"
      },
      {
        name: "Learning Agent",
        input: "Saves, dismissals, risk updates, portfolio connects, review outcomes",
        output: "Candidate personalization/ranking updates",
        failureMode: "Deploys unvalidated changes",
        evaluation: "Candidate update must pass validation gate"
      }
    ]
  });
}
