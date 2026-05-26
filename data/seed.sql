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
