# Implementation: publish and alarm on consumer freshness

## On screen

## Implementation: publish and alarm on consumer freshness

Alert on consumer-visible age as well as task and infrastructure status.

- **Observer** — Compute age from the agreed completeness / event boundary; publish a metric every minute, including when traffic stops.
- **Alarm** — Two 60-second periods above 120 seconds breach; missing observations breach too.
- **Detection budget** — Evaluation and notification add delay; this alarm is not a guarantee of the two-minute freshness target.
- **Ownership** — SNS routing needs a real recipient, affected output and runbook; add lag, DLQ, variance and cost metrics.

**Implementation scope:** The custom metric is proposed. Unit, namespace and dimensions must match exactly between publisher and alarm.

## Narration

An independent observer measures the age of consumer-visible accepted data and emits it every minute. If the stream has no new messages, the observer must still publish increasing age or a completeness failure. The alarm uses the same namespace, metric name and dimensions. Missing observations breach rather than silently appearing healthy. Two evaluation periods and notification delivery add detection time, so the alarm is not an end-to-end freshness guarantee. Route the SNS action to an owned incident path. Pair this symptom metric with source lag, task health, rejected records and reconciliation variance so operators can identify the failed boundary.
