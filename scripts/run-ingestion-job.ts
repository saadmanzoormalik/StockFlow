import { dataSourceRegistry, ingestionSchedule } from "../data/source-registry";

const now = new Date().toISOString();
const runTimestamp = now.replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

const runs = dataSourceRegistry.map((source, index) => {
  const enabled = source.enabledForMvp;

  return {
    runId: `mock-ingest-${runTimestamp}-${index + 1}`,
    sourceId: source.id,
    sourceName: source.name,
    status: enabled ? "completed" : "skipped",
    cadence: source.cadence,
    startedAt: now,
    completedAt: now,
    recordsSeen: enabled ? 12 + index : 0,
    recordsAccepted: enabled ? 10 + index : 0,
    recordsRejected: enabled ? 2 : 0,
    outputTables: enabled
      ? ["raw_source_events", "source_documents", "extracted_market_signals", "signal_trace_links"]
      : [],
    notes: enabled
      ? "Mock connector normalized source metadata into lineage-ready records."
      : "Requires commercial license, feed contract, or API credentials before activation."
  };
});

console.log(JSON.stringify({
  job: "source-ingestion",
  status: "completed",
  schedule: ingestionSchedule,
  runCount: runs.length,
  enabledRuns: runs.filter((run) => run.status === "completed").length,
  runs,
  nextStep: "Persist run rows to ingestion_runs and update active_app_states after source credentials are configured."
}, null, 2));
