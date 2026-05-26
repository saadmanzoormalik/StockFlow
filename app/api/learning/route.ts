import { NextRequest, NextResponse } from "next/server";
import { getLearningLoopSummary } from "@/lib/personalization";
import { LearningEvent } from "@/lib/types";

export async function POST(request: NextRequest) {
  const event = (await request.json().catch(() => ({}))) as Partial<LearningEvent>;

  return NextResponse.json({
    accepted: true,
    event: {
      eventType: event.eventType ?? "view",
      signal: event.signal ?? "User viewed personalized top pick",
      weightAdjustment: event.weightAdjustment ?? 0.1
    },
    learningLoop: getLearningLoopSummary(),
    productionNote: "In production, learning events should create candidate model updates that pass validation before deployment."
  });
}

export function GET() {
  return NextResponse.json(getLearningLoopSummary());
}
