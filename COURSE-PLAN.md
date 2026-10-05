# EDF AWS course plan

Six courses, 72 sections and 71 scenes. Each section now has a focused scene, following the requested course-by-course refinement. Existing diagrams are preserved. Practical companion sections use readable code scenes; business and architecture overviews remain visual.

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
| `source-contract-example` — Implementation: a versioned source contract | `requirements-source-contract-example` | Code example |

## Architecture: full platform and focused boundaries

| Section | Scene | Format |
|---|---|---|
| `platform-overview` — Full platform architecture | `edf-aws-codex` | Approved full poster |
| `service-responsibilities` | `architecture-service-responsibilities` | Four responsibility cards |
| `two-ingestion-paths` | `architecture-two-ingestion-paths` | Parallel batch / streaming columns |
| `medallion-zones` | `architecture-medallion-zones` | Horizontal medallion above stacked 3-column processing panels |
| `iceberg-table-example` — Implementation: create the Bronze table | `architecture-iceberg-table-example` | Code example |
| `retention-and-maintenance` | `architecture-retention-and-maintenance` | Four lifecycle cards |
| `maintenance-example` — Implementation: raw retention and table maintenance | `architecture-maintenance-example` | Code example |

Architecture establishes responsibilities and boundaries; later courses explain execution and recovery mechanics.

## Ingestion: batch and streaming into Bronze

| Section | Scene | Format |
|---|---|---|
| `platform-context` — Ingestion in the full platform | `edf-aws-codex` | Ingestion container highlighted |
| `dms-service` — AWS DMS in brief | `dms-service` | Four service responsibility cards |
| `full-load-and-cdc` — Batch ingestion: full load and CDC | `batch-pipeline` | Pipeline |
| `database-readiness` — Source database: PostgreSQL readiness | `dms-source-code` | Code scene |
| `dms-task-settings` — DMS task: full load + CDC settings | `dms-task-code` | Code scene |
| `s3-target-settings` — S3 target: ordered CDC landing | `dms-s3-code` | Code scene |
| `bronze-acceptance` — Bronze acceptance | `ingestion-bronze-acceptance` | Four detailed cards |
| `manifest-example` — Implementation: a bounded Bronze manifest | `ingestion-manifest-example` | Code example |
| `dms-verification` — DMS verification before release | `dms-verification` | Four verification cards |
| `cdc-recovery` — CDC recovery and safe replay | `ingestion-cdc-recovery` | Four detailed cards |
| `cdc-resume-example` — Implementation: inspect and resume DMS capture | `ingestion-cdc-resume-example` | Code example |
| `topics-and-contracts` — Streaming event contracts | `ingestion-topics-and-contracts` | Four detailed cards |
| `event-schema-example` — Implementation: an Avro meter-event contract | `ingestion-event-schema-example` | Code example |
| `connector-to-bronze` — MSK Connect to Bronze | `ingestion-connector-to-bronze` | Pipeline |
| `connector-settings-example` — Implementation: MSK Connect S3 sink settings | `ingestion-connector-settings-example` | Code example |
| `event-time-and-hot-path` — Spark event processing and operational output | `stream-pipeline` | Pipeline |
| `spark-stream-example` — Implementation: event time and checkpoints | `ingestion-spark-stream-example` | Code example |

Each section has a focused scene and detailed slide. Raw landing, managed table acceptance and independent event processing remain explicit.

## Transformation: Bronze → Silver → Gold

| Section | Scene | Format |
|---|---|---|
| `landing-versus-tables` — Transformation overview | `medallion-pipeline` | Horizontal medallion |
| `schema-gate` — Schema compatibility | `transformation-schema-gate` | Four detailed cards |
| `validation-and-exceptions` — Validation and exceptions | `transformation-validation-and-exceptions` | Four detailed cards |
| `validation-code-example` — Implementation: schema and reason-coded validation | `transformation-validation-code-example` | Code example |
| `cleansing-and-enrichment` — Cleansing and enrichment | `transformation-cleansing-and-enrichment` | Four detailed cards |
| `normalisation-code-example` — Implementation: units and effective-date enrichment | `transformation-normalisation-code-example` | Code example |
| `dedupe-and-change-order` — Deduplication and change order | `transformation-dedupe-and-change-order` | Four detailed cards |
| `merge-code-example` — Implementation: correction ordering and tombstones | `transformation-merge-code-example` | Code example |
| `reporting-grain` — Reporting grain | `transformation-reporting-grain` | Four detailed cards |
| `business-metrics` — Business metrics | `transformation-business-metrics` | Four detailed cards |
| `gold-model-example` — Implementation: settlement grain and metrics | `transformation-gold-model-example` | Code example |
| `reconciliation-and-release` — Reconciliation and release | `transformation-reconciliation-and-release` | Four detailed cards |
| `reconciliation-code-example` — Implementation: a release gate with a zero baseline | `transformation-reconciliation-code-example` | Code example |

Each section expands an explicit promotion contract; the overview retains the horizontal medallion.

## Consumption: warehouse models and serving paths

| Section | Scene | Format |
|---|---|---|
| `lake-to-warehouse` — Warehouse loading and dbt | `warehouse-model` | Warehouse pipeline |
| `warehouse-load-example` — Implementation: staged Redshift loading | `consumption-warehouse-load-example` | Code example |
| `star-schema` — Dimensional model | `consumption-star-schema` | Four detailed cards |
| `customer-scd2` — Customer history: SCD Type 2 | `consumption-customer-scd2` | Four detailed cards |
| `history-join-example` — Implementation: event-time dimension assignment | `consumption-history-join-example` | Code example |
| `analytics-and-science` — BI and lakehouse exploration | `consumption-analytics-and-science` | Four detailed cards |
| `athena-snapshot-example` — Implementation: query the accepted Iceberg version | `consumption-athena-snapshot-example` | Code example |
| `ofgem-delivery` — Regulatory reporting | `consumption-ofgem-delivery` | Four detailed cards |
| `delivery-state-example` — Implementation: reporting delivery evidence | `consumption-delivery-state-example` | Code example |
| `operational-lookups` — Operational consumption | `consumption-operational-lookups` | Four detailed cards |
| `dynamodb-query-example` — Implementation: version-safe writes and latest reads | `consumption-dynamodb-query-example` | Code example |

## Platform operations: control, delivery and recovery

| Section | Scene | Format |
|---|---|---|
| `dependency-graph` — Orchestration and dependencies | `platform-operations-dependency-graph` | Four detailed cards |
| `dag-code-example` — Implementation: orchestration with version handoff | `platform-operations-dag-code-example` | Code example |
| `quarantine-and-dlq` — Quality controls and exceptions | `platform-operations-quarantine-and-dlq` | Four detailed cards |
| `data-health` — Monitoring and alerting | `platform-operations-data-health` | Four detailed cards |
| `cloudwatch-example` — Implementation: publish and alarm on consumer freshness | `platform-operations-cloudwatch-example` | Code example |
| `access-boundaries` — Security and access | `platform-operations-access-boundaries` | Four detailed cards |
| `iam-policy-example` — Implementation: scope a raw-reader policy | `platform-operations-iam-policy-example` | Code example |
| `audit-lineage` — Audit and lineage | `platform-operations-audit-lineage` | Four detailed cards |
| `cloudtrail-example` — Implementation: capture S3 object data events | `platform-operations-cloudtrail-example` | Code example |
| `environment-contract` — Terraform environments | `platform-operations-environment-contract` | Four detailed cards |
| `terraform-state-example` — Implementation: environment-separated Terraform state | `platform-operations-terraform-state-example` | Code example |
| `release-pipeline` — CI/CD and safe promotion | `platform-operations-release-pipeline` | Four detailed cards |
| `ci-workflow-example` — Implementation: contract checks before promotion | `platform-operations-ci-workflow-example` | Code example |
| `rollback-and-cost` — Rollback and operating cost | `platform-operations-rollback-and-cost` | Four detailed cards |
| `schema-incident` — Schema incident recovery | `platform-operations-schema-incident` | Four detailed cards |
| `exception-ledger-example` — Implementation: quarantine and repair evidence | `platform-operations-exception-ledger-example` | Code example |
| `restart-and-backfill` — Restart, replay and backfill | `platform-operations-restart-and-backfill` | Four detailed cards |
| `recovery-plan-example` — Implementation: bounded backfill and rollback | `platform-operations-recovery-plan-example` | Code example |

Markdown owns slides and narration; section-map.json owns scene and highlight bindings. The full poster retains horizontal medallion and stacked processing panels. Raw landing remains distinct from Iceberg commits; connector ingestion remains distinct from Spark processing. This is an educational repo with synthetic examples, not deployed AWS infrastructure.


## Practical coverage audit

The original sections remain in place, each followed where appropriate by a focused implementation example. Requirements adds a versioned source / SLA / acceptance contract. Architecture adds table DDL and maintenance. Ingestion adds manifests, resume commands, Avro, connector settings and Spark. Transformation adds validation, effective joins, version-safe MERGE, Gold aggregation and release arithmetic. Consumption adds COPY/dbt, history joins, Athena version queries, delivery evidence and DynamoDB access. Operations adds DAGs, exception state, freshness alarms, IAM, CloudTrail, Terraform state, CI and recovery plans. See `examples/practical/coverage.json` for the mapping.
