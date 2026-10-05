# Implementation: reporting delivery evidence

## On screen

## Implementation: reporting delivery evidence

Separate reconciled data, prepared payload, attempted transport and acknowledged delivery.

- **Prepare** — Validate the real specification and persist immutable payload identity before transport.
- **Send** — Record attempts and correlation IDs; use receiver-supported idempotency when available.
- **Ambiguous result** — A timeout after sending needs receipt / status lookup before retry; local state alone cannot prevent remote duplicates.
- **Correction** — Create a new revision linked to the prior report; retain payload, response and decision history.

**Implementation scope:** This is a proposed project ledger, not an Ofgem request format or a live submission integration.

## Narration

The ledger records a prepared payload derived from an accepted reporting run. It distinguishes data acceptance from remote delivery acknowledgment. The payload hash and format version identify exactly what was prepared. A timeout after a request was sent creates an ambiguous result: the receiver may already have accepted it. Query receipt or submission status where the real transport supports that, and use its idempotency contract. A local ledger alone cannot provide exactly-once remote submission. Corrections should create linked revisions, keeping both payloads and receipts. Actual regulator fields, transport and acknowledgment requirements need project-specific verification.
