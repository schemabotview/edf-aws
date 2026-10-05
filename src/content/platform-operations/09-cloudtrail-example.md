# Implementation: capture S3 object data events

## On screen

## Implementation: capture S3 object data events

Configure access-event coverage separately from transformation and release lineage.

- **Coverage** — The selector records S3 object data events for one prefix; include every required lakehouse / PII scope.
- **Configuration** — Merge with existing selectors and management-event requirements; replacing selectors can remove coverage.
- **Retention** — Seven-year evidence needs configured trail delivery, protected storage, lifecycle and retrieval tests.
- **Lineage** — Store object / job / contract / snapshot / report links in the run ledger; CloudTrail does not infer that lineage.

**Implementation scope:** Event history alone is not the required data-event archive. Validate real access events and delivery before relying on it.

## Narration

The selector targets object-level data events under the raw meter prefix. This is only one scope, so it does not establish audit coverage for every platform dataset. Merge it with existing management and data-event requirements rather than overwriting configured selectors blindly. Long-term retention requires actual trail delivery, protected storage and tested retrieval; event history is not a seven-year data-event archive. Access logs answer who performed an operation. Transformation lineage must separately link source objects, contracts, job versions, snapshots, accepted warehouse runs and report revisions. Validate both access-event delivery and historical evidence retrieval.
