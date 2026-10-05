# Regulatory reporting

## On screen

## Regulatory reporting

Submit only a reconciled reporting version through a specified, auditable delivery workflow.

- **Accepted reporting version** — Pin reconciled Gold and the release decision.
- **Format and validate** — MWAA task builds a versioned payload against the real specification.
- **Delivery receipt** — Persist payload identity, response and delivery state.
- **Retry and corrections** — Check prior acceptance; retain revision history and idempotency evidence.

**Consumption contract:** Accepted data and acknowledged delivery are separate milestones; verify actual submission requirements.

## Narration

The guide uses a dedicated Airflow task to format and submit regulatory output after reconciliation. This learning repo does not transmit to a regulator; it models the gate and evidence. A production task needs the actual submission specification, transport, receipt handling and an idempotency strategy. Persist the exact payload version and acceptance response. If delivery fails after the recipient accepted it, a blind retry could duplicate a submission, so recovery must check the recorded delivery state.
