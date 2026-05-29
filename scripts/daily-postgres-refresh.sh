#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/saadmanzoor/Documents/StockFlow"
POSTGRES_BIN="/Applications/Postgres.app/Contents/Versions/latest/bin"
NODE_BIN="/Applications/Codex.app/Contents/Resources/node"
DATA_DIR="$ROOT/.postgres-data"
LOG_DIR="$ROOT/logs"
LOG_FILE="$LOG_DIR/daily-postgres-refresh.log"

export PATH="$POSTGRES_BIN:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
export PGHOST="$DATA_DIR"
export PGPORT="5433"
export PGUSER="saad"
export PGDATABASE="stockflow"
export SEC_USER_AGENT="${SEC_USER_AGENT:-StockPickCheck/0.1 daily-refresh@example.com}"

mkdir -p "$LOG_DIR"
cd "$ROOT"

{
  echo "==== $(date -u +"%Y-%m-%dT%H:%M:%SZ") daily refresh start ===="

  if ! "$POSTGRES_BIN/pg_isready" -h "$PGHOST" -p "$PGPORT" -d "$PGDATABASE" >/dev/null 2>&1; then
    echo "Postgres is not ready on socket $PGHOST port $PGPORT. Starting project-local server."
    "$POSTGRES_BIN/pg_ctl" -D "$DATA_DIR" -l "$DATA_DIR/server.log" -o "-p $PGPORT -k $DATA_DIR" start
  else
    echo "Postgres is ready on socket $PGHOST port $PGPORT."
  fi

  "$NODE_BIN" scripts/ingest-sec-rich-postgres.mjs

  "$POSTGRES_BIN/psql" -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -c "
    select 'stocks' as table_name, count(*) as rows from stocks
    union all select 'company_fact_metrics', count(*) from company_fact_metrics
    union all select 'stock_scores', count(*) from stock_scores
    union all select 'stock_recommendations', count(*) from stock_recommendations
    union all select 'data_quality_checks', count(*) from data_quality_checks
    order by table_name;
  "

  echo "==== $(date -u +"%Y-%m-%dT%H:%M:%SZ") daily refresh complete ===="
} >> "$LOG_FILE" 2>&1
