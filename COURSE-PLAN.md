# EDF AWS course plan

Six courses, 40 sections and 40 diagrams. Each section now has a focused scene, following the requested course-by-course refinement. Pipeline and medallion overviews remain diagrams; detailed sections use four-card scenes.

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

| Section | Scene | Format |
|---|---|---|
| `landing-versus-tables` — Transformation overview | `medallion-pipeline` | Horizontal medallion |
| `schema-gate` — Schema compatibility | `transformation-schema-gate` | Four detailed cards |
| `validation-and-exceptions` — Validation and exceptions | `transformation-validation-and-exceptions` | Four detailed cards |
| `cleansing-and-enrichment` — Cleansing and enrichment | `transformation-cleansing-and-enrichment` | Four detailed cards |
| `dedupe-and-change-order` — Deduplication and change order | `transformation-dedupe-and-change-order` | Four detailed cards |
| `reporting-grain` — Reporting grain | `transformation-reporting-grain` | Four detailed cards |
| `business-metrics` — Business metrics | `transformation-business-metrics` | Four detailed cards |
| `reconciliation-and-release` — Reconciliation and release | `transformation-reconciliation-and-release` | Four detailed cards |

Each section expands an explicit promotion contract; the overview retains the horizontal medallion.

## Consumption: warehouse models and serving paths

| Section | Scene | Format |
|---|---|---|
| `lake-to-warehouse` — Warehouse loading and dbt | `warehouse-model` | Warehouse pipeline |
| `star-schema` — Dimensional model | `consumption-star-schema` | Four detailed cards |
| `customer-scd2` — Customer history: SCD Type 2 | `consumption-customer-scd2` | Four detailed cards |
| `analytics-and-science` — BI and lakehouse exploration | `consumption-analytics-and-science` | Four detailed cards |
| `ofgem-delivery` — Regulatory reporting | `consumption-ofgem-delivery` | Four detailed cards |
| `operational-lookups` — Operational consumption | `consumption-operational-lookups` | Four detailed cards |

## Platform operations: control, delivery and recovery

| Section | Scene | Format |
|---|---|---|
| `dependency-graph` — Orchestration and dependencies | `platform-operations-dependency-graph` | Four detailed cards |
| `quarantine-and-dlq` — Quality controls and exceptions | `platform-operations-quarantine-and-dlq` | Four detailed cards |
| `data-health` — Monitoring and alerting | `platform-operations-data-health` | Four detailed cards |
| `access-boundaries` — Security and access | `platform-operations-access-boundaries` | Four detailed cards |
| `audit-lineage` — Audit and lineage | `platform-operations-audit-lineage` | Four detailed cards |
| `environment-contract` — Terraform environments | `platform-operations-environment-contract` | Four detailed cards |
| `release-pipeline` — CI/CD and safe promotion | `platform-operations-release-pipeline` | Four detailed cards |
| `rollback-and-cost` — Rollback and operating cost | `platform-operations-rollback-and-cost` | Four detailed cards |
| `schema-incident` — Schema incident recovery | `platform-operations-schema-incident` | Four detailed cards |
| `restart-and-backfill` — Restart, replay and backfill | `platform-operations-restart-and-backfill` | Four detailed cards |

Markdown owns slides and narration; section-map.json owns scene and highlight bindings. The full poster retains horizontal medallion and stacked processing panels. Raw landing remains distinct from Iceberg commits; connector ingestion remains distinct from Spark processing. This is an educational repo with synthetic examples, not deployed AWS infrastructure.
