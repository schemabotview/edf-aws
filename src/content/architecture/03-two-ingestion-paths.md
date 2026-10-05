# Batch and streaming ingestion paths

## On screen

## Batch and streaming ingestion paths

Both routes preserve replayable arrivals before managed Bronze acceptance; the connector is not the table commit.

- **Batch route** — AWS DMS performs full load and CDC for supported databases, preserving source changes in raw S3 files.
- **Streaming route** — Kafka / MSK carries events; MSK Connect uses a configured sink plugin to land raw files on S3.
- **Bronze acceptance** — A separate job validates inputs, records provenance and commits an Iceberg table.
- **Operational hot path** — Databricks independently processes Kafka events for low-latency operational output.

**Architecture decision:** Raw object arrival and committed Bronze visibility are separate milestones; detailed execution belongs in Ingestion.

## Narration

The two columns explain the architectural entry routes. DMS bootstraps supported database records with a full load, then continues with captured changes. Kafka carries keyed event streams, and MSK Connect runs a separately configured S3 sink plugin. Both routes land raw files that retain source or event provenance. A processing job accepts bounded inputs and commits Bronze Iceberg metadata. File and reference sources still need their supported adapters. The independent Databricks consumer handles event-time enrichment and operational serving; MSK Connect does not execute Spark logic. Detailed ordering, retries and state recovery are covered in the Ingestion course.
