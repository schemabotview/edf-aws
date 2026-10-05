# Source systems

## On screen

## Source systems

A dozen heterogeneous systems supply different data shapes, update patterns and business identities.

- **Smart metering** — Meter readings and consumption; preserve meter identity, reading timestamp, unit and correction sequence.
- **Generation and grid** — Asset telemetry, plant performance and grid events from event publishers or supported extracts.
- **Trading and billing** — Market data, trades, customer details and payments; capture supported database changes.
- **Reference data** — Tariffs, asset registries and external feeds; retain the version valid at event time.

**Source contract:** Record the owner, keys, schema, delivery schedule and change mechanism before selecting ingestion.

## Narration

Inventory source systems before choosing connectors. Smart meter contracts identify the meter, event time, measurement meaning and unit. Corrected readings retain source sequence or version so later arrivals can be resolved deterministically. Generation and grid feeds may publish events or deliver files. Trading, billing and customer records may use supported database change capture. Tariffs and asset reference history must resolve the version effective at the reading time. Record source ownership, schedules, schemas and stable keys. DMS does not replace every file adapter, and Kafka ordering does not replace a business identity contract.
