# Bronze acceptance

## On screen

## Bronze acceptance

Turn a bounded set of landed files into an accepted, replayable Bronze table version.

- **Manifest** — Record source cut-off, object identities and the job / run version before processing.
- **Validation** — Check required envelope and supported input structure; quarantine incompatible arrivals.
- **Table commit** — Preserve raw values and source provenance, then commit only the accepted inputs through an Iceberg-capable job.
- **Evidence and retry** — Reconcile input, accepted and rejected counts; reuse deterministic arrival identities on retry.

**Ingestion contract:** Object arrival and table visibility are separate events. A run is defined by its input manifest, not its folder timestamp.

## Narration

A bounded run starts from an agreed source cut-off and a manifest of landed objects. Processing validates the envelope, records the source and run identity, and commits Bronze through an Iceberg-capable job. Quarantine prevents unexpected source changes from contaminating accepted output. The schema evolution gate still runs before Silver; it must not rewrite raw values merely to force a contract match. A re-run uses the same manifest and deterministic arrival identities so a retry does not append the same input twice. The quality gate records accepted files and rejected rows; an S3 file is not visible as an Iceberg table until a processing job commits it.
