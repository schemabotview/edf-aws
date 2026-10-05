# Give each job its own access boundary

## On screen

## Give each job its own access boundary

- **Storage permissions** — IAM and Lake Formation policies.
- **Processing identities** — Least-privilege roles for DMS, connectors and jobs.
- **Warehouse roles** — Consumer grants and PII exclusions.

**Decision:** Table governance, bucket permissions and warehouse grants must agree.

## Narration

The guide separates storage, processing and warehouse access. Use roles scoped to the source and output locations each job actually needs, including KMS permissions where encryption requires them. Lake Formation governs supported table access; it does not eliminate the need to secure raw bucket paths. Warehouse roles expose the marts appropriate to the consumer and exclude PII where required. Test denied access as well as permitted access, using representative analyst and job identities. Keep customer identifying data separate from measurements. Resolve credentials through Secrets Manager; apply KMS encryption and grants to every retained copy.
