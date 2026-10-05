import type { Scene } from '@graphlearning/flow'
export const canonicalScenes: Scene[] = [
  {
    "id": "requirements-map",
    "title": "EDF Energy: the problems before modernisation",
    "nodes": [
      {
        "id": "sources",
        "label": "Fragmented legacy estate",
        "sub": "A dozen heterogeneous sources; on-premise extracts; no consistent Bronze / Silver / Gold",
        "icon": "database",
        "pattern": "external"
      },
      {
        "id": "objectives",
        "label": "Commercial data 24\u201348h stale",
        "sub": "Teams made decisions from delayed meter, billing and asset data",
        "icon": "clock",
        "pattern": "service"
      },
      {
        "id": "contracts",
        "label": "6\u20138% of reads fail validation",
        "sub": "Failures found after billing; corrections and customer complaints followed",
        "icon": "shieldcheck",
        "pattern": "service"
      },
      {
        "id": "outcomes",
        "label": "Anomalies visible next morning",
        "sub": "Batch-only grid and generation telemetry delayed operational response",
        "icon": "waves",
        "pattern": "network"
      },
      {
        "id": "evidence",
        "label": "Ofgem reports assembled by hand",
        "sub": "Analysts combined extracts; reporting risk and audit effort increased",
        "icon": "table",
        "pattern": "storage"
      }
    ],
    "edges": [],
    "padding": 0.09,
    "cols": 2,
    "framed": true
  },
  {
    "id": "batch-pipeline",
    "title": "Batch ingestion: source changes to Bronze",
    "nodes": [
      {
        "id": "capture-row",
        "label": "1. Capture and land",
        "icon": "none",
        "pattern": "group",
        "flow": "LR",
        "children": [
          {
            "id": "source",
            "label": "PostgreSQL source (example)",
            "sub": "Logical WAL \u00b7 replication grants \u00b7 retained WAL monitoring",
            "icon": "database",
            "pattern": "external"
          },
          {
            "id": "dms",
            "label": "AWS DMS",
            "sub": "full-load-and-cdc \u00b7 explicit mappings \u00b7 8 subtasks to start",
            "icon": "dms",
            "pattern": "network"
          },
          {
            "id": "landing",
            "label": "Raw S3 landing",
            "sub": "CSV \u00b7 PreserveTransactions \u00b7 CdcPath \u00b7 role / KMS",
            "icon": "s3",
            "pattern": "storage"
          }
        ],
        "edges": [
          {
            "source": "source",
            "target": "dms",
            "route": "step"
          },
          {
            "source": "dms",
            "target": "landing",
            "route": "step"
          }
        ]
      },
      {
        "id": "accept-row",
        "label": "2. Accept and record progress",
        "icon": "none",
        "pattern": "group",
        "flow": "LR",
        "children": [
          {
            "id": "commit",
            "label": "Bronze acceptance job",
            "sub": "Bounded files \u00b7 validation \u00b7 Iceberg commit",
            "icon": "glue",
            "pattern": "service"
          },
          {
            "id": "progress",
            "label": "Durable progress",
            "sub": "Advance after commit \u00b7 replay deterministically",
            "icon": "check",
            "pattern": "storage"
          }
        ],
        "edges": [
          {
            "source": "commit",
            "target": "progress",
            "route": "step"
          }
        ]
      }
    ],
    "edges": [
      {
        "source": "capture-row",
        "target": "accept-row",
        "route": "step"
      }
    ],
    "padding": 0.1,
    "flow": "TB",
    "framed": true
  },
  {
    "id": "stream-pipeline",
    "title": "Streaming: independent ingestion and processing",
    "nodes": [
      {
        "id": "kafka",
        "label": "Kafka / Amazon MSK",
        "sub": "Meter events \u00b7 keyed partitions \u00b7 Avro contracts",
        "icon": "kafka",
        "pattern": "network"
      },
      {
        "id": "connector",
        "label": "MSK Connect",
        "sub": "Configured S3 sink plugin",
        "icon": "waves",
        "pattern": "service"
      },
      {
        "id": "landing",
        "label": "Raw S3 landing",
        "sub": "Accept landed events into Bronze Iceberg",
        "icon": "s3",
        "pattern": "storage"
      },
      {
        "id": "spark",
        "label": "Databricks streaming",
        "sub": "Event-time enrichment \u00b7 watermark \u00b7 checkpoint",
        "icon": "databricks",
        "pattern": "service"
      },
      {
        "id": "hot",
        "label": "Operational output",
        "sub": "Conditional DynamoDB writes \u00b7 independent sink",
        "icon": "dynamodb",
        "pattern": "storage"
      }
    ],
    "edges": [
      {
        "source": "kafka",
        "target": "connector",
        "route": "step"
      },
      {
        "source": "connector",
        "target": "landing",
        "route": "step"
      },
      {
        "source": "kafka",
        "target": "spark",
        "route": "step"
      },
      {
        "source": "spark",
        "target": "hot",
        "route": "step"
      }
    ],
    "padding": 0.1,
    "flow": "TB"
  },
  {
    "id": "medallion-pipeline",
    "title": "Transformation: horizontal medallion",
    "nodes": [
      {
        "id": "medallion",
        "label": "Amazon S3 / Apache Iceberg",
        "sub": "Managed table commits define visibility",
        "icon": "s3",
        "pattern": "storage",
        "flow": "LR",
        "children": [
          {
            "id": "bronze",
            "label": "Bronze",
            "sub": "",
            "icon": "s3",
            "pattern": "storage",
            "variant": "tile"
          },
          {
            "id": "silver",
            "label": "Silver",
            "sub": "",
            "icon": "database",
            "pattern": "storage",
            "variant": "tile"
          },
          {
            "id": "gold",
            "label": "Gold",
            "sub": "",
            "icon": "table",
            "pattern": "storage",
            "variant": "tile"
          }
        ],
        "edges": [
          {
            "source": "bronze",
            "target": "silver",
            "route": "step"
          },
          {
            "source": "silver",
            "target": "gold",
            "route": "step"
          }
        ]
      },
      {
        "id": "silver-work",
        "label": "Bronze \u2192 Silver",
        "sub": "Resolve trusted records",
        "icon": "none",
        "pattern": "group",
        "children": [
          {
            "id": "schema",
            "label": "Schema gate",
            "sub": "Approve compatible changes; hold breakage",
            "icon": "shieldcheck",
            "pattern": "service"
          },
          {
            "id": "clean",
            "label": "Clean and enrich",
            "sub": "Units \u00b7 keys \u00b7 reference joins \u00b7 deterministic dedupe",
            "icon": "layers",
            "pattern": "service"
          }
        ]
      },
      {
        "id": "gold-work",
        "label": "Silver \u2192 Gold",
        "sub": "Publish trusted business metrics",
        "icon": "none",
        "pattern": "group",
        "children": [
          {
            "id": "metrics",
            "label": "Metric contract",
            "sub": "Reporting grain \u00b7 formulas \u00b7 population",
            "icon": "table",
            "pattern": "service"
          },
          {
            "id": "release",
            "label": "Reconcile and release",
            "sub": "Matching totals \u00b7 versioned acceptance evidence",
            "icon": "check",
            "pattern": "service"
          }
        ]
      }
    ],
    "edges": [],
    "padding": 0.1
  },
  {
    "id": "warehouse-model",
    "title": "Warehouse: fixed input and historical joins",
    "nodes": [
      {
        "id": "snapshot",
        "label": "Accepted Gold snapshot",
        "sub": "Pin the input version",
        "icon": "database",
        "pattern": "storage"
      },
      {
        "id": "staging",
        "label": "Warehouse staging",
        "sub": "Chosen transport adapter \u00b7 Redshift staging",
        "icon": "redshift",
        "pattern": "storage"
      },
      {
        "id": "models",
        "label": "Warehouse model build",
        "sub": "Resolve history and retain the fact grain",
        "icon": "none",
        "pattern": "group",
        "children": [
          {
            "id": "dbt",
            "label": "dbt models",
            "sub": "Tests \u00b7 staging \u00b7 intermediate \u00b7 marts",
            "icon": "layers",
            "pattern": "service"
          },
          {
            "id": "dimensions",
            "label": "Historical dimensions",
            "sub": "Customer SCD2 \u00b7 meter \u00b7 tariff \u00b7 asset",
            "icon": "users",
            "pattern": "storage"
          },
          {
            "id": "facts",
            "label": "Periodic snapshot facts",
            "sub": "Meter readings \u00b7 generation \u00b7 explicit grain",
            "icon": "table",
            "pattern": "storage"
          }
        ],
        "edges": [
          {
            "source": "dbt",
            "target": "facts",
            "route": "step"
          },
          {
            "source": "dimensions",
            "target": "facts",
            "route": "step"
          }
        ]
      }
    ],
    "edges": [
      {
        "source": "snapshot",
        "target": "staging",
        "route": "step"
      },
      {
        "source": "staging",
        "target": "models",
        "route": "step"
      }
    ],
    "padding": 0.1,
    "flow": "TB"
  },
  {
    "id": "requirements-business-needs",
    "title": "Business needs",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "regulatory",
        "label": "Regulatory confidence",
        "sub": "Reconciled Ofgem datasets; traceable numbers and auditable releases",
        "icon": "shieldcheck",
        "pattern": "user"
      },
      {
        "id": "billing",
        "label": "Reliable billing",
        "sub": "Detect meter failures before billing; reduce corrections and complaints",
        "icon": "database",
        "pattern": "storage"
      },
      {
        "id": "operations",
        "label": "Current operations",
        "sub": "Timely meter, grid and generation anomaly visibility",
        "icon": "waves",
        "pattern": "network"
      },
      {
        "id": "commercial",
        "label": "Commercial insight",
        "sub": "Consistent consumption, trading and customer analytics",
        "icon": "users",
        "pattern": "service"
      }
    ],
    "edges": []
  },
  {
    "id": "requirements-source-systems",
    "title": "Source systems",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "metering",
        "label": "Smart metering",
        "sub": "Meter readings and consumption; stable identity, event time and units",
        "icon": "database",
        "pattern": "storage"
      },
      {
        "id": "generation",
        "label": "Generation and grid",
        "sub": "Asset telemetry, plant performance and grid events",
        "icon": "waves",
        "pattern": "network"
      },
      {
        "id": "trading-billing",
        "label": "Trading and billing",
        "sub": "Market data, trades, customers and payments; supported database changes",
        "icon": "users",
        "pattern": "external"
      },
      {
        "id": "reference",
        "label": "Reference data",
        "sub": "Tariffs, asset registries and external feeds; effective version history",
        "icon": "table",
        "pattern": "storage"
      }
    ],
    "edges": []
  },
  {
    "id": "requirements-slas",
    "title": "Slas",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "batch",
        "label": "Batch ingestion <1 hour",
        "sub": "Source cut-off to accepted Bronze data; case-study objective",
        "icon": "clock",
        "pattern": "service"
      },
      {
        "id": "freshness",
        "label": "Operational freshness <2 minutes",
        "sub": "Event creation to consumer availability; case-study objective",
        "icon": "waves",
        "pattern": "network"
      },
      {
        "id": "reconciliation",
        "label": "Reconciliation variance \u22640.01%",
        "sub": "Above the threshold, hold submission for matching scope and units",
        "icon": "shieldcheck",
        "pattern": "storage"
      },
      {
        "id": "measurement",
        "label": "End-to-end measurement",
        "sub": "Missing feeds, processing delay and consumer freshness; not job status alone",
        "icon": "cloudwatch",
        "pattern": "service"
      }
    ],
    "edges": []
  },
  {
    "id": "requirements-acceptance-criteria",
    "title": "Acceptance criteria",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "inputs",
        "label": "Complete inputs",
        "sub": "Source cut-off, extract identity, file manifest and control totals",
        "icon": "database",
        "pattern": "external"
      },
      {
        "id": "validation",
        "label": "Explainable validation",
        "sub": "Accepted / rejected counts, schema checks and reason-coded exceptions",
        "icon": "shieldcheck",
        "pattern": "service"
      },
      {
        "id": "outputs",
        "label": "Reconciled outputs",
        "sub": "Match counts and amounts by population, period and units",
        "icon": "table",
        "pattern": "storage"
      },
      {
        "id": "release",
        "label": "Traceable release",
        "sub": "Job and table versions, acceptance decision, delivery receipt and safe replay",
        "icon": "workflow",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "architecture-service-responsibilities",
    "title": "Platform service responsibilities",
    "nodes": [
      {
        "id": "capture",
        "label": "Capture and land",
        "sub": "DMS database changes; Kafka events; MSK Connect S3 sink",
        "icon": "dms",
        "pattern": "network"
      },
      {
        "id": "lake",
        "label": "Store and commit",
        "sub": "S3 raw objects; Iceberg table metadata; Glue Catalog discovery",
        "icon": "s3",
        "pattern": "storage"
      },
      {
        "id": "compute",
        "label": "Process and coordinate",
        "sub": "Glue batch; Databricks event-time processing; MWAA dependencies",
        "icon": "glue",
        "pattern": "service"
      },
      {
        "id": "serve",
        "label": "Model and serve",
        "sub": "dbt / Redshift marts; Athena exploration; DynamoDB operational keys",
        "icon": "redshift",
        "pattern": "storage"
      }
    ],
    "edges": [],
    "padding": 0.09,
    "framed": true,
    "cols": 2
  },
  {
    "id": "architecture-two-ingestion-paths",
    "title": "Batch and streaming entry paths",
    "nodes": [
      {
        "id": "batch",
        "label": "Batch route",
        "sub": "Supported database sources",
        "icon": "dms",
        "pattern": "network",
        "flow": "TB",
        "children": [
          {
            "id": "dms",
            "label": "AWS DMS",
            "sub": "Full load + CDC / incremental changes",
            "icon": "dms",
            "pattern": "network"
          },
          {
            "id": "batch-landing",
            "label": "Raw S3 landing",
            "sub": "Files retain source operations and sequence",
            "icon": "s3",
            "pattern": "storage"
          },
          {
            "id": "batch-commit",
            "label": "Bronze acceptance",
            "sub": "Validate a bounded input set; commit Iceberg",
            "icon": "glue",
            "pattern": "service"
          }
        ],
        "edges": [
          {
            "source": "dms",
            "target": "batch-landing",
            "route": "step"
          },
          {
            "source": "batch-landing",
            "target": "batch-commit",
            "route": "step"
          }
        ]
      },
      {
        "id": "stream",
        "label": "Streaming route",
        "sub": "Meter and grid events",
        "icon": "waves",
        "pattern": "network",
        "flow": "TB",
        "children": [
          {
            "id": "kafka",
            "label": "Kafka / Amazon MSK",
            "sub": "Keyed events and schema contracts",
            "icon": "network",
            "pattern": "network"
          },
          {
            "id": "connector",
            "label": "MSK Connect \u2192 S3",
            "sub": "Configured sink lands raw event files",
            "icon": "s3",
            "pattern": "storage"
          },
          {
            "id": "stream-commit",
            "label": "Bronze acceptance",
            "sub": "Separate processing job commits Iceberg",
            "icon": "glue",
            "pattern": "service"
          }
        ],
        "edges": [
          {
            "source": "kafka",
            "target": "connector",
            "route": "step"
          },
          {
            "source": "connector",
            "target": "stream-commit",
            "route": "step"
          }
        ]
      }
    ],
    "edges": [],
    "padding": 0.09,
    "framed": true,
    "cols": 2
  },
  {
    "id": "architecture-medallion-zones",
    "title": "Storage and processing",
    "nodes": [
      {
        "id": "platform",
        "label": "Storage and processing",
        "sub": "Horizontal medallion; separate execution responsibilities",
        "icon": "s3",
        "pattern": "storage",
        "children": [
          {
            "id": "tables",
            "label": "S3 / Apache Iceberg",
            "sub": "Managed table layers",
            "icon": "s3",
            "pattern": "storage",
            "flow": "LR",
            "children": [
              {
                "id": "bronze",
                "label": "Bronze",
                "sub": "Source arrivals",
                "icon": "s3",
                "pattern": "storage",
                "variant": "tile"
              },
              {
                "id": "silver",
                "label": "Silver",
                "sub": "Trusted records",
                "icon": "database",
                "pattern": "storage",
                "variant": "tile"
              },
              {
                "id": "gold",
                "label": "Gold",
                "sub": "Business metrics",
                "icon": "table",
                "pattern": "storage",
                "variant": "tile"
              }
            ],
            "edges": [
              {
                "source": "bronze",
                "target": "silver",
                "route": "step"
              },
              {
                "source": "silver",
                "target": "gold",
                "route": "step"
              }
            ]
          },
          {
            "id": "batch",
            "label": "Batch processing",
            "sub": "Accepted inputs \u2192 deterministic reporting",
            "icon": "glue",
            "pattern": "service",
            "cols": 3,
            "children": [
              {
                "id": "schema",
                "label": "Schema / quality",
                "sub": "Validate and hold failures",
                "icon": "shieldcheck",
                "pattern": "service"
              },
              {
                "id": "glue",
                "label": "AWS Glue",
                "sub": "Clean and enrich",
                "icon": "glue",
                "pattern": "service"
              },
              {
                "id": "dbt",
                "label": "dbt models",
                "sub": "Test warehouse marts",
                "icon": "layers",
                "pattern": "service"
              }
            ]
          },
          {
            "id": "stream",
            "label": "Streaming processing",
            "sub": "Connector landing and event processing are distinct",
            "icon": "waves",
            "pattern": "service",
            "cols": 3,
            "children": [
              {
                "id": "connect",
                "label": "MSK Connect",
                "sub": "Raw S3 event landing",
                "icon": "network",
                "pattern": "service"
              },
              {
                "id": "spark",
                "label": "Databricks",
                "sub": "Event-time enrichment",
                "icon": "databricks",
                "pattern": "service"
              },
              {
                "id": "checkpoint",
                "label": "Checkpoint / state",
                "sub": "Recover query progress",
                "icon": "clock",
                "pattern": "service"
              }
            ]
          }
        ]
      }
    ],
    "edges": [],
    "padding": 0.09,
    "framed": true
  },
  {
    "id": "architecture-retention-and-maintenance",
    "title": "Data lifecycle and replay",
    "nodes": [
      {
        "id": "raw",
        "label": "Raw archive",
        "sub": "Case-study policy: 90 days, then Glacier; restoration affects replay time",
        "icon": "s3",
        "pattern": "storage"
      },
      {
        "id": "tables",
        "label": "Iceberg maintenance",
        "sub": "Compact small files; expire approved snapshots; table-aware cleanup",
        "icon": "database",
        "pattern": "storage"
      },
      {
        "id": "replay",
        "label": "Replay window",
        "sub": "Align source availability, table versions and the required recovery interval",
        "icon": "clock",
        "pattern": "service"
      },
      {
        "id": "audit",
        "label": "Audit evidence",
        "sub": "Retain input manifests, job versions and acceptance records; distinct from snapshots",
        "icon": "shieldcheck",
        "pattern": "user"
      }
    ],
    "edges": [],
    "padding": 0.09,
    "framed": true,
    "cols": 2
  },
  {
    "id": "ingestion-bronze-acceptance",
    "title": "Bronze acceptance",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "manifest",
        "label": "Bounded input manifest",
        "sub": "Source cut-off, object identities and run version",
        "icon": "table",
        "pattern": "external"
      },
      {
        "id": "validate",
        "label": "Validate arrivals",
        "sub": "Required envelope, schema and file acceptance; hold failures",
        "icon": "shieldcheck",
        "pattern": "service"
      },
      {
        "id": "commit",
        "label": "Commit Bronze Iceberg",
        "sub": "Preserve raw values and provenance; publish accepted inputs",
        "icon": "s3",
        "pattern": "storage"
      },
      {
        "id": "evidence",
        "label": "Acceptance evidence",
        "sub": "Input = accepted + rejected; retain snapshot and safe retry identity",
        "icon": "check",
        "pattern": "storage"
      }
    ],
    "edges": []
  },
  {
    "id": "ingestion-cdc-recovery",
    "title": "Cdc recovery",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "markers",
        "label": "Separate progress markers",
        "sub": "Source log position, DMS progress, landed files and job commit",
        "icon": "clock",
        "pattern": "network"
      },
      {
        "id": "restart",
        "label": "Safe restart boundary",
        "sub": "Resume from proven durable output; repeat incomplete acceptance safely",
        "icon": "workflow",
        "pattern": "service"
      },
      {
        "id": "order",
        "label": "Apply changes deterministically",
        "sub": "Business keys, source sequence and explicit delete semantics",
        "icon": "database",
        "pattern": "storage"
      },
      {
        "id": "resnapshot",
        "label": "Missing-history recovery",
        "sub": "Expired source logs require controlled resnapshot and reconciliation",
        "icon": "shieldcheck",
        "pattern": "external"
      }
    ],
    "edges": []
  },
  {
    "id": "ingestion-topics-and-contracts",
    "title": "Topics and contracts",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "identity",
        "label": "Event identity",
        "sub": "Meter key, event timestamp, unit and source version",
        "icon": "key",
        "pattern": "external"
      },
      {
        "id": "topics",
        "label": "Topics and partitions",
        "sub": "raw / enriched / dlq; ordering stays within each partition",
        "icon": "network",
        "pattern": "network"
      },
      {
        "id": "schema",
        "label": "Schema and meaning",
        "sub": "Avro / Schema Registry checks structure; processing validates business rules",
        "icon": "shieldcheck",
        "pattern": "service"
      },
      {
        "id": "consumers",
        "label": "Independent consumers",
        "sub": "MSK Connect and Spark keep separate offsets, recovery and monitoring",
        "icon": "waves",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "ingestion-connector-to-bronze",
    "title": "MSK Connect landing and Bronze acceptance",
    "flow": "TB",
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "kafka",
        "label": "Kafka / Amazon MSK",
        "sub": "Topic, partition, offset and event contract",
        "icon": "network",
        "pattern": "network"
      },
      {
        "id": "connect",
        "label": "MSK Connect S3 sink",
        "sub": "Configured plugin, format, permissions and rotation",
        "icon": "waves",
        "pattern": "service"
      },
      {
        "id": "raw",
        "label": "Raw S3 files",
        "sub": "Retain deterministic record identity and landing provenance",
        "icon": "s3",
        "pattern": "storage"
      },
      {
        "id": "bronze",
        "label": "Bronze acceptance job",
        "sub": "Validate landed inputs; commit Iceberg separately",
        "icon": "glue",
        "pattern": "service"
      }
    ],
    "edges": [
      {
        "source": "kafka",
        "target": "connect",
        "route": "step"
      },
      {
        "source": "connect",
        "target": "raw",
        "route": "step"
      },
      {
        "source": "raw",
        "target": "bronze",
        "route": "step"
      }
    ]
  },
  {
    "id": "transformation-schema-gate",
    "title": "Schema compatibility",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "expected",
        "label": "Expected contract",
        "sub": "Compare declared fields, types and units with catalog expectations",
        "icon": "table",
        "pattern": "storage"
      },
      {
        "id": "compatible",
        "label": "Compatible change",
        "sub": "Approve additive fields under a versioned contract",
        "icon": "check",
        "pattern": "service"
      },
      {
        "id": "breaking",
        "label": "Breaking change",
        "sub": "Hold dropped fields, incompatible types or changed units",
        "icon": "shieldcheck",
        "pattern": "external"
      },
      {
        "id": "approval",
        "label": "Controlled evolution",
        "sub": "Record the decision; update metadata through supported table APIs",
        "icon": "workflow",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "transformation-validation-and-exceptions",
    "title": "Validation and exceptions",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "identity",
        "label": "Mandatory identity",
        "sub": "Check source, meter key, event time and arrival provenance",
        "icon": "key",
        "pattern": "external"
      },
      {
        "id": "measurement",
        "label": "Valid measurement",
        "sub": "Verify units, required values and source-specific measurement rules",
        "icon": "gauge",
        "pattern": "service"
      },
      {
        "id": "references",
        "label": "Reference integrity",
        "sub": "Resolve valid meter, tariff, customer and asset relationships",
        "icon": "database",
        "pattern": "storage"
      },
      {
        "id": "exceptions",
        "label": "Reason-coded exceptions",
        "sub": "Quarantine incompatible inputs; retain DLQ rows with owner and run ID",
        "icon": "shieldcheck",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "transformation-cleansing-and-enrichment",
    "title": "Cleansing and enrichment",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "units",
        "label": "Normalise units",
        "sub": "Example: declared 1,200 Wh becomes 1.2 kWh",
        "icon": "gauge",
        "pattern": "service"
      },
      {
        "id": "time",
        "label": "Normalise event time",
        "sub": "Retain UTC event timestamps; preserve source time provenance",
        "icon": "clock",
        "pattern": "network"
      },
      {
        "id": "join",
        "label": "Enrich from references",
        "sub": "Meter, tariff, customer and asset joins use effective-date rules",
        "icon": "layers",
        "pattern": "storage"
      },
      {
        "id": "evidence",
        "label": "Preserve rule evidence",
        "sub": "Keep transformation version and reason-coded relationship failures",
        "icon": "shieldcheck",
        "pattern": "external"
      }
    ],
    "edges": []
  },
  {
    "id": "transformation-dedupe-and-change-order",
    "title": "Deduplication and change order",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "key",
        "label": "Business identity",
        "sub": "Meter ID + reading timestamp; database CDC uses its own business key",
        "icon": "key",
        "pattern": "external"
      },
      {
        "id": "precedence",
        "label": "Deterministic precedence",
        "sub": "Source version / sequence and an explicit tie-breaker",
        "icon": "clock",
        "pattern": "network"
      },
      {
        "id": "merge",
        "label": "Changes and deletes",
        "sub": "Apply late corrections and delete operations explicitly",
        "icon": "database",
        "pattern": "storage"
      },
      {
        "id": "replay",
        "label": "Replay equivalence",
        "sub": "Same input set produces the same accepted keys and values",
        "icon": "check",
        "pattern": "service"
      }
    ],
    "edges": []
  },
  {
    "id": "transformation-reporting-grain",
    "title": "Reporting grain",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "interval",
        "label": "Accepted interval readings",
        "sub": "Distinguish interval consumption from cumulative counters",
        "icon": "gauge",
        "pattern": "storage"
      },
      {
        "id": "calendar",
        "label": "Settlement calendar",
        "sub": "Map UTC events to agreed periods and local-time boundaries",
        "icon": "clock",
        "pattern": "network"
      },
      {
        "id": "grain",
        "label": "Gold row identity",
        "sub": "One meter row per settlement period in the sample fact",
        "icon": "table",
        "pattern": "storage"
      },
      {
        "id": "checks",
        "label": "Grain checks",
        "sub": "Prevent repeated intervals and inconsistent daily / period totals",
        "icon": "shieldcheck",
        "pattern": "service"
      }
    ],
    "edges": []
  },
  {
    "id": "transformation-business-metrics",
    "title": "Business metrics",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "consumption",
        "label": "Consumption",
        "sub": "Sum accepted interval kWh at the agreed reporting grain",
        "icon": "gauge",
        "pattern": "storage"
      },
      {
        "id": "utilisation",
        "label": "Generation utilisation",
        "sub": "Output relative to agreed capacity over the defined interval",
        "icon": "activity",
        "pattern": "service"
      },
      {
        "id": "exceptions",
        "label": "Denominators and exclusions",
        "sub": "Define zero capacity, missing values and unavailable assets",
        "icon": "shieldcheck",
        "pattern": "external"
      },
      {
        "id": "corrections",
        "label": "Versioned metric contract",
        "sub": "Retain formulas, populations and late-correction rules",
        "icon": "table",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "transformation-reconciliation-and-release",
    "title": "Reconciliation and release",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "scope",
        "label": "Match the comparison scope",
        "sub": "Same population, period and measurement unit",
        "icon": "layers",
        "pattern": "external"
      },
      {
        "id": "variance",
        "label": "Calculate defined variance",
        "sub": "Document the baseline; use an absolute tolerance for zero source totals",
        "icon": "gauge",
        "pattern": "service"
      },
      {
        "id": "gate",
        "label": "Publish or hold",
        "sub": "Case-study gate: variance above 0.01% blocks Ofgem submission",
        "icon": "shieldcheck",
        "pattern": "storage"
      },
      {
        "id": "audit",
        "label": "Versioned acceptance record",
        "sub": "Retain input snapshots, reject counts, decision and correction history",
        "icon": "table",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "consumption-star-schema",
    "title": "Dimensional model",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "facts",
        "label": "Periodic snapshot facts",
        "sub": "FACT_METER_READS and FACT_GENERATION_OUTPUT use agreed grains",
        "icon": "table",
        "pattern": "external"
      },
      {
        "id": "dimensions",
        "label": "Descriptive dimensions",
        "sub": "Meter, customer, tariff and asset attributes",
        "icon": "users",
        "pattern": "storage"
      },
      {
        "id": "keys",
        "label": "Surrogate-key joins",
        "sub": "Each fact references one appropriate dimension version",
        "icon": "key",
        "pattern": "service"
      },
      {
        "id": "unknown",
        "label": "Unresolved keys",
        "sub": "Use a defined unknown member or held fact; avoid silent row loss",
        "icon": "shieldcheck",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "consumption-ofgem-delivery",
    "title": "Regulatory reporting",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "accepted",
        "label": "Accepted reporting version",
        "sub": "Pin reconciled Gold and the release decision",
        "icon": "database",
        "pattern": "external"
      },
      {
        "id": "payload",
        "label": "Format and validate",
        "sub": "MWAA task builds a versioned payload against the real specification",
        "icon": "workflow",
        "pattern": "storage"
      },
      {
        "id": "receipt",
        "label": "Delivery receipt",
        "sub": "Persist payload identity, response and delivery state",
        "icon": "check",
        "pattern": "service"
      },
      {
        "id": "retry",
        "label": "Retry and corrections",
        "sub": "Check prior acceptance; retain revision history and idempotency evidence",
        "icon": "clock",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "consumption-customer-scd2",
    "title": "Customer history: SCD Type 2",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "change",
        "label": "Customer change",
        "sub": "Example: STANDARD tariff becomes FLEX on 1 October",
        "icon": "users",
        "pattern": "external"
      },
      {
        "id": "versions",
        "label": "Effective-date versions",
        "sub": "Close the previous interval; create a new surrogate-key row",
        "icon": "clock",
        "pattern": "storage"
      },
      {
        "id": "assign",
        "label": "Event-time assignment",
        "sub": "Resolve each fact to the customer version valid when it occurred",
        "icon": "key",
        "pattern": "service"
      },
      {
        "id": "checks",
        "label": "History validation",
        "sub": "Check non-overlapping intervals; audit late corrections and re-keying",
        "icon": "shieldcheck",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "consumption-analytics-and-science",
    "title": "BI and lakehouse exploration",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "bi",
        "label": "Power BI / Redshift",
        "sub": "Governed marts for commercial reporting and analysis",
        "icon": "redshift",
        "pattern": "external"
      },
      {
        "id": "lake",
        "label": "Amazon Athena",
        "sub": "Explore committed Iceberg tables without warehouse loading",
        "icon": "athena",
        "pattern": "storage"
      },
      {
        "id": "meaning",
        "label": "Shared definitions",
        "sub": "Agree grains, metrics and accepted input versions",
        "icon": "table",
        "pattern": "service"
      },
      {
        "id": "access",
        "label": "Access and freshness",
        "sub": "Restrict PII consistently and expose published-data freshness",
        "icon": "shieldcheck",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "consumption-operational-lookups",
    "title": "Operational consumption",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "update",
        "label": "Streaming updates",
        "sub": "Conditional, repeatable writes protect operational readings",
        "icon": "waves",
        "pattern": "external"
      },
      {
        "id": "key",
        "label": "Meter / timestamp key",
        "sub": "Partition key meter_id; sort key reading_timestamp",
        "icon": "key",
        "pattern": "storage"
      },
      {
        "id": "latest",
        "label": "Latest-reading access",
        "sub": "Descending Query with limit 1; GetItem requires the full key",
        "icon": "dynamodb",
        "pattern": "service"
      },
      {
        "id": "freshness",
        "label": "Freshness and retention",
        "sub": "Show event age and anomalies; case-study hot retention uses 90-day TTL",
        "icon": "clock",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-release-pipeline",
    "title": "CI/CD and safe promotion",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "review",
        "label": "Reviewed artifacts",
        "sub": "GitHub Actions checks code, contracts and representative output",
        "icon": "gitbranch",
        "pattern": "external"
      },
      {
        "id": "compatible",
        "label": "Compatibility checks",
        "sub": "Validate catalog schema, checkpoint state and consumer models",
        "icon": "shieldcheck",
        "pattern": "storage"
      },
      {
        "id": "promote",
        "label": "Controlled promotion",
        "sub": "Deploy immutable versions with environment approvals",
        "icon": "workflow",
        "pattern": "service"
      },
      {
        "id": "validate",
        "label": "Accepted-output validation",
        "sub": "Retain the prior accepted version until release evidence passes",
        "icon": "check",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-audit-lineage",
    "title": "Audit and lineage",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "access",
        "label": "Access evidence",
        "sub": "Configure CloudTrail events and required S3 data-event coverage",
        "icon": "cloudtrail",
        "pattern": "external"
      },
      {
        "id": "lineage",
        "label": "Transformation lineage",
        "sub": "Connect object IDs, contract version, job version and table snapshot",
        "icon": "layers",
        "pattern": "storage"
      },
      {
        "id": "warehouse",
        "label": "Published versions",
        "sub": "Retain warehouse run, acceptance decision and report revision",
        "icon": "table",
        "pattern": "service"
      },
      {
        "id": "retention",
        "label": "Retention and retrieval",
        "sub": "Protect the archive; prove historical evidence can be retrieved",
        "icon": "shieldcheck",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-rollback-and-cost",
    "title": "Rollback and operating cost",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "rollback",
        "label": "Rollback boundary",
        "sub": "Restore compatible job artifact and accepted data version",
        "icon": "clock",
        "pattern": "external"
      },
      {
        "id": "state",
        "label": "Schema and checkpoint state",
        "sub": "Check whether migrations prevent the proposed rollback",
        "icon": "database",
        "pattern": "storage"
      },
      {
        "id": "drivers",
        "label": "Measured cost drivers",
        "sub": "Scans, compute time, connector capacity and snapshot retention",
        "icon": "gauge",
        "pattern": "service"
      },
      {
        "id": "unit",
        "label": "Cost per accepted output",
        "sub": "Compare reporting periods or event volume against service objectives",
        "icon": "table",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-access-boundaries",
    "title": "Security and access",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "identity",
        "label": "Least-privilege identities",
        "sub": "Scope DMS, connector and job roles to required inputs and outputs",
        "icon": "iam",
        "pattern": "external"
      },
      {
        "id": "storage",
        "label": "Storage governance",
        "sub": "Secure raw S3 paths and supported Lake Formation table access",
        "icon": "s3",
        "pattern": "storage"
      },
      {
        "id": "pii",
        "label": "PII and secrets",
        "sub": "Separate identity data; use Secrets Manager and required KMS grants",
        "icon": "lock",
        "pattern": "service"
      },
      {
        "id": "consumer",
        "label": "Warehouse grants",
        "sub": "Expose appropriate marts; restrict PII consistently across access paths",
        "icon": "redshift",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-dependency-graph",
    "title": "Orchestration and dependencies",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "bronze",
        "label": "Bronze ready",
        "sub": "Accepted manifest and committed snapshot identify the bounded run",
        "icon": "s3",
        "pattern": "external"
      },
      {
        "id": "silver",
        "label": "Silver and Gold ready",
        "sub": "Schema checks, trusted records and reconciled metrics",
        "icon": "layers",
        "pattern": "storage"
      },
      {
        "id": "serve",
        "label": "Warehouse and release",
        "sub": "Load the accepted version; test and release consumers",
        "icon": "redshift",
        "pattern": "service"
      },
      {
        "id": "mwaa",
        "label": "MWAA coordination",
        "sub": "Pass run IDs and versions; use sensor timeouts and bounded retries",
        "icon": "workflow",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-data-health",
    "title": "Monitoring and alerting",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "source",
        "label": "Source freshness",
        "sub": "Expected cut-off, missing feeds and connector lag",
        "icon": "clock",
        "pattern": "external"
      },
      {
        "id": "processing",
        "label": "Processing health",
        "sub": "Backlog age, retries, DLQ volume and reconciliation variance",
        "icon": "cloudwatch",
        "pattern": "storage"
      },
      {
        "id": "consumer",
        "label": "Consumer freshness",
        "sub": "Latest accepted period or visible event timestamp",
        "icon": "gauge",
        "pattern": "service"
      },
      {
        "id": "alerts",
        "label": "Actionable alerts",
        "sub": "Budget transport / processing / serving delay; route with ownership",
        "icon": "bell",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-restart-and-backfill",
    "title": "Restart, replay and backfill",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "interrupt",
        "label": "Controlled interruption",
        "sub": "Compare normal processing with failure near the commit boundary",
        "icon": "clock",
        "pattern": "external"
      },
      {
        "id": "restart",
        "label": "Safe restart",
        "sub": "Use the same inputs and contracts; restore progress and repeat writes safely",
        "icon": "workflow",
        "pattern": "storage"
      },
      {
        "id": "backfill",
        "label": "Bounded backfill",
        "sub": "Declare interval and versions; avoid stale hot-path overwrites",
        "icon": "database",
        "pattern": "service"
      },
      {
        "id": "evidence",
        "label": "Recovery acceptance",
        "sub": "Compare business keys, values, counts and totals before promotion",
        "icon": "shieldcheck",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-quarantine-and-dlq",
    "title": "Quality controls and exceptions",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "quarantine",
        "label": "Source quarantine",
        "sub": "Hold incompatible source partitions and preserve provenance",
        "icon": "shieldcheck",
        "pattern": "external"
      },
      {
        "id": "dlq",
        "label": "Record DLQ",
        "sub": "Keep invalid rows, rejection reason and failed contract version",
        "icon": "database",
        "pattern": "storage"
      },
      {
        "id": "flag",
        "label": "Source control flag",
        "sub": "Prevent unsafe Silver consumption until authorised clearance",
        "icon": "dynamodb",
        "pattern": "service"
      },
      {
        "id": "reprocess",
        "label": "Controlled reprocessing",
        "sub": "Repair the contract or data; replay a bounded scope and reconcile",
        "icon": "workflow",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-schema-incident",
    "title": "Schema incident recovery",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "detect",
        "label": "Detect the change",
        "sub": "Gate flags unexpected units or schema against the source contract",
        "icon": "bell",
        "pattern": "external"
      },
      {
        "id": "contain",
        "label": "Contain affected input",
        "sub": "Quarantine the scope; flag the source and hold unsafe publication",
        "icon": "shieldcheck",
        "pattern": "storage"
      },
      {
        "id": "repair",
        "label": "Approve the repair",
        "sub": "Confirm meaning and version the corrected contract / transformation",
        "icon": "layers",
        "pattern": "service"
      },
      {
        "id": "replay",
        "label": "Replay and reconcile",
        "sub": "Rebuild the affected interval; compare totals and record release evidence",
        "icon": "workflow",
        "pattern": "network"
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-environment-contract",
    "title": "Terraform environments",
    "cols": 2,
    "framed": true,
    "padding": 0.09,
    "nodes": [
      {
        "id": "estate",
        "label": "Resource definitions",
        "sub": "S3, IAM, networking, Glue and required service configuration",
        "icon": "terraform",
        "pattern": "external"
      },
      {
        "id": "capture",
        "label": "Ingestion configuration",
        "sub": "DMS endpoints / tasks; MSK Connect plugin configuration where supported",
        "icon": "network",
        "pattern": "storage"
      },
      {
        "id": "inputs",
        "label": "Environment inputs",
        "sub": "Separate dev / production names, capacity, endpoints and secrets",
        "icon": "lock",
        "pattern": "service"
      },
      {
        "id": "validate",
        "label": "Deployment validation",
        "sub": "Protect state; check connectivity, KMS use and permissions",
        "icon": "shieldcheck",
        "pattern": "network"
      }
    ],
    "edges": []
  }
]
