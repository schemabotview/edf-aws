# Implementation: units and effective-date enrichment

## On screen

## Implementation: units and effective-date enrichment

Apply an explicit unit conversion and a half-open effective-date reference join.

- **Units** — 1,200 Wh becomes 1.2 kWh; incompatible measurement kinds must fail before this query.
- **Time** — UTC session interpretation does not fix an ambiguous local timestamp. Parse using its declared source timezone.
- **History** — Inclusive valid_from / exclusive valid_to resolves the reference version at event time.
- **Join gate** — Reject missing and overlapping matches; assert joins preserve row counts and totals.

**Implementation scope:** The query assumes validated interval readings and non-overlapping reference history, not cumulative counters.

## Narration

This query normalises accepted measurements using the declared unit and joins the reference version effective at event time. UTC session configuration is useful, but it cannot recover a timezone that the source never supplied. Parse timestamps according to their source contract, including daylight-saving ambiguity handling. Effective intervals are half-open: the start is included and the end is excluded. A left join retains missing references so the quality gate can report them. Overlapping reference intervals can duplicate readings, so require exactly one match before promoting rows. Preserve the source values and rule version alongside the normalised measure.
