# Streaming event contracts

## On screen

## Streaming event contracts

Define event identity and partition behaviour before configuring connectors or Spark consumers.

- **Event envelope** — Preserve meter key, event timestamp, measurement unit and source correction version.
- **Topic strategy** — raw, enriched and dlq topics; choose a partition key for required per-meter ordering.
- **Schema contract** — Avro / Schema Registry validates structure; unit meaning and reference relationships still need processing checks.
- **Consumer independence** — MSK Connect and Spark have separate offsets, failure behaviour and recovery state.

**Ingestion contract:** Case-study settings of 3 brokers, replication factor 3 and 24 partitions are reference configuration, not a capacity guarantee.

## Narration

The guide describes three brokers, replication factor three and twenty-four partitions. These are case-study settings, not proof of capacity for every deployment. Choose a key that preserves the required ordering, normally the meter identity for per-meter changes, and recognise that Kafka ordering is within a partition. Schema Registry validates event structure; business units and reference relationships still need processing checks. The S3 connector and the Spark enrichment job are independent consumers, with separate offsets, failure behaviour and monitoring.
