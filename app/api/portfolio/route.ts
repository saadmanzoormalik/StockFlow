import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const userId = body.userId ?? "00000000-0000-0000-0000-000000000001";
  const provider = body.provider ?? "SnapTrade";
  const holdings = body.holdings ?? ["NVDA", "MSFT", "QQQ"];

  const payload = {
    user_id: userId,
    provider,
    connection_status: "connected",
    holdings_snapshot_json: {
      holdings,
      detected_exposure: ["AI Compute", "Mega-cap Growth"],
      source: "mock-provider-sync"
    },
    last_synced_at: new Date().toISOString()
  };

  if (!hasSupabaseConfig()) {
    return NextResponse.json({
      persisted: false,
      reason: "Supabase environment variables are not configured yet.",
      connection: payload
    });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase!
    .from("portfolio_connections")
    .insert(payload)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ persisted: false, error: error.message, connection: payload }, { status: 500 });
  }

  return NextResponse.json({ persisted: true, connection: data });
}

export function GET() {
  return NextResponse.json({
    providers: ["Plaid", "SnapTrade", "Yodlee", "MX"],
    status: "Provider SDKs are not connected yet. This endpoint is ready to persist sandbox sync results after Supabase is configured."
  });
}
