# Implementation: bounded backfill and rollback

## On screen

## Implementation: bounded backfill and rollback

Rebuild a declared scope in isolation and compare it with the accepted baseline before promotion.

- **Replay** — Reuse immutable inputs and contracts; test interruption after commit but before progress update.
- **Rollback** — Restore only compatible artifacts / data pointers; changed schema or checkpoint state may block rollback.
- **Hot path** — Backfill stays isolated here. Any operational replay needs event-time and correction guards against stale overwrites.
- **Cost** — Record compute, scanned bytes, archive restoration and cost per accepted output; preserve correctness and freshness.

**Implementation scope:** This recovery plan is a proposed project contract, not an automatically executable rollback command.

## Narration

The plan fixes a half-open event interval, immutable input manifest and exact artifact and contract versions. Candidate output stays separate from the accepted release. Hot-path writes are disabled so a historical backfill cannot overwrite current operational readings. If operational replay is required, the sink must guard event time and source revision. Compare keys, values, counts and totals before moving the published pointer. Rollback requires compatibility with the current schema and checkpoint state, not just an old code artifact. Record recovery costs, including archive retrieval and scanned bytes, and assess them per accepted output while retaining the service objectives.
