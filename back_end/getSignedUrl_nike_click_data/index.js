var AWS = require('aws-sdk');

// get reference to S3 client 
var s3 = new AWS.S3();

exports.handler = function(event, context, callback) {
    // Read options from the event.
    var srcBucket = event.Records[0].s3.bucket.name;
    // Object key may have spaces or unicode non-ASCII characters.
    var srcKey    = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
 
    var params = {Bucket: srcBucket, Key: srcKey, Expires: 345600};
    
    s3.getSignedUrl('getObject', params, function (err, url) {
        console.log("The URL is", url + "!!!");
        const S3_URL = url;
        var sns = new AWS.SNS();
        sns.publish({
        TopicArn: 'arn:aws:sns:ap-northeast-1:417592584502:send_nike_click_data',
        Message: JSON.stringify(S3_URL)
        }, function(err, data) {
            if(err) {
            console.log('error publishing to SNS : ' + err);
            //context.fail(err);
            } else {
            console.log('message published to SNS');
            //context.done(null, data);
            }
        });
    });
};