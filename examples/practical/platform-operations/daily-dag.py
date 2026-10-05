# Airflow 2.x + compatible Amazon provider excerpt.
from airflow import DAG
from airflow.providers.amazon.aws.operators.glue import (
    GlueJobOperator)
from datetime import datetime, timedelta, timezone

with DAG("edf_daily", schedule=None, catchup=False,
    start_date=datetime(2026, 1, 1, tzinfo=timezone.utc),
    default_args={"retries": 3,
                  "retry_delay": timedelta(minutes=10)}) as dag:
    silver = GlueJobOperator(task_id="silver",
        job_name="edf-silver-existing-job",
        script_args={"--manifest_uri":
                     "{{ dag_run.conf['manifest_uri'] }}"},
        wait_for_completion=True)
    gold = GlueJobOperator(task_id="gold",
        job_name="edf-gold-existing-job",
        script_args={"--run_id": "{{ dag_run.conf['run_id'] }}"},
        wait_for_completion=True)
    silver >> gold
