import { NextResponse } from "next/server";
import { dailyIntelligence } from "@/data/daily-intelligence";

export function GET() {
  const totalReadTime = dailyIntelligence.reduce((sum, item) => sum + item.timeToReadMinutes, 0);

  return NextResponse.json({
    date: new Date().toISOString().slice(0, 10),
    targetSession: "5-15 minutes",
    totalReadTimeMinutes: totalReadTime,
    items: dailyIntelligence,
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
