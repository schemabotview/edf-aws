-- Athena engine v3; substitute accepted snapshot ID.
SELECT meter_id, period_id, consumption_kwh
FROM gold.meter_period
FOR VERSION AS OF 123456789012345678
WHERE period_id = 'EXAMPLE_PERIOD';

-- Inspect snapshots before pinning a version.
SELECT snapshot_id, committed_at, operation
FROM "gold"."meter_period$snapshots"
ORDER BY committed_at DESC;

-- Published report records the snapshot and run ID.
-- Authorise the role and workgroup output location.
-- Exclude PII or use approved governed views.
