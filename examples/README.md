# Synthetic walkthrough records

These CSVs are learning examples, not EDF customer data. Effective-date intervals are start-inclusive and end-exclusive.

Expected Silver outcome:

- MTR-001: keep source version 2, consumption 1.3 kWh; version 1 is superseded.
- MTR-002: convert 800 Wh to 0.8 kWh under the declared unit contract.
- MTR-003: reject to DLQ because consumption is missing.
- Accepted total: 2.1 kWh for this example scope. An illustrative matching billing control total is 2.1 kWh.
- CUST-001 facts on October 1 use surrogate key 102; facts before October 1 use 101.

A production dedupe rule also needs a deterministic tie-breaker when source versions match. A cumulative reading needs a different consumption derivation; these examples explicitly use interval readings.
