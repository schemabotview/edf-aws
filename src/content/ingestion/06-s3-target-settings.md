# S3 target: ordered CDC landing

## On screen

## S3 target: ordered CDC landing

Use a consistent transaction-preserving CSV profile.

- **CDC layout** — `PreserveTransactions=true` requires `CdcPath`; ordered CDC output uses CSV.
- **Compatibility** — Disable date partitioning, column-name headers and Glue catalog generation for this profile.
- **Delivery interval** — `CdcMaxBatchInterval=60` sets a flush threshold; file size also affects delivery. It is not an end-to-end freshness guarantee.
- **Access** — Same-region bucket, DMS service role, scoped S3 permissions and KMS key access; replace all placeholders.

**Boundary:** Operation-aware raw files are inputs to Bronze acceptance, not current-state tables or Iceberg commits.

## Narration

The S3 endpoint profile preserves transaction ordering in CDC files. It needs a CDC path and writes those ordered changes as CSV. Date partitioning, column-name headers and Glue catalog generation are disabled because they conflict with this profile. Full-load operation markers make the initial records explicit inserts. The sixty-second interval is one flush threshold; file size, source lag and downstream scheduling also affect freshness. The replication instance and target bucket must be in the same AWS region. Validate the service role trust, bucket access and KMS permissions using the real environment identifiers. Keep schema interpretation in the input contract because this CSV profile has no column-name header.
