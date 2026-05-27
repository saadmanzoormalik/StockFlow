import { NextResponse } from "next/server";
import { activeAppState } from "@/data/unified-app-state";

export function GET() {
  return NextResponse.json(activeAppState);
}
