import { NextResponse } from "next/server";
import { mockPicks } from "@/data/mock-picks";
import { rankPicks } from "@/lib/scoring";

export function GET() {
  return NextResponse.json({
    modelVersion: "mock-rotation-v0.1",
    disclaimer: "This is educational information, not financial advice. Investing involves risk. Past performance does not guarantee future results.",
    picks: rankPicks(mockPicks)
  });
}
