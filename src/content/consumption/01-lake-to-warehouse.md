# Make the warehouse load boundary explicit

## On screen

## Make the warehouse load boundary explicit

- **Accepted Iceberg snapshot** — Fixed input version for the warehouse run.
- **Warehouse staging** — Materialise accepted data through a chosen load adapter.
- **dbt in Redshift** — Build staging, intermediate and mart models.

**Decision:** The load adapter owns movement; dbt owns warehouse model transformations.

## Narration

The poster shows dbt and Redshift but does not specify a production transport mechanism from Iceberg to warehouse staging. For this walkthrough, model that boundary as an explicit load adapter and record the accepted lakehouse snapshot it consumes. A COPY-compatible export is one possible implementation to validate, not an undocumented fact about the original system. dbt then transforms relations available to its Redshift adapter. A successful dbt build does not itself prove that every source Iceberg row reached warehouse staging.
