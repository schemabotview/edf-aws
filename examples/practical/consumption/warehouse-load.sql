-- Export pinned Gold to COPY-compatible files first.
-- Use an immutable, run-specific S3 manifest.
BEGIN;
DELETE FROM staging.meter_period
WHERE run_id = 'EXAMPLE_RUN';
COPY staging.meter_period
FROM 's3://REPLACE_EXPORT/run/manifest.json'
IAM_ROLE 'REPLACE_COPY_ROLE_ARN'
MANIFEST FORMAT AS CSV IGNOREHEADER 1;
COMMIT;

-- Verify exact run_id, counts and kWh totals.
-- Build only this accepted run with dbt:
-- dbt build --select +fact_meter_period
--          --vars '{run_id: EXAMPLE_RUN}'
