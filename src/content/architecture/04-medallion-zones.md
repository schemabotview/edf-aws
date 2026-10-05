# Medallion storage and processing

## On screen

## Medallion storage and processing

Keep Bronze → Silver → Gold visible horizontally, with batch and streaming processing beneath the same storage and processing boundary.

- **Bronze** — Preserve arrivals, source values and ingestion evidence.
- **Silver** — Normalise units and timestamps, resolve keys, validate and deduplicate deterministically.
- **Gold** — Define business grain, metrics and reconciled reporting datasets.
- **Batch processing** — Schema / quality checks, Glue transformations and dbt warehouse models.
- **Streaming processing** — MSK Connect landing, Databricks event-time processing and checkpointed recovery.

**Architecture decision:** The diagram groups responsibilities; connectors, lakehouse transformations and warehouse models still execute at separate boundaries.

## Narration

The combined container preserves the horizontal medallion architecture above vertically stacked batch and streaming panels. Bronze captures source arrivals and the evidence needed for replay. Silver converts those arrivals into trusted records using declared units, event-time keys and deterministic precedence. Gold expresses agreed business metrics at a reporting grain. The batch panel groups validation, Glue transformations and dbt warehouse modelling. The streaming panel separates connector landing from Databricks event processing and recovery state. These are architectural responsibilities, not a claim that dbt executes every lakehouse transition or that an S3 sink automatically commits Iceberg. Transformation mechanics are expanded in the Transformation course.
