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
