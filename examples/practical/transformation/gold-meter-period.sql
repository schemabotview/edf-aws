-- Calendar defines real settlement boundaries in UTC.
-- Includes DST and approved market-period rules.
SELECT s.meter_id, c.period_id,
       SUM(s.interval_kwh) AS consumption_kwh,
       COUNT(*) AS observed_intervals
FROM accepted_silver s
JOIN settlement_calendar c
  ON s.event_time >= c.start_utc
 AND s.event_time < c.end_utc
WHERE s.is_deleted = false
GROUP BY s.meter_id, c.period_id;

-- Compare observed vs expected interval coverage.
-- Do not use COUNT(*) as a completeness guarantee.
-- Utilisation = output_kwh / capacity_kwh,
-- with agreed capacity basis and zero exclusions.
