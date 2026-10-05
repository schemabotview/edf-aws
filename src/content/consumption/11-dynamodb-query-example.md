# Implementation: version-safe writes and latest reads

## On screen

## Implementation: version-safe writes and latest reads

Use conditional per-reading writes and a key-based descending Query for operational access.

- **Key** — Use meter_id + a canonical fixed-width UTC reading_timestamp; source_version orders corrections at the same timestamp.
- **Retry** — Older writes are held; equal-version payload conflicts must be inspected rather than silently overwritten.
- **Latest** — Base-table strongly consistent Query returns the newest sort key; expose missing and stale readings to operators.
- **Retention** — Set an epoch-seconds TTL attribute for the 90-day policy; filter expired records in the application because deletion is asynchronous.

**Implementation scope:** This protects per-reading history. A separate latest-item design needs its own event-time plus correction condition.

## Narration

The write condition prevents an older correction from replacing a newer version of the same meter and timestamp. Equal-version collisions need investigation: an identical retry and a conflicting payload are not the same case. The Query uses the meter partition key and descending timestamp order, avoiding a table scan. Fixed-width canonical UTC timestamps make string sort order meaningful. Strong consistency is available on the base table, not global secondary indexes. An empty or stale result must be visible to the operator. TTL uses epoch seconds and asynchronous deletion, so expired data needs application handling. A separate latest-pointer item would require an additional event-time and revision condition.
