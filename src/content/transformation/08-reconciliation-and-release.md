# Reconcile before publishing

## On screen

## Reconcile before publishing

- **Gold totals** — Aggregate accepted data for an agreed scope.
- **Source billing totals** — Match period, population and unit.
- **Publish or hold** — Variance above 0.01% blocks submission.

**Decision:** Publication is a decision over a reconciled version, not a job exit code.

## Narration

Reconciliation compares Gold consumption with the source billing control total for the same scope. Express the percentage variance relative to a documented baseline, and define a separate absolute-tolerance rule for a zero source total. The case-study gate blocks Ofgem submission when variance exceeds 0.01 percent. Preserve the input snapshots and reject counts with the decision. Late data may require a corrected reporting version; do not silently replace a previously submitted regulatory result without a revision record. A failed publication gate preserves the last trustworthy output and links every held result to a reason and an owner.
