# Implementation: settlement grain and metrics

## On screen

## Implementation: settlement grain and metrics

Aggregate accepted interval energy at an explicit meter / settlement-period grain.

- **Calendar** — Join approved UTC boundaries; do not assume all local days have the same interval count.
- **Population** — Filter deleted / rejected readings and resolve source corrections before aggregation.
- **Coverage** — Compare against the expected meter-period population, including meters with no readings.
- **Metrics** — Define capacity denominator, exclusions, units and correction policy for generation utilisation.

**Implementation scope:** The calendar is supplied project reference data; this SQL does not encode an actual market or regulator specification.

## Narration

The Gold query uses a settlement calendar rather than deriving periods from arrival dates. Calendar boundaries account for the agreed market rules and daylight-saving transitions. Each accepted meter-period has a consumption total and an observed interval count. Completeness requires comparison with the expected meter-period population; an aggregate alone cannot show meters that are entirely missing. Resolve duplicates and corrections before this query, and exclude tombstones. Generation utilisation uses its own explicit capacity denominator and exclusion policy. The SQL is a proposed model whose calendar and release rules must be agreed with the business.
