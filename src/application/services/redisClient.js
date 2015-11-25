var redis = require('redis');



function redisClient(){
    this.redis =   redis.createClient();
    
}



redisClient.prototype.add = function(data){
    var redis = this.redis;
    redis.ltrim('images', 0,3, function(){
        redis.lpush('images',data);
    });
    
   
};

redisClient.prototype.getClient = function(){
    return this.redis;
};

module.exports = new redisClient();