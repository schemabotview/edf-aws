# A meter reading needs a stable identity

## On screen

## A meter reading needs a stable identity

- **Business key** — meter_id plus reading_timestamp.
- **Measurement** — consumption_kwh, unit and reading_type.
- **Audit envelope** — source_system, ingested_at and batch_run_id.

**Decision:** Preserve business identity, measurement semantics and arrival provenance.

## Narration

The synthetic examples use meter MTR-001 at 2026-10-01T00:00:00Z, with 1.2 kilowatt-hours of interval consumption. The business key identifies a reading, while ingestion time identifies an arrival. A corrected reading can arrive later for the same key, so retain source version or sequence metadata. Do not assume a cumulative meter counter equals interval consumption. The contract states which meaning applies and carries the unit explicitly; otherwise a vendor change from kilowatt-hours to watt-hours can create a thousand-fold error without changing the numeric type. Reference and billing joins use the version effective at event time; reconcile the same population, period and units.
