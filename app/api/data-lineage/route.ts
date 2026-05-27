import { NextResponse } from "next/server";
import { dataLineageDashboard } from "@/data/ingestion-lineage";

export function GET() {
  return NextResponse.json(dataLineageDashboard);
}
