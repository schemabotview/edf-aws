# Business metrics

## On screen

## Business metrics

Define each Gold metric with its population, units, denominator and correction policy.

- **Consumption** — Sum accepted interval kWh at the agreed reporting grain.
- **Generation utilisation** — Output relative to agreed capacity over the defined interval.
- **Denominators and exclusions** — Define zero capacity, missing values and unavailable assets.
- **Versioned metric contract** — Retain formulas, populations and late-correction rules.

**Transformation contract:** A metric is a reproducible contract, not simply a calculation.

## Narration

Gold metrics require definitions that an analyst and an engineer can both reproduce. Consumption sums the accepted interval values at the reporting grain. Generation utilisation needs an agreed denominator, time interval and treatment of unavailable capacity; it is not simply any two columns divided together. Safe division prevents a crash on zero denominators but does not decide the business meaning of a null result. Record exclusions and late-correction rules with the model so repeated builds produce comparable values.
