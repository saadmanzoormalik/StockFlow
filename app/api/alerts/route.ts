import { NextResponse } from "next/server";
import { alerts } from "@/data/mock-picks";
import { getMarketRotationSignal } from "@/lib/scoring";

export function GET() {
  return NextResponse.json({
    rotationSignal: getMarketRotationSignal(),
    alerts
  });
}
