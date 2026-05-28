# Local PostgreSQL Setup

## Goal

Run StockFlow on a proper local SQL server before pushing the same schema into Supabase or another managed Postgres provider.

Mental model:

```text
Local SQLite prototype
-> exported seed SQL
-> local PostgreSQL server
-> DBeaver visual query layer
-> Supabase / managed Postgres production path
```

## Recommended Install

Use Postgres.app on macOS:

- Download: https://postgres.app/
- Official PostgreSQL macOS package options: https://www.postgresql.org/download/macosx/

After installing, open Postgres.app and click **Initialize** if prompted.

Add Postgres command-line tools to the shell path:

```bash
echo 'export PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"' >> ~/.zprofile
source ~/.zprofile
```

Confirm:

```bash
psql --version
createdb --version
```

## Project-Local Server

For this workspace, StockFlow is running on a project-local PostgreSQL cluster because Postgres.app is already using port `5432`.

Current connection:

```text
Host: localhost
Port: 5433
Database: stockflow
User: saadmanzoor
Password: blank
```

Start the project-local server:

```bash
pg_ctl -D .postgres-data -l .postgres-data/server.log -o "-p 5433 -k /Users/saadmanzoor/Documents/StockFlow/.postgres-data" start
```

Stop it:

```bash
pg_ctl -D .postgres-data stop
```

## Create Local Database

```bash
createdb -h localhost -p 5433 stockflow
```

## Create Tables

From the repo root:

```bash
psql -h localhost -p 5433 -d stockflow -f supabase/create_tables_idempotent.sql
```

This creates all application, ingestion, learning, evaluation, and traceability tables.

## Export Local SQLite Data To Postgres Seed SQL

```bash
npm run export-postgres-seed
```

This generates:

```text
artifacts/postgres/open-source-seed.sql
```

## Import Representative Open-Source Data

```bash
psql -h localhost -p 5433 -d stockflow -f artifacts/postgres/open-source-seed.sql
```

Expected initial representative data:

- `source_registry`: SEC company ticker source
- `ingestion_runs`: completed ingestion runs
- `raw_source_events`: SEC raw ticker records
- `source_documents`: normalized source records
- `extracted_market_signals`: ticker universe signals

## Visual Query Tool

Use DBeaver Community:

- Download: https://dbeaver.com/edition/community/

Connection settings:

```text
Database: PostgreSQL
Host: localhost
Port: 5433
Database: stockflow
User: saadmanzoor
Password: blank
```

## Useful Verification Query

```sql
select 'source_registry' as table_name, count(*) as rows from source_registry
union all select 'ingestion_runs', count(*) from ingestion_runs
union all select 'raw_source_events', count(*) from raw_source_events
union all select 'source_documents', count(*) from source_documents
union all select 'extracted_market_signals', count(*) from extracted_market_signals;
```

## Enterprise Evolution

Prototype:

```text
Postgres.app local database
-> representative open-source SEC data
-> DBeaver visual queries
```

Production:

```text
Supabase / managed Postgres
-> scheduled ingestion jobs
-> licensed market and news connectors
-> source lineage
-> evaluation dashboard
-> agentic decision workflow
```
