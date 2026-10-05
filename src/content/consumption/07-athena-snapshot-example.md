# Implementation: query the accepted Iceberg version

## On screen

## Implementation: query the accepted Iceberg version

Use snapshot-aware exploration and keep BI publication tied to the same accepted version.

- **Version** — Replace the example snapshot ID with a retained, accepted version from the release record.
- **Athena** — Use an engine / table-format combination that supports the query; configure workgroup output encryption and access.
- **BI** — Expose warehouse run and freshness alongside governed metrics; refresh only after warehouse acceptance.
- **Governance** — Validate denied PII access and export permissions, not just successful SELECT queries.

**Implementation scope:** Snapshot availability depends on retention. A latest snapshot is not necessarily an accepted reporting release.

## Narration

Athena can query a specific retained Iceberg version. Choose that identifier from the acceptance record rather than assuming the latest commit is approved for reporting. Inspect metadata snapshots when diagnosing differences, and keep the associated input run and contract versions. Configure the workgroup result location and encryption; query output is another data-access surface. Warehouse dashboards should expose the same accepted run identity and consumer freshness. A retained snapshot can support investigation, but expiration eventually removes time-travel availability. The example therefore connects publication policy with table retention and access governance.
