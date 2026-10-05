import type { Scene } from '@graphlearning/flow'
export const practicalScenes: Scene[] = [
  {
    "id": "requirements-source-contract-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "source-contract.json",
        "minCols": 52,
        "label": "{\n  \"source\": \"meter_interval_example\",\n  \"owner\": \"metering-data-team\",\n  \"contract_version\": \"1.0\",\n  \"keys\": [\"meter_id\", \"event_time\"],\n  \"measure\": \"interval_consumption\",\n  \"unit\": \"kWh\",\n  \"timezone\": \"UTC\",\n  \"correction_order\": \"source_version\",\n  \"freshness_seconds\": {\n    \"batch\": 3600, \"operational\": 120\n  },\n  \"release_gate\": {\n    \"relative_variance\": 0.0001,\n    \"zero_baseline_absolute_kwh\": 0.01\n  }\n}"
      }
    ],
    "edges": []
  },
  {
    "id": "architecture-iceberg-table-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "bronze-table.sql",
        "minCols": 52,
        "label": "-- Spark SQL; configured Glue Iceberg catalog.\nCREATE NAMESPACE IF NOT EXISTS\n  glue_catalog.bronze;\n\nCREATE TABLE IF NOT EXISTS\n  glue_catalog.bronze.meter_arrivals (\n    arrival_id STRING, meter_id STRING,\n    event_time TIMESTAMP, raw_value STRING,\n    unit STRING, source_version BIGINT,\n    source_object STRING, run_id STRING,\n    ingested_at TIMESTAMP\n  ) USING iceberg\n  PARTITIONED BY (days(ingested_at))\n  TBLPROPERTIES ('format-version' = '2');"
      }
    ],
    "edges": []
  },
  {
    "id": "architecture-maintenance-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "maintenance.sql",
        "minCols": 52,
        "label": "-- Iceberg Spark procedures; approved cut-off only.\nCALL glue_catalog.system.rewrite_data_files(\n  table => 'silver.meter_readings');\n\nCALL glue_catalog.system.expire_snapshots(\n  table => 'silver.meter_readings',\n  older_than => TIMESTAMP '2026-07-01 00:00:00',\n  retain_last => 10);\n\n-- Raw archive policy is in raw-lifecycle.json.\n-- Scope: raw/ only; transition after 90 days.\n-- Never lifecycle-delete active Iceberg files.\n-- Verify readers, replay window and audit holds\n-- before approving snapshot expiration."
      }
    ],
    "edges": []
  },
  {
    "id": "ingestion-manifest-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "bronze-manifest.json",
        "minCols": 52,
        "label": "{\n  \"run_id\": \"meter-2026-10-05-001\",\n  \"source_cutoff\": \"2026-10-05T23:59:59Z\",\n  \"contract_version\": \"1.0\",\n  \"job_version\": \"git:EXAMPLE_SHA\",\n  \"objects\": [{\n    \"bucket\": \"REPLACE_RAW_BUCKET\",\n    \"key\": \"raw/meter/LOAD0001.csv\",\n    \"version_id\": \"REPLACE_VERSION_ID\",\n    \"sha256\": \"REPLACE_CONTENT_DIGEST\",\n    \"expected_rows\": 100\n  }],\n  \"counts\": {\n    \"input\": 100, \"accepted\": 98, \"rejected\": 2\n  },\n  \"state\": \"VALIDATED_NOT_COMMITTED\"\n}"
      }
    ],
    "edges": []
  },
  {
    "id": "ingestion-cdc-resume-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "resume-dms.sh",
        "minCols": 52,
        "label": "# Teaching commands; substitute a proven task ARN.\naws dms describe-replication-tasks \\\n  --filters Name=replication-task-arn,Values=\"$TASK_ARN\" \\\n  --query 'ReplicationTasks[].{\n    Status:Status, Checkpoint:RecoveryCheckpoint}'\n\naws dms describe-table-statistics \\\n  --replication-task-arn \"$TASK_ARN\"\n\n# Only after confirming resumable stopped state,\n# retained source logs and target continuity:\naws dms start-replication-task \\\n  --replication-task-arn \"$TASK_ARN\" \\\n  --start-replication-task-type resume-processing\n\n# Missing logs -> controlled resnapshot + reconcile.\n# DMS progress is separate from Bronze progress."
      }
    ],
    "edges": []
  },
  {
    "id": "ingestion-event-schema-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "meter-event.avsc",
        "minCols": 52,
        "label": "{\n  \"type\": \"record\", \"name\": \"MeterEvent\",\n  \"namespace\": \"example.edf\",\n  \"fields\": [\n    {\"name\": \"meter_id\", \"type\": \"string\"},\n    {\"name\": \"event_time_ms\", \"type\": \"long\"},\n    {\"name\": \"interval_kwh\", \"type\": \"double\"},\n    {\"name\": \"source_version\", \"type\": \"long\"},\n    {\"name\": \"schema_version\", \"type\": \"string\"}\n  ]\n}"
      }
    ],
    "edges": []
  },
  {
    "id": "ingestion-connector-settings-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "s3-sink.properties",
        "minCols": 52,
        "label": "# Confluent S3 plugin configuration fragment.\nconnector.class=io.confluent.connect.s3.S3SinkConnector\ntopics=meter.raw\ntasks.max=3\ns3.bucket.name=REPLACE_RAW_BUCKET\ns3.region=eu-west-2\nstorage.class=io.confluent.connect.s3.storage.S3Storage\nformat.class=\\\n  io.confluent.connect.s3.format.avro.AvroFormat\npartitioner.class=\\\n  io.confluent.connect.storage.partitioner.DefaultPartitioner\nflush.size=10000\nrotate.schedule.interval.ms=60000\ntimezone=UTC\ns3.object.tagging=true\ns3.ssea.name=aws:kms\ns3.sse.kms.key.id=REPLACE_KEY_ARN"
      }
    ],
    "edges": []
  },
  {
    "id": "ingestion-spark-stream-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "streaming.py",
        "minCols": 52,
        "label": "# Excerpt: spark, decode_meter_events and the sink\n# adapter are supplied by the configured runtime.\nfrom pyspark.sql import functions as F\nraw = (spark.readStream.format(\"kafka\")\n    .option(\"kafka.bootstrap.servers\", brokers)\n    .option(\"subscribe\", \"meter.raw\")\n    .option(\"startingOffsets\", \"earliest\")\n    .load())\nevents = decode_meter_events(raw)  # retain offsets\n\nsummary = (events.withWatermark(\"event_time\", \"10 minutes\")\n    .groupBy(F.window(\"event_time\", \"1 minute\"), \"meter_id\")\n    .agg(F.sum(\"interval_kwh\").alias(\"kwh\")))\n\nquery = (summary.writeStream.outputMode(\"update\")\n    .option(\"checkpointLocation\", checkpoint_path)\n    .trigger(processingTime=\"30 seconds\")\n    .foreachBatch(write_dynamodb_idempotently)\n    .start())"
      }
    ],
    "edges": []
  },
  {
    "id": "transformation-validation-code-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "validate.py",
        "minCols": 52,
        "label": "# Excerpt: inspect a parsed, bounded input DataFrame.\nfrom pyspark.sql import functions as F\nexpected = {\"meter_id\": \"string\", \"unit\": \"string\",\n            \"raw_value\": \"string\"}\nactual = dict(df.dtypes)\nif any(actual.get(k) != v for k, v in expected.items()):\n    raise ValueError(\"Hold source: incompatible schema\")\n\nreason = (F.when(F.col(\"meter_id\").isNull(), \"MISSING_KEY\")\n    .when(F.col(\"unit\").isNull(), \"MISSING_UNIT\")\n    .when(~F.col(\"unit\").isin(\"Wh\", \"kWh\"), \"BAD_UNIT\")\n    .when(F.expr(\"try_cast(raw_value AS DOUBLE)\").isNull(),\n          \"BAD_VALUE\"))\nchecked = df.withColumn(\"reject_reason\", reason)\naccepted = checked.filter(\"reject_reason IS NULL\")\nrejected = checked.filter(\"reject_reason IS NOT NULL\")\n# Persist reason, arrival_id, run_id and contract version.\n# Assert input count == accepted count + rejected count."
      }
    ],
    "edges": []
  },
  {
    "id": "transformation-normalisation-code-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "normalise.sql",
        "minCols": 52,
        "label": "-- Spark SQL; input already validated for this contract.\nSET spark.sql.session.timeZone=UTC;\nWITH normalised AS (\n  SELECT *, CASE unit\n    WHEN 'Wh' THEN CAST(raw_value AS DOUBLE) / 1000.0\n    WHEN 'kWh' THEN CAST(raw_value AS DOUBLE)\n  END AS interval_kwh\n  FROM accepted_arrivals\n)\nSELECT n.*, r.tariff_sk\nFROM normalised n\nLEFT JOIN tariff_history r\n  ON n.meter_id = r.meter_id\n AND n.event_time >= r.valid_from\n AND (n.event_time < r.valid_to OR r.valid_to IS NULL);\n-- Require exactly one matching reference per arrival.\n-- Hold missing / overlapping reference intervals."
      }
    ],
    "edges": []
  },
  {
    "id": "transformation-merge-code-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "silver-merge.sql",
        "minCols": 52,
        "label": "-- Changes ranked by key and trusted source order.\n-- winner_changes contains ONE row per business key.\nMERGE INTO glue_catalog.silver.meter_state t\nUSING winner_changes s\nON t.meter_id = s.meter_id\nAND t.event_time = s.event_time\nWHEN MATCHED AND s.source_version > t.source_version\nTHEN UPDATE SET\n  interval_kwh = s.interval_kwh,\n  source_version = s.source_version,\n  is_deleted = (s.op = 'D')\nWHEN NOT MATCHED THEN INSERT (\n  meter_id, event_time, interval_kwh,\n  source_version, is_deleted\n) VALUES (s.meter_id, s.event_time, s.interval_kwh,\n          s.source_version, s.op = 'D');\n-- Serving view filters is_deleted = false."
      }
    ],
    "edges": []
  },
  {
    "id": "transformation-gold-model-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "gold-meter-period.sql",
        "minCols": 52,
        "label": "-- Calendar defines real settlement boundaries in UTC.\n-- Includes DST and approved market-period rules.\nSELECT s.meter_id, c.period_id,\n       SUM(s.interval_kwh) AS consumption_kwh,\n       COUNT(*) AS observed_intervals\nFROM accepted_silver s\nJOIN settlement_calendar c\n  ON s.event_time >= c.start_utc\n AND s.event_time < c.end_utc\nWHERE s.is_deleted = false\nGROUP BY s.meter_id, c.period_id;\n\n-- Compare observed vs expected interval coverage.\n-- Do not use COUNT(*) as a completeness guarantee.\n-- Utilisation = output_kwh / capacity_kwh,\n-- with agreed capacity basis and zero exclusions."
      }
    ],
    "edges": []
  },
  {
    "id": "transformation-reconciliation-code-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "reconcile.py",
        "minCols": 52,
        "label": "from decimal import Decimal\n\ndef release_ok(source, gold, same_scope):\n    source, gold = Decimal(source), Decimal(gold)\n    finite = source.is_finite() and gold.is_finite()\n    if not same_scope or not finite:\n        return False\n    delta = abs(gold - source)\n    if source == 0:\n        return delta <= Decimal(\"0.01\")\n    return delta / abs(source) <= Decimal(\"0.0001\")\n\n# Store matched population, period and units;\n# source / Gold versions, counts and rejects;\n# delta, tolerance, decision and job version.\n# Publish only after all completeness gates pass."
      }
    ],
    "edges": []
  },
  {
    "id": "consumption-warehouse-load-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "warehouse-load.sql",
        "minCols": 52,
        "label": "-- Export pinned Gold to COPY-compatible files first.\n-- Use an immutable, run-specific S3 manifest.\nBEGIN;\nDELETE FROM staging.meter_period\nWHERE run_id = 'EXAMPLE_RUN';\nCOPY staging.meter_period\nFROM 's3://REPLACE_EXPORT/run/manifest.json'\nIAM_ROLE 'REPLACE_COPY_ROLE_ARN'\nMANIFEST FORMAT AS CSV IGNOREHEADER 1;\nCOMMIT;\n\n-- Verify exact run_id, counts and kWh totals.\n-- Build only this accepted run with dbt:\n-- dbt build --select +fact_meter_period\n--          --vars '{run_id: EXAMPLE_RUN}'"
      }
    ],
    "edges": []
  },
  {
    "id": "consumption-history-join-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "customer-history.sql",
        "minCols": 52,
        "label": "-- Redshift SQL; existing dimension version history.\nSELECT f.meter_id, f.period_id, d.customer_sk,\n       f.consumption_kwh\nFROM staging.meter_period f\nLEFT JOIN dim_customer d\n  ON f.customer_id = d.customer_id\n AND f.period_start >= d.valid_from\n AND (f.period_start < d.valid_to OR d.valid_to IS NULL);\n\n-- Overlap check: this query must return zero rows.\nSELECT a.customer_id\nFROM dim_customer a JOIN dim_customer b\n ON a.customer_id = b.customer_id\nAND a.customer_sk < b.customer_sk\nAND a.valid_from < COALESCE(b.valid_to, '9999-12-31')\nAND b.valid_from < COALESCE(a.valid_to, '9999-12-31');"
      }
    ],
    "edges": []
  },
  {
    "id": "consumption-athena-snapshot-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "accepted-query.sql",
        "minCols": 52,
        "label": "-- Athena engine v3; substitute accepted snapshot ID.\nSELECT meter_id, period_id, consumption_kwh\nFROM gold.meter_period\nFOR VERSION AS OF 123456789012345678\nWHERE period_id = 'EXAMPLE_PERIOD';\n\n-- Inspect snapshots before pinning a version.\nSELECT snapshot_id, committed_at, operation\nFROM \"gold\".\"meter_period$snapshots\"\nORDER BY committed_at DESC;\n\n-- Published report records the snapshot and run ID.\n-- Authorise the role and workgroup output location.\n-- Exclude PII or use approved governed views."
      }
    ],
    "edges": []
  },
  {
    "id": "consumption-delivery-state-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "delivery-state.json",
        "minCols": 52,
        "label": "{\n  \"report_id\": \"EXAMPLE_PERIOD_REVISION_1\",\n  \"accepted_run\": \"EXAMPLE_RUN\",\n  \"gold_snapshot\": \"REPLACE_SNAPSHOT_ID\",\n  \"payload_sha256\": \"REPLACE_DIGEST\",\n  \"format_version\": \"REPLACE_REAL_SPEC\",\n  \"state\": \"PREPARED\",\n  \"attempt\": 0,\n  \"receipt_id\": null,\n  \"receipt_received_at\": null,\n  \"correction_of\": null\n}"
      }
    ],
    "edges": []
  },
  {
    "id": "consumption-dynamodb-query-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "meter-access.py",
        "minCols": 52,
        "label": "# Excerpt: boto3 Table, item and version are supplied.\nfrom boto3.dynamodb.conditions import Key\nfrom botocore.exceptions import ClientError\ntry:\n    table.put_item(Item=item,\n        ConditionExpression=(\"attribute_not_exists(#v) \"\n                             \"OR #v < :v\"),\n        ExpressionAttributeNames={\"#v\": \"source_version\"},\n        ExpressionAttributeValues={\":v\": version})\nexcept ClientError as exc:\n    code = exc.response[\"Error\"][\"Code\"]\n    if code != \"ConditionalCheckFailedException\":\n        raise\n    # Inspect equal-version conflicts; older writes stay held.\n\nlatest = table.query(\n    KeyConditionExpression=Key(\"meter_id\").eq(meter_id),\n    ScanIndexForward=False, Limit=1, ConsistentRead=True)"
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-dag-code-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "daily-dag.py",
        "minCols": 52,
        "label": "# Airflow 2.x + compatible Amazon provider excerpt.\nfrom airflow import DAG\nfrom airflow.providers.amazon.aws.operators.glue import (\n    GlueJobOperator)\nfrom datetime import datetime, timedelta, timezone\n\nwith DAG(\"edf_daily\", schedule=None, catchup=False,\n    start_date=datetime(2026, 1, 1, tzinfo=timezone.utc),\n    default_args={\"retries\": 3,\n                  \"retry_delay\": timedelta(minutes=10)}) as dag:\n    silver = GlueJobOperator(task_id=\"silver\",\n        job_name=\"edf-silver-existing-job\",\n        script_args={\"--manifest_uri\":\n                     \"{{ dag_run.conf['manifest_uri'] }}\"},\n        wait_for_completion=True)\n    gold = GlueJobOperator(task_id=\"gold\",\n        job_name=\"edf-gold-existing-job\",\n        script_args={\"--run_id\": \"{{ dag_run.conf['run_id'] }}\"},\n        wait_for_completion=True)\n    silver >> gold"
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-exception-ledger-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "exception-ledger.json",
        "minCols": 52,
        "label": "{\n  \"incident_id\": \"EXAMPLE_INCIDENT_001\",\n  \"source\": \"meter_interval_example\",\n  \"scope_manifest\": \"REPLACE_IMMUTABLE_URI\",\n  \"reason\": \"UNEXPECTED_UNIT\",\n  \"contract_before\": \"1.0\",\n  \"state\": \"QUARANTINED\",\n  \"owner\": \"metering-data-team\",\n  \"publication_hold\": true,\n  \"approved_contract_after\": null,\n  \"repair_job_version\": null,\n  \"replay_run_id\": null,\n  \"reconciliation_decision\": null\n}"
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-cloudwatch-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "freshness-alarm.sh",
        "minCols": 52,
        "label": "# Repeat from the consumer-health observer.\naws cloudwatch put-metric-data \\\n  --namespace EDF/Learning \\\n  --metric-name AcceptedEventAge \\\n  --dimensions Output=meter-operations \\\n  --unit Seconds --value \"$AGE_SECONDS\"\n\naws cloudwatch put-metric-alarm \\\n  --alarm-name meter-operations-stale \\\n  --namespace EDF/Learning \\\n  --metric-name AcceptedEventAge \\\n  --dimensions Name=Output,Value=meter-operations \\\n  --statistic Maximum --period 60 \\\n  --evaluation-periods 2 --threshold 120 \\\n  --comparison-operator GreaterThanThreshold \\\n  --treat-missing-data breaching \\\n  --alarm-actions \"$SNS_TOPIC_ARN\""
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-iam-policy-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "raw-reader-policy.json",
        "minCols": 52,
        "label": "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\", \"Action\": \"s3:ListBucket\",\n    \"Resource\": \"arn:aws:s3:::REPLACE_BUCKET\",\n    \"Condition\": {\"StringLike\": {\n      \"s3:prefix\": [\"raw/meter\", \"raw/meter/*\"]\n    }}\n  }, {\n    \"Effect\": \"Allow\", \"Action\": \"s3:GetObject\",\n    \"Resource\": \"arn:aws:s3:::REPLACE_BUCKET/raw/meter/*\"\n  }]\n}"
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-cloudtrail-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "s3-data-events.json",
        "minCols": 52,
        "label": "{\n  \"AdvancedEventSelectors\": [{\n    \"Name\": \"MeterRawObjectAccess\",\n    \"FieldSelectors\": [{\n      \"Field\": \"eventCategory\", \"Equals\": [\"Data\"]\n    }, {\n      \"Field\": \"resources.type\",\n      \"Equals\": [\"AWS::S3::Object\"]\n    }, {\n      \"Field\": \"resources.ARN\",\n      \"StartsWith\": [\n        \"arn:aws:s3:::REPLACE_BUCKET/raw/meter/\"\n      ]\n    }]\n  }]\n}"
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-terraform-state-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "backend.tf",
        "minCols": 52,
        "label": "terraform {\n  required_version = \">= 1.10, < 2.0\"\n  backend \"s3\" {\n    bucket       = \"REPLACE_STATE_BUCKET\"\n    key          = \"edf/dev/platform.tfstate\"\n    region       = \"eu-west-2\"\n    encrypt      = true\n    use_lockfile = true\n  }\n}\n\n# Bootstrap the state bucket separately.\n# Enable versioning, block public access and restrict IAM.\n# Production uses a separate approved account / key.\n# Pin providers and commit .terraform.lock.hcl.\n# Inject credentials through the approved role flow."
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-ci-workflow-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "contract-checks.yml",
        "minCols": 52,
        "label": "# Example workflow stored outside .github/workflows.\nname: edf-contract-checks\non: [pull_request]\npermissions:\n  contents: read\njobs:\n  validate:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: '3.12'\n      - run: pip install -r examples/practical/requirements-dev.txt\n      - run: python scripts/verify-examples.py\n\n# Cloud promotion is a separate reviewed workflow:\n# protected environment + approved immutable artifact,\n# OIDC role restricted by repository / branch / env,\n# compatibility, replay and accepted-output gates."
      }
    ],
    "edges": []
  },
  {
    "id": "platform-operations-recovery-plan-example",
    "padding": 0.12,
    "nodes": [
      {
        "id": "code",
        "kind": "code",
        "filename": "recovery-plan.json",
        "minCols": 52,
        "label": "{\n  \"recovery_id\": \"EXAMPLE_RECOVERY_001\",\n  \"event_interval\": [\n    \"2026-10-01T00:00:00Z\", \"2026-10-02T00:00:00Z\"\n  ],\n  \"input_manifest\": \"REPLACE_IMMUTABLE_URI\",\n  \"contract_version\": \"1.0\",\n  \"job_version\": \"REPLACE_ARTIFACT_SHA\",\n  \"baseline_release\": \"REPLACE_ACCEPTED_RUN\",\n  \"output_namespace\": \"recovery_candidate\",\n  \"hot_path_writes\": false,\n  \"checks\": [\"keys\", \"values\", \"counts\", \"totals\"],\n  \"promotion\": \"HOLD_UNTIL_RECONCILED\"\n}"
      }
    ],
    "edges": []
  }
]
