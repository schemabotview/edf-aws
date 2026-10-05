# Warehouse loading and dbt

## On screen

## Warehouse loading and dbt

Pin an accepted Gold version before loading Redshift and building tested warehouse models.

- **Accepted Gold snapshot** — Pin the lakehouse input version and run identity.
- **Warehouse load adapter** — Validate the chosen transport into Redshift staging.
- **dbt models** — Build staging, intermediate and mart relations with tests.
- **Load reconciliation** — Verify warehouse counts and totals against accepted input.

**Consumption contract:** The chosen load adapter owns movement; dbt owns transformations of relations available in Redshift.

## Narration

The poster shows dbt and Redshift but does not specify a production transport mechanism from Iceberg to warehouse staging. For this walkthrough, model that boundary as an explicit load adapter and record the accepted lakehouse snapshot it consumes. A COPY-compatible export is one possible implementation to validate, not an undocumented fact about the original system. dbt then transforms relations available to its Redshift adapter. A successful dbt build does not itself prove that every source Iceberg row reached warehouse staging.
