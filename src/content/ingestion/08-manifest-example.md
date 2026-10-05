# Implementation: a bounded Bronze manifest

## On screen

## Implementation: a bounded Bronze manifest

Freeze the exact input set before validation and table acceptance.

- **Immutable scope** — Use object version IDs and content hashes; an S3 ETag is not universally a content checksum.
- **Account for arrivals** — Input = accepted + rejected; retain rejected row identities and reasons.
- **Commit and recover** — Use stable arrival IDs in an idempotent acceptance write; then save the committed snapshot and advance progress.
- **Crash boundary** — A failure after commit but before progress must be safe to retry; a run ID alone is insufficient.

**Implementation scope:** The manifest is a project contract, not an AWS API schema; it deliberately records an uncommitted state.

## Narration

This sample manifest pins object versions, content hashes, a source cut-off and the contract and job versions. The counts show that ninety-eight accepted rows plus two rejected rows account for the hundred-row input. An S3 ETag cannot always be used as a content checksum, so the contract names a separate digest. At this stage the run is validated but not committed. The acceptance implementation must use stable arrival identities so a repeated write does not duplicate input. Record the actual Iceberg snapshot after commit and only then advance downstream progress. A crash between those steps must be recoverable by consulting committed arrival or run evidence.
