# Two routes into Bronze

## On screen

## Two routes into Bronze

- **DMS database route** — Full load plus ongoing CDC to raw S3.
- **Kafka event route** — MSK Connect S3 sink preserves event records.
- **Bronze table commit** — A processing job validates and commits Iceberg.

**Decision:** Raw object arrival and committed table visibility are different events.

## Narration

The latest architecture adds DMS and MSK Connect to the original case study. These additions change the ingestion mechanism, not the need for a replay point. DMS writes source rows and changes to S3 files; a Kafka S3 sink connector writes event files. Neither generic S3 landing route automatically makes an Iceberg transaction. A processing job records file provenance and commits the Bronze table. Spark event-time processing remains a separate consumer responsibility; MSK Connect is a managed Kafka Connect runtime, not a Spark execution engine.
