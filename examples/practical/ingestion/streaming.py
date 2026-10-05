# Excerpt: spark, decode_meter_events and the sink
# adapter are supplied by the configured runtime.
from pyspark.sql import functions as F
raw = (spark.readStream.format("kafka")
    .option("kafka.bootstrap.servers", brokers)
    .option("subscribe", "meter.raw")
    .option("startingOffsets", "earliest")
    .load())
events = decode_meter_events(raw)  # retain offsets

summary = (events.withWatermark("event_time", "10 minutes")
    .groupBy(F.window("event_time", "1 minute"), "meter_id")
    .agg(F.sum("interval_kwh").alias("kwh")))

query = (summary.writeStream.outputMode("update")
    .option("checkpointLocation", checkpoint_path)
    .trigger(processingTime="30 seconds")
    .foreachBatch(write_dynamodb_idempotently)
    .start())
