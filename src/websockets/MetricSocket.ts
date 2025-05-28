import { Server } from "socket.io";
import { Metric } from "../domain/Metric.js";
import { container } from "tsyringe";
import { ISocketController } from "../infrastructure/controllers/websocket/interfaces/ISocketController.js";

export function metricSocket(io: Server, socket: any) {
    // Resolve the Metric socket controller from the dependency container
    const metricController = container.resolve<ISocketController<Metric>>('MetricSController');

    // Listen for 'send_metric' event from client
    socket.on('send_metric', async (data: any) => {
        // Handle the incoming metric data using the controller
        await metricController.create(io, socket, data);
    });
}