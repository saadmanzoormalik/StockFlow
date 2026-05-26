import { NextResponse } from "next/server";
import { morningBriefing } from "@/data/daily-intelligence";

export function GET() {
  const totalReadTime = morningBriefing.items.reduce((sum, item) => sum + item.timeToReadMinutes, 0);

  return NextResponse.json({
    date: new Date().toISOString().slice(0, 10),
    notificationTitle: morningBriefing.notificationTitle,
    notificationBody: morningBriefing.notificationBody,
    primaryDecision: morningBriefing.primaryDecision,
    balanceRule: morningBriefing.balanceRule,
    targetSession: "5-15 minutes",
    totalReadTimeMinutes: totalReadTime,
    items: morningBriefing.items,
    engagementKpis: [
      "feed open rate",
      "top pick save rate",
      "dismiss rate",
      "portfolio connect rate",
      "news consensus clickthrough",
      "risk update completion",
      "daily active use"
    ],
    disclaimer: "This is educational information, not financial advice. Investing involves risk. Past performance does not guarantee future results."
  });
}
