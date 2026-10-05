# Schema compatibility

## On screen

## Schema compatibility

Check the Bronze arrival contract before allowing a source change into Silver.

- **Expected contract** — Compare declared fields, types and units with catalog expectations.
- **Compatible change** — Approve additive fields under a versioned contract.
- **Breaking change** — Hold dropped fields, incompatible types or changed units.
- **Controlled evolution** — Record the decision; update metadata through supported table APIs.

**Transformation contract:** Compatibility includes business meaning, not just matching column types.

## Narration

The schema gate follows Bronze acceptance and precedes Silver transformation. EventBridge and Lambda can trigger the comparison, but object notifications do not establish that an entire batch is complete; the orchestrated run also checks the manifest. An additive field may be accepted under a versioned contract. A dropped field, incompatible type or changed unit needs explicit handling. Update catalog and Iceberg schema through supported APIs for the chosen engine instead of assuming every writer accepts the same mergeSchema option. Hold incompatible arrivals in quarantine and promote compatible changes only with contract evidence.
