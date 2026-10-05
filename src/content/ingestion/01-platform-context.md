# Ingestion in the full platform

## On screen

## Ingestion in the full platform

The highlighted **Ingestion** container connects EDF’s source systems to the storage and processing layer.

- **Database capture** — AWS DMS handles supported full-load and CDC sources; raw files land on S3 before Bronze acceptance.
- **Event capture** — Kafka / MSK carries meter and grid events; MSK Connect lands raw events, while Databricks independently processes the operational hot path.
- **Supporting controls** — DynamoDB retains progress and quarantined-source flags; Secrets Manager protects source credentials.
- **Next boundary** — Processing validates arrivals and commits Bronze Iceberg. Connector delivery alone does not publish a table.

**Course path:** Batch capture → Bronze acceptance → recovery → event contracts → connector landing → event processing.

[Open the full-size architecture](#/edf-aws-codex)

## Narration

Start with the complete platform and the highlighted Ingestion container. This establishes where source capture sits before we expand the individual pipelines. Supported database sources use DMS full load and change capture. Meter and grid events arrive through Kafka. MSK Connect lands raw event files, while Databricks is an independent consumer for event-time processing and operational output. DynamoDB source controls and Secrets Manager support these routes. The neighbouring storage and processing boundary accepts arrivals and commits managed Bronze tables; raw connector output alone is not an Iceberg transaction. The following sections examine batch capture, Bronze acceptance, recovery, event contracts, connector landing and Spark processing in detail.
