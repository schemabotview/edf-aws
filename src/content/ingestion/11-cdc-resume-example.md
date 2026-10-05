# Implementation: inspect and resume DMS capture

## On screen

## Implementation: inspect and resume DMS capture

Inspect durable task and table evidence before choosing a recovery action.

- **Inspect** — Capture task status, recovery checkpoint, table errors and source-log availability.
- **Resume** — Use `resume-processing` only for a previously started resumable task; do not confuse it with reload-target.
- **Reconcile** — Compare landed files and committed Bronze progress, then replay the unaccepted manifest safely.
- **Missing history** — Hold promotion and rebuild from a controlled baseline if required logs expired.

**Implementation scope:** Commands are examples only. A recovery checkpoint is evidence to inspect, not permission to ignore source retention.

## Narration

The first commands inspect task-level progress and table statistics. Use the real task ARN from the target environment, and verify that the source still retains the required logs. Resuming a previously started task is different from starting a new full load or reloading the target. The task checkpoint does not prove that downstream Bronze has accepted all landed changes. Compare source continuity, object manifests and committed table evidence before replay. If the necessary history has expired, stop unsafe publication and reconcile a controlled resnapshot. No command in this walkthrough is executed against AWS.
