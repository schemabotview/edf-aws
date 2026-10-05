# Make the requirements measurable

## On screen

## Make the requirements measurable

- **Batch completion** — Case-study target: ingestion under one hour.
- **Operational freshness** — Case-study target: visibility under two minutes.
- **Publication gate** — Variance above 0.01% blocks submission.

**Decision:** Use end-to-end measurements; a healthy job is not a fresh dataset.

## Narration

A requirement needs a measurement point. Batch completion is measured from the agreed source cut-off to accepted Bronze landing. Operational freshness is measured from the event timestamp to dashboard availability, rather than connector throughput alone. The guide supplies an ingestion target below one hour, operational visibility below two minutes and a 0.01 percent reconciliation threshold. Treat these as case-study objectives and validate them against representative volume before claiming that the revised DMS and connector architecture meets them.
