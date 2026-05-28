import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname } from "node:path";

const sqlitePath = new URL("../data/stockflow-open-sources.sqlite", import.meta.url).pathname;
const outputPath = new URL("../artifacts/postgres/open-source-seed.sql", import.meta.url).pathname;

function sqlString(value) {
  if (value === null || value === undefined) {
    return "null";
  }

  return `'${String(value).replaceAll("'", "''")}'`;
}

function sqlJson(value) {
  if (value === null || value === undefined || value === "") {
    return "'{}'::jsonb";
  }

  return `${sqlString(value)}::jsonb`;
}

function selectJson(query) {
  const output = execFileSync("sqlite3", ["-json", sqlitePath, query], { encoding: "utf8" });
  return JSON.parse(output || "[]");
}

if (!existsSync(sqlitePath)) {
  throw new Error(`Missing SQLite source database: ${sqlitePath}. Run npm run ingest-open-sources first.`);
}

const sourceRegistry = selectJson(`
  select
    source_key,
    name,
    provider,
    source_family,
    access_model,
    cadence,
    quality_tier,
    endpoint_pattern,
    env_keys_json,
    facets_json,
    lineage_policy,
    enabled_for_mvp
  from source_registry
  order by id;
`);

const ingestionRuns = selectJson(`
  select
    run_key,
    source_registry.source_key as source_key,
    status,
    ingestion_runs.cadence as cadence,
    started_at,
    completed_at,
    records_seen,
    records_accepted,
    records_rejected,
    output_tables_json,
    notes
  from ingestion_runs
  join source_registry on source_registry.id = ingestion_runs.source_id
  order by ingestion_runs.id;
`);

const rawEvents = selectJson(`
  select
    ingestion_runs.run_key as run_key,
    source_registry.source_key as source_key,
    provider_event_id,
    event_type,
    event_timestamp,
    source_url,
    raw_metadata_json,
    body_storage_policy
  from raw_source_events
  join ingestion_runs on ingestion_runs.id = raw_source_events.ingestion_run_id
  join source_registry on source_registry.id = raw_source_events.source_id
  order by raw_source_events.id;
`);

const documents = selectJson(`
  select
    raw_source_events.provider_event_id as provider_event_id,
    document_key,
    source_title,
    source_author,
    published_at,
    canonical_url,
    source_excerpt,
    rights_status,
    checksum
  from source_documents
  join raw_source_events on raw_source_events.id = source_documents.raw_event_id
  order by source_documents.id;
`);

const signals = selectJson(`
  select
    source_documents.document_key as document_key,
    signal_key,
    signal_category,
    signal_summary,
    affected_tickers_json,
    affected_themes_json,
    scoring_factors_json,
    confidence,
    extraction_model_version,
    extracted_at
  from extracted_market_signals
  join source_documents on source_documents.id = extracted_market_signals.source_document_id
  order by extracted_market_signals.id;
`);

const lines = [
  "-- Generated from data/stockflow-open-sources.sqlite.",
  "-- Load after running supabase/create_tables_idempotent.sql or supabase/migrations/001_initial.sql.",
  "begin;",
  ""
];

for (const row of sourceRegistry) {
  lines.push(`insert into source_registry (
  source_key, name, provider, source_family, access_model, cadence, quality_tier,
  endpoint_pattern, env_keys_json, facets_json, lineage_policy, enabled_for_mvp
) values (
  ${sqlString(row.source_key)}, ${sqlString(row.name)}, ${sqlString(row.provider)},
  ${sqlString(row.source_family)}, ${sqlString(row.access_model)}, ${sqlString(row.cadence)},
  ${sqlString(row.quality_tier)}, ${sqlString(row.endpoint_pattern)}, ${sqlJson(row.env_keys_json)},
  ${sqlJson(row.facets_json)}, ${sqlString(row.lineage_policy)}, ${row.enabled_for_mvp ? "true" : "false"}
)
on conflict (source_key) do update set
  name = excluded.name,
  provider = excluded.provider,
  source_family = excluded.source_family,
  access_model = excluded.access_model,
  cadence = excluded.cadence,
  quality_tier = excluded.quality_tier,
  endpoint_pattern = excluded.endpoint_pattern,
  env_keys_json = excluded.env_keys_json,
  facets_json = excluded.facets_json,
  lineage_policy = excluded.lineage_policy,
  enabled_for_mvp = excluded.enabled_for_mvp,
  updated_at = now();`);
}

for (const row of ingestionRuns) {
  lines.push(`insert into ingestion_runs (
  run_key, source_id, status, cadence, started_at, completed_at, records_seen,
  records_accepted, records_rejected, output_tables_json, notes
) values (
  ${sqlString(row.run_key)},
  (select id from source_registry where source_key = ${sqlString(row.source_key)}),
  ${sqlString(row.status)}, ${sqlString(row.cadence)}, ${sqlString(row.started_at)},
  ${sqlString(row.completed_at)}, ${row.records_seen}, ${row.records_accepted},
  ${row.records_rejected}, ${sqlJson(row.output_tables_json)}, ${sqlString(row.notes)}
)
on conflict (run_key) do update set
  status = excluded.status,
  completed_at = excluded.completed_at,
  records_seen = excluded.records_seen,
  records_accepted = excluded.records_accepted,
  records_rejected = excluded.records_rejected,
  output_tables_json = excluded.output_tables_json,
  notes = excluded.notes;`);
}

for (const row of rawEvents) {
  lines.push(`insert into raw_source_events (
  ingestion_run_id, source_id, provider_event_id, event_type, event_timestamp,
  source_url, raw_metadata_json, body_storage_policy
) values (
  (select id from ingestion_runs where run_key = ${sqlString(row.run_key)}),
  (select id from source_registry where source_key = ${sqlString(row.source_key)}),
  ${sqlString(row.provider_event_id)}, ${sqlString(row.event_type)}, ${sqlString(row.event_timestamp)},
  ${sqlString(row.source_url)}, ${sqlJson(row.raw_metadata_json)}, ${sqlString(row.body_storage_policy)}
)
on conflict (provider_event_id) do update set
  event_type = excluded.event_type,
  event_timestamp = excluded.event_timestamp,
  source_url = excluded.source_url,
  raw_metadata_json = excluded.raw_metadata_json,
  body_storage_policy = excluded.body_storage_policy;`);
}

for (const row of documents) {
  lines.push(`insert into source_documents (
  raw_event_id, document_key, source_title, source_author, published_at,
  canonical_url, source_excerpt, rights_status, checksum
) values (
  (select id from raw_source_events where provider_event_id = ${sqlString(row.provider_event_id)}),
  ${sqlString(row.document_key)}, ${sqlString(row.source_title)}, ${sqlString(row.source_author)},
  ${sqlString(row.published_at)}, ${sqlString(row.canonical_url)}, ${sqlString(row.source_excerpt)},
  ${sqlString(row.rights_status)}, ${sqlString(row.checksum)}
)
on conflict (document_key) do update set
  source_title = excluded.source_title,
  source_author = excluded.source_author,
  published_at = excluded.published_at,
  canonical_url = excluded.canonical_url,
  source_excerpt = excluded.source_excerpt,
  rights_status = excluded.rights_status,
  checksum = excluded.checksum;`);
}

for (const row of signals) {
  lines.push(`insert into extracted_market_signals (
  source_document_id, signal_key, signal_category, signal_summary, affected_tickers_json,
  affected_themes_json, scoring_factors_json, confidence, extraction_model_version, extracted_at
) values (
  (select id from source_documents where document_key = ${sqlString(row.document_key)}),
  ${sqlString(row.signal_key)}, ${sqlString(row.signal_category)}, ${sqlString(row.signal_summary)},
  ${sqlJson(row.affected_tickers_json)}, ${sqlJson(row.affected_themes_json)},
  ${sqlJson(row.scoring_factors_json)}, ${row.confidence}, ${sqlString(row.extraction_model_version)},
  ${sqlString(row.extracted_at)}
)
on conflict (signal_key) do update set
  signal_category = excluded.signal_category,
  signal_summary = excluded.signal_summary,
  affected_tickers_json = excluded.affected_tickers_json,
  affected_themes_json = excluded.affected_themes_json,
  scoring_factors_json = excluded.scoring_factors_json,
  confidence = excluded.confidence,
  extraction_model_version = excluded.extraction_model_version,
  extracted_at = excluded.extracted_at;`);
}

lines.push("");
lines.push("commit;");
lines.push("");
lines.push("select 'source_registry' as table_name, count(*) as rows from source_registry");
lines.push("union all select 'ingestion_runs', count(*) from ingestion_runs");
lines.push("union all select 'raw_source_events', count(*) from raw_source_events");
lines.push("union all select 'source_documents', count(*) from source_documents");
lines.push("union all select 'extracted_market_signals', count(*) from extracted_market_signals;");

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${lines.join("\n\n")}\n`);

console.log(JSON.stringify({
  outputPath,
  sourceRegistry: sourceRegistry.length,
  ingestionRuns: ingestionRuns.length,
  rawEvents: rawEvents.length,
  documents: documents.length,
  signals: signals.length
}, null, 2));
