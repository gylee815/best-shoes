console.log('starting function');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ap-northeast-2'})
exports.handle = function(e, ctx, cb) {
  console.log(e);
  var params = {
    Item: {
      id : e.id,
      gender : e.gender,
      age : e.age,
    },
    Expected :{"id":{Exists:false}},
    TableName: 'test_account'
  };
      
  docClient.put(params, function(err, data){
      if(err){
        cb("User already exist", null)
      }else{
        cb(null, data)
      }
  });
}