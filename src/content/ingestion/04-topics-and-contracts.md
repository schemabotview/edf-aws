# Kafka ordering has a partition boundary

## On screen

## Kafka ordering has a partition boundary

- **Producer contract** — Stable event key, schema and event timestamp.
- **Kafka topics** — raw, enriched and dlq; partition by chosen key.
- **Independent consumers** — Connector and Spark maintain separate progress.

**Decision:** Do not confuse partition ordering, schema validation and business correctness.

## Narration

The guide describes three brokers, replication factor three and twenty-four partitions. These are case-study settings, not proof of capacity for every deployment. Choose a key that preserves the required ordering, normally the meter identity for per-meter changes, and recognise that Kafka ordering is within a partition. Schema Registry validates event structure; business units and reference relationships still need processing checks. The S3 connector and the Spark enrichment job are independent consumers, with separate offsets, failure behaviour and monitoring.
