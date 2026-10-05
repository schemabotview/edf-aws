# Repeat from the consumer-health observer.
aws cloudwatch put-metric-data \
  --namespace EDF/Learning \
  --metric-name AcceptedEventAge \
  --dimensions Output=meter-operations \
  --unit Seconds --value "$AGE_SECONDS"

aws cloudwatch put-metric-alarm \
  --alarm-name meter-operations-stale \
  --namespace EDF/Learning \
  --metric-name AcceptedEventAge \
  --dimensions Name=Output,Value=meter-operations \
  --statistic Maximum --period 60 \
  --evaluation-periods 2 --threshold 120 \
  --comparison-operator GreaterThanThreshold \
  --treat-missing-data breaching \
  --alarm-actions "$SNS_TOPIC_ARN"
