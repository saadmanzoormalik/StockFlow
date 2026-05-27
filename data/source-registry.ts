import type { DataSourceRegistryEntry } from "@/lib/types";

export const dataSourceRegistry: DataSourceRegistryEntry[] = [
  {
    id: "dow-jones-factiva",
    name: "Dow Jones Factiva / WSJ licensed news",
    provider: "Dow Jones",
    sourceFamily: "premium_news",
    accessModel: "licensed",
    cadence: "30m",
    qualityTier: "enterprise",
    endpointPattern: "Licensed Factiva/Dow Jones News API feed",
    envKeys: ["DOW_JONES_API_KEY", "DOW_JONES_ACCOUNT_ID"],
    facets: ["macro", "trade", "geopolitics", "earnings", "policy"],
    lineagePolicy: "Store provider id, headline, timestamp, licensed source, URL/id, extraction model, and signal mapping. Do not store full copyrighted article text unless license allows it.",
    enabledForMvp: false
  },
  {
    id: "bloomberg-data-license",
    name: "Bloomberg Data License",
    provider: "Bloomberg",
    sourceFamily: "market_data",
    accessModel: "licensed",
    cadence: "30m",
    qualityTier: "enterprise",
    endpointPattern: "Bloomberg REST/SFTP/cloud delivery depending on license",
    envKeys: ["BLOOMBERG_API_KEY", "BLOOMBERG_ACCOUNT"],
    facets: ["macro", "rates", "price_volume", "fundamentals"],
    lineagePolicy: "Store Bloomberg security identifier, field ids, request id, delivery timestamp, and derived factor mapping.",
    enabledForMvp: false
  },
  {
    id: "cnbc-markets",
    name: "CNBC market headlines",
    provider: "CNBC",
    sourceFamily: "premium_news",
    accessModel: "licensed",
    cadence: "60m",
    qualityTier: "commercial",
    endpointPattern: "Licensed news/RSS/feed integration where terms permit",
    envKeys: ["CNBC_FEED_URL"],
    facets: ["macro", "trade", "geopolitics", "earnings"],
    lineagePolicy: "Store headline-level metadata, canonical URL, retrieval timestamp, and derived signal. Avoid storing article body unless rights are granted.",
    enabledForMvp: false
  },
  {
    id: "sec-edgar",
    name: "SEC EDGAR filings and company facts",
    provider: "SEC",
    sourceFamily: "open_filings",
    accessModel: "public",
    cadence: "60m",
    qualityTier: "official",
    endpointPattern: "https://data.sec.gov/submissions/ and /api/xbrl/companyfacts/",
    envKeys: ["SEC_USER_AGENT"],
    facets: ["earnings", "fundamentals", "policy"],
    lineagePolicy: "Store CIK, accession number, form type, filing date, company fact key, and extracted metric path.",
    enabledForMvp: true
  },
  {
    id: "fred",
    name: "FRED macroeconomic data",
    provider: "Federal Reserve Bank of St. Louis",
    sourceFamily: "macro_data",
    accessModel: "api_key",
    cadence: "60m",
    qualityTier: "official",
    endpointPattern: "https://api.stlouisfed.org/fred/",
    envKeys: ["FRED_API_KEY"],
    facets: ["macro", "rates"],
    lineagePolicy: "Store FRED series id, observation date, realtime vintage, retrieval timestamp, and mapped macro factor.",
    enabledForMvp: true
  },
  {
    id: "alpha-vantage",
    name: "Alpha Vantage market and fundamentals",
    provider: "Alpha Vantage",
    sourceFamily: "market_data",
    accessModel: "api_key",
    cadence: "60m",
    qualityTier: "prototype",
    endpointPattern: "https://www.alphavantage.co/query",
    envKeys: ["ALPHA_VANTAGE_API_KEY"],
    facets: ["price_volume", "fundamentals", "rates"],
    lineagePolicy: "Store function name, ticker, adjusted timestamp, API call id, and factor mapping.",
    enabledForMvp: true
  },
  {
    id: "financial-modeling-prep",
    name: "Financial Modeling Prep fundamentals",
    provider: "Financial Modeling Prep",
    sourceFamily: "fundamentals",
    accessModel: "api_key",
    cadence: "60m",
    qualityTier: "commercial",
    endpointPattern: "https://financialmodelingprep.com/stable/",
    envKeys: ["FINANCIAL_MODELING_PREP_API_KEY"],
    facets: ["earnings", "fundamentals", "price_volume"],
    lineagePolicy: "Store endpoint, ticker, fiscal period, API timestamp, normalized metric, and score factor mapping.",
    enabledForMvp: true
  },
  {
    id: "portfolio-aggregator",
    name: "Portfolio provider layer",
    provider: "Plaid / SnapTrade / Yodlee / MX",
    sourceFamily: "portfolio",
    accessModel: "sandbox",
    cadence: "event",
    qualityTier: "commercial",
    endpointPattern: "Provider-specific read-only holdings API",
    envKeys: ["PLAID_CLIENT_ID", "SNAPTRADE_CLIENT_ID", "YODLEE_CLIENT_ID", "MX_CLIENT_ID"],
    facets: ["portfolio"],
    lineagePolicy: "Store provider, account id hash, holdings snapshot version, user consent timestamp, and overlap check id.",
    enabledForMvp: true
  }
];

export const ingestionSchedule = {
  defaultCadence: "60m",
  highPriorityCadence: "30m",
  cronExamples: {
    every30Minutes: "*/30 * * * *",
    hourly: "0 * * * *"
  },
  outputTables: [
    "source_registry",
    "ingestion_runs",
    "raw_source_events",
    "source_documents",
    "extracted_market_signals",
    "signal_trace_links",
    "active_app_states"
  ]
};
