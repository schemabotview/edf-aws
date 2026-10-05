# DMS task: full load + CDC settings

## On screen

## DMS task: full load + CDC settings

Keep migration mode, table selection and task settings explicit.

- **Mode** — Set API `MigrationType` to `full-load-and-cdc`; this is separate from task-settings JSON.
- **Selection** — Table mappings include only agreed schemas / tables, such as `public.meter_readings`.
- **Full load** — Eight parallel subtasks are an illustrative starting point; tune against source load and replication capacity.
- **Continuous capture** — Both stop flags stay false. S3 targets use `BatchApplyEnabled=false`.

**Replay:** `DO_NOTHING` can leave duplicate raw records after interrupted loads; downstream acceptance and change application must be idempotent.

## Narration

The scene shows the task-settings file, not a complete create-task request. Set full-load-and-cdc separately on the API request and supply source, target and replication instance identifiers plus table mappings. Eight parallel subtasks are a starting configuration, not a measured EDF tuning result. Both cached-change stop flags remain false for ongoing capture. Batch apply is disabled for the S3 target. DO_NOTHING avoids assuming a destructive target preparation operation, but an interrupted full load can leave duplicates. Preserve arrival evidence and enforce deterministic replay downstream. Enable task logging and investigate errors rather than treating a running task as proof of complete data.
