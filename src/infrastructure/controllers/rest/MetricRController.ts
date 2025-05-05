import { injectable, inject } from "tsyringe";
import { BaseRestController } from "./BaseRestController.js";
import { IUseCaseManager } from "../../../application/useCaseManagers/interfaces/IUseCaseManager.js";
import { IHandler } from "./handlers/interfaces/IHandler.js";
import { IRestController } from "./interfaces/IRestController.js";
import { Metric } from "../../../domain/Metric.js";


@injectable()
export class MetricRController extends BaseRestController<Metric> implements IRestController<Metric> {

    constructor(
        @inject('MetricUseCaseManager') metricManager: IUseCaseManager<Metric>,
        @inject('MetricAuthHandlers') authHandler: Partial<Record<keyof IRestController<Metric>, IHandler>>
    ) {
        super(metricManager, authHandler);
    }
}