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
        "id": "source",
        "label": "Database source",
        "sub": "Supported engine \u00b7 keys \u00b7 change logging",
        "icon": "database",
        "pattern": "external"
      },
      {
        "id": "dms",
        "label": "AWS DMS",
        "sub": "Full load + CDC \u00b7 incremental changes",
        "icon": "dms",
        "pattern": "network"
      },
      {
        "id": "landing",
        "label": "Raw S3 landing",
        "sub": "Operation \u00b7 source sequence \u00b7 arrival evidence",
        "icon": "s3",
        "pattern": "storage"
      },
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
        "source": "source",
        "target": "dms",
        "route": "step"
      },
      {
        "source": "dms",
        "target": "landing",
        "route": "step"
      },
      {
        "source": "landing",
        "target": "commit",
        "route": "step"
      },
      {
        "source": "commit",
        "target": "progress",
        "route": "step"
      }
    ],
    "padding": 0.1,
    "flow": "TB"
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
    "id": "serving-map",
    "title": "Consumption: choose the serving path",
    "nodes": [
      {
        "id": "gold",
        "label": "Accepted Gold serving",
        "sub": "Shared definitions \u00b7 approved version",
        "pattern": "storage",
        "icon": "database",
        "children": [
          {
            "id": "warehouse",
            "label": "Redshift / Power BI",
            "sub": "Governed warehouse marts and reports",
            "icon": "redshift",
            "pattern": "storage"
          },
          {
            "id": "athena",
            "label": "Amazon Athena",
            "sub": "Explore committed Iceberg tables",
            "icon": "athena",
            "pattern": "service"
          },
          {
            "id": "ofgem",
            "label": "Regulatory delivery",
            "sub": "MWAA format / validate \u00b7 receipt \u00b7 correction history",
            "icon": "workflow",
            "pattern": "service"
          }
        ]
      },
      {
        "id": "operational",
        "label": "Operational serving",
        "sub": "Independent low-latency route",
        "pattern": "service",
        "icon": "none",
        "children": [
          {
            "id": "hot",
            "label": "Streaming hot path",
            "sub": "Independent low-latency serving route",
            "icon": "waves",
            "pattern": "service"
          },
          {
            "id": "dynamo",
            "label": "DynamoDB / operations",
            "sub": "Meter + timestamp \u00b7 latest Query \u00b7 freshness",
            "icon": "dynamodb",
            "pattern": "storage"
          }
        ],
        "edges": [
          {
            "source": "hot",
            "target": "dynamo",
            "route": "step"
          }
        ]
      }
    ],
    "edges": [],
    "padding": 0.1,
    "cols": 2
  },
  {
    "id": "control-plane",
    "title": "Platform control plane",
    "nodes": [
      {
        "id": "pipeline",
        "label": "Data pipeline",
        "sub": "Bronze \u2192 Silver \u2192 Gold \u2192 consumers",
        "icon": "layers",
        "pattern": "storage"
      },
      {
        "id": "mwaa",
        "label": "Amazon MWAA",
        "sub": "Data-ready dependencies \u00b7 bounded retries",
        "icon": "workflow",
        "pattern": "network"
      },
      {
        "id": "quality",
        "label": "Quality controls",
        "sub": "Schema / totals \u00b7 quarantine \u00b7 DLQ \u00b7 ownership",
        "icon": "shieldcheck",
        "pattern": "service"
      },
      {
        "id": "monitor",
        "label": "Data health",
        "sub": "Freshness \u00b7 lag \u00b7 critical route \u00b7 routed alerts",
        "icon": "cloudwatch",
        "pattern": "service"
      },
      {
        "id": "security",
        "label": "Access and PII",
        "sub": "IAM / Lake Formation \u00b7 KMS \u00b7 secrets \u00b7 separation",
        "icon": "lock",
        "pattern": "user"
      },
      {
        "id": "audit",
        "label": "Audit and lineage",
        "sub": "CloudTrail coverage \u00b7 versions \u00b7 retained evidence",
        "icon": "cloudtrail",
        "pattern": "storage"
      }
    ],
    "edges": [],
    "padding": 0.1,
    "flow": "TB"
  },
  {
    "id": "delivery-recovery",
    "title": "Delivery and controlled recovery",
    "nodes": [
      {
        "id": "terraform",
        "label": "Terraform environments",
        "sub": "Protected state \u00b7 isolated configuration",
        "icon": "terraform",
        "pattern": "network"
      },
      {
        "id": "release",
        "label": "CI/CD release",
        "sub": "Review \u00b7 contracts \u00b7 tests \u00b7 controlled promotion",
        "icon": "gitbranch",
        "pattern": "service"
      },
      {
        "id": "rollback",
        "label": "Rollback and cost",
        "sub": "Compatible code / data versions \u00b7 recovery budget",
        "icon": "clock",
        "pattern": "service"
      },
      {
        "id": "replay",
        "label": "Bounded replay",
        "sub": "Pinned inputs \u00b7 safe retry \u00b7 deterministic rebuild",
        "icon": "workflow",
        "pattern": "service"
      },
      {
        "id": "verify",
        "label": "Reconcile and promote",
        "sub": "Equivalent accepted output \u00b7 lineage evidence",
        "icon": "check",
        "pattern": "storage"
      }
    ],
    "edges": [
      {
        "source": "terraform",
        "target": "release",
        "route": "step"
      },
      {
        "source": "release",
        "target": "rollback",
        "route": "step"
      },
      {
        "source": "rollback",
        "target": "replay",
        "route": "step"
      },
      {
        "source": "replay",
        "target": "verify",
        "route": "step"
      }
    ],
    "padding": 0.1,
    "flow": "TB"
  }
]
