# A dashboard lookup is not an analytical scan

## On screen

## A dashboard lookup is not an analytical scan

- **Streaming update** — Conditional latest-reading write.
- **DynamoDB key** — meter_id plus reading_timestamp.
- **Operations dashboard** — Freshness timestamp and anomaly context.

**Decision:** Display freshness explicitly and use the API that matches the key design.

## Narration

DynamoDB serves point-oriented operational access, while Redshift serves analytical scans. With meter_id as partition key and reading_timestamp as sort key, a latest-reading lookup can use a descending Query limited to one item; GetItem requires the full key. Preserve timestamps so the dashboard can show stale data rather than imply it is current. The ninety-day TTL manages hot-path retention but expiration is asynchronous, so correctness must not depend on an expired row disappearing immediately.
