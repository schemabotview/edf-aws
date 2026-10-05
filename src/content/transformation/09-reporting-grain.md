# Reporting grain

## On screen

## Reporting grain

Choose what one Gold row represents before aggregating Silver readings.

- **Accepted interval readings** — Distinguish interval consumption from cumulative counters.
- **Settlement calendar** — Map UTC events to agreed periods and local-time boundaries.
- **Gold row identity** — One meter row per settlement period in the sample fact.
- **Grain checks** — Prevent repeated intervals and inconsistent daily / period totals.

**Transformation contract:** Arrival date is an ingestion attribute; event period defines the reporting grain.

## Narration

The sample meter fact has one row per meter per settlement period. That grain must be agreed before aggregation, otherwise the same interval can be counted in both daily and settlement-period reports. Use an explicit settlement calendar to handle boundaries and local daylight-saving changes while retaining UTC event timestamps. Distinguish interval consumption from cumulative counters. An arrival date partition is useful for ingestion but is not the event-period key used to assign a reading to its reporting grain.
