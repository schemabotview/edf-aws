# Service responsibilities

## On screen

## Service responsibilities

Each service owns a specific boundary; group related services without confusing capture, storage, computation and access.

- **Capture and land** — DMS captures supported database changes; Kafka transports events; MSK Connect runs the configured S3 sink.
- **Store and commit** — S3 holds objects; Iceberg manages table commits and snapshots; Glue Catalog exposes metadata.
- **Process and coordinate** — Glue transforms batches; Databricks processes event time; MWAA coordinates data-ready dependencies.
- **Model and serve** — dbt builds tested Redshift marts; Athena reads the lakehouse; DynamoDB serves operational keys.

**Architecture decision:** Connector delivery, table acceptance, transformation completion and consumer availability need separate evidence.

## Narration

The four cards separate platform responsibilities. Capture services move supported source changes or events, but do not automatically validate business meaning. S3 stores files, while Iceberg metadata controls which committed data readers can see. Glue and Databricks execute transformations; MWAA coordinates their dependencies and recovery. dbt owns warehouse model transformations rather than the transport into Redshift. Consumer access follows workload: warehouse reporting, lakehouse exploration or operational key lookup. Every boundary needs an owner and an acceptance signal. Treating these responsibilities separately makes failures easier to diagnose and avoids assuming that a landed object is already a published analytical record.
