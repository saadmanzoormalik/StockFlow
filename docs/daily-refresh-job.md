# Daily Refresh Job

## Current Schedule

A Codex workspace automation is active:

```text
Name: StockFlow daily SEC refresh
Schedule: daily at 6:00 AM local time
Workspace: /Users/saadmanzoor/Documents/StockFlow
Automation id: stockflow-daily-sec-refresh
```

The automation checks the local Postgres pipeline and reports row counts for the main data tables.

## Native macOS Launchd Job

The repo also contains a native macOS launchd setup:

```text
scripts/daily-postgres-refresh.sh
ops/launchd/com.stockflow.daily-refresh.plist
```

The script:

```text
1. Checks the project-local Postgres socket on port 5433.
2. Starts the project-local Postgres server if needed.
3. Runs the rich SEC ingestion.
4. Logs table counts.
5. Appends output to logs/daily-postgres-refresh.log.
```

Install the launchd job:

```bash
mkdir -p ~/Library/LaunchAgents
cp ops/launchd/com.stockflow.daily-refresh.plist ~/Library/LaunchAgents/
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.stockflow.daily-refresh.plist
launchctl enable gui/$(id -u)/com.stockflow.daily-refresh
```

Run it manually:

```bash
launchctl kickstart -k gui/$(id -u)/com.stockflow.daily-refresh
```

Check logs:

```bash
tail -100 logs/daily-postgres-refresh.log
tail -100 logs/launchd-daily-refresh.err.log
```

## Manual Run

```bash
scripts/daily-postgres-refresh.sh
```

## Important

The daily job currently refreshes official SEC open-source data. It is production-pattern infrastructure, not yet production investment data. Next enterprise sources are:

- live price and volume data
- analyst estimates and revisions
- premium news with licensed rights
- broker portfolio integrations
- benchmark performance history
