# Deduplication and change order

## On screen

## Deduplication and change order

Resolve corrected and overlapping arrivals into a repeatable accepted record.

- **Business identity** — Meter ID + reading timestamp; database CDC uses its own business key.
- **Deterministic precedence** — Source version / sequence and an explicit tie-breaker.
- **Changes and deletes** — Apply late corrections and delete operations explicitly.
- **Replay equivalence** — Same input set produces the same accepted keys and values.

**Transformation contract:** Latest means a defined source version or sequence, not the last Spark task to finish.

## Narration

The original guide deduplicates meter ID and reading timestamp while keeping the latest reading. Define latest using source version or event sequence, then a deterministic tie-breaker, not whichever Spark partition happens to finish last. The revised design also contains database CDC; those records use the database business key and change sequence rather than the meter key universally. Apply delete operations and late corrections explicitly. Re-run the same input set and verify that accepted keys and values remain unchanged.
