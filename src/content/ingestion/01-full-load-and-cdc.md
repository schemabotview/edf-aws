# Bootstrap once, then capture changes

## On screen

## Bootstrap once, then capture changes

- **Database source** — Enable supported source change logging.
- **AWS DMS** — Full load followed by ongoing CDC.
- **S3 landing** — Preserve operations and source sequence.

**Decision:** CDC is an operation history that must be applied deterministically.

## Narration

A full-load-and-CDC task starts with existing database rows and then captures ongoing source changes. Confirm source support, logging retention, permissions and the task configuration before describing a database as CDC-ready. S3 target records need enough operation and ordering information to distinguish inserts, updates and deletes. The raw output is not a current-state table: applying it in arbitrary file order can resurrect a deleted record or overwrite a newer update. The downstream processing contract defines how changes are ordered and applied.
