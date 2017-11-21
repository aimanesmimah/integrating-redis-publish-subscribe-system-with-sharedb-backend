var redis = require('redis');
var flow = require('flow-maintained');

//Im just showing you here an example of storing incoming data from the publish/subscribe system
//but you still can store any type of data contained in the incoming message depending on
// the information you want to retrieve from the data flow
module.exports.storeSharedbData = function(redisClient,data,cb){


    redisClient.incr('op:next:id',function (err,opId) {
       if(err)
           throw err;

       flow.exec(
           function () {
               redisClient.hset('operation:' + opId ,'src',data.src,this.MULTI());
               redisClient.hset('operation:' + opId , 'opPosition' , data.op[0].p[0],this.MULTI());
               if(data.op[0].si) {
                   redisClient.hset('operation:' + opId, 'opAction', 'insert', this.MULTI());
                   redisClient.hset('operation:' + opId, 'caracter', data.op[0].si , this.MULTI())
               }
               else {
                   redisClient.hset('operation:' + opId, 'opAction', 'delete', this.MULTI());
                   redisClient.hset('operation:' + opId, 'caracter', data.op[0].sd, this.MULTI());
               }

               redisClient.hset('operation:' + opId , 'editorName', data.d,this.MULTI());

           },function () {
               cb(err,opId);
           }
       )
    });
}