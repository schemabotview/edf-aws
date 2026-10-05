# SLAs

## On screen

## SLAs

Measure the service at the data consumer, with explicit start and end points for each target.

- **Batch ingestion** — Case-study objective: complete ingestion in **under one hour** from the agreed source cut-off to accepted Bronze data.
- **Operational freshness** — Case-study objective: make meter and grid events visible in **under two minutes** from event creation to consumer availability.
- **Reconciliation gate** — A variance **above 0.01%** blocks regulatory submission for the agreed population, period and units.
- **Measurement evidence** — Track missing feeds, processing delay and consumer freshness alongside job status.

**Service target:** Validate these objectives against representative volumes; a successful job alone does not prove an SLA was met.

## Narration

Service level objectives need an agreed clock and measurement point. Batch ingestion uses the source cut-off and accepted Bronze availability. Operational freshness starts at the event timestamp and ends when the consumer can see the result. The supplied case study sets targets below one hour and below two minutes, respectively, and a reconciliation threshold of zero point zero one percent. These are attributed objectives, not performance measured by this learning app. Track delays across transport, processing and serving. A healthy connector can coexist with stale consumer data, so measure the full critical route.
