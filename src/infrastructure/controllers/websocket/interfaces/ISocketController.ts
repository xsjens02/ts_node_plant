import { Server } from "socket.io";
import { SocketPayload } from "../../../DTOs/SocketPayload.js";

export interface ISocketController<T> {
    create(io: Server, socket: any, payload: SocketPayload<T>): Promise<void>; 
}