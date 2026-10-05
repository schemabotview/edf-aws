# Excerpt: boto3 Table, item and version are supplied.
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
try:
    table.put_item(Item=item,
        ConditionExpression=("attribute_not_exists(#v) "
                             "OR #v < :v"),
        ExpressionAttributeNames={"#v": "source_version"},
        ExpressionAttributeValues={":v": version})
except ClientError as exc:
    code = exc.response["Error"]["Code"]
    if code != "ConditionalCheckFailedException":
        raise
    # Inspect equal-version conflicts; older writes stay held.

latest = table.query(
    KeyConditionExpression=Key("meter_id").eq(meter_id),
    ScanIndexForward=False, Limit=1, ConsistentRead=True)
