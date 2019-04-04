import boto3
import json
from boto3.dynamodb.conditions import Key, Attr
from collections import OrderedDict

def lambda_handler(event, context):
    # TODO implement
    file_data = OrderedDict()
    client = boto3.client('dynamodb')
    count = []
    index = 0
    tb_list = client.list_tables()
    try:
        for table in tb_list['TableNames']:
            response = client.query(
                TableName=table,
                ExpressionAttributeNames={
                    '#id': 'id'
                },
                ExpressionAttributeValues={
                    ':v1': {
                        'S': event['id']
                    }
                },
                KeyConditionExpression='#id = :v1'
            )
            count.append(response['ScannedCount'])
            print(table)
            print(response['Items'])
            print(count[index])
            if(index!=0):
                if(count[index-1] < count[index]):
                    file_data = {'brand' : response['Items'][0]['brand']['S'], 'count' : response['ScannedCount']}
                else:
                    count[index] = count[index-1]
                    pass
                
            else:
                if(response['Items'] == []):
                    file_data = {'brand' : 'nike', 'count' : 0}
                else:
                    file_data = {'brand' : response['Items'][0]['brand']['S'], 'count' : response['ScannedCount']}
            
            index = index+1
            
    except Exception as ex:
        print(ex)
        return {'brand' : 'nike', 'count' : 0}
        
    return file_data
