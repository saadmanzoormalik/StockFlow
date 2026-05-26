import { NextRequest, NextResponse } from "next/server";
import { mockPicks } from "@/data/mock-picks";
import { calculateScore } from "@/lib/scoring";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const ticker = String(body.ticker ?? "").toUpperCase();
  const pick = mockPicks.find((item) => item.ticker === ticker);

  if (!pick) {
    return NextResponse.json({ error: "Ticker not found in mock universe." }, { status: 404 });
  }

  return NextResponse.json({
    ticker: pick.ticker,
    finalScore: calculateScore(pick),
    confidenceScore: pick.confidenceScore,
    factors: pick.factors,
    modelVersion: "mock-rotation-v0.1"
  });
}
