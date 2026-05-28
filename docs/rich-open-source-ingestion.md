# Rich Open-Source Financial Ingestion

## Goal

Fill the local PostgreSQL `stockflow` database with enough high-quality representative data to test the agentic stock intelligence system end to end.

The first production-grade open-source layer uses official SEC datasets:

```text
SEC company ticker directory
-> SEC companyfacts by CIK
-> normalized company metrics
-> scoring factors
-> stock recommendations
-> app-state snapshots
-> data-quality checks
```

## Command

```bash
npm run ingest-sec-rich
```

Default local Postgres connection:

```text
Host: 127.0.0.1
Port: 5433
Database: stockflow
User: saad
```

## Tables Populated

- `source_registry`
- `ingestion_runs`
- `raw_source_events`
- `source_documents`
- `extracted_market_signals`
- `stocks`
- `stock_scores`
- `stock_recommendations`
- `stock_universe_memberships`
- `company_fact_metrics`
- `active_app_states`
- `evaluation_runs`
- `data_quality_checks`

## New Tables

`company_fact_metrics`

Normalized SEC XBRL metrics by ticker, CIK, metric key, fiscal period, unit, value, and source document key.

`stock_universe_memberships`

The AI infrastructure test universe: compute, networking, cooling/power, grid, electricity generation, nuclear, physical AI/robotics, and strategic materials.

`data_quality_checks`

Run-level checks for coverage, metric volume, recommendation generation, and readiness gaps.

## Current Loaded Dataset

Latest run loaded:

- 35 tracked tickers
- 1,500+ normalized SEC metric rows
- 35 latest stock scores
- 35 latest recommendations
- 1 active app-state snapshot
- 3 data-quality checks per run

## What This Enables

Agentic workflow testing:

```text
Data Retrieval Agent
-> SEC evidence
-> Rules/Scoring Agent
-> Decision Agent
-> Evaluation Agent
-> App State Generator
```

UI testing:

```text
Discover: market/fundamental synthesis
Decide: ranked stock options with evidence
Connect: portfolio validation prompt
Evaluation: data quality and coverage checks
```

## Data Quality Boundary

This is good enough to test architecture, data lineage, agent coordination, scoring, and evaluation.

It is not yet sufficient for production investment recommendations because it is missing:

- live price and volume data
- intraday market data
- analyst estimates and revisions
- premium news rights
- broker portfolio data
- backtest-grade historical return series
- live alerts

Production requires licensed market/news data plus governance gates before user-facing investment claims.
