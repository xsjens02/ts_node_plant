import { injectable, inject } from "tsyringe";
import { Metric } from "../../domain/Metric.js";
import { BaseUseCaseManager } from "./BaseUseCaseManager.js";
import { IMetricManager } from "./interfaces/IMetricManager.js";
import { IMetricRepository } from "../../infrastructure/repositories/interfaces/IMetricRepository.js";

@injectable()
export class MetricManager extends BaseUseCaseManager<Metric> implements IMetricManager {
    private metricRepo: IMetricRepository;

    constructor(@inject('MetricRepository') metricRepo: IMetricRepository) {
        super(metricRepo);
        this.metricRepo = metricRepo;
    }

    async getAllPlantMetrics(customPlantId: string): Promise<Metric[]> {
        return await this.metricRepo.getAllByCustomPlant(customPlantId);
    }

    async getLatestPlantMetrics(customPlantId: string): Promise<Metric[]> {
        return await this.metricRepo.getLatestByCustomPlant(customPlantId);
    }
}