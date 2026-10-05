# Implementation: an Avro meter-event contract

## On screen

## Implementation: an Avro meter-event contract

Make event structure and measurement semantics explicit before producing records.

- **Kafka key** — Publish with meter_id as the key for per-meter partition ordering; ordering is local to a partition.
- **Semantics** — Epoch milliseconds in UTC, finite interval kWh and monotonic correction versions are business constraints.
- **Compatibility** — Register and test schema evolution with the selected registry and producer / consumer converters.
- **Capacity** — Topic creation and broker placement must validate the case-study 24 partitions / replication factor 3.

**Implementation scope:** Avro types validate structure. Negative values, duplicates, units and correction order still need business rules.

## Narration

The schema represents one synthetic interval reading. It deliberately names interval energy rather than a generic value whose unit is ambiguous. Event time is epoch milliseconds, while source version identifies corrections. Publish the meter identifier as the Kafka key when the required ordering is per meter. This does not create a global order across partitions. Schema registration and converter configuration depend on the chosen registry and plugin. Structural compatibility tests do not check whether a reading is finite, whether corrections are ordered, or whether a source changed measurement meaning. Keep those rules in the versioned source contract.
