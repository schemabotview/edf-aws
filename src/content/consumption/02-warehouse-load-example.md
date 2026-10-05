# Implementation: staged Redshift loading

## On screen

## Implementation: staged Redshift loading

Load a version-pinned export into isolated staging before building warehouse models.

- **Transport** — COPY reads exported files, not an Iceberg metadata directory. Pin Gold and export schema first.
- **Retry scope** — Delete only the same staging run and reload transactionally; all exported rows must carry that run_id.
- **dbt** — Models filter the accepted run and build facts / dimensions; companion YAML demonstrates uniqueness and relationship tests.
- **Gate** — Reconcile staging and mart counts / totals to Gold before exposing the new published version.

**Implementation scope:** The CSV adapter is proposed, not confirmed EDF infrastructure. Role, table DDL, manifest and credentials must be supplied.

## Narration

The example separates lakehouse export, warehouse movement and dbt modeling. A COPY command cannot interpret an Iceberg table metadata directory, so export a pinned Gold version to a compatible file format with an immutable manifest. The table schema and every row must include the exact run identifier. Deleting only that staging run inside the transaction makes a retry bounded. After loading, compare counts and totals with the accepted Gold input. The dbt model selection and run variable illustrate how warehouse transformation follows loading. Tests do not replace reconciliation, and publication stays held until the warehouse output matches the approved input version.
