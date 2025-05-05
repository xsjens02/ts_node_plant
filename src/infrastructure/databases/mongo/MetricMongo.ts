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

    async getAllByCustomPlant(customPlantId: string): Promise<Metric[]> {
        return await this.collection
            .find({ customPlantId: new ObjectId(customPlantId) })
            .toArray();
    }

    async getLatestByCustomPlant(customPlantId: string): Promise<Metric[]> {
        return await this.collection
            .find({ customPlantId: new ObjectId(customPlantId) })
            .sort({ dateTimeStamp: -1 })
            .limit(5)
            .toArray();
    }
}