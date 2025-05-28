import { injectable, inject } from "tsyringe";
import { ICache } from "../databases/interfaces/cache/ICache.js";
import { BaseRepository } from "./BaseRepository.js";
import { Metric } from "../../domain/Metric.js";
import { IMetricRepository } from "./interfaces/IMetricRepository.js";
import { IMetricPersistence } from "../databases/interfaces/persistence/IMetricPersistence.js";
import { ICustomPlantPersistence } from "../databases/interfaces/persistence/ICustomPlantPersistence.js";

@injectable()
export class MetricRepository extends BaseRepository<Metric> implements IMetricRepository {
    // Persistence service for Metric-specific data access
    private metricPersistence: IMetricPersistence;
    // Persistence service for CustomPlant entities, used for updates
    private customPlantPersistence: ICustomPlantPersistence;
    
    constructor(
        @inject('MetricRedis') metricCache: ICache<Metric>, 
        @inject('MetricMongo') metricPersistence: IMetricPersistence,
        @inject('CustomPlantMongo') customPlantPersistence: ICustomPlantPersistence
    ) {
        // Pass cache and persistence to base repository
        super(metricCache, metricPersistence);
        this.metricPersistence = metricPersistence;
        this.customPlantPersistence = customPlantPersistence;
    }

    /**
     * Create a new Metric entity, then update the related CustomPlant
     * with the latest metric data.
     */
    async create(entity: Metric): Promise<Metric> {
        const newMetric = await this.persistenceService.create(entity);

        const customPlant = await this.customPlantPersistence.get(entity.customPlantId.toString());
        if (customPlant) {
            customPlant.latestMetric = newMetric;
            await this.customPlantPersistence.update(customPlant._id.toString(), customPlant);
        }

        return newMetric;
    }

    // Retrieve all metrics linked to a specific CustomPlant
    async getAllByCustomPlant(customPlantId: string): Promise<Metric[]> {
        return await this.metricPersistence.getAllByCustomPlant(customPlantId);
    }

    // Retrieve the latest metrics for a specific CustomPlant
    async getLatestByCustomPlant(customPlantId: string): Promise<Metric[]> {
        return await this.metricPersistence.getLatestByCustomPlant(customPlantId);
    }
}