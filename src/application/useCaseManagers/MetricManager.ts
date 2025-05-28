import { injectable, inject } from "tsyringe";
import { Metric } from "../../domain/Metric.js";
import { BaseUseCaseManager } from "./BaseUseCaseManager.js";
import { IMetricManager } from "./interfaces/IMetricManager.js";
import { IMetricRepository } from "../../infrastructure/repositories/interfaces/IMetricRepository.js";

@injectable()
export class MetricManager extends BaseUseCaseManager<Metric> implements IMetricManager {
    // Specific repository for metric-related operations
    private metricRepo: IMetricRepository;

    // Injects the MetricRepository and passes it to the base manager
    constructor(@inject('MetricRepository') metricRepo: IMetricRepository) {
        super(metricRepo);
        this.metricRepo = metricRepo;
    }

    // Get all metrics related to a specific custom plant
    async getAllPlantMetrics(customPlantId: string): Promise<Metric[]> {
        return await this.metricRepo.getAllByCustomPlant(customPlantId);
    }

    // Get only the latest metrics for a specific custom plant
    async getLatestPlantMetrics(customPlantId: string): Promise<Metric[]> {
        return await this.metricRepo.getLatestByCustomPlant(customPlantId);
    }
}