# Implementation: a release gate with a zero baseline

## On screen

## Implementation: a release gate with a zero baseline

Calculate variance only after matching the population, period and measurement unit.

- **Precision** — Pass decimal strings; do not convert financial or reconciliation totals through binary floats.
- **Threshold** — Relative tolerance 0.0001 equals 0.01%. Negative baselines use their absolute magnitude.
- **Zero source** — Use an agreed absolute tolerance; 0.01 kWh is only a proposed example.
- **Publication** — Combine this comparison with completeness, grain and exception gates; preserve the last accepted version on failure.

**Implementation scope:** The function is a local, executable teaching example. It is one gate, not proof of regulatory compliance.

## Narration

The function compares matched totals using decimal arithmetic. The same-scope flag represents a prerequisite that the caller must establish from population, period and units, not simply set to true. A relative threshold cannot be computed against zero, so that case uses a separate proposed absolute tolerance. The function also uses the absolute magnitude of a nonzero source total for the denominator. Passing a totals comparison does not prove completeness: both sides could omit the same meters. Store source and Gold versions and apply the remaining quality and population checks before updating the published pointer. A failed decision retains the last accepted output.
