
import {Server} from 'socket.io';

let ioServer;

export const init = (http) => {
    if (http) {
        ioServer = new Server(http);
        ioServer.on('connection', (socket) => {
            socket.join('images');
        });
    }
    return ioServer;

}
export const getClient = () => {
    return ioServer;
}