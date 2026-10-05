# Approve compatible change and isolate breakage

## On screen

## Approve compatible change and isolate breakage

- **Bronze schema** — Compare arrival contract with catalog expectations.
- **Compatible change** — Approve an additive field after contract checks.
- **Breaking change** — Quarantine source partition; flag and alert.

**Decision:** Schema compatibility includes meaning, not just matching column types.

## Narration

The schema gate follows Bronze acceptance and precedes Silver transformation. EventBridge and Lambda can trigger the comparison, but object notifications do not establish that an entire batch is complete; the orchestrated run also checks the manifest. An additive field may be accepted under a versioned contract. A dropped field, incompatible type or changed unit needs explicit handling. Update catalog and Iceberg schema through supported APIs for the chosen engine instead of assuming every writer accepts the same mergeSchema option. Hold incompatible arrivals in quarantine and promote compatible changes only with contract evidence.
