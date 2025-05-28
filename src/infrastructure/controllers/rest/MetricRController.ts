import { injectable, inject } from "tsyringe";
import { BaseRestController } from "./BaseRestController.js";
import { IHandler } from "./handlers/interfaces/IHandler.js";
import { IRestController } from "./interfaces/IRestController.js";
import { Metric } from "../../../domain/Metric.js";
import { IMetricManager } from "../../../application/useCaseManagers/interfaces/IMetricManager.js";
import { IMetricRController } from "./interfaces/IMetricRController.js";

@injectable()
export class MetricRController extends BaseRestController<Metric> implements IMetricRController {
    // Reference to the use case manager handling Metric business logic
    private metricManager: IMetricManager;

    /**
     * Constructor injects dependencies:
     * - metricManager: business logic for Metric entities
     * - authHandler: authorization handlers for controller methods
     */
    constructor(
        @inject('MetricUseCaseManager') metricManager: IMetricManager,
        @inject('MetricAuthHandlers') authHandler: Partial<Record<keyof IRestController<Metric>, IHandler>>
    ) {
        super(metricManager, authHandler);
        this.metricManager = metricManager;
    }

    /**
     * Retrieves all metrics associated with a specific custom plant ID.
     * Route handler for GET /plant/:id
     * Validates plant ID and delegates fetching to the metricManager.
     */
    async getAllByCustomPlant(req: any, res: any): Promise<Response> {
        return await this.handleRequest(
            req,
            res,
            "get",
            async (req) => await this.metricManager.getAllPlantMetrics(req.params.id),
            this.validateReqId
        );
    }

    /**
     * Retrieves the latest metric for a specific custom plant ID.
     * Route handler for GET /plant/latest/:id
     * Validates plant ID and delegates fetching to the metricManager.
     */
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