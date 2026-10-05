# Audit and lineage

## On screen

## Audit and lineage

Explain who accessed a dataset and how each historical output was produced.

- **Access evidence** — Configure CloudTrail events and required S3 data-event coverage.
- **Transformation lineage** — Connect object IDs, contract version, job version and table snapshot.
- **Published versions** — Retain warehouse run, acceptance decision and report revision.
- **Retention and retrieval** — Protect the archive; prove historical evidence can be retrieved.

**Operating contract:** Case-study seven-year access-log retention requires configured coverage, protected storage and retrieval tests.

## Narration

The guide states seven-year access-log retention as a case-study requirement. CloudTrail retention and S3 data-event coverage require configuration; a short event-history view is not a seven-year archive. Pair access evidence with transformation lineage: input object IDs, contract version, job version, table snapshot and warehouse run. Retain logs in the required protected storage and validate retrieval. The resulting evidence answers both who accessed a dataset and why a historical report contained a particular value.
