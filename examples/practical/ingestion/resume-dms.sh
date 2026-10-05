# Teaching commands; substitute a proven task ARN.
aws dms describe-replication-tasks \
  --filters Name=replication-task-arn,Values="$TASK_ARN" \
  --query 'ReplicationTasks[].{
    Status:Status, Checkpoint:RecoveryCheckpoint}'

aws dms describe-table-statistics \
  --replication-task-arn "$TASK_ARN"

# Only after confirming resumable stopped state,
# retained source logs and target continuity:
aws dms start-replication-task \
  --replication-task-arn "$TASK_ARN" \
  --start-replication-task-type resume-processing

# Missing logs -> controlled resnapshot + reconcile.
# DMS progress is separate from Bronze progress.
