# Batch ingestion: full load and CDC

## On screen

## Batch ingestion: full load and CDC

Bootstrap supported database sources, then capture changes without treating raw files as a current-state table.

- **Source readiness** — Confirm supported engine, change logging, permissions and source-log retention.
- **Full load** — Establish the initial dataset with a controlled transition into captured changes.
- **CDC / incremental changes** — Preserve inserts, updates, deletes and source ordering metadata in S3 landing.
- **Downstream acceptance** — Validate landed files, commit Bronze and apply changes deterministically in Silver.

**Ingestion contract:** A change history needs explicit ordering and delete semantics; arbitrary file order is not business order.

## Narration

A full-load-and-CDC task starts with existing database rows and then captures ongoing source changes. Confirm source support, logging retention, permissions and the task configuration before describing a database as CDC-ready. S3 target records need enough operation and ordering information to distinguish inserts, updates and deletes. The raw output is not a current-state table: applying it in arbitrary file order can resurrect a deleted record or overwrite a newer update. The downstream processing contract defines how changes are ordered and applied.
