# Recover without skipping or duplicating changes

## On screen

## Recover without skipping or duplicating changes

- **Durable progress** — Source position, file manifest and committed run.
- **Restart boundary** — Resume only from proven durable output.
- **Silver merge** — Apply business key, sequence and delete semantics.

**Decision:** Advance processing state only after durable, reconcilable output.

## Narration

There are multiple progress markers: the source log position, DMS task progress, landed files and the processing job commit. Treating them as one watermark loses information. A processing crash after output but before state update must be safe to retry, while advancing state before durable output risks data loss. Keep arrival identities and source sequences, reconcile the resumed interval and apply deletes explicitly in Silver. If source logs have expired, define a controlled resnapshot and reconciliation procedure instead of pretending a checkpoint can reconstruct missing source history.
