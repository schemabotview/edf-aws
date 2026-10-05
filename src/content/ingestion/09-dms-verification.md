# DMS verification before release

## On screen

## DMS verification before release

Verify the capture boundary before promoting data.

- **Connectivity and load** — Test both endpoints; inspect task logs and table statistics for errors and incomplete loads.
- **Change probe** — Insert, update and delete a synthetic keyed row; inspect landed operations and the reconciled Silver state.
- **Lag and evidence** — Monitor `CDCLatencySource` / `CDCLatencyTarget`, source WAL retention and S3 delivery; save source cut-off and manifests.
- **Recovery rehearsal** — Interrupt and resume in a test environment; prove duplicate handling and completeness before publishing.

**Release gate:** A running DMS task and a populated S3 folder do not prove reconciled output.

## Narration

Verification starts with endpoint connectivity and task table statistics. Then a controlled synthetic insert, update and delete exercise the entire change contract. Check the raw operation records, accepted Bronze evidence and final Silver state for the same key. Monitor source and target CDC latency together with retained WAL and arrival evidence. A task can be running while a table is suspended or a downstream consumer is stale. Rehearse interruption and resume in a test environment, reconciling counts and keys and confirming that duplicates do not change the final result. Save the manifest and cut-off used for acceptance. The following recovery section explains what happens when the required source logs are no longer available.
