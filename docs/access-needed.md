# Access Needed From User

To finish production integrations, I will need:

## GitHub

- GitHub repo URL or permission to create one.
- Preferred repo visibility: private or public.

## Supabase

- Supabase project URL.
- anon key.
- service role key.

## Stripe

- Stripe account access.
- monthly price ID for `$29.99/month`.
- webhook signing secret.

## LangSmith

- LangSmith API key.
- workspace/project name.

## Portfolio Provider

At least one sandbox account:

- Plaid, or
- SnapTrade, or
- Yodlee, or
- MX.

## Market Data

At least one API key:

- Alpha Vantage,
- Financial Modeling Prep,
- Polygon,
- Finnhub.

## Premium News And Enterprise Data

To activate the highest-quality source layer:

- Dow Jones / Factiva or WSJ-licensed news access.
- Bloomberg Data License or other enterprise Bloomberg data contract.
- CNBC or similar market-news feed rights where redistribution, summarization, and storage terms are clear.
- Nasdaq Data Link API key if we use Nasdaq datasets.

For premium news, we need explicit permission for what can be stored: metadata only, headline, excerpt, summary, embedding, or full article body.

## Official Open Data

- SEC EDGAR-compatible `SEC_USER_AGENT`.
- FRED API key.

These sources can power the first hourly ingestion loop while premium licensed feeds are being approved.

## Mobile Stores

- Apple Developer account.
- Google Play Console account.
