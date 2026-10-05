# Illustrative DMS batch configuration

PostgreSQL to raw S3 CSV. This is a proposed teaching profile, not EDF production configuration. JSON files are settings fragments with placeholders, not deployable infrastructure. No AWS resource was created.

Create the replication task with MigrationType `full-load-and-cdc`, plus task-settings.json and table-mappings.json. Source and target endpoints, replication compute, network routes and IAM/KMS permissions must already be configured. Replace the example table mapping with the actual allowlist.

For self-managed PostgreSQL enable `wal_level=logical`, provision replication slots and WAL senders for the task count, and follow the documented permission requirements. RDS uses `rds.logical_replication=1` with the required reboot. Validate primary/replica identity for update/delete capture and monitor retained WAL and CDC lag. Engine/version requirements differ.

The S3 endpoint preserves transaction-ordered CDC using CSV and a dedicated CdcPath. Keep DatePartitionEnabled, AddColumnName and GlueCatalogGeneration disabled for this profile. BatchApplyEnabled is false: S3 targets do not support batch apply. Eight full-load subtasks and 60-second CDC rotation are starting values to tune; neither proves the project SLA. TargetTablePrepMode DO_NOTHING makes restart/reload duplicate handling an explicit downstream responsibility. Do not share target locations across overlapping tasks.

Verify full load under concurrent writes, then insert/update/delete capture, reconnect and replay. Count accepted/rejected arrivals and reconcile committed output before advancing processing progress. The sink writes raw files; it does not commit Bronze Iceberg.

References: [PostgreSQL source](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.PostgreSQL.html), [S3 target](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.S3.html), [full-load settings](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Tasks.CustomizingTasks.TaskSettings.FullLoad.html). Checked 2026-10-05.
