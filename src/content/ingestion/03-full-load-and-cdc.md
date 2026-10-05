# Batch ingestion: full load and CDC

## On screen

## Batch ingestion: full load and CDC

Bootstrap the agreed database tables, capture ongoing changes and accept bounded files into Bronze.

- **Capture and land** — A supported database feeds DMS full load + CDC, producing operation-aware raw S3 files.
- **Accept** — Validate a manifest of arrivals and commit accepted records through an Iceberg-capable job.
- **Record progress** — Advance downstream progress only after a successful commit; retain identities for replay.
- **Configure next** — Inspect source readiness, task settings and the S3 endpoint in the following code scenes.

**Contract:** Raw arrival, Bronze table visibility and deterministic Silver change application are separate boundaries.

## Narration

The first row captures database records and lands raw files. DMS bootstraps the selected tables while capturing changes, then continues replication. The second row turns a bounded set of arrivals into accepted Bronze data and records durable progress after the table commit. These are separate execution boundaries, so a running DMS task does not prove that Bronze or Silver is current. The next three sections show an illustrative PostgreSQL source check, task settings and transaction-preserving CSV endpoint profile. Together they make the implementation concrete without claiming that these are the actual EDF production settings.
