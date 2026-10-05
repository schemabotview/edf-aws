# Implementation: contract checks before promotion

## On screen

## Implementation: contract checks before promotion

Run local contract examples in CI and keep cloud promotion tied to a reviewed immutable artifact.

- **Checks** — The verifier parses examples and exercises synthetic reconciliation, SCD intervals and replay invariants.
- **Credentials** — The checks need no AWS keys. Deployment can use a scoped GitHub OIDC role with protected environment policy.
- **Pinning** — Resolve and pin action commit SHAs under the repository policy before enabling this sample workflow.
- **Promotion** — Validate schema / checkpoint compatibility and data gates; preserve the prior accepted release until acceptance.

**Implementation scope:** The example is not installed as an active workflow and does not deploy anything.

## Narration

The sample pull-request workflow runs the local example verifier without cloud credentials. It stays in the examples directory so authoring the course does not activate automation unexpectedly. Production repositories should resolve and pin action revisions according to their policy. A separate promotion workflow can use GitHub OIDC with a trust policy restricted to the intended repository and environment. That workflow also needs the reviewed immutable artifact, compatibility checks and accepted-output evidence. A successful code deployment does not authorise publication of unreconciled data. Keep the previous accepted version available until the new release passes its consumer gates.
