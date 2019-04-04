console.log('starting function');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ap-northeast-1'})
exports.handle = function(e, ctx, cb) {
    var newDate = new Date();
    var time = newDate.toString();
    var ttl = Math.floor(Date.now() / 1000) + (60*60*6)
    console.log(e);
    var params = {
        Item: {
            prod_id : e.prod_id,
            id : e.id,
            age : e.age,
            gender : e.gender,
            date : time,
            brand : e.brand,
            ttl : ttl
        },
        TableName: "table_"+e.brand+"_click"
    };

    docClient.put(params, function(err, data){
        if(err){
            cb(new Error("Malformed input"), null)
            //cb(err, null)
            console.log("err : " + err)
        }else{
            cb(null, data)
            console.log("seccess")
        }
    });
}