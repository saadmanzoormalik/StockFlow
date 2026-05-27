CREATE TABLE stocks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticker TEXT NOT NULL UNIQUE,
  company TEXT NOT NULL,
  sector TEXT NOT NULL,
  strategy_type TEXT NOT NULL CHECK(strategy_type IN ('Conservative', 'Balanced', 'Aggressive')),
  rotation_theme TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stock_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stock_id INTEGER NOT NULL,
  score_date TEXT NOT NULL,
  final_score REAL NOT NULL,
  confidence_score REAL NOT NULL,
  factor_snapshot_json TEXT NOT NULL,
  model_version TEXT NOT NULL,
  FOREIGN KEY (stock_id) REFERENCES stocks(id)
);

CREATE TABLE stock_recommendations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stock_id INTEGER NOT NULL,
  score_id INTEGER NOT NULL,
  expected_return TEXT NOT NULL,
  expected_timeline TEXT NOT NULL,
  risk_level TEXT NOT NULL,
  why_picked TEXT NOT NULL,
  key_catalyst TEXT NOT NULL,
  key_risk TEXT NOT NULL,
  disclaimer TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (stock_id) REFERENCES stocks(id),
  FOREIGN KEY (score_id) REFERENCES stock_scores(id)
);

CREATE TABLE human_feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recommendation_id INTEGER NOT NULL,
  user_decision TEXT NOT NULL CHECK(user_decision IN ('approve', 'deny', 'escalate')),
  reviewer_note TEXT,
  override_flag INTEGER NOT NULL DEFAULT 0,
  model_version TEXT NOT NULL,
  feature_snapshot_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (recommendation_id) REFERENCES stock_recommendations(id)
);

CREATE TABLE user_investor_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  preferred_strategy TEXT NOT NULL CHECK(preferred_strategy IN ('Conservative', 'Balanced', 'Aggressive')),
  inferred_risk_appetite TEXT NOT NULL CHECK(inferred_risk_appetite IN ('Capital Protection', 'Balanced Growth', 'High Upside')),
  time_horizon TEXT NOT NULL,
  drawdown_comfort TEXT NOT NULL CHECK(drawdown_comfort IN ('Low', 'Medium', 'High')),
  experience_level TEXT NOT NULL,
  onboarding_answers_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE portfolio_connections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  connection_status TEXT NOT NULL CHECK(connection_status IN ('pending', 'connected', 'disconnected', 'error')),
  holdings_snapshot_json TEXT NOT NULL,
  last_synced_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE personalized_recommendations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  stock_id INTEGER NOT NULL,
  base_score REAL NOT NULL,
  personalized_score REAL NOT NULL,
  strategy_fit_score REAL NOT NULL,
  risk_fit_score REAL NOT NULL,
  portfolio_fit_score REAL NOT NULL,
  agent_rationale_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (stock_id) REFERENCES stocks(id)
);

CREATE TABLE learning_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  ticker TEXT,
  signal TEXT NOT NULL,
  weight_adjustment REAL NOT NULL,
  model_version TEXT NOT NULL,
  personalization_snapshot_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE evaluation_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_date TEXT NOT NULL,
  benchmark TEXT NOT NULL,
  portfolio_return REAL NOT NULL,
  benchmark_return REAL NOT NULL,
  win_rate REAL NOT NULL,
  max_drawdown REAL NOT NULL,
  retrieval_precision REAL,
  evidence_coverage REAL,
  actionable_insight TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE model_updates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  model_version TEXT NOT NULL,
  candidate_version TEXT NOT NULL,
  training_signal TEXT NOT NULL,
  validation_result TEXT NOT NULL,
  approved_by TEXT,
  deployed_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE personalization_model_updates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  model_version TEXT NOT NULL,
  candidate_version TEXT NOT NULL,
  learning_event_count INTEGER NOT NULL,
  global_ranking_change_json TEXT NOT NULL,
  personalization_change_json TEXT NOT NULL,
  validation_result TEXT NOT NULL,
  approved_by TEXT,
  deployed_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE active_app_states (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  state_date TEXT NOT NULL,
  schema_version TEXT NOT NULL,
  model_version TEXT NOT NULL,
  active_surface TEXT NOT NULL CHECK(active_surface IN ('Discover', 'Decide', 'Connect', 'Menu')),
  profile_snapshot_json TEXT NOT NULL,
  discover_snapshot_json TEXT NOT NULL,
  decide_snapshot_json TEXT NOT NULL,
  connect_snapshot_json TEXT NOT NULL,
  learning_snapshot_json TEXT NOT NULL,
  evaluation_snapshot_json TEXT NOT NULL,
  disclaimer TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, state_date, schema_version)
);

CREATE TABLE market_synthesis_signals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  state_id INTEGER NOT NULL,
  signal_key TEXT NOT NULL,
  category TEXT NOT NULL,
  headline TEXT NOT NULL,
  summary TEXT NOT NULL,
  user_translation TEXT NOT NULL,
  confidence REAL NOT NULL,
  source_type TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (state_id) REFERENCES active_app_states(id)
);

CREATE TABLE ranked_stock_options (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  state_id INTEGER NOT NULL,
  ticker TEXT NOT NULL,
  rank INTEGER NOT NULL,
  theme TEXT NOT NULL,
  fit_label TEXT NOT NULL,
  reason TEXT NOT NULL,
  action TEXT NOT NULL,
  expected_return TEXT NOT NULL,
  expected_timeline TEXT NOT NULL,
  risk_level TEXT NOT NULL,
  personalized_score REAL NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (state_id) REFERENCES active_app_states(id)
);

CREATE TABLE broker_providers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider_key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  connection_status TEXT NOT NULL CHECK(connection_status IN ('available', 'connected', 'coming_soon')),
  auth_pattern TEXT NOT NULL CHECK(auth_pattern IN ('oauth', 'aggregator', 'manual')),
  purpose TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE source_registry (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  source_family TEXT NOT NULL CHECK(source_family IN ('premium_news', 'open_filings', 'macro_data', 'market_data', 'fundamentals', 'portfolio')),
  access_model TEXT NOT NULL CHECK(access_model IN ('licensed', 'api_key', 'public', 'sandbox')),
  cadence TEXT NOT NULL CHECK(cadence IN ('30m', '60m', 'daily', 'event')),
  quality_tier TEXT NOT NULL CHECK(quality_tier IN ('enterprise', 'official', 'commercial', 'prototype')),
  endpoint_pattern TEXT NOT NULL,
  env_keys_json TEXT NOT NULL,
  facets_json TEXT NOT NULL,
  lineage_policy TEXT NOT NULL,
  enabled_for_mvp INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingestion_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_key TEXT NOT NULL UNIQUE,
  source_id INTEGER NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('queued', 'running', 'completed', 'failed', 'skipped')),
  cadence TEXT NOT NULL CHECK(cadence IN ('30m', '60m', 'daily', 'event')),
  started_at TEXT NOT NULL,
  completed_at TEXT,
  records_seen INTEGER NOT NULL DEFAULT 0,
  records_accepted INTEGER NOT NULL DEFAULT 0,
  records_rejected INTEGER NOT NULL DEFAULT 0,
  output_tables_json TEXT NOT NULL,
  notes TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (source_id) REFERENCES source_registry(id)
);

CREATE TABLE raw_source_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ingestion_run_id INTEGER NOT NULL,
  source_id INTEGER NOT NULL,
  provider_event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_timestamp TEXT NOT NULL,
  source_url TEXT,
  raw_metadata_json TEXT NOT NULL,
  body_storage_policy TEXT NOT NULL CHECK(body_storage_policy IN ('metadata_only', 'licensed_excerpt', 'full_text_allowed')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ingestion_run_id) REFERENCES ingestion_runs(id),
  FOREIGN KEY (source_id) REFERENCES source_registry(id)
);

CREATE TABLE source_documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  raw_event_id INTEGER NOT NULL,
  document_key TEXT NOT NULL,
  source_title TEXT NOT NULL,
  source_author TEXT,
  published_at TEXT NOT NULL,
  canonical_url TEXT,
  source_excerpt TEXT,
  rights_status TEXT NOT NULL CHECK(rights_status IN ('public', 'licensed_metadata_only', 'licensed_excerpt', 'licensed_full_text')),
  checksum TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (raw_event_id) REFERENCES raw_source_events(id)
);

CREATE TABLE extracted_market_signals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_document_id INTEGER NOT NULL,
  signal_key TEXT NOT NULL,
  signal_category TEXT NOT NULL,
  signal_summary TEXT NOT NULL,
  affected_tickers_json TEXT NOT NULL,
  affected_themes_json TEXT NOT NULL,
  scoring_factors_json TEXT NOT NULL,
  confidence REAL NOT NULL,
  extraction_model_version TEXT NOT NULL,
  extracted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (source_document_id) REFERENCES source_documents(id)
);

CREATE TABLE signal_trace_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  signal_id INTEGER NOT NULL,
  target_table TEXT NOT NULL,
  target_record_key TEXT NOT NULL,
  decision_surface TEXT NOT NULL CHECK(decision_surface IN ('Discover', 'Decide', 'Connect', 'Menu')),
  transformation_step TEXT NOT NULL,
  factor_delta_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (signal_id) REFERENCES extracted_market_signals(id)
);

CREATE TABLE active_state_update_traces (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  state_id INTEGER NOT NULL,
  ingestion_run_id INTEGER NOT NULL,
  update_reason TEXT NOT NULL,
  source_signal_count INTEGER NOT NULL,
  before_snapshot_json TEXT NOT NULL,
  after_snapshot_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (state_id) REFERENCES active_app_states(id),
  FOREIGN KEY (ingestion_run_id) REFERENCES ingestion_runs(id)
);
