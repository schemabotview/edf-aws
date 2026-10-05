# EDF AWS course plan

Six courses, 36 sections, nine canonical diagrams. Sections reuse the same scene ID and use the shell’s `focus` feature to highlight one relevant node; an overview has no focus. No section-specific scene copies or coordinates.

The full architecture remains the approved `edf-aws-codex` poster. Simplified canonical scenes clarify execution boundaries rather than replacing it.

## Requirements: sources, outcomes and acceptance

Canonical scene: five framed problem cards covering fragmentation, stale data, failed validation, delayed anomaly visibility and manual Ofgem reporting. Later sections highlight the problem their requirement addresses.

| Section | Canonical scene | Highlight |
|---|---|---|
| `business-problem` | `requirements-map` | `Complete scene` |
| `source-inventory` | `requirements-map` | `sources` |
| `meter-contract` | `requirements-map` | `contracts` |
| `service-objectives` | `requirements-map` | `objectives` |
| `acceptance-evidence` | `requirements-map` | `evidence` |

## Architecture: the complete EDF AWS platform

| Section | Canonical scene | Highlight |
|---|---|---|
| `platform-overview` | `edf-aws-codex` | `Complete scene` |
| `two-ingestion-paths` | `edf-aws-codex` | `ingestion` |
| `medallion-zones` | `edf-aws-codex` | `lake` |
| `retention-and-maintenance` | `edf-aws-codex` | `s3` |

## Ingestion: batch and streaming into Bronze

| Section | Canonical scene | Highlight |
|---|---|---|
| `full-load-and-cdc` | `batch-pipeline` | `Complete scene` |
| `bronze-acceptance` | `batch-pipeline` | `commit` |
| `cdc-recovery` | `batch-pipeline` | `progress` |
| `topics-and-contracts` | `stream-pipeline` | `Complete scene` |
| `connector-to-bronze` | `stream-pipeline` | `connector` |
| `event-time-and-hot-path` | `stream-pipeline` | `spark` |

## Transformation: Bronze → Silver → Gold

| Section | Canonical scene | Highlight |
|---|---|---|
| `landing-versus-tables` | `medallion-pipeline` | `Complete scene` |
| `schema-gate` | `medallion-pipeline` | `schema` |
| `cleansing-and-enrichment` | `medallion-pipeline` | `clean` |
| `dedupe-and-change-order` | `medallion-pipeline` | `silver` |
| `reporting-grain` | `medallion-pipeline` | `gold` |
| `business-metrics` | `medallion-pipeline` | `metrics` |
| `reconciliation-and-release` | `medallion-pipeline` | `release` |

## Consumption: warehouse models and serving paths

| Section | Canonical scene | Highlight |
|---|---|---|
| `lake-to-warehouse` | `warehouse-model` | `Complete scene` |
| `star-schema` | `warehouse-model` | `facts` |
| `customer-scd2` | `warehouse-model` | `dimensions` |
| `analytics-and-science` | `serving-map` | `Complete scene` |
| `ofgem-delivery` | `serving-map` | `ofgem` |
| `operational-lookups` | `serving-map` | `dynamo` |

## Platform operations: control, delivery and recovery

| Section | Canonical scene | Highlight |
|---|---|---|
| `dependency-graph` | `control-plane` | `Complete scene` |
| `quarantine-and-dlq` | `control-plane` | `quality` |
| `data-health` | `control-plane` | `monitor` |
| `access-boundaries` | `control-plane` | `security` |
| `audit-lineage` | `control-plane` | `audit` |
| `release-pipeline` | `delivery-recovery` | `Complete scene` |
| `rollback-and-cost` | `delivery-recovery` | `rollback` |
| `restart-and-backfill` | `delivery-recovery` | `replay` |

## Consolidation decisions

Source systems move into Requirements; storage moves into Architecture and Transformation. Quality gates are taught at their pipeline boundaries, with exception ownership in Operations. Retry, backfill, release gates, latency, secrets and environment configuration are folded into their owning sections. The standalone capstone course is removed; recovery becomes an operations section. Distinct batch/streaming and warehouse/serving structures retain separate canonical diagrams.

Markdown remains the source for slides and narration; `section-map.json` owns scene/highlight bindings. Original section IDs are preserved where possible; moving courses changes their route prefix. Old routes are recorded in `route-migration.json`. Audio and recording manifests are regenerated for the new course structure.

This is an educational repo, not deployed AWS infrastructure. Case-study metrics remain attributed; synthetic examples are retained. Run check, build and frames, and inspect every rendered section.
