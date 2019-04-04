console.log('starting function');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'ap-northeast-2'})
exports.handle = function(e, ctx, cb) {
  console.log(e);
  var params = {
    Item: {
      brand : e.brand,
      prod_id : e.prod_id,
      price : e.price,
      img_origin : e.img_origin,
      img_thumbnail : e.img_thumbnail
    },
    TableName: 'table_products'
  };

  docClient.put(params, function(err, data){
    if(err){
      console.log("data : " +params.Item.brand)
      cb(err, null)
    }else{
      console.log("data : " +data.Item)
      cb(null, data)
    }
  });
}