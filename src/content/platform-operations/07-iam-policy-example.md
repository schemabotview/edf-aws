# Implementation: scope a raw-reader policy

## On screen

## Implementation: scope a raw-reader policy

Separate bucket-list permissions from object-read permissions and constrain both to the intended input.

- **Scope** — The example reader can list / read the meter raw prefix; it has no write or delete permissions.
- **Encryption** — Add narrowly scoped KMS decrypt permission and key-policy access for the real encrypted input.
- **Table access** — Glue Catalog, supported Lake Formation controls and Iceberg metadata / file paths need separate grants.
- **Verify** — Test allowed meter reads and denied unrelated / PII reads with the actual role; warehouse grants are independent.

**Implementation scope:** This policy fragment is not a complete DMS, Spark or connector execution role.

## Narration

S3 bucket listing and object reads use different resources. The list statement targets the bucket and constrains the requested prefix. The read statement targets objects under that prefix. This is an input-reader fragment, not a service execution role for DMS or a transformation writer. Encrypted inputs also need scoped KMS access, and the key policy must allow that identity. Table jobs need catalog and metadata access and any supported Lake Formation permissions. Test both positive and negative access with the real role, including unrelated raw inputs and PII. Warehouse authorization and Athena result locations remain separate surfaces.
