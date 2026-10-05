# Choose the access path by workload

## On screen

## Choose the access path by workload

- **Power BI** — Warehouse reporting against governed Redshift marts.
- **Amazon Athena** — Exploration over committed Iceberg tables.
- **Shared definitions** — Common metric and access contracts.

**Decision:** Different query engines can serve one governed business definition.

## Narration

Power BI and commercial analysts use the warehouse for governed reporting models. Data scientists can query Iceberg through Athena, which keeps exploratory scans separate from warehouse capacity. Separate access paths should not create conflicting definitions: document the accepted table versions, fact grains and metric contracts each consumer uses. Restrict PII consistently across both paths. Validate consumer freshness against published output, not merely against a successful upstream transformation.
