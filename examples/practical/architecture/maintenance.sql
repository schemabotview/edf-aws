-- Iceberg Spark procedures; approved cut-off only.
CALL glue_catalog.system.rewrite_data_files(
  table => 'silver.meter_readings');

CALL glue_catalog.system.expire_snapshots(
  table => 'silver.meter_readings',
  older_than => TIMESTAMP '2026-07-01 00:00:00',
  retain_last => 10);

-- Raw archive policy is in raw-lifecycle.json.
-- Scope: raw/ only; transition after 90 days.
-- Never lifecycle-delete active Iceberg files.
-- Verify readers, replay window and audit holds
-- before approving snapshot expiration.
