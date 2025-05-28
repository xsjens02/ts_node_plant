export function subscribeSocket(socket: any) {
    // Listen for 'join_room' event from the client
    socket.on('join_room', (id: string) => {
        // Check if room ID is provided
        if (!id) {
            // Send error if no room ID given
            socket.emit('join_room_error', { error: 'Room ID is required.' });
            return;
        }
        
        // Add the socket to the specified room
        socket.join(id);
    });
}