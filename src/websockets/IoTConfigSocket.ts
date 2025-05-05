import { Server } from "socket.io";
import { IoTConfig } from "../domain/IoTConfig.js";
import { container } from "tsyringe";
import { ISocketController } from "../infrastructure/controllers/websocket/interfaces/ISocketController.js";

export function IoTConfigSocket(io: Server, socket: any) {
    const iotConfigController = container.resolve<ISocketController<IoTConfig>>('IoTConfigSController');

    socket.on('send_iot_config', async (data: any) => {
        await iotConfigController.create(io, socket, data);
    });
}