# Choose a winner reproducibly

## On screen

## Choose a winner reproducibly

- **Reading key** — meter_id plus reading_timestamp.
- **Precedence rule** — Source sequence, version and tie-breaker.
- **Accepted record** — Repeatable merge and visible reject counts.

**Decision:** A deterministic merge survives retries and overlapping ingestion routes.

## Narration

The original guide deduplicates meter ID and reading timestamp while keeping the latest reading. Define latest using source version or event sequence, then a deterministic tie-breaker, not whichever Spark partition happens to finish last. The revised design also contains database CDC; those records use the database business key and change sequence rather than the meter key universally. Apply delete operations and late corrections explicitly. Re-run the same input set and verify that accepted keys and values remain unchanged.
