-- Spark SQL; configured Glue Iceberg catalog.
CREATE NAMESPACE IF NOT EXISTS
  glue_catalog.bronze;

CREATE TABLE IF NOT EXISTS
  glue_catalog.bronze.meter_arrivals (
    arrival_id STRING, meter_id STRING,
    event_time TIMESTAMP, raw_value STRING,
    unit STRING, source_version BIGINT,
    source_object STRING, run_id STRING,
    ingested_at TIMESTAMP
  ) USING iceberg
  PARTITIONED BY (days(ingested_at))
  TBLPROPERTIES ('format-version' = '2');
