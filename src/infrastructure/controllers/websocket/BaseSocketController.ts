import { Server } from "socket.io";
import { IUseCaseManager } from "../../../application/useCaseManagers/interfaces/IUseCaseManager.js";
import { ISocketController } from "./interfaces/ISocketController.js";
import { SocketPayload } from "../../DTOs/SocketPayload.js";

export class BaseSocketController<T> implements ISocketController<T> {
    // Use case manager handles business logic for the entity type T
    protected useCaseManager: IUseCaseManager<T>;

    // Name of the entity, used in socket event names
    protected entityName: string;

    constructor(useCaseManager: IUseCaseManager<T>, entityName: string) {
        this.useCaseManager = useCaseManager;
        this.entityName = entityName;
    }

    /**
     * Central handler for socket events, performs:
     * - Runs all validations and sends error if any fail
     * - Executes the main action (e.g. create) on the entity
     * - Emits success or error events back to the client socket
     * - Broadcasts new data to all clients in the given room
     */
    protected async handleSocketEvent(
        io: Server,
        socket: any,
        payload: SocketPayload<T>,
        action: (entity: T) => Promise<T | null>,
        ...validations: ((payload: SocketPayload<T>) => string | null)[]
    ) {
        try {
            // Run all validation functions; emit error on first failure
            for (const validate of validations) {
                const error = validate(payload);
                if (error) {
                    socket.emit(`${this.entityName}_error`, { error });
                    return;
                }
            }

            // Perform the action
            const result = await action(payload.entity);
            if (!result) {
                socket.emit(`${this.entityName}_error`, { error: "Operation failed." });
                return;
            }

            // Emit success event back to the client that triggered it
            socket.emit(`${this.entityName}_success`, result);

            // Notify all clients in the room about the new/updated data
            io.to(payload.roomId).emit(`${this.entityName}_new_data`, result);
        } catch (e) {
            // Catch unexpected errors and notify the client
            socket.emit(`${this.entityName}_error`, { error: "Internal server error." });
        }
    }

    // Validation: check if roomId exists in payload
    protected validateRoomId(payload: SocketPayload<T>): string | null {
        return payload.roomId ? null : "Invalid or missing room ID.";
    }

    // Validation: check if entity exists in payload
    protected validateEntity(payload: SocketPayload<T>): string | null {
        const entity: T = payload.entity;
        return entity ? null : "Invalid or missing entity.";
    }

    // Socket method for creating a new entity
    async create(io: Server, socket: any, payload: SocketPayload<T>): Promise<void> {
        await this.handleSocketEvent(
            io,
            socket,
            payload,
            async (entity) => await this.useCaseManager.create(entity),
            this.validateRoomId,
            this.validateEntity
        );
    }
}