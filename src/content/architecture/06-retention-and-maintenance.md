# Data lifecycle and replay

## On screen

## Data lifecycle and replay

Retention must support recovery and historical evidence without invalidating active Iceberg tables.

- **Raw archive** — Apply the case-study 90-day-to-Glacier policy to its intended raw-input scope; plan restoration before replay.
- **Table maintenance** — Compact files and expire approved snapshots through table-aware operations.
- **Replay window** — Agree how far back sources and table versions support a deterministic rebuild.
- **Audit evidence** — Preserve manifests, job versions and acceptance decisions separately from queryable table snapshots.

**Architecture decision:** Bucket lifecycle rules must not remove files referenced by active table metadata.

## Narration

The four cards distinguish raw archive, managed table maintenance, replay availability and audit evidence. The supplied case study describes ninety days of raw retention before an archive transition. Apply that policy to the intended raw scope rather than to all Iceberg files. Active table snapshots may still reference data files, so snapshot expiration and orphan cleanup require table-aware maintenance. Historical replay also depends on source availability and archive restoration time. Audit records preserve the input manifest, job version and acceptance decision; retaining those records is different from retaining every queryable table snapshot. Agree these policies together so storage savings do not undermine recovery or historical reporting.
