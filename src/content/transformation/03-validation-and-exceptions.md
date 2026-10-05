# Validation and exceptions

## On screen

## Validation and exceptions

Account for every arrival before promoting accepted records into Silver.

- **Mandatory identity** — Check source, meter key, event time and arrival provenance.
- **Valid measurement** — Verify units, required values and source-specific measurement rules.
- **Reference integrity** — Resolve valid meter, tariff, customer and asset relationships.
- **Reason-coded exceptions** — Quarantine incompatible inputs; retain DLQ rows with owner and run ID.

**Transformation contract:** Accepted plus rejected records must reconcile to the bounded input set.

## Narration

Validation protects the transition from raw arrivals to trusted Silver records. Check the declared schema and mandatory fields before interpreting the measurement. Verify units and reference relationships before enrichment. An incompatible schema can hold a source partition, while row-level failures go to a reason-coded exception dataset. Preserve the original arrival and run identity so accepted plus rejected counts reconcile to the input. Repair requires an explicit owner and a bounded replay. A successful processing job alone is not evidence that the data satisfies its contract.
