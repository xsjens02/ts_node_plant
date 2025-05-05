export interface SocketPayload<T> {
    roomId: string;
    entity: T;
}