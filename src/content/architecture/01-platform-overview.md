# Full platform architecture

## On screen

## Full platform architecture

The EDF platform connects source capture, lakehouse processing and distinct serving paths, with shared controls across the estate.

- **Sources and ingestion** — Metering, generation, trading and billing feed database, file and event routes.
- **Storage and processing** — S3 raw landing and Iceberg Bronze / Silver / Gold; batch and streaming have separate execution responsibilities.
- **Serving and consumers** — Redshift / Power BI reporting, Athena exploration and DynamoDB operational access.
- **Shared controls** — MWAA orchestration, quality gates, IAM / Lake Formation, audit evidence and Terraform / CI/CD.

**Architecture decision:** Read the complete platform here, then use the following sections for readable views of each boundary.

[Open the full-size architecture](#/edf-aws-codex)

## Narration

The full platform diagram is the approved edf-aws-codex architecture. Read it from source systems through ingestion to storage and processing, then serving and business users. Database changes and event streams have different capture mechanisms. Raw S3 landing preserves arrivals; Iceberg commits define managed table visibility. Bronze records source evidence, Silver resolves trusted records and Gold defines reconciled business metrics. Redshift and Power BI serve reporting, Athena supports lakehouse exploration and DynamoDB supports operational keys. The foundation supplies orchestration, security, audit and delivery controls across these paths. The next four sections expand these boundaries so their details remain readable beside the slide.
