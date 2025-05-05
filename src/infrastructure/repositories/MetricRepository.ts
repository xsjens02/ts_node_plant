import { injectable, inject } from "tsyringe";
import { ICache } from "../databases/interfaces/cache/ICache.js";
import { BaseRepository } from "./BaseRepository.js";
import { Metric } from "../../domain/Metric.js";
import { IMetricRepository } from "./interfaces/IMetricRepository.js";
import { IMetricPersistence } from "../databases/interfaces/persistence/IMetricPersistence.js";
import { ICustomPlantPersistence } from "../databases/interfaces/persistence/ICustomPlantPersistence.js";

@injectable()
export class MetricRepository extends BaseRepository<Metric> implements IMetricRepository {
    private metricPersistence: IMetricPersistence;
    private customPlantPersistence: ICustomPlantPersistence;
    
    constructor(
        @inject('MetricRedis') metricCache: ICache<Metric>, 
        @inject('MetricMongo') metricPersistence: IMetricPersistence,
        @inject('CustomPlantMongo') customPlantPersistence: ICustomPlantPersistence
    ) {
        super(metricCache, metricPersistence);
        this.metricPersistence = metricPersistence;
        this.customPlantPersistence = customPlantPersistence;
    }

    async create(entity: Metric): Promise<Metric> {
        const newMetric = await this.persistenceService.create(entity);
        const customPlant = await this.customPlantPersistence.get(entity.customPlantId.toString());

        customPlant.latestMetric = newMetric;
        await this.customPlantPersistence.update(customPlant._id.toString(), customPlant);

        return newMetric;
    }

    async getAllByCustomPlant(customPlantId: string): Promise<Metric[]> {
        return await this.metricPersistence.getAllByCustomPlant(customPlantId);
    }

    async getLatestByCustomPlant(customPlantId: string): Promise<Metric[]> {
        return await this.metricPersistence.getLatestByCustomPlant(customPlantId);
    }
}