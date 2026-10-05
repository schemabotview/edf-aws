# Monitoring and alerting

## On screen

## Monitoring and alerting

Measure whether consumers can use current accepted data, alongside infrastructure health.

- **Source freshness** — Expected cut-off, missing feeds and connector lag.
- **Processing health** — Backlog age, retries, DLQ volume and reconciliation variance.
- **Consumer freshness** — Latest accepted period or visible event timestamp.
- **Actionable alerts** — Budget transport / processing / serving delay; route with ownership.

**Operating contract:** Every alert names an affected output, an owner and a first recovery action.

## Narration

A platform can have healthy compute and stale data. Measure source arrival age, connector lag, processing lag and consumer-visible freshness separately. Add metrics for quarantined sources, DLQ volume and reconciliation variance. Infrastructure logs and metrics can be collected through the configured monitoring stack, but the key dashboard question is whether a consumer can use current, accepted data. Record the measurement timestamp and source of each metric so a delayed monitor is not mistaken for a healthy pipeline. Split the two-minute objective across transport, processing and serving. Alerts name the affected output, its owner and the first recovery action.
