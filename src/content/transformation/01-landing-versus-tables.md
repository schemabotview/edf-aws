# An S3 object is not a table commit

## On screen

## An S3 object is not a table commit

- **Raw landing** — DMS and connector files under isolated prefixes.
- **Bronze Iceberg** — Processing job commits tracked data files.
- **Catalog pointer** — Readers resolve the committed table metadata.

**Decision:** Object storage provides durability; the table commit defines reader visibility.

## Narration

S3 stores objects; Iceberg supplies table metadata and snapshots. Keep raw landing prefixes separate from managed table locations. A landing manifest identifies which source files a run consumed, and the Bronze commit records the accepted rows with provenance. Readers must use the table catalog rather than list arbitrary Parquet files. This distinction prevents a partially landed batch from becoming visible as a complete table and prevents a connector-written file from being mistaken for an Iceberg-managed file.
