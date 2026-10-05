# EDF AWS course plan

Six courses, 40 sections and 13 diagrams. Eight canonical diagrams are reused outside Requirements. Each Requirements section has its own detailed card scene, as requested.

| Course | Coverage | Canonical diagrams |
|---|---|---|
| Requirements | Business needs, sources, SLAs, acceptance | Five dedicated card scenes |
| Architecture | Full platform, responsibilities, storage, medallion | Full edf-aws-codex architecture |
| Ingestion | Batch full load/CDC, streaming, Bronze, recovery | Batch pipeline; streaming pipeline |
| Transformation | Bronze → Silver → Gold, validation, enrichment, reconciliation | Horizontal medallion |
| Consumption | Redshift/dbt, dimensions, BI, Athena, operational access, reporting | Warehouse model; serving architecture |
| Platform Operations | Orchestration, quality, monitoring, security, Terraform, CI/CD, incidents | Control plane; delivery and recovery |

## Requirements: business needs, source systems, SLAs and acceptance criteria

The opening retains its detailed problem cards and slide. Each following section has its own framed 2×2 scene with four detailed cards, and a matching expanded slide.

| Section | Scene | Highlight |
|---|---|---|
| `business-problem` — Why EDF needed to modernise | `requirements-map` | Complete scene |
| `business-needs` | `requirements-business-needs` | Complete scene |
| `source-systems` | `requirements-source-systems` | Complete scene |
| `slas` | `requirements-slas` | Complete scene |
| `acceptance-criteria` | `requirements-acceptance-criteria` | Complete scene |

## Architecture: platform responsibilities, storage and medallion

| Section | Scene | Highlight |
|---|---|---|
| `platform-overview` | `edf-aws-codex` | `Complete scene` |
| `service-responsibilities` | `edf-aws-codex` | `processing` |
| `two-ingestion-paths` | `edf-aws-codex` | `ingestion` |
| `medallion-zones` | `edf-aws-codex` | `lake` |
| `retention-and-maintenance` | `edf-aws-codex` | `s3` |

## Ingestion: batch, streaming, Bronze acceptance and recovery

| Section | Scene | Highlight |
|---|---|---|
| `full-load-and-cdc` | `batch-pipeline` | `Complete scene` |
| `bronze-acceptance` | `batch-pipeline` | `commit` |
| `cdc-recovery` | `batch-pipeline` | `progress` |
| `topics-and-contracts` | `stream-pipeline` | `Complete scene` |
| `connector-to-bronze` | `stream-pipeline` | `connector` |
| `event-time-and-hot-path` | `stream-pipeline` | `spark` |

## Transformation: Bronze → Silver → Gold

| Section | Scene | Highlight |
|---|---|---|
| `landing-versus-tables` | `medallion-pipeline` | `Complete scene` |
| `schema-gate` | `medallion-pipeline` | `schema` |
| `validation-and-exceptions` | `medallion-pipeline` | `schema` |
| `cleansing-and-enrichment` | `medallion-pipeline` | `clean` |
| `dedupe-and-change-order` | `medallion-pipeline` | `silver` |
| `reporting-grain` | `medallion-pipeline` | `gold` |
| `business-metrics` | `medallion-pipeline` | `metrics` |
| `reconciliation-and-release` | `medallion-pipeline` | `release` |

## Consumption: warehouse models and serving paths

| Section | Scene | Highlight |
|---|---|---|
| `lake-to-warehouse` | `warehouse-model` | `Complete scene` |
| `star-schema` | `warehouse-model` | `facts` |
| `customer-scd2` | `warehouse-model` | `dimensions` |
| `analytics-and-science` | `serving-map` | `Complete scene` |
| `ofgem-delivery` | `serving-map` | `ofgem` |
| `operational-lookups` | `serving-map` | `dynamo` |

## Platform operations: orchestration, controls, delivery and recovery

| Section | Scene | Highlight |
|---|---|---|
| `dependency-graph` | `control-plane` | `Complete scene` |
| `quarantine-and-dlq` | `control-plane` | `quality` |
| `data-health` | `control-plane` | `monitor` |
| `access-boundaries` | `control-plane` | `security` |
| `audit-lineage` | `control-plane` | `audit` |
| `environment-contract` | `delivery-recovery` | `terraform` |
| `release-pipeline` | `delivery-recovery` | `Complete scene` |
| `rollback-and-cost` | `delivery-recovery` | `rollback` |
| `schema-incident` | `control-plane` | `quality` |
| `restart-and-backfill` | `delivery-recovery` | `replay` |

Markdown owns slides and narration; section-map.json owns scene and highlight bindings. The full poster retains horizontal medallion and stacked processing panels. Raw landing remains distinct from Iceberg commits; connector ingestion remains distinct from Spark processing. This is an educational repo with synthetic examples, not deployed AWS infrastructure.
