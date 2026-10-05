# Implementation: quarantine and repair evidence

## On screen

## Implementation: quarantine and repair evidence

Persist the failed scope, hold decision and repair lineage before replaying data.

- **Contain** — Source control flags and promotion jobs check the quarantine state; preserve the original arrival.
- **Repair** — Owner confirms source meaning and approves a versioned contract / transformation change.
- **Replay** — Use an immutable scope manifest; store reject reasons, repaired output versions and gate results.
- **Clear** — Clear the hold only after approved evidence passes, using a conditional state transition.

**Implementation scope:** The ledger shape is proposed; its enforcement must be implemented in the source-control and publication jobs.

## Narration

The ledger gives quarantine an enforceable lifecycle. It records the affected source and exact scope manifest, an owner and a publication hold. A record by itself does not stop unsafe jobs, so processing and publication must check the control state. Confirm what the source unit means before approving conversion. Retain the old contract and arrival, then record the new contract, repair artifact, replay run and reconciliation decision. Clear the hold only through an authorised conditional transition after all gates pass. This connects record-level exceptions and source-level schema incidents without erasing the original failure evidence.
