# Read the platform from left to right

## On screen

## Read the platform from left to right

- **Sources and ingestion** — Database changes via DMS; events via Kafka.
- **Storage and processing** — S3 landing, Iceberg medallion and separate jobs.
- **Serving and consumers** — Redshift, Athena and DynamoDB access paths.

**Decision:** Keep ingestion, table commits and serving responsibilities explicit.

[Open the full architecture poster](#/edf-aws-codex)

## Narration

The full poster in this repo is copied from the approved edf-aws-codex fixture. Read the complete canonical scene from sources through ingestion, storage and processing to serving; later sections highlight those same containers. Database sources use DMS; event publishers use Kafka. Both paths preserve raw data on S3 before analytical transformations create Iceberg tables. Redshift serves warehouse models, Athena reads the lakehouse and DynamoDB serves operational keys. MWAA, quality gates and access controls apply across these paths rather than acting as another data transformation.
