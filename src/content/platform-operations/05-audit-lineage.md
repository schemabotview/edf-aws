# Retain evidence of access and transformation

## On screen

## Retain evidence of access and transformation

- **Access history** — CloudTrail with required events and retention enabled.
- **Data lineage** — Source manifest through table and warehouse versions.
- **Audit answer** — Who accessed which version and how it was produced.

**Decision:** Auditability needs configured event coverage, durable retention and retrievable lineage.

## Narration

The guide states seven-year access-log retention as a case-study requirement. CloudTrail retention and S3 data-event coverage require configuration; a short event-history view is not a seven-year archive. Pair access evidence with transformation lineage: input object IDs, contract version, job version, table snapshot and warehouse run. Retain logs in the required protected storage and validate retrieval. The resulting evidence answers both who accessed a dataset and why a historical report contained a particular value.
