var redis = require('redis');



function redisClient(){
    this.redis =   redis.createClient();
    
}



redisClient.prototype.add = function(data){
    var redis = this.redis;
    redis.lpush('images', data,function(){
        redis.ltrim('images', 0, 4);
    })
    
   
};

redisClient.prototype.getClient = function(){
    return this.redis;
};

module.exports = new redisClient();