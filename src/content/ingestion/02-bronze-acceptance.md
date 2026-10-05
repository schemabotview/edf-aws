# Accept landed files as a bounded run

## On screen

## Accept landed files as a bounded run

- **Landing manifest** — File identities and source cut-off.
- **Batch processing** — Validate envelope and attach run provenance.
- **Bronze commit** — Publish only the accepted input set.

**Decision:** A batch is defined by accepted inputs, not by the wall-clock folder name alone.

## Narration

A bounded run starts from an agreed source cut-off and a manifest of landed objects. Processing validates the envelope, records the source and run identity, and commits Bronze through an Iceberg-capable job. Quarantine prevents unexpected source changes from contaminating accepted output. The schema evolution gate still runs before Silver; it must not rewrite raw values merely to force a contract match. A re-run uses the same manifest and deterministic arrival identities so a retry does not append the same input twice. The quality gate records accepted files and rejected rows; an S3 file is not visible as an Iceberg table until a processing job commits it.
