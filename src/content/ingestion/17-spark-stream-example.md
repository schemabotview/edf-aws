# Implementation: event time and checkpoints

## On screen

## Implementation: event time and checkpoints

Show where event-time state, durable query progress and sink retry semantics are configured.

- **Decode and enrich** — Adapter validates Avro, retains topic / partition / offset and resolves reference history.
- **Watermark** — Ten minutes manages aggregation state; update mode emits revisions, not final regulatory totals.
- **Checkpoint** — One durable path per compatible query; startingOffsets applies only to a new query without checkpoint progress.
- **Sink** — foreachBatch can retry a batch. Stable keys and source / window revisions must prevent duplicate or stale writes.

**Implementation scope:** Runtime adapters and Kafka auth are explicit prerequisites. Watermarks alone do not deduplicate corrected readings.

## Narration

This Spark excerpt demonstrates the query boundaries rather than pretending to implement a complete connector or sink. A project decoder validates the wire format, retains offsets and resolves measurement semantics. Watermarking manages event-time aggregation state. Update mode can emit revised window totals, so these operational summaries are not final reconciled reporting facts. The source-version deduplication policy must run before summing corrected readings. Each compatible query needs its own checkpoint location. When a checkpoint exists, stored offsets take precedence over the starting-offset option. The foreachBatch callback may repeat after failure, so the DynamoDB adapter must write stable identities with revision-aware conditions.
