# Cleansing and enrichment

## On screen

## Cleansing and enrichment

Apply explicit unit and time rules, then join the reference version valid for the event.

- **Normalise units** — Example: declared 1,200 Wh becomes 1.2 kWh.
- **Normalise event time** — Retain UTC event timestamps; preserve source time provenance.
- **Enrich from references** — Meter, tariff, customer and asset joins use effective-date rules.
- **Preserve rule evidence** — Keep transformation version and reason-coded relationship failures.

**Transformation contract:** Never silently discard invalid readings or guess measurement meaning.

## Narration

Silver standardises timestamps and measurement units before applying business rules. A source value of twelve hundred watt-hours becomes 1.2 kilowatt-hours only when the source contract declares watt-hours. Enrichment uses the relevant meter and tariff references, with effective-date handling when history matters. Missing mandatory fields and unresolved relationships create rejection records with a reason, source identity and run ID. Count those records in reconciliation; quietly filtering them out makes a clean table look correct while hiding missing consumption.
