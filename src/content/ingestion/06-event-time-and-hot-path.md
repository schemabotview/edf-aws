# Spark event processing and operational output

## On screen

## Spark event processing and operational output

Databricks consumes Kafka independently from the S3 sink to enrich events and serve current operational views.

- **Event time** — Case-study settings: 30-second trigger and 10-minute watermark; define how late events are handled.
- **Enrichment and recovery** — Resolve asset reference data; protect a distinct checkpoint for each query.
- **Operational writes** — Use idempotent DynamoDB identities and conditions that prevent stale latest-reading updates.
- **Independent sinks** — Monitor and reconcile operational output separately from lakehouse commits.

**Ingestion contract:** A checkpoint restores query progress; it does not create an atomic transaction across DynamoDB and Iceberg.

## Narration

Spark processes Kafka events independently from raw S3 landing. The guide uses a thirty-second trigger and ten-minute watermark, but a watermark is a lateness policy rather than a guarantee that every older event is retained. Store a distinct checkpoint per query and keep the source available for recovery. DynamoDB writes need an idempotent key and a condition that prevents an old reading from replacing the latest one. A Spark checkpoint does not create one atomic transaction across DynamoDB and the lakehouse; reconcile those sinks independently.
