# Data Ingestion And Lineage

## Decision Layer Goal

Stock Pick Check needs to answer one retail decision clearly: which stock should this user review today, and why?

The data layer supports that decision by separating hard facts, market context, source provenance, extracted signals, scoring factors, and user-facing app state.

## Source Strategy

High-quality sources are split into four activation tiers:

- Licensed enterprise sources: Bloomberg Data License and Dow Jones Factiva / WSJ-style news feeds. These are the highest-quality sources, but they require commercial contracts and usage rights before activation.
- Licensed/commercial news feeds: CNBC or similar market-news feeds where terms allow headline, metadata, summary, or article-body storage.
- Official open sources: SEC EDGAR for filings and FRED for macro data.
- Prototype/commercial APIs: Alpha Vantage and Financial Modeling Prep for early market, price, volume, and fundamentals coverage.

The MVP starts with official open/API-key sources and keeps premium feeds registered but disabled until credentials and data rights are approved.

## Refresh Cadence

Initial operating cadence:

- Every 30 minutes: premium news and high-priority market feeds once licensed.
- Every 60 minutes: SEC, FRED, Alpha Vantage, Financial Modeling Prep, and normalized market signals.
- Event-based: portfolio provider updates after user consent or broker sync events.

## Unified Trace Path

The schema traces every source update through the system:

```text
source_registry
-> ingestion_runs
-> raw_source_events
-> source_documents
-> extracted_market_signals
-> signal_trace_links
-> active_app_states
```

This means a Discover summary, Decide recommendation, or Connect portfolio check can point back to the source, ingestion run, extracted signal, and scoring-factor change that produced it.

## Tables

- `source_registry`: source contracts, quality tier, cadence, facets, and required environment keys.
- `ingestion_runs`: every 30-minute/hourly run, status, accepted records, rejected records, and output tables.
- `raw_source_events`: provider-level event metadata before normalization.
- `source_documents`: canonical source documents, excerpts where allowed, rights status, and checksum.
- `extracted_market_signals`: normalized market signals mapped to tickers, themes, and scoring factors.
- `signal_trace_links`: links extracted signals to app surfaces and downstream records.
- `active_state_update_traces`: before/after app-state changes caused by source ingestion.

## API Visibility

- `/api/data-sources`: source registry, cadence, quality tier, and credential requirements.
- `/api/data-lineage`: latest mock ingestion traces and the visible trace path.
- `/api/app-state`: current unified app state consumed by Discover, Decide, and Connect.

## Open-Source Bootstrap

Run:

```bash
npm run ingest-open-sources
```

The first live open-source ingestion creates `data/stockflow-open-sources.sqlite`, pulls the official SEC company ticker directory, and normalizes each company into:

```text
ingestion_runs
-> raw_source_events
-> source_documents
-> extracted_market_signals
```

This is enough to prove the production pattern with a large open-source universe before attaching paid sources. Next open-source expansions are SEC submissions/company facts by CIK, FRED macro series, and API-key market/fundamental sources.

## Production Notes

Do not store full WSJ, Bloomberg, CNBC, or similar article text unless the data contract explicitly allows it. For licensed sources, default to metadata, provider document id, headline-level lineage, allowed snippets, and derived signal records.

Prototype = automated local ingestion and mock lineage.

Production = licensed connectors, rate limits, source rights, retry queues, alerting, human governance review, and data-quality evaluation gates.
