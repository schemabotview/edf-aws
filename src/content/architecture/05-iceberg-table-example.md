# Implementation: create the Bronze table

## On screen

## Implementation: create the Bronze table

Make the distinction between S3 objects, catalog metadata and committed table rows concrete.

- **Runtime** — Enable Glue `--datalake-formats=iceberg` and configure Spark Iceberg extensions, GlueCatalog and S3FileIO.
- **Table contract** — Preserve raw measurement values and provenance; parse and normalise in Silver.
- **Partitioning** — Bronze uses ingestion day in this example; Silver / Gold use workload-specific event partitions.
- **Compatibility** — Validate the chosen Glue, Iceberg and Athena versions plus Lake Formation access.

**Implementation scope:** This DDL assumes a configured catalog, warehouse path and job permissions; it is not a complete Glue deployment.

## Narration

The SQL creates a managed Bronze table through a configured Iceberg catalog. The object store holds files; the catalog and Iceberg metadata determine which files belong to a committed snapshot. Bronze retains raw values and arrival identities rather than silently rewriting source measurements. Ingestion-day partitioning is a proposed Bronze choice, not a rule for every medallion table. Enable the Iceberg framework and session extensions before running this example, and configure the Glue catalog warehouse and S3 file implementation. Version two is an explicit compatibility choice. Verify supported engine versions and governance permissions in the target environment.
