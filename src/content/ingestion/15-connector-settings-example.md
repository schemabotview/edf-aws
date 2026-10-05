# Implementation: MSK Connect S3 sink settings

## On screen

## Implementation: MSK Connect S3 sink settings

Configure the selected plugin separately from the managed MSK Connect runtime.

- **Plugin and converters** — Install a tested Confluent S3 plugin; package the converter matching the Avro producer and registry.
- **Runtime** — Supply subnets, security groups, TLS / authentication, execution role and worker capacity in the create-connector request.
- **Flush and identity** — Row count and scheduled rotation bound file delivery; tags expose offset ranges / row counts, not per-row identity.
- **Acceptance** — Test duplicate and late-record behaviour; validate S3 arrivals before committing Bronze.

**Implementation scope:** Three tasks, 10,000 rows and 60 seconds are proposed tuning values. This is not a complete connector request.

## Narration

The scene is a plugin configuration fragment. MSK Connect separately needs the custom plugin revision, network placement, cluster authentication and service execution role. Package and configure the converter matching the producer serialization and schema registry; Avro file output does not automatically decode arbitrary wire formats. Scheduled rotation and the flush count influence file arrival, but do not prove the end-to-end service objective. Object tags describe file offset ranges and counts. They do not replace a stable row identity carried in the event or derived by a tested parser. Landing remains independent of the downstream Bronze commit.
