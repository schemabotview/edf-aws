# Treat submission as an auditable workflow

## On screen

## Treat submission as an auditable workflow

- **Accepted Gold** — Pin the reconciled reporting version.
- **MWAA submission task** — Format, validate and record the payload.
- **Delivery receipt** — Track acceptance, retries and correction history.

**Decision:** Reconciled data and acknowledged delivery are separate milestones.

## Narration

The guide uses a dedicated Airflow task to format and submit regulatory output after reconciliation. This learning repo does not transmit to a regulator; it models the gate and evidence. A production task needs the actual submission specification, transport, receipt handling and an idempotency strategy. Persist the exact payload version and acceptance response. If delivery fails after the recipient accepted it, a blind retry could duplicate a submission, so recovery must check the recorded delivery state.
