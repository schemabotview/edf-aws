# Quality controls and exceptions

## On screen

## Quality controls and exceptions

Retain failed data with a reason, owner and controlled route back into accepted processing.

- **Source quarantine** — Hold incompatible source partitions and preserve provenance.
- **Record DLQ** — Keep invalid rows, rejection reason and failed contract version.
- **Source control flag** — Prevent unsafe Silver consumption until authorised clearance.
- **Controlled reprocessing** — Repair the contract or data; replay a bounded scope and reconcile.

**Operating contract:** Exception clearance is an auditable decision; do not erase the original failed arrival.

## Narration

Quarantine isolates a source-level incompatibility; the record DLQ isolates individual invalid rows. Both retain provenance, rejection reason and the contract version that failed. A DynamoDB quarantined flag prevents Silver from consuming an unsafe source until an authorised correction clears it. Monitoring counts these held records and compares them with expected source volume. Reprocessing writes a new accepted version without erasing the fact that the original arrival failed validation.
