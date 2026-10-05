-- Changes ranked by key and trusted source order.
-- winner_changes contains ONE row per business key.
MERGE INTO glue_catalog.silver.meter_state t
USING winner_changes s
ON t.meter_id = s.meter_id
AND t.event_time = s.event_time
WHEN MATCHED AND s.source_version > t.source_version
THEN UPDATE SET
  interval_kwh = s.interval_kwh,
  source_version = s.source_version,
  is_deleted = (s.op = 'D')
WHEN NOT MATCHED THEN INSERT (
  meter_id, event_time, interval_kwh,
  source_version, is_deleted
) VALUES (s.meter_id, s.event_time, s.interval_kwh,
          s.source_version, s.op = 'D');
-- Serving view filters is_deleted = false.
