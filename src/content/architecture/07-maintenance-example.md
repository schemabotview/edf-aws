# Implementation: raw retention and table maintenance

## On screen

## Implementation: raw retention and table maintenance

Treat raw-object archiving and Iceberg maintenance as separate controls.

- **Raw lifecycle** — Companion JSON transitions only `raw/` objects to GLACIER after 90 days; small-object defaults and retrieval costs matter.
- **Compaction** — Rewrite data files through the table engine; measure small files and scan cost first.
- **Expiration** — The date and ten retained snapshots are illustrative. Retain versions needed by readers, recovery and audit.
- **Replay** — Restore archived inputs before replay; keep manifests and long-term evidence outside snapshot expiration.

**Implementation scope:** Do not run maintenance with an arbitrary cut-off; these are reviewable configuration examples.

## Narration

Table-aware procedures manage committed data safely, while raw lifecycle policies manage independent input objects. The companion lifecycle file targets only the raw prefix and transitions eligible objects after ninety days. Small-object transition defaults and archive retrieval delays affect the economics and recovery plan. Compaction combines files without changing business rows. Snapshot expiration removes versions outside the approved retention window, but the example date and retain-last count are not a production policy. Check concurrent readers, retained tags or branches, replay requirements and audit holds before authorising maintenance. Never apply an ordinary object-deletion rule to active Iceberg storage.
