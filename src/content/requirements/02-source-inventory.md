# Choose ingestion by source capability

## On screen

## Choose ingestion by source capability

- **Database sources** — Billing and transactional change logs.
- **File and reference feeds** — SCADA extracts, tariffs and asset registry.
- **Event publishers** — Meter and grid telemetry topics.

**Decision:** Connector choice follows the source contract and supported protocol.

## Narration

Create a source inventory before choosing a connector. For each source, record its owner, data contract, delivery schedule, stable key and available change mechanism. DMS applies to supported databases with the required logging and access; it is not a universal connector for SCADA files or every meter head-end system. File extracts and reference refreshes keep a Python or PySpark ingestion adapter where necessary. Event publishers provide Kafka records. A common landing envelope makes these different delivery mechanisms traceable without pretending they behave identically.
