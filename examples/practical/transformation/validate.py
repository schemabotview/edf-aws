# Excerpt: inspect a parsed, bounded input DataFrame.
from pyspark.sql import functions as F
expected = {"meter_id": "string", "unit": "string",
            "raw_value": "string"}
actual = dict(df.dtypes)
if any(actual.get(k) != v for k, v in expected.items()):
    raise ValueError("Hold source: incompatible schema")

reason = (F.when(F.col("meter_id").isNull(), "MISSING_KEY")
    .when(F.col("unit").isNull(), "MISSING_UNIT")
    .when(~F.col("unit").isin("Wh", "kWh"), "BAD_UNIT")
    .when(F.expr("try_cast(raw_value AS DOUBLE)").isNull(),
          "BAD_VALUE"))
checked = df.withColumn("reject_reason", reason)
accepted = checked.filter("reject_reason IS NULL")
rejected = checked.filter("reject_reason IS NOT NULL")
# Persist reason, arrival_id, run_id and contract version.
# Assert input count == accepted count + rejected count.
