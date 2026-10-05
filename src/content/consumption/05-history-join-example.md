# Implementation: event-time dimension assignment

## On screen

## Implementation: event-time dimension assignment

Resolve facts to historical dimension versions and detect overlapping effective intervals.

- **History construction** — Close the prior row and insert a new surrogate-key version in a controlled transaction or validated snapshot process.
- **Time choice** — This sample assigns period_start. Split facts if a dimension change inside the period must affect attribution.
- **No silent loss** — Left joins reveal missing versions; choose a governed unknown member or hold the fact.
- **Tests** — Require one match per fact, unique surrogate keys, non-overlapping intervals and preserved totals.

**Implementation scope:** The excerpt reads existing SCD2 history; it does not claim to implement the full change-capture or history-write transaction.

## Narration

The first query assigns a customer version using a half-open effective interval. Period-start attribution is an explicit sample decision; it may need a finer fact grain if a tariff changes within the period. A current-row flag cannot preserve this historical meaning. The second query detects overlapping intervals for the same customer. It must return no rows before the join can be trusted. Missing matches remain visible through a left join, while duplicate matches must block publication. The history-building process needs controlled surrogate-key creation, interval closure and late-correction rules. Preserve counts and energy totals across dimension assignment.
