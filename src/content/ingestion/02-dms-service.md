# AWS DMS in brief

## On screen

## AWS DMS in brief

DMS is a general replication service. It moves data between a **source endpoint** and a **target endpoint** — same engine on both sides, or two different engines.

- **Many sources** — Oracle, SQL Server, MySQL/MariaDB, PostgreSQL, Db2, SAP ASE, MongoDB; self-managed, on RDS/Aurora, on another cloud, or Amazon S3.
- **Many targets** — those engines again, plus S3, Redshift, DynamoDB, OpenSearch, Neptune, Kinesis and Kafka/MSK.
- **Two limits** — one endpoint must be on an AWS service, and supported pairs are a matrix, not every combination.
- **Migration type** — full load, CDC only, or full load + CDC, chosen per task.

**Scope:** EDF uses one corner of that matrix — an illustrative PostgreSQL → S3 task. DMS writes raw files; a separate job commits Bronze Iceberg.

## Narration

It helps to see DMS as a general replication service before narrowing to our use of it. DMS moves data between two endpoints, a source and a target. Those endpoints can run the same database engine, which is a homogeneous migration, or two different engines, which is a heterogeneous one. On the source side DMS reads Oracle, SQL Server, MySQL, MariaDB, PostgreSQL, Db2, SAP ASE and MongoDB, whether the database is self-managed, running on RDS or Aurora, or hosted on another cloud, and it can also read from Amazon S3. On the target side it writes to those same engines and, more interestingly for a data platform, to Amazon S3, Redshift, DynamoDB, OpenSearch, Neptune, Kinesis Data Streams and Kafka. Two limits are worth remembering. One endpoint must be on an AWS service, so DMS will not move data between two on-premises databases. And the supported combinations are a published matrix rather than every pairing, so a source and target must be checked together. Each task also picks a migration type: full load, change capture only, or full load followed by change capture. Our project uses one corner of all that, a PostgreSQL source and an S3 target, and DMS stops at raw files. Reconciliation and the Iceberg commit stay with downstream processing.
