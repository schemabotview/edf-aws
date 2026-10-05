# Transformation overview: Bronze → Silver → Gold

## On screen

## Transformation overview: Bronze → Silver → Gold

Turn replayable source arrivals into trusted records and reconciled business metrics.

- **Bronze** — Preserve source values and provenance in managed Iceberg tables; raw S3 landing remains a separate boundary.
- **Bronze → Silver** — Gate schema changes, validate records, normalise units, enrich references and resolve duplicates.
- **Silver → Gold** — Establish reporting grain, calculate versioned business metrics and reconcile before release.
- **Promotion evidence** — Retain input versions, exceptions and acceptance decisions so outputs can be explained and replayed.

**Transformation contract:** Table commits define visibility; each medallion layer has an explicit acceptance contract.

## Narration

The horizontal medallion separates raw evidence, trusted records and business meaning. Bronze preserves accepted source arrivals and provenance. Raw S3 landing is distinct from a managed Iceberg commit, and readers resolve committed metadata through the catalog. The Bronze to Silver boundary checks schema, validates measurement meaning, normalises units and time, joins effective reference versions and resolves duplicates deterministically. Silver to Gold establishes row grain and metric definitions, then reconciles before publication. The following sections expand those decisions with focused cards. Every promotion retains input versions and exceptions so a trusted number can be explained and reproduced.
