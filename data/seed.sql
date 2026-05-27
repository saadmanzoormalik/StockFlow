INSERT INTO stocks (ticker, company, sector, strategy_type, rotation_theme) VALUES
('ETN', 'Eaton', 'Electrical equipment', 'Conservative', 'Grid/Electrical Infrastructure'),
('VRT', 'Vertiv', 'Data-center infrastructure', 'Balanced', 'Cooling/Power'),
('PWR', 'Quanta Services', 'Grid construction', 'Conservative', 'Grid/Electrical Infrastructure'),
('CEG', 'Constellation Energy', 'Electricity generation', 'Balanced', 'Electricity Generation'),
('SMR', 'NuScale Power', 'Nuclear optionality', 'Aggressive', 'Nuclear/Uranium'),
('SYM', 'Symbotic', 'Physical AI / robotics', 'Aggressive', 'Physical AI/Robotics');

INSERT INTO evaluation_runs (
  run_date,
  benchmark,
  portfolio_return,
  benchmark_return,
  win_rate,
  max_drawdown,
  retrieval_precision,
  evidence_coverage,
  actionable_insight
) VALUES
('2026-05-26', 'S&P 500', 17.6, 7.5, 67.0, -4.8, NULL, NULL, 'Mock portfolio historically outperformed broad benchmark in demo data. Next step is replacing mock prices with licensed market data.');

INSERT INTO model_updates (
  model_version,
  candidate_version,
  training_signal,
  validation_result,
  approved_by,
  deployed_at
) VALUES
('mock-rotation-v0.1', 'mock-rotation-v0.2-candidate', 'Human review overrides and monthly relative performance', 'Pending validation gate', NULL, NULL);

INSERT INTO user_investor_profiles (
  user_id,
  preferred_strategy,
  inferred_risk_appetite,
  time_horizon,
  drawdown_comfort,
  experience_level,
  onboarding_answers_json
) VALUES
('demo-user-001', 'Balanced', 'Balanced Growth', '3-12 months', 'Medium', 'Beginner', '{"goal":"Find better top stock picks without reading long research","portfolio_style":"AI compute heavy"}');

INSERT INTO portfolio_connections (
  user_id,
  provider,
  connection_status,
  holdings_snapshot_json,
  last_synced_at
) VALUES
('demo-user-001', 'SnapTrade', 'connected', '{"holdings":["NVDA","MSFT","QQQ"],"detected_exposure":["AI Compute","Mega-cap Growth"]}', '2026-05-26T12:00:00Z');

INSERT INTO learning_events (
  user_id,
  event_type,
  ticker,
  signal,
  weight_adjustment,
  model_version,
  personalization_snapshot_json
) VALUES
('demo-user-001', 'save', 'VRT', 'User saved balanced cooling/power pick after viewing rationale', 0.35, 'personalization-v0.1', '{"preferred_strategy":"Balanced","drawdown_comfort":"Medium","connected_portfolio":true}');

INSERT INTO source_registry (
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
('sec-edgar', 'SEC EDGAR filings and company facts', 'SEC', 'open_filings', 'public', '60m', 'official', 'https://data.sec.gov/submissions/ and /api/xbrl/companyfacts/', '["SEC_USER_AGENT"]', '["earnings","fundamentals","policy"]', 'Store CIK, accession number, form type, filing date, company fact key, and extracted metric path.', 1),
('fred', 'FRED macroeconomic data', 'Federal Reserve Bank of St. Louis', 'macro_data', 'api_key', '60m', 'official', 'https://api.stlouisfed.org/fred/', '["FRED_API_KEY"]', '["macro","rates"]', 'Store FRED series id, observation date, realtime vintage, retrieval timestamp, and mapped macro factor.', 1),
('dow-jones-factiva', 'Dow Jones Factiva / WSJ licensed news', 'Dow Jones', 'premium_news', 'licensed', '30m', 'enterprise', 'Licensed Factiva/Dow Jones News API feed', '["DOW_JONES_API_KEY","DOW_JONES_ACCOUNT_ID"]', '["macro","trade","geopolitics","earnings","policy"]', 'Store provider id, headline, timestamp, licensed source, URL/id, extraction model, and signal mapping. Do not store full copyrighted article text unless license allows it.', 0);

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
) VALUES
('demo-ingest-sec-20260527-1300', (SELECT id FROM source_registry WHERE source_key = 'sec-edgar'), 'completed', '60m', '2026-05-27T13:00:00Z', '2026-05-27T13:00:20Z', 14, 13, 1, '["raw_source_events","source_documents","extracted_market_signals","signal_trace_links"]', 'Demo SEC ingestion normalized filings into market signals.'),
('demo-ingest-fred-20260527-1300', (SELECT id FROM source_registry WHERE source_key = 'fred'), 'completed', '60m', '2026-05-27T13:00:00Z', '2026-05-27T13:00:11Z', 8, 8, 0, '["raw_source_events","source_documents","extracted_market_signals","signal_trace_links"]', 'Demo FRED ingestion normalized macro observations into rate and electricity-demand context.'),
('demo-ingest-dowjones-20260527-1300', (SELECT id FROM source_registry WHERE source_key = 'dow-jones-factiva'), 'skipped', '30m', '2026-05-27T13:00:00Z', '2026-05-27T13:00:00Z', 0, 0, 0, '[]', 'Skipped until licensed credentials and storage rights are configured.');

INSERT INTO raw_source_events (
  ingestion_run_id,
  source_id,
  provider_event_id,
  event_type,
  event_timestamp,
  source_url,
  raw_metadata_json,
  body_storage_policy
) VALUES
((SELECT id FROM ingestion_runs WHERE run_key = 'demo-ingest-sec-20260527-1300'), (SELECT id FROM source_registry WHERE source_key = 'sec-edgar'), 'sec-demo-vrt-8k', 'filing', '2026-05-27T12:48:00Z', 'https://data.sec.gov/', '{"ticker":"VRT","form":"8-K","cik":"0000000000"}', 'metadata_only');

INSERT INTO source_documents (
  raw_event_id,
  document_key,
  source_title,
  source_author,
  published_at,
  canonical_url,
  source_excerpt,
  rights_status,
  checksum
) VALUES
((SELECT id FROM raw_source_events WHERE provider_event_id = 'sec-demo-vrt-8k'), 'doc-sec-demo-vrt-8k', 'Vertiv filing metadata demo', 'SEC EDGAR', '2026-05-27T12:48:00Z', 'https://data.sec.gov/', 'Public filing metadata used for demo signal extraction.', 'public', 'demo-checksum-sec-vrt');

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
) VALUES
((SELECT id FROM source_documents WHERE document_key = 'doc-sec-demo-vrt-8k'), 'power-backlog-demo-signal', 'fundamentals', 'Power infrastructure backlog signal supports the cooling and grid theme.', '["VRT","ETN","PWR"]', '["Cooling/Power","Grid/Electrical Infrastructure"]', '["backlog_score","forecasted_revenue_growth","guidance_upgrade_score"]', 0.84, 'signal-extractor-v0.1');

INSERT INTO signal_trace_links (
  signal_id,
  target_table,
  target_record_key,
  decision_surface,
  transformation_step,
  factor_delta_json
) VALUES
((SELECT id FROM extracted_market_signals WHERE signal_key = 'power-backlog-demo-signal'), 'active_app_states', 'demo-user-001:2026-05-27:v0.1', 'Discover', 'Mapped filing-derived backlog evidence into the daily world synthesis.', '{"backlog_score":0.04,"forecasted_revenue_growth":0.03}');
