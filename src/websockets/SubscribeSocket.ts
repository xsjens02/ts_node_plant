export function subscribeSocket(socket: any) {
    socket.on('join_room', (id: string) => {
        if (!id) {
            socket.emit('join_room_error', { error: 'Room ID is required.' });
            return;
        }
        
        socket.join(id);
    });
}