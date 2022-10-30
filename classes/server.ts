import express from 'express';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../socket/socket'
export default class Server {

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;

    private static _instance: Server;
    private _httpServer: http.Server;

    private constructor() {

        this.app = express();
        this.port = Number(process.env.PORT);

        this._httpServer = new http.Server(this.app);
        this.io = new socketIO.Server(this._httpServer, { cors: { origin: true, credentials: true } });
        this._listenSockets();
    }

    public static get instance(): Server {
        return this._instance || (this._instance = new this());
    }

    private _listenSockets() {
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', client => {
            console.log('Cliente conectado');

            //Mensajes
            socket.message(client, this.io);

            //Desconectar
            socket.disconnect(client);
        });

    }

    start(callback: any) {
        this._httpServer.listen(this.port, callback);
    }


}