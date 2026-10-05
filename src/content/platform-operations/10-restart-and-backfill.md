# Prove restart and replay converge

## On screen

## Prove restart and replay converge

- **Injected interruption** — Stop processing around a commit boundary.
- **Safe restart** — Restore progress; reapply deterministic writes.
- **Acceptance evidence** — Same keys and totals; no stale hot-path overwrite.

**Decision:** A recovery claim is demonstrated by equivalent accepted results after interruption.

## Narration

The final exercise compares an uninterrupted run with a run interrupted near a commit boundary. Use the same synthetic input, code and contracts, then compare accepted business keys, values, counts and totals after recovery. Test a historical backfill separately and confirm that it cannot overwrite a newer operational reading. This repository supplies the teaching scenario and expected assertions, not a production fault-injection environment. The full architecture is complete only when its recovery claims can be supported by repeatable integration evidence. MWAA retries repeat a bounded run safely. Backfills declare source intervals and input versions, rebuild held results, reconcile them and promote only after acceptance. Trace the synthetic reading through its preserved meter and timestamp identity.
