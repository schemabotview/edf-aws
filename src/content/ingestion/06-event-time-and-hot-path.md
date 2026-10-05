# Event time and recovery belong to Spark

## On screen

## Event time and recovery belong to Spark

- **Structured Streaming** — Thirty-second trigger; ten-minute lateness policy.
- **Enrichment and state** — Reference join; protected query checkpoint.
- **DynamoDB hot path** — Idempotent latest-reading update per meter.

**Decision:** Restart recovery and multi-sink consistency require separate designs.

## Narration

Spark processes Kafka events independently from raw S3 landing. The guide uses a thirty-second trigger and ten-minute watermark, but a watermark is a lateness policy rather than a guarantee that every older event is retained. Store a distinct checkpoint per query and keep the source available for recovery. DynamoDB writes need an idempotent key and a condition that prevents an old reading from replacing the latest one. A Spark checkpoint does not create one atomic transaction across DynamoDB and the lakehouse; reconcile those sinks independently.
