import { Server } from "socket.io";
import { IoTConfig } from "../domain/IoTConfig.js";
import { container } from "tsyringe";
import { ISocketController } from "../infrastructure/controllers/websocket/interfaces/ISocketController.js";

export function IoTConfigSocket(io: Server, socket: any) {
    // Resolve the IoT configuration socket controller from the dependency container
    const iotConfigController = container.resolve<ISocketController<IoTConfig>>('IoTConfigSController');

    // Listen for 'send_iot_config' event from client
    socket.on('send_iot_config', async (data: any) => {
        // Pass the event to the controller's create method
        await iotConfigController.create(io, socket, data);
    });
}