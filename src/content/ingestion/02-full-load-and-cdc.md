# Batch ingestion: full load and CDC

## On screen

## Batch ingestion: implementation settings

**Illustrative profile:** PostgreSQL → DMS → raw S3 CSV → Bronze Iceberg; validate against the actual source engine.

- **Source DB** — `wal_level=logical`; size replication slots / WAL senders; grant replication and table-read access. RDS: `rds.logical_replication=1`; monitor retained WAL.
- **DMS task** — `MigrationType=full-load-and-cdc`; explicit table mappings; `MaxFullLoadSubTasks=8` as a starting point; keep both full-load stop flags `false`.
- **S3 endpoint** — Set bucket / prefix and service role; use KMS encryption. `PreserveTransactions=true` + `CdcPath=cdc` keeps ordered CDC as CSV; disable date partitioning and headers.
- **Acceptance** — Retain operations and provenance, reconcile inputs, commit Bronze separately, then advance durable progress.

**Tuning:** `CdcMaxBatchInterval=60` seconds is a starting point, not an end-to-end SLA.

## Narration

This implementation profile is an illustrative PostgreSQL source, not a claim about EDF’s production database. For self-managed PostgreSQL, enable logical WAL and provision replication slots and WAL senders for the task count. Grant the required replication and table-read permissions, and monitor retained WAL when DMS falls behind. RDS PostgreSQL uses its logical replication parameter and the required instance restart. Create a full-load-and-CDC task with explicit table selection. Start with eight full-load subtasks and keep both stop-after-full-load flags false so change capture continues. The S3 endpoint names a dedicated raw bucket prefix, service role and KMS key. This example preserves CDC transaction order using PreserveTransactions and CdcPath, which writes ordered CDC as CSV. Do not combine that mode with date partitioning, column headers or automatic Glue catalog generation. File rotation is a tuning input, not proof of consumer freshness. A separate acceptance job validates and commits Bronze Iceberg before recording processing progress.
