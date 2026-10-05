# Implementation: environment-separated Terraform state

## On screen

## Implementation: environment-separated Terraform state

Protect state and isolate environment inputs before provisioning platform resources.

- **State** — Use an existing private versioned bucket; S3 lockfile support requires a compatible Terraform version and IAM grants.
- **Separation** — Use approved account / state key / variables per environment; backend blocks cannot use ordinary input variables.
- **Secrets** — Treat state and plan files as sensitive; do not put credentials or customer data into repository variables.
- **Review** — Validate and review the target-account plan, drift and IAM / networking / KMS effects before apply.

**Implementation scope:** This config demonstrates state management only. No resource estate is deployed by the learning repo.

## Narration

The backend stores state under an environment-specific key and enables locking. The state bucket must exist before initialization, with private access, versioning and appropriate encryption and lockfile permissions. Terraform state and saved plans can contain sensitive values. Production should use its approved account boundary, backend key and variables rather than sharing development state. Backend blocks cannot interpolate ordinary input variables, so supply environment-specific backend configuration through the intended initialization flow. Pin provider dependencies in the lockfile and inspect the actual target-account plan. This example does not provision the EDF platform.
