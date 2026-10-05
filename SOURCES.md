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

## DMS implementation walkthrough

Checked 2026-10-06 against official AWS documentation. PostgreSQL settings are illustrative, not source-confirmed EDF configuration. Code scenes use configuration fragments rather than fabricated console screenshots.

- [DMS components](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.Components.html): endpoints, replication compute and tasks.
- [PostgreSQL source](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.PostgreSQL.html): logical replication and source readiness.
- [Full-load task settings](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Tasks.CustomizingTasks.TaskSettings.FullLoad.html): parallelism and cached-change stop flags.
- [CreateReplicationTask](https://docs.aws.amazon.com/dms/latest/APIReference/API_CreateReplicationTask.html): migration mode is a request parameter, separate from task-settings JSON.
- [S3 target](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.S3.html): transaction-preserving CSV, incompatible options and replay caveats.

## Practical companion sections

Reviewed 2026-10-06. The examples are proposed teaching implementations, not claims about EDF production configuration. Existing conceptual diagrams remain unchanged. Source contracts, manifests, exception ledgers, delivery states and recovery plans are explicitly project schemas rather than AWS API payloads. The coverage mapping is `examples/practical/coverage.json`.

- [Glue Iceberg configuration](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-iceberg.html): runtime framework, catalog configuration and version compatibility.
- [Iceberg Spark writes](https://iceberg.apache.org/docs/latest/spark-writes/): supported table writes and MERGE prerequisites.
- [Iceberg Spark procedures](https://iceberg.apache.org/docs/latest/spark-procedures/): compaction and snapshot expiration.
- [S3 lifecycle transitions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html): raw-object archive scope and transition considerations.
- [DMS task resume](https://docs.aws.amazon.com/cli/latest/reference/dms/start-replication-task.html): previously executed tasks and resume versus reload.
- [Confluent S3 plugin configuration](https://docs.confluent.io/kafka-connectors/s3-sink/current/configuration_options.html): selected MSK Connect plugin format, rotation, tagging and encryption options.
- [Spark Kafka integration](https://spark.apache.org/docs/latest/streaming/structured-streaming-kafka-integration.html): streaming source options and checkpoint offset precedence.
- [Spark Structured Streaming](https://spark.apache.org/docs/latest/streaming/apis-on-dataframes-and-datasets.html): event time, update output, foreachBatch and recovery boundaries.
- [Redshift COPY from S3](https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-data-source-s3.html): file and manifest-based staging transport.
- [dbt data test properties](https://docs.getdbt.com/reference/resource-properties/data-tests): uniqueness and relationship tests with runtime-version-sensitive syntax.
- [dbt snapshots](https://docs.getdbt.com/docs/build/snapshots): historical-change modeling; the sample query assumes an existing SCD2 dimension.
- [Athena version travel](https://docs.aws.amazon.com/athena/latest/ug/querying-iceberg-time-travel-and-version-travel-queries.html): retained Iceberg snapshot queries.
- [DynamoDB conditions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ConditionExpressions.html) and [key queries](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.KeyConditionExpressions.html): scoped writes and latest-reading queries.
- [Airflow Glue operators](https://airflow.apache.org/docs/apache-airflow-providers-amazon/stable/operators/glue.html): existing-job orchestration; verify compatibility with the chosen MWAA Airflow/provider versions.
- [CloudWatch custom metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html) and [alarm CLI](https://docs.aws.amazon.com/cli/latest/reference/cloudwatch/put-metric-alarm.html): custom freshness observations and alarm evaluation.
- [IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_resource.html): object versus bucket resource scope.
- [CloudTrail data events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html): explicit S3 object access coverage.
- [Terraform S3 backend](https://developer.hashicorp.com/terraform/language/backend/s3): environment state, versioning and lockfile configuration.
- [GitHub OIDC for AWS](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws): scoped deployment identities; the sample CI workflow is inactive and performs local checks only.

Local verification executes the decimal release function and portable SELECT queries on synthetic SQLite fixtures, and checks reference replay invariants. It parses JSON, Avro, YAML and Python and checks shell syntax. It does not execute Spark MERGE, cloud APIs, Terraform plans, actual regulator delivery or runtime adapters.
