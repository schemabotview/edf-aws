# BI and lakehouse exploration

## On screen

## BI and lakehouse exploration

Choose the access path by workload while preserving shared metric and access definitions.

- **Power BI / Redshift** — Governed marts for commercial reporting and analysis.
- **Amazon Athena** — Explore committed Iceberg tables without warehouse loading.
- **Shared definitions** — Agree grains, metrics and accepted input versions.
- **Access and freshness** — Restrict PII consistently and expose published-data freshness.

**Consumption contract:** Different query engines must expose consistent business meaning and accepted versions.

## Narration

Power BI and commercial analysts use the warehouse for governed reporting models. Data scientists can query Iceberg through Athena, which keeps exploratory scans separate from warehouse capacity. Separate access paths should not create conflicting definitions: document the accepted table versions, fact grains and metric contracts each consumer uses. Restrict PII consistently across both paths. Validate consumer freshness against published output, not merely against a successful upstream transformation.
