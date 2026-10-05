# MSK Connect to Bronze

## On screen

## MSK Connect to Bronze

The S3 sink lands raw Kafka records; a separate acceptance job creates the managed Bronze snapshot.

- **Connector configuration** — Select and test the sink plugin, authentication, permissions, output format and rotation policy.
- **Landing identity** — Retain topic / partition / offset where supported, or define an equivalent deterministic identity.
- **Latency and visibility** — File rotation contributes to end-to-end delay; writing an object is not an Iceberg transaction.
- **Bronze acceptance** — Validate landed files, retain provenance and commit accepted data with an Iceberg-capable job.

**Ingestion contract:** Verify delivery and retry behaviour for the chosen plugin; do not assume cross-system exactly-once delivery.

## Narration

MSK Connect runs a Kafka Connect plugin; an S3 sink writes Kafka records to object storage. Plugin packaging, authentication, permissions, output format and file rotation are deployment choices that must be configured and tested. Preserve topic, partition and offset in the landing envelope wherever the connector supports it, or define an equivalent deterministic record identity. Rotation affects end-to-end latency. The generic S3 sink does not perform an Iceberg commit, so a separate Bronze ingestion job creates the managed table snapshot.
