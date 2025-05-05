import { Server } from "socket.io";
import { IUseCaseManager } from "../../../application/useCaseManagers/interfaces/IUseCaseManager.js";
import { ISocketController } from "./interfaces/ISocketController.js";
import { SocketPayload } from "../../DTOs/SocketPayload.js";

export class BaseSocketController<T> implements ISocketController<T> {
    protected useCaseManager: IUseCaseManager<T>;
    protected entityName: string;

    constructor(useCaseManager: IUseCaseManager<T>, entityName: string) {
        this.useCaseManager = useCaseManager;
        this.entityName = entityName;
    }

    protected async handleSocketEvent(
        io:Server,
        socket:any,
        payload: SocketPayload<T>,
        action: (entity: T) => Promise<T | null>,
        ...validations: ((payload: SocketPayload<T>) => string | null)[]
    ) {
        try {
            for (const validate of validations) {
                const error = validate(payload);
                if (error) {
                    socket.emit(`${this.entityName}_error`, { error });
                    return;
                }
            }

            const result = await action(payload.entity);
            if (!result) 
                socket.emit(`${this.entityName}_error`, { error: "Operation failed." });

            socket.emit(`${this.entityName}_success`, result);
            
            io.to(payload.roomId).emit(`${this.entityName}_new_data`, result);
        } catch(e) {
            socket.emit(`${this.entityName}_error`, { error: "Internal server error." });
        }
    }

    protected validateRoomId(payload: SocketPayload<T>): string | null {
        return payload.roomId ? null : "Invalid or missing room ID.";
    }

    protected validateEntity(payload: SocketPayload<T>): string | null {
        const entity: T = payload.entity;
        return entity ? null : "Invalid or missing entity.";
    }

    async create(io: Server, socket: any, payload: SocketPayload<T>): Promise<void> {
        await this.handleSocketEvent(
            io,
            socket,
            payload,
            async (entity) => await this.useCaseManager.create(entity),
            this.validateRoomId,
            this.validateEntity
        )
    }
}