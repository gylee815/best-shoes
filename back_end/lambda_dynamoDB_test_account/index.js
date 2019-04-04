const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ap-northeast-2'})
exports.handle = function(e, ctx, cb) {
    let scanningParameters = {
        TableName : 'test_account',
        Key : {
            "id" : e.id
        }
    };
    
    docClient.get(scanningParameters, function(err, data){
        if(err){
            cb(err, null);
        }else{
            cb(null, data);
        }
    });

}
