import { Server } from 'socket.io';
import { metricSocket } from './MetricSocket.js';
import { IoTConfigSocket } from './IoTConfigSocket.js';
import { subscribeSocket } from './SubscribeSocket.js';

export function setupWebSocket(server: any) {
    const io = new Server(server, {
        cors: {
          origin: "*", 
          methods: ["GET", "POST"] 
        }
      });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        subscribeSocket(socket);
        IoTConfigSocket(io, socket);
        metricSocket(io, socket);

        socket.on('disconnect', () => {
            console.log("Client disconnected:", socket.id);
        });
    });
}