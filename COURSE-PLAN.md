# EDF AWS course plan

Six courses, 40 sections and 21 diagrams. Eight canonical diagrams are reused outside Requirements. Each Requirements section has its own detailed card scene, as requested.

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

## Architecture: full platform and focused boundaries

| Section | Scene | Format |
|---|---|---|
| `platform-overview` — Full platform architecture | `edf-aws-codex` | Approved full poster |
| `service-responsibilities` | `architecture-service-responsibilities` | Four responsibility cards |
| `two-ingestion-paths` | `architecture-two-ingestion-paths` | Parallel batch / streaming columns |
| `medallion-zones` | `architecture-medallion-zones` | Horizontal medallion above stacked 3-column processing panels |
| `retention-and-maintenance` | `architecture-retention-and-maintenance` | Four lifecycle cards |

Architecture establishes responsibilities and boundaries; later courses explain execution and recovery mechanics.

## Ingestion: batch and streaming into Bronze

| Section | Scene | Format |
|---|---|---|
| `full-load-and-cdc` — Batch ingestion: full load and CDC | `batch-pipeline` | Pipeline |
| `bronze-acceptance` — Bronze acceptance | `ingestion-bronze-acceptance` | Four detailed cards |
| `cdc-recovery` — CDC recovery and safe replay | `ingestion-cdc-recovery` | Four detailed cards |
| `topics-and-contracts` — Streaming event contracts | `ingestion-topics-and-contracts` | Four detailed cards |
| `connector-to-bronze` — MSK Connect to Bronze | `ingestion-connector-to-bronze` | Pipeline |
| `event-time-and-hot-path` — Spark event processing and operational output | `stream-pipeline` | Pipeline |

Each section has a focused scene and detailed slide. Raw landing, managed table acceptance and independent event processing remain explicit.

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
