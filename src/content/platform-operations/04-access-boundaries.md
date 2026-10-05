# Security and access

## On screen

## Security and access

Align storage, processing and warehouse permissions while protecting PII and credentials.

- **Least-privilege identities** — Scope DMS, connector and job roles to required inputs and outputs.
- **Storage governance** — Secure raw S3 paths and supported Lake Formation table access.
- **PII and secrets** — Separate identity data; use Secrets Manager and required KMS grants.
- **Warehouse grants** — Expose appropriate marts; restrict PII consistently across access paths.

**Operating contract:** Verify both permitted and denied access with representative job and consumer identities.

## Narration

The guide separates storage, processing and warehouse access. Use roles scoped to the source and output locations each job actually needs, including KMS permissions where encryption requires them. Lake Formation governs supported table access; it does not eliminate the need to secure raw bucket paths. Warehouse roles expose the marts appropriate to the consumer and exclude PII where required. Test denied access as well as permitted access, using representative analyst and job identities. Keep customer identifying data separate from measurements. Resolve credentials through Secrets Manager; apply KMS encryption and grants to every retained copy.
