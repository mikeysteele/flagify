var io;
var redis = require('socket.io-redis');

var sio = {
    init: function (http) {
        if (http) {

            io = require('socket.io')(http);
            io.adapter(redis({ host: 'localhost', port: 6379 }));
            io.on('connection', function (socket) {
                socket.join('images');
		console.log('a user connected');
            });
        }
        return io;

    },
    getClient: function ()
    {
        return io;
    }
};

module.exports = exports = sio;
