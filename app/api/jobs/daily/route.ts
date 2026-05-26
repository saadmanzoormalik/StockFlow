import { NextResponse } from "next/server";
import { mockPicks, performance } from "@/data/mock-picks";
import { rankPicks } from "@/lib/scoring";

export async function POST() {
  const ranked = rankPicks(mockPicks);

  return NextResponse.json({
    job: "daily-scoring",
    status: "completed",
    modelVersion: "mock-rotation-v0.1",
    steps: [
      "pulled mock price and volume data",
      "updated mock revenue/EPS/guidance signals",
      "calculated deterministic stock scores",
      "ranked stock universe",
      "updated dashboard payload",
      "logged mock portfolio performance"
    ],
    topPick: ranked[0],
    performanceSnapshot: performance.at(-1)
  });
}
