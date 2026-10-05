# CI/CD and safe promotion

## On screen

## CI/CD and safe promotion

Promote reviewed artifacts only after contract, data and consumer compatibility checks.

- **Reviewed artifacts** — GitHub Actions checks code, contracts and representative output.
- **Compatibility checks** — Validate catalog schema, checkpoint state and consumer models.
- **Controlled promotion** — Deploy immutable versions with environment approvals.
- **Accepted-output validation** — Retain the prior accepted version until release evidence passes.

**Operating contract:** A successful deployment is not permission to publish unreconciled data.

## Narration

GitHub Actions can coordinate reviewed deployment artifacts and environment approvals. Validate code, contracts and representative output before promotion. A data pipeline release also needs compatibility checks for catalog schema, checkpoint state and consumer models; application rollback alone may not undo a table migration. Record the deployed job and infrastructure versions with each run. Keep the previous accepted output available while validating the new release so a technically successful deployment does not immediately expose unreconciled data. Terraform provisions separate environments with protected state. Promote reviewed code only after contract checks and a compatible data release; retain versioned rollback evidence.
