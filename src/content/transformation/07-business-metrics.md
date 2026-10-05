# Define consumption and utilisation once

## On screen

## Define consumption and utilisation once

- **Consumption** — Sum accepted interval kWh at the reporting grain.
- **Generation utilisation** — Output relative to agreed capacity and interval.
- **Metric contract** — Units, denominator, exclusions and correction policy.

**Decision:** A shared metric is a formula plus its population and exception rules.

## Narration

Gold metrics require definitions that an analyst and an engineer can both reproduce. Consumption sums the accepted interval values at the reporting grain. Generation utilisation needs an agreed denominator, time interval and treatment of unavailable capacity; it is not simply any two columns divided together. Safe division prevents a crash on zero denominators but does not decide the business meaning of a null result. Record exclusions and late-correction rules with the model so repeated builds produce comparable values.
