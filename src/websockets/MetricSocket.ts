import { Server } from "socket.io";
import { Metric } from "../domain/Metric.js";
import { container } from "tsyringe";
import { ISocketController } from "../infrastructure/controllers/websocket/interfaces/ISocketController.js";

export function metricSocket(io: Server, socket: any) {
    const metricController = container.resolve<ISocketController<Metric>>('MetricSController');

    socket.on('send_metric', async (data: any) => {
        await metricController.create(io, socket, data);
    });
}