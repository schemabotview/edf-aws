# Retention must respect table metadata

## On screen

## Retention must respect table metadata

- **Raw archive** — Case-study policy: 90 days, then Glacier.
- **Table maintenance** — Compact files and expire approved snapshots.
- **Replay window** — Align source, snapshots and audit evidence.

**Decision:** Do not let bucket lifecycle rules invalidate active table snapshots.

## Narration

The case study retains raw inputs for ninety days before an archive transition. Apply this lifecycle to the raw archive scope, not indiscriminately to active Iceberg files. Snapshot expiration and orphan cleanup must follow the table engine and agreed audit window. Compaction reduces small-file overhead but must preserve committed table semantics. An archived object may require restoration before replay, so recovery time belongs in the retention decision. A seven-year audit record is also different from a promise to retain every queryable table snapshot for seven years.
