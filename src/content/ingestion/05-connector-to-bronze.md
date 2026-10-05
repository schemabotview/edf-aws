# MSK Connect lands raw events on S3

## On screen

## MSK Connect lands raw events on S3

- **Kafka source** — Records with topic, partition and offset identity.
- **MSK Connect** — Managed runtime for an S3 sink plugin.
- **Bronze acceptance** — Validate landed files and commit Iceberg separately.

**Decision:** Connector delivery guarantees must be verified for the selected plugin and configuration.

## Narration

MSK Connect runs a Kafka Connect plugin; an S3 sink writes Kafka records to object storage. Plugin packaging, authentication, permissions, output format and file rotation are deployment choices that must be configured and tested. Preserve topic, partition and offset in the landing envelope wherever the connector supports it, or define an equivalent deterministic record identity. Rotation affects end-to-end latency. The generic S3 sink does not perform an Iceberg commit, so a separate Bronze ingestion job creates the managed table snapshot.
