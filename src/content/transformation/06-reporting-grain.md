# Choose the row grain before aggregation

## On screen

## Choose the row grain before aggregation

- **Silver readings** — Validated interval consumption by meter and event time.
- **Settlement period** — Calendar maps events to the agreed reporting interval.
- **Gold fact** — One meter row per settlement period.

**Decision:** Ingestion date and business reporting period answer different questions.

## Narration

The sample meter fact has one row per meter per settlement period. That grain must be agreed before aggregation, otherwise the same interval can be counted in both daily and settlement-period reports. Use an explicit settlement calendar to handle boundaries and local daylight-saving changes while retaining UTC event timestamps. Distinguish interval consumption from cumulative counters. An arrival date partition is useful for ingestion but is not the event-period key used to assign a reading to its reporting grain.
