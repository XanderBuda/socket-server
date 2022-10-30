import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const disconnect = (client: Socket) => {

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    })

}

// Escuchar mensajes
export const message = (client: Socket, io: socketIO.Server) => {
    client.on('message', (payload: { de: string, body: string }) => {
        console.log('Mensaje recibido', payload);

        io.emit('new-messages', payload);

    });
}