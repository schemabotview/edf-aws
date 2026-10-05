"""Local synthetic checks; no cloud credentials or SDK calls required.

Python/JSON/shell syntax checks do not validate cloud runtimes. The portable
SELECT queries below run on SQLite fixtures; Spark MERGE is not executed here.
"""
from pathlib import Path
from decimal import Decimal
import ast
import json
import runpy
import sqlite3
import subprocess
import yaml

ROOT = Path(__file__).resolve().parents[1]
EXAMPLES = ROOT / 'examples' / 'practical'
count = 0
for path in sorted(EXAMPLES.rglob('*')):
    if not path.is_file():
        continue
    if path.suffix in ('.json', '.avsc'):
        json.loads(path.read_text())
    elif path.suffix == '.yml':
        yaml.load(path.read_text(), Loader=yaml.BaseLoader)
    elif path.suffix == '.py':
        ast.parse(path.read_text(), filename=str(path))
    elif path.suffix == '.sh':
        subprocess.run(['bash', '-n', str(path)], check=True)
    else:
        continue
    count += 1

# Use the actual runnable release gate, including threshold and zero cases.
release_ok = runpy.run_path(str(EXAMPLES / 'transformation/reconcile.py'))['release_ok']
assert release_ok('10000', '10001', True)  # exactly 0.01%
assert not release_ok('10000', '10001.001', True)
assert release_ok('0', '0.01', True)
assert not release_ok('0', '0.0101', True)
assert release_ok('-10000', '-10001', True)
assert not release_ok('100', '100', False)
assert not release_ok('NaN', '0', True)
assert not release_ok('Infinity', '0', True)

# Execute the real portable normalisation / effective-join SELECT.
db = sqlite3.connect(':memory:')
db.executescript('''
CREATE TABLE accepted_arrivals (
 arrival_id TEXT, meter_id TEXT, event_time TEXT,
 raw_value TEXT, unit TEXT);
CREATE TABLE tariff_history (
 meter_id TEXT, valid_from TEXT, valid_to TEXT, tariff_sk INTEGER);
INSERT INTO accepted_arrivals VALUES
 ('a','m1','2026-10-01T00:00:00Z','1200','Wh'),
 ('b','m1','2026-10-02T00:00:00Z','2','kWh');
INSERT INTO tariff_history VALUES
 ('m1','2026-09-01T00:00:00Z','2026-10-02T00:00:00Z',1),
 ('m1','2026-10-02T00:00:00Z',NULL,2);
''')
normalise = (EXAMPLES / 'transformation/normalise.sql').read_text()
query = normalise[normalise.index('WITH normalised'):].split(';')[0]
rows = db.execute(query).fetchall()
assert len(rows) == 2 and rows[0][-2:] == (1.2, 1) and rows[1][-2:] == (2.0, 2)
# A missing match remains visible; an overlap duplicates rows and must be held.
db.execute("DELETE FROM tariff_history WHERE tariff_sk = 2")
assert db.execute(query).fetchall()[1][-1] is None
db.execute("INSERT INTO tariff_history VALUES ('m1','2026-09-01T00:00:00Z',NULL,3)")
assert len(db.execute(query).fetchall()) == 3

# Execute real Gold aggregate against corrected accepted state and tombstone.
db.executescript('''
CREATE TABLE accepted_silver (
 meter_id TEXT, event_time TEXT, interval_kwh REAL, is_deleted BOOLEAN);
CREATE TABLE settlement_calendar (
 period_id TEXT, start_utc TEXT, end_utc TEXT);
INSERT INTO settlement_calendar VALUES
 ('p1','2026-10-01T00:00:00Z','2026-10-01T01:00:00Z'),
 ('p2','2026-10-01T01:00:00Z','2026-10-01T02:00:00Z');
INSERT INTO accepted_silver VALUES
 ('m1','2026-10-01T00:00:00Z',1.2,false),
 ('m1','2026-10-01T00:30:00Z',0.8,false),
 ('m1','2026-10-01T00:45:00Z',9.0,true),
 ('m1','2026-10-01T01:00:00Z',3.0,false);
''')
gold = (EXAMPLES / 'transformation/gold-meter-period.sql').read_text()
query = gold[gold.index('SELECT'):].split(';')[0]
assert db.execute(query).fetchall() == [('m1', 'p1', 2.0, 2), ('m1', 'p2', 3.0, 1)]

# Execute actual warehouse history join / overlap query on synthetic dimension.
db.executescript('''
ATTACH DATABASE ':memory:' AS staging;
CREATE TABLE staging.meter_period (
 meter_id TEXT, period_id TEXT, customer_id TEXT,
 period_start TEXT, consumption_kwh REAL);
CREATE TABLE dim_customer (
 customer_id TEXT, customer_sk INTEGER, valid_from TEXT, valid_to TEXT);
INSERT INTO dim_customer VALUES
 ('c1',1,'2026-09-01','2026-10-01'),
 ('c1',2,'2026-10-01',NULL);
INSERT INTO staging.meter_period VALUES
 ('m1','p1','c1','2026-09-30',2.0),
 ('m1','p2','c1','2026-10-01',3.0);
''')
history = (EXAMPLES / 'consumption/customer-history.sql').read_text()
history = '\n'.join(line for line in history.splitlines() if not line.lstrip().startswith('--'))
first, second = history.split(';')[:2]
assert db.execute(first).fetchall() == [('m1', 'p1', 1, 2.0), ('m1', 'p2', 2, 3.0)]
assert db.execute(second).fetchall() == []
db.execute("INSERT INTO dim_customer VALUES ('c1',3,'2026-09-30','2026-10-02')")
assert len(db.execute(second).fetchall()) == 2

# A reference model checks recovery contract invariants, not Spark integration.
def apply_versions(changes):
    state = {}
    for key, version, value, deleted in changes:
        prior = state.get(key)
        payload = (version, value, deleted)
        if prior and version == prior[0] and payload != prior:
            raise ValueError('Conflicting equal source version')
        if prior is None or version > prior[0]:
            state[key] = payload
    return state

changes = [('m1',1,'1.0',False),('m1',2,'1.2',False),('m1',3,None,True)]
baseline = apply_versions(changes)
assert baseline == apply_versions(changes + changes)
assert baseline == apply_versions(list(reversed(changes)))
assert baseline['m1'][2] is True  # old replay did not resurrect the row
try:
    apply_versions([('m1',1,'1.0',False),('m1',1,'9.0',False)])
except ValueError:
    pass
else:
    raise AssertionError('Equal-version conflict was not held')

contract = json.loads((EXAMPLES / 'requirements/source-contract.json').read_text())
assert Decimal(str(contract['release_gate']['relative_variance'])) == Decimal('0.0001')
manifest = json.loads((EXAMPLES / 'ingestion/bronze-manifest.json').read_text())
n = manifest['counts']; assert n['input'] == n['accepted'] + n['rejected']
print(f'Checked {count} JSON / Avro / YAML / Python / shell artifacts; reconciliation boundaries, '
      'effective joins, Gold grain, SCD overlap and reference replay invariants passed.')
print('Spark / cloud integrations and Terraform plans were not executed.')
