import { injectable, inject } from "tsyringe";
import { IPersistence } from "../interfaces/persistence/IPersistence.js";
import { BaseMongo } from "./BaseMongo.js";
import { IMongoService } from "./interfaces/IMongoService.js";
import { Metric } from "../../../domain/Metric.js";

@injectable()
export class MetricMongo extends BaseMongo<Metric> implements IPersistence<Metric> {
    
    constructor(@inject('MongoService') mongoService: IMongoService) {
        super(mongoService, "metrics");
    }
}