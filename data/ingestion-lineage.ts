import type { IngestionTraceRecord } from "@/lib/types";
import { dataSourceRegistry, ingestionSchedule } from "@/data/source-registry";

const now = "2026-05-27T13:00:00.000Z";

export const latestIngestionTraces: IngestionTraceRecord[] = dataSourceRegistry.map((source, index) => {
  const enabled = source.enabledForMvp;

  return {
    runId: `mock-ingest-20260527-1300-${index + 1}`,
    sourceId: source.id,
    status: enabled ? "completed" : "skipped",
    startedAt: now,
    completedAt: now,
    recordsSeen: enabled ? 12 + index : 0,
    recordsAccepted: enabled ? 10 + index : 0,
    recordsRejected: enabled ? 2 : 0,
    outputTables: enabled
      ? ["raw_source_events", "source_documents", "extracted_market_signals", "signal_trace_links"]
      : [],
    notes: enabled
      ? "Mock connector normalized source metadata into lineage-ready market signals."
      : "Requires commercial license, feed contract, or API credentials before activation."
  };
});

export const dataLineageDashboard = {
  generatedAt: now,
  refreshPlan: {
    defaultCadence: ingestionSchedule.defaultCadence,
    highPriorityCadence: ingestionSchedule.highPriorityCadence,
    operationalStart: "Hourly ingestion for open/API-key sources; 30-minute cadence for licensed premium sources after contract approval."
  },
  sourceHealth: {
    totalSources: dataSourceRegistry.length,
    enabledForMvp: dataSourceRegistry.filter((source) => source.enabledForMvp).length,
    licenseBlocked: dataSourceRegistry.filter((source) => source.accessModel === "licensed" && !source.enabledForMvp).length,
    latestAcceptedRecords: latestIngestionTraces.reduce((total, trace) => total + trace.recordsAccepted, 0)
  },
  tracePath: [
    "source_registry",
    "ingestion_runs",
    "raw_source_events",
    "source_documents",
    "extracted_market_signals",
    "signal_trace_links",
    "active_app_states"
  ],
  exampleSignalTrace: {
    source: "SEC EDGAR filings and company facts",
    rawEvent: "8-K / 10-Q filing metadata",
    extractedSignal: "Power infrastructure backlog signal",
    scoringFactors: ["backlog_score", "forecasted_revenue_growth", "guidance_upgrade_score"],
    appSurface: "Discover",
    userFacingOutcome: "Power infrastructure remains the strongest near-term theme for the demo Balanced profile."
  },
  traces: latestIngestionTraces
};
