# Make the units and joins explicit

## On screen

## Make the units and joins explicit

- **Normalise** — UTC event time and declared measurement units.
- **Enrich** — Meter, tariff, customer and asset reference joins.
- **Reject with evidence** — Mandatory-field or relationship failures go to DLQ.

**Decision:** Every transformation rule has a contract, and every rejected row has a reason.

## Narration

Silver standardises timestamps and measurement units before applying business rules. A source value of twelve hundred watt-hours becomes 1.2 kilowatt-hours only when the source contract declares watt-hours. Enrichment uses the relevant meter and tariff references, with effective-date handling when history matters. Missing mandatory fields and unresolved relationships create rejection records with a reason, source identity and run ID. Count those records in reconciliation; quietly filtering them out makes a clean table look correct while hiding missing consumption.
