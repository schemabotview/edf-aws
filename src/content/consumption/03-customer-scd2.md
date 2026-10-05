# Resolve history at fact load time

## On screen

## Resolve history at fact load time

- **Customer change** — Tariff band or consumption profile changes.
- **SCD2 versions** — Effective start, effective end and current flag.
- **Event-time assignment** — Load the fact with the correct customer surrogate key.

**Decision:** History is preserved only when facts reference the correct effective version.

## Narration

The synthetic customer changes tariff from STANDARD to FLEX on October first. SCD Type 2 closes the previous effective interval and opens a new row with a new surrogate key. Assign each fact to the dimension version valid at its event time, so the normal analytical join is a key join. Validate non-overlapping effective intervals and define handling for late-arriving changes. Historical corrections may require re-keying affected facts, with an audit record of the corrected dimension and fact versions.
