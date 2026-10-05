# Acceptance criteria

## On screen

## Acceptance criteria

Every release needs evidence that its inputs, transformations and published results satisfy the agreed contract.

- **Complete inputs** — Record source cut-off, extract identity, file manifest and control totals; flag missing feeds.
- **Explainable validation** — Account for accepted and rejected records, schema checks and reason-coded exceptions.
- **Reconciled outputs** — Compare counts and amounts over matching populations, periods and units; hold results that fail the release gate.
- **Traceable release** — Retain job and table versions, the acceptance decision and delivery receipt; demonstrate safe replay.

**Acceptance decision:** Publish only an accepted, reproducible version with an owner for every unresolved exception.

## Narration

Acceptance criteria make the business needs testable. Record the source cut-off, manifest and control totals before processing. Keep accepted and rejected counts so every arrival is accounted for. Compare outputs against the correct population, reporting period and units rather than unrelated totals. Preserve schema checks, exception reasons, job version and committed table snapshot. Publication occurs only after the release gate passes or an authorised exception is recorded. A delivery receipt is separate evidence that the accepted dataset reached its destination. Finally, replay the same inputs and show equivalent accepted results.
