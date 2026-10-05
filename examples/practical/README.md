# Practical implementation examples

These synthetic teaching fragments accompany the existing diagrams. They are not confirmed EDF production settings, complete cloud deployments or fabricated console captures. Placeholders, runtime dependencies and gates are described on each section slide. No cloud commands were executed.

`coverage.json` maps conceptual sections to companion code sections. The business problem and architecture overviews remain diagrams. Existing route IDs and diagrams are preserved; the six-course structure is unchanged.

Install the pinned dependency with `python -m pip install -r examples/practical/requirements-dev.txt`, then run `python scripts/verify-examples.py` from the repo root for local syntax checks and synthetic reconciliation / history / replay checks. Spark, Glue, Kafka, Redshift, Athena, DynamoDB, Airflow, Terraform and CI examples require their configured target runtimes and integration verification. Parsing a file does not validate those integrations.

The SQL dialect is named in each section. Shell snippets contain placeholders; JSON ledgers are proposed project contracts except where explicitly identified as AWS configuration. `contract-checks.yml` is intentionally outside `.github/workflows` and is not active. Maintenance, IAM, submission and recovery examples need the real approved scope before use.

Companion artifacts include Glue catalog session configuration, a raw-prefix lifecycle rule and dbt model tests. Version-pin runtimes, plugins, providers and CI actions in the real deployment. Required Kafka converters and sink adapters are not implemented by these short snippets. See SOURCES.md for primary documentation.
