# Implementation: a versioned source contract

## On screen

## Implementation: a versioned source contract

Translate source ownership, business meaning and acceptance criteria into a versioned contract.

- **Identity** — Meter + UTC interval time; corrections use source version, not arrival time.
- **Measurement** — This sample is interval energy, not a cumulative register or instantaneous power.
- **Objectives** — One hour / two minutes are design targets. Measure agreed start and consumer-visible end boundaries.
- **Acceptance** — 0.0001 is 0.01%; the zero-baseline absolute tolerance is a proposed teaching value.

**Implementation scope:** A contract records targets and rules; it does not prove they have been met.

## Narration

The example contract makes the requirements testable. It names an owner, the business key, interval measurement semantics and the correction ordering rule. Freshness numbers are targets from the case-study design, not measured results. Define where the clock starts and which accepted output ends it. Relative variance is stored as a fraction: one ten-thousandth is one hundredth of a percent. The absolute tolerance for a zero source total is a proposed teaching value that needs business approval. Source-system inventory, operational priorities and release tests can all refer to this versioned contract.
