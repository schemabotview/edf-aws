-- Illustrative PostgreSQL inspection
SHOW wal_level;
SHOW max_replication_slots;
SHOW max_wal_senders;

SELECT slot_name, active,
       restart_lsn, confirmed_flush_lsn
FROM pg_replication_slots;

-- Confirm table keys / replica identity.
-- Check grants and retained WAL.
-- RDS: rds.logical_replication = 1
-- Apply required parameter-group reboot.
