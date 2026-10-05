# Source and design record

## Project baseline

- User-supplied `Ganesh_Maddipoti_Interview_PrepGuide.docx`, Case Study 1: business problem, original pipeline, sample model, stated objectives and reported outcomes.
- `ui-flow/dev/fixtures/studies/edf-aws-codex.ts`: user-approved visual baseline, retained as `src/scenes/full-architecture.ts`.
- Session decisions: horizontal medallion; stacked batch and streaming panels; three cards per processing row; DMS database ingestion and Kafka/MSK Connect raw landing.

The guide is a private reference, not redistributed in this repository. Reported project outcomes are not independently verified or claimed as results of the learning app. Samples are synthetic and contain no real customer records.

## Technical references

Consulted 2026-10-05. These establish service behaviour; they do not establish how the real EDF estate is deployed.

- [AWS DMS S3 target](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.S3.html): full load and CDC produce object files; downstream processing must interpret change operations.
- [MSK Connect S3 sink example](https://docs.aws.amazon.com/msk/latest/developerguide/mkc-S3sink-connector-example.html): managed Kafka Connect runtime with a separately configured sink plugin.
- [Apache Iceberg evolution](https://iceberg.apache.org/docs/latest/evolution/): schema and partition evolution use table metadata and supported engine operations.
- [Apache Iceberg maintenance](https://iceberg.apache.org/docs/latest/maintenance/): snapshot expiration, compaction and orphan cleanup require table-aware maintenance.
- [Databricks checkpoints](https://docs.databricks.com/aws/en/structured-streaming/checkpoints): checkpoints retain query progress and state; compatibility matters during changes.
- [Databricks watermarks](https://docs.databricks.com/aws/en/structured-streaming/watermarks): event-time lateness and state management.
- [DynamoDB TTL](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html): expiration is asynchronous.
- [DynamoDB Query](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html): sort-key queries and descending order for latest-reading lookup.
- [CloudTrail event history](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html): event-history scope is different from long-term trail retention.
- [dbt data tests](https://docs.getdbt.com/docs/build/data-tests): model-level data assertions.

## Deliberate interpretation

Raw DMS and MSK Connect files land on S3; an explicit processing job commits Bronze Iceberg. The full poster groups ingestion and processing responsibilities, while detailed sections clarify their execution boundaries. MSK Connect and Spark are independent consumers. There is no claim of a single exactly-once transaction across Kafka, S3, Iceberg and DynamoDB.

The warehouse staging load adapter is an implementation boundary to choose and validate. Example COPY-compatible export is a proposed option, not a source-confirmed deployment. Ofgem formats, submission transport, permissions and compliance requirements need project-specific verification. No regulator delivery, AWS provisioning or live data connection occurs in this repo.
