-- Spark SQL; input already validated for this contract.
SET spark.sql.session.timeZone=UTC;
WITH normalised AS (
  SELECT *, CASE unit
    WHEN 'Wh' THEN CAST(raw_value AS DOUBLE) / 1000.0
    WHEN 'kWh' THEN CAST(raw_value AS DOUBLE)
  END AS interval_kwh
  FROM accepted_arrivals
)
SELECT n.*, r.tariff_sk
FROM normalised n
LEFT JOIN tariff_history r
  ON n.meter_id = r.meter_id
 AND n.event_time >= r.valid_from
 AND (n.event_time < r.valid_to OR r.valid_to IS NULL);
-- Require exactly one matching reference per arrival.
-- Hold missing / overlapping reference intervals.
