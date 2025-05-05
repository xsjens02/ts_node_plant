import { injectable, inject } from "tsyringe";
import { BaseRestController } from "./BaseRestController.js";
import { IHandler } from "./handlers/interfaces/IHandler.js";
import { IRestController } from "./interfaces/IRestController.js";
import { Metric } from "../../../domain/Metric.js";
import { IMetricManager } from "../../../application/useCaseManagers/interfaces/IMetricManager.js";
import { IMetricRController } from "./interfaces/IMetricRController.js";


@injectable()
export class MetricRController extends BaseRestController<Metric> implements IMetricRController {
    private metricManager: IMetricManager;

    constructor(
        @inject('MetricUseCaseManager') metricManager: IMetricManager,
        @inject('MetricAuthHandlers') authHandler: Partial<Record<keyof IRestController<Metric>, IHandler>>
    ) {
        super(metricManager, authHandler);
        this.metricManager = metricManager;
    }

    async getAllByCustomPlant(req: any, res: any): Promise<Response> {
        return await this.handleRequest(
            req, 
            res, 
            "get",
            async (req) => await this.metricManager.getAllPlantMetrics(req.params.id), 
            this.validateReqId
        );
    }

    async getLatestByCustomPlant(req: any, res: any): Promise<Response> {
        return await this.handleRequest(
            req, 
            res, 
            "get",
            async (req) => await this.metricManager.getLatestPlantMetrics(req.params.id), 
            this.validateReqId
        );
    }
}