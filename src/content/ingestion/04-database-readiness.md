# Source database: PostgreSQL readiness

## On screen

## Source database: PostgreSQL readiness

Prepare the database before starting full load + CDC.

- **Logical replication** — For self-managed PostgreSQL, configure `wal_level=logical`; size replication slots and WAL senders for the planned tasks.
- **Managed source** — RDS uses `rds.logical_replication=1`; apply the parameter change and required reboot.
- **Identity and access** — Confirm primary keys / replica identity, supported version, replication access and schema / table read grants.
- **Retention** — Monitor retained WAL and slot lag; a stalled consumer can exhaust source storage.

**Example:** The SQL scene inspects readiness; it does not change the database.

## Narration

This inspection query checks logical replication settings and existing slot health. Configuration changes are made through the appropriate PostgreSQL configuration or RDS parameter group, with a planned restart where required. Slots and WAL senders must cover the workload rather than copying arbitrary example values. Confirm access using the AWS instructions for the exact database version. Primary keys and replica identity matter for updates and deletes. Retained WAL is also an operational risk: an inactive replication slot can hold logs until storage fills. Test the source endpoint from the replication compute before starting a migration.
