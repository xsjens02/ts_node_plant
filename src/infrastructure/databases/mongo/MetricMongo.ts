import { injectable, inject } from "tsyringe";
import { BaseMongo } from "./BaseMongo.js";
import { IMongoService } from "./interfaces/IMongoService.js";
import { Metric } from "../../../domain/Metric.js";
import { IMetricPersistence } from "../interfaces/persistence/IMetricPersistence.js";
import { ObjectId } from "mongodb";

@injectable()
export class MetricMongo extends BaseMongo<Metric> implements IMetricPersistence {
    
    constructor(@inject('MongoService') mongoService: IMongoService) {
        super(mongoService, "metrics");
    }

    /**
     * Retrieves all Metric documents associated with a specific CustomPlant by its ID.
     * Converts the customPlantId string to a MongoDB ObjectId for querying.
     */
    async getAllByCustomPlant(customPlantId: string): Promise<Metric[]> {
        return await this.collection
            .find({ customPlantId: new ObjectId(customPlantId) })
            .toArray();
    }

    /**
     * Retrieves the latest 5 Metric documents for a given CustomPlant, sorted by dateTimeStamp descending.
     * This provides recent metric data for the specified CustomPlant.
     */
    async getLatestByCustomPlant(customPlantId: string): Promise<Metric[]> {
        return await this.collection
            .find({ customPlantId: new ObjectId(customPlantId) })
            .sort({ dateTimeStamp: -1 })
            .limit(5)
            .toArray();
    }
}