import { injectable, inject } from "tsyringe";
import { BaseSocketController } from "./BaseSocketController.js";
import { ISocketController } from "./interfaces/ISocketController.js";
import { IUseCaseManager } from "../../../application/useCaseManagers/interfaces/IUseCaseManager.js";
import { Metric } from "../../../domain/Metric.js";

@injectable()
export class MetricSController extends BaseSocketController<Metric> implements ISocketController<Metric> {

    constructor(@inject('MetricUseCaseManager') metricManager: IUseCaseManager<Metric>,) {
        super(metricManager, 'metric');
    }
}