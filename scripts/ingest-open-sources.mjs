import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const root = new URL("..", import.meta.url);
const workspace = root.pathname;
const dbPath = new URL("../data/stockflow-open-sources.sqlite", import.meta.url).pathname;
const schemaPath = new URL("../data/schema.sql", import.meta.url).pathname;
const artifactDir = new URL("../artifacts/ingestion", import.meta.url).pathname;
const secUserAgent = process.env.SEC_USER_AGENT || "StockPickCheck/0.1 demo-contact@example.com";

const args = new Map(
  process.argv.slice(2).map((arg) => {
    const [key, value = "true"] = arg.replace(/^--/, "").split("=");
    return [key, value];
  })
);

const limit = Number(args.get("limit") || 500);
const now = new Date().toISOString();
const runKey = `open-source-${now.replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "")}`;

function sqlString(value) {
  if (value === null || value === undefined) {
    return "NULL";
  }

  return `'${String(value).replaceAll("'", "''")}'`;
}

function sqlJson(value) {
  return sqlString(JSON.stringify(value));
}

async function fetchJson(url, headers = {}) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": secUserAgent,
      "Accept-Encoding": "gzip, deflate",
      ...headers
    }
  });

  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status} ${response.statusText}: ${url}`);
  }

  return response.json();
}

function runSql(sql) {
  const tempDir = mkdtempSync(join(tmpdir(), "stockflow-ingest-"));
  const sqlPath = join(tempDir, "ingest.sql");
  writeFileSync(sqlPath, sql);
  execFileSync("sqlite3", [dbPath, `.read ${sqlPath}`], { cwd: workspace, stdio: "pipe" });
}

function ensureDatabase() {
  if (!existsSync(dbPath)) {
    runSql(`.read ${schemaPath}\n`);
  }
}

async function loadSecCompanies() {
  const payload = await fetchJson("https://www.sec.gov/files/company_tickers.json");
  return Object.values(payload)
    .map((company) => ({
      cik: String(company.cik_str).padStart(10, "0"),
      ticker: company.ticker,
      title: company.title
    }))
    .slice(0, limit);
}

function buildRegistrySql() {
  return `
INSERT OR IGNORE INTO source_registry (
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
) VALUES
('sec-company-tickers', 'SEC company ticker directory', 'SEC', 'open_filings', 'public', '60m', 'official', 'https://www.sec.gov/files/company_tickers.json', '["SEC_USER_AGENT"]', '["earnings","fundamentals"]', 'Store CIK, ticker, company title, retrieval timestamp, and derived universe membership.', 1);
`;
}

function buildCompanySql(companies) {
  const rows = companies.map((company) => `
INSERT OR IGNORE INTO raw_source_events (
  ingestion_run_id,
  source_id,
  provider_event_id,
  event_type,
  event_timestamp,
  source_url,
  raw_metadata_json,
  body_storage_policy
) VALUES (
  (SELECT id FROM ingestion_runs WHERE run_key = ${sqlString(runKey)}),
  (SELECT id FROM source_registry WHERE source_key = 'sec-company-tickers'),
  ${sqlString(`sec-company-${company.cik}`)},
  'company_ticker',
  ${sqlString(now)},
  'https://www.sec.gov/files/company_tickers.json',
  ${sqlJson(company)},
  'metadata_only'
);

INSERT OR IGNORE INTO source_documents (
  raw_event_id,
  document_key,
  source_title,
  source_author,
  published_at,
  canonical_url,
  source_excerpt,
  rights_status,
  checksum
) VALUES (
  (SELECT id FROM raw_source_events WHERE provider_event_id = ${sqlString(`sec-company-${company.cik}`)}),
  ${sqlString(`sec-company-${company.cik}`)},
  ${sqlString(`${company.ticker} ${company.title}`)},
  'SEC',
  ${sqlString(now)},
  'https://www.sec.gov/files/company_tickers.json',
  ${sqlString(`SEC ticker directory record for ${company.ticker}.`)},
  'public',
  ${sqlString(`sec-company-${company.cik}-${company.ticker}`)}
);

INSERT INTO extracted_market_signals (
  source_document_id,
  signal_key,
  signal_category,
  signal_summary,
  affected_tickers_json,
  affected_themes_json,
  scoring_factors_json,
  confidence,
  extraction_model_version
)
SELECT
  (SELECT id FROM source_documents WHERE document_key = ${sqlString(`sec-company-${company.cik}`)}),
  ${sqlString(`universe-membership-${company.ticker}`)},
  'fundamentals',
  ${sqlString(`${company.ticker} added to the official SEC-listed company universe for downstream scoring.`)},
  ${sqlJson([company.ticker])},
  ${sqlJson(["Open Source Universe"])},
  ${sqlJson(["coverage_universe", "filing_availability"])},
  0.98,
  'open-source-ingestor-v0.1'
WHERE NOT EXISTS (
  SELECT 1 FROM extracted_market_signals
  WHERE signal_key = ${sqlString(`universe-membership-${company.ticker}`)}
);
`).join("\n");

  return `
${buildRegistrySql()}

INSERT INTO ingestion_runs (
  run_key,
  source_id,
  status,
  cadence,
  started_at,
  completed_at,
  records_seen,
  records_accepted,
  records_rejected,
  output_tables_json,
  notes
) VALUES (
  ${sqlString(runKey)},
  (SELECT id FROM source_registry WHERE source_key = 'sec-company-tickers'),
  'completed',
  '60m',
  ${sqlString(now)},
  ${sqlString(new Date().toISOString())},
  ${companies.length},
  ${companies.length},
  0,
  ${sqlJson(["raw_source_events", "source_documents", "extracted_market_signals"])},
  ${sqlString("Fetched official SEC company ticker directory and normalized it into lineage tables.")}
);

${rows}
`;
}

ensureDatabase();
const companies = await loadSecCompanies();
runSql(buildCompanySql(companies));

if (!existsSync(artifactDir)) {
  mkdirSync(artifactDir, { recursive: true });
}

const snapshot = {
  job: "open-source-ingestion",
  runKey,
  generatedAt: now,
  database: dbPath,
  source: "SEC company ticker directory",
  recordsAccepted: companies.length,
  sample: companies.slice(0, 10),
  nextSources: [
    "SEC submissions and company facts by CIK",
    "FRED macro series when FRED_API_KEY is set",
    "Alpha Vantage price/fundamentals when ALPHA_VANTAGE_API_KEY is set",
    "Financial Modeling Prep fundamentals when FINANCIAL_MODELING_PREP_API_KEY is set"
  ]
};

writeFileSync(join(artifactDir, "open-source-ingestion-summary.json"), JSON.stringify(snapshot, null, 2));
console.log(JSON.stringify(snapshot, null, 2));
