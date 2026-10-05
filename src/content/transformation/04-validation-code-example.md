# Implementation: schema and reason-coded validation

## On screen

## Implementation: schema and reason-coded validation

Check declared fields before splitting accepted rows from reason-coded exceptions.

- **Schema gate** — Required types must match; approval of additive fields and changed meaning remains a contract decision.
- **Row checks** — Missing identity / unit and unparseable measurements receive explicit reasons.
- **Extend rules** — Validate event time, finite values, measurement-specific ranges and effective reference joins.
- **Evidence** — Persist rejected rows with provenance and assert bounded input accounting before promotion.

**Implementation scope:** This is a minimal Spark fragment, not a complete quality suite; accepted rows still need the remaining checks.

## Narration

The first check inspects required column types before running row-level expressions. It intentionally fails on a missing required column or incompatible type. Additive fields still need a declared compatibility policy. The row split uses a reason expression so failed rows retain an explanation rather than disappearing in a filter. Null units need their own branch because SQL null logic can otherwise miss them. This small example does not cover every rule: event time, non-finite numbers, measurement-specific ranges and effective reference joins remain necessary. Persist both partitions with arrival and run identities, then reconcile the counts to the bounded input set.
