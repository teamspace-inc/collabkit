# SQL Agent

Takes a user query and runs SQL agent.

Can be accessed via:

1. Slackbot
1. HTTP Functions

Supports

1. Snowflake
2. Google BigQuery
3. DuckDB

## Development

## Env Vars

```bash
OPENAI_API_KEY=key
DB_TYPE=snowflake|bigquery|duckdb
```

### HTTP Functions

```bash
functions-framework --target runSQLAgent --debug
```

### DuckDB Usage

Load a CSV from disk by setting the DUCKDB_CSV env var.

This loads the file into an in-memory table like this:

```sql
CREATE TABLE data AS SELECT FROM '$DUCKDB_CSV_PATH';
```
