# Restart, replay and backfill

## On screen

## Restart, replay and backfill

Prove recovery converges to equivalent accepted output without overwriting newer operational data.

- **Controlled interruption** — Compare normal processing with failure near the commit boundary.
- **Safe restart** — Use the same inputs and contracts; restore progress and repeat writes safely.
- **Bounded backfill** — Declare interval and versions; avoid stale hot-path overwrites.
- **Recovery acceptance** — Compare business keys, values, counts and totals before promotion.

**Operating contract:** This is a teaching scenario; production recovery needs repeatable integration evidence.

## Narration

The final exercise compares an uninterrupted run with a run interrupted near a commit boundary. Use the same synthetic input, code and contracts, then compare accepted business keys, values, counts and totals after recovery. Test a historical backfill separately and confirm that it cannot overwrite a newer operational reading. This repository supplies the teaching scenario and expected assertions, not a production fault-injection environment. The full architecture is complete only when its recovery claims can be supported by repeatable integration evidence. MWAA retries repeat a bounded run safely. Backfills declare source intervals and input versions, rebuild held results, reconcile them and promote only after acceptance. Trace the synthetic reading through its preserved meter and timestamp identity.
