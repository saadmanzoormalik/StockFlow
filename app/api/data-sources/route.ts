import { NextResponse } from "next/server";
import { dataSourceRegistry, ingestionSchedule } from "@/data/source-registry";

export function GET() {
  return NextResponse.json({
    sources: dataSourceRegistry,
    schedule: ingestionSchedule,
    activationNote: "Premium news and enterprise market feeds remain disabled until licensed credentials are configured."
  });
}
