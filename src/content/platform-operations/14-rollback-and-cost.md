# Rollback and operating cost

## On screen

## Rollback and operating cost

Name the recovery boundary before optimising compute, storage or connector capacity.

- **Rollback boundary** — Restore compatible job artifact and accepted data version.
- **Schema and checkpoint state** — Check whether migrations prevent the proposed rollback.
- **Measured cost drivers** — Scans, compute time, connector capacity and snapshot retention.
- **Cost per accepted output** — Compare reporting periods or event volume against service objectives.

**Operating contract:** Cost changes are acceptable only while freshness, recovery and correctness remain intact.

## Narration

A rollback plan names the code artifact and accepted output version to restore, then checks whether schema or checkpoint changes prevent that restoration. Cost review uses measured drivers: bytes scanned, compute time, connector capacity, small-file overhead and retained snapshots. Compaction and scheduling can improve cost but must not reduce auditability or violate freshness objectives. Compare cost per accepted reporting period or event volume, rather than treating the cheapest service configuration as the best architecture.
