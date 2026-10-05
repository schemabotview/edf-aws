# Facts and dimensions must share a grain

## On screen

## Facts and dimensions must share a grain

- **Periodic snapshot facts** — Meter reads and generation output.
- **Dimensions** — Meter, customer, tariff and asset attributes.
- **Surrogate-key join** — Fact keys reference a specific dimension version.

**Decision:** The star schema must preserve fact counts and totals across joins.

## Narration

FACT_METER_READS and FACT_GENERATION_OUTPUT describe measurements at agreed periodic grains. DIM_METER, DIM_CUSTOMER, DIM_TARIFF and DIM_ASSET provide descriptive attributes. Use surrogate keys for dimensional joins and preserve natural identifiers for source traceability. Surrogate keys alone do not prevent fan-out: verify that each fact references exactly one appropriate dimension row. Model unresolved keys deliberately, with an unknown member or a held fact according to the contract, rather than losing rows through an inner join.
