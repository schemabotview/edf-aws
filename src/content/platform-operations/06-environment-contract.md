# Provision repeatable environments

## On screen

## Provision repeatable environments

- **Terraform definitions** — Storage, roles, network and service configuration.
- **Environment inputs** — Names, capacity, endpoints and protected secrets.
- **Validation** — Connectivity, permissions and deployment checks.

**Decision:** Repeatability includes environment-specific configuration and protected state.

## Narration

Terraform defines the supporting AWS estate described by the case study. The revised design also needs DMS endpoints, tasks and MSK Connect plugin configuration where supported by the selected provider resources. Keep development and production inputs separate and protect state because it can contain sensitive configuration. This repo describes resource boundaries rather than provisioning a live account. Before deployment, validate network access, IAM policies, KMS use and source connectivity in the target environment.
