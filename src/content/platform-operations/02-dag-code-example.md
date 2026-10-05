# Implementation: orchestration with version handoff

## On screen

## Implementation: orchestration with version handoff

Trigger the bounded DAG with an accepted manifest, not an arbitrary raw-folder timestamp.

- **Version handoff** — dag_run.conf carries immutable manifest URI / run ID; jobs resolve input snapshots from the ledger.
- **Dependency** — Gold follows a successful Silver job that validates, commits and records its accepted snapshot.
- **Runtime** — Existing Glue jobs, AWS connection, IAM role and compatible MWAA / provider versions are required.
- **Retry policy** — This example uses fixed 10-minute delay; the case-study 10 / 20 / 40 policy needs separately configured bounded backoff.

**Implementation scope:** The excerpt covers Silver → Gold. Production adds cut-off sensing, timeouts, warehouse and publication gates.

## Narration

The DAG is manually or externally triggered with the accepted manifest and run identifier. It does not wait for an arbitrary S3 folder to become nonempty. Glue operators run existing configured jobs and wait for completion. Job success must mean the transformation validated its inputs, committed the output and recorded its version; otherwise a process dependency is not a data dependency. Gold resolves the accepted Silver snapshot through the run ledger. The example uses fixed ten-minute retries and therefore does not claim to implement the case-study exponential retry schedule. Add completion sensing, execution timeouts, warehouse and release gates in the configured environment.
