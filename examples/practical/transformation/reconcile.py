from decimal import Decimal

def release_ok(source, gold, same_scope):
    source, gold = Decimal(source), Decimal(gold)
    finite = source.is_finite() and gold.is_finite()
    if not same_scope or not finite:
        return False
    delta = abs(gold - source)
    if source == 0:
        return delta <= Decimal("0.01")
    return delta / abs(source) <= Decimal("0.0001")

# Store matched population, period and units;
# source / Gold versions, counts and rejects;
# delta, tolerance, decision and job version.
# Publish only after all completeness gates pass.
