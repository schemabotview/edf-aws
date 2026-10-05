# Terraform environments

## On screen

## Terraform environments

Provision repeatable resource boundaries with environment-specific configuration and protected state.

- **Resource definitions** — S3, IAM, networking, Glue and required service configuration.
- **Ingestion configuration** — DMS endpoints / tasks; MSK Connect plugin configuration where supported.
- **Environment inputs** — Separate dev / production names, capacity, endpoints and secrets.
- **Deployment validation** — Protect state; check connectivity, KMS use and permissions.

**Operating contract:** This learning repo describes the estate; production deployment requires target-account validation.

## Narration

Terraform defines the supporting AWS estate described by the case study. The revised design also needs DMS endpoints, tasks and MSK Connect plugin configuration where supported by the selected provider resources. Keep development and production inputs separate and protect state because it can contain sensitive configuration. This repo describes resource boundaries rather than provisioning a live account. Before deployment, validate network access, IAM policies, KMS use and source connectivity in the target environment.
