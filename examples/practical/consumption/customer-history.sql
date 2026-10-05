-- Redshift SQL; existing dimension version history.
SELECT f.meter_id, f.period_id, d.customer_sk,
       f.consumption_kwh
FROM staging.meter_period f
LEFT JOIN dim_customer d
  ON f.customer_id = d.customer_id
 AND f.period_start >= d.valid_from
 AND (f.period_start < d.valid_to OR d.valid_to IS NULL);

-- Overlap check: this query must return zero rows.
SELECT a.customer_id
FROM dim_customer a JOIN dim_customer b
 ON a.customer_id = b.customer_id
AND a.customer_sk < b.customer_sk
AND a.valid_from < COALESCE(b.valid_to, '9999-12-31')
AND b.valid_from < COALESCE(a.valid_to, '9999-12-31');
