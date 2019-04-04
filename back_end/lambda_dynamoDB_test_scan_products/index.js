console.log('starting function');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ap-northeast-2'})
exports.handle = function(e, ctx, cb) {
    let scanningParameters = {
        TableName : 'table_products'
    };
    
    docClient.scan(scanningParameters, function(err, data){
        if(err){
            cb(err, null);
        }else{
            cb(null, data);
        }
    });

}