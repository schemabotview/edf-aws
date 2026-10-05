# Assign every platform service a responsibility

## On screen

## Assign every platform service a responsibility

- **DMS and Kafka** — Capture supported database changes and event streams.
- **S3 and Iceberg** — Durable landing and managed Bronze / Silver / Gold tables.
- **Glue and Databricks** — Batch transformations and event-time processing.
- **MWAA and dbt** — Orchestrate accepted datasets and build warehouse models.
- **Redshift, Athena and DynamoDB** — Serve reporting, exploration and operational keys.

**Boundary:** Landing files, committing tables, processing events and serving consumers are separate responsibilities.

## Narration

Read the full architecture as ownership boundaries. DMS extracts database changes; Kafka carries event streams. S3 retains landed objects, while Iceberg metadata defines committed table visibility. Glue runs batch transformations, and Databricks processes event time and streaming state. MWAA schedules dependencies and recovery; dbt builds tested Redshift models. Redshift serves warehouse analytics, Athena reads committed lakehouse data, and DynamoDB serves operational access by key. The storage and processing container groups related responsibilities without implying that a connector performs Spark transformations or commits Iceberg metadata directly. Each boundary needs an owner and evidence of completion.
