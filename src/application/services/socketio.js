var io;


var sio = {
    init: function (http) {
        if (http) {

            io = require('socket.io')(http);
            io.on('connection', function (socket) {
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