# CDC recovery and safe replay

## On screen

## CDC recovery and safe replay

Recover from interruptions without skipping changes, applying them twice or resurrecting deleted records.

- **Progress markers** — Track source log position, DMS task progress, landed files and processing commit separately.
- **Restart boundary** — Resume only from proven durable output; make a crash after commit but before progress update safe to retry.
- **Change application** — Use business key, source sequence and explicit delete handling in Silver.
- **Missing history** — If logs expired, perform a controlled resnapshot and reconcile the rebuilt population.

**Ingestion contract:** Advance processing progress only after durable, reconcilable output.

## Narration

There are multiple progress markers: the source log position, DMS task progress, landed files and the processing job commit. Treating them as one watermark loses information. A processing crash after output but before state update must be safe to retry, while advancing state before durable output risks data loss. Keep arrival identities and source sequences, reconcile the resumed interval and apply deletes explicitly in Silver. If source logs have expired, define a controlled resnapshot and reconciliation procedure instead of pretending a checkpoint can reconstruct missing source history.
