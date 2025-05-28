import { Server } from 'socket.io';
import { metricSocket } from './MetricSocket.js';
import { IoTConfigSocket } from './IoTConfigSocket.js';
import { subscribeSocket } from './SubscribeSocket.js';

// Initializes and configures WebSocket server
export function setupWebSocket(server: any) {
    // Create a new Socket.IO server with CORS settings
    const io = new Server(server, {
        cors: {
            origin: "*", // Allow all origins 
            methods: ["GET", "POST"] // Allow only GET and POST requests
        }
    });

    // Listen for new client connections
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Setup event handlers for different socket modules
        subscribeSocket(socket);         // Handles subscription events
        IoTConfigSocket(io, socket);     // Handles IoT configuration events
        metricSocket(io, socket);        // Handles metric-related events

        // Listen for client disconnection
        socket.on('disconnect', () => {
            console.log("Client disconnected:", socket.id);
        });
    });
}