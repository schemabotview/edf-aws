# Orchestration and dependencies

## On screen

## Orchestration and dependencies

Coordinate accepted datasets and their versions, rather than treating a successful process as complete data.

- **Bronze ready** — Accepted manifest and committed snapshot identify the bounded run.
- **Silver and Gold ready** — Schema checks, trusted records and reconciled metrics.
- **Warehouse and release** — Load the accepted version; test and release consumers.
- **MWAA coordination** — Pass run IDs and versions; use sensor timeouts and bounded retries.

**Operating contract:** Daily DAGs wait for cut-off and completeness conditions; ongoing ingestion remains an independent service.

## Narration

MWAA runs Airflow dependency graphs across ingestion, validation, transformation, warehouse loading and publication. DMS CDC and Kafka ingestion are ongoing services, so a daily DAG waits for an agreed cut-off or completeness condition rather than launching the entire stream every morning. Sensors need timeouts and meaningful failure messages. Pass run IDs, cut-offs and committed table versions between tasks so a retry resumes the same logical run instead of mixing yesterday's accepted data with today's arrivals.
