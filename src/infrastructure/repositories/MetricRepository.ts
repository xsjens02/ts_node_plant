import { injectable, inject } from "tsyringe";
import { ICache } from "../databases/interfaces/cache/ICache.js";
import { IPersistence } from "../databases/interfaces/persistence/IPersistence.js";
import { BaseRepository } from "./BaseRepository.js";
import { IRepository } from "./interfaces/IRepository.js";
import { Metric } from "../../domain/Metric.js";

@injectable()
export class MetricRepository extends BaseRepository<Metric> implements IRepository<Metric> {
    
    constructor(
        @inject('MetricRedis') metricCache: ICache<Metric>, 
        @inject('MetricMongo') metricPersistence: IPersistence<Metric>
    ) {
        super(metricCache, metricPersistence);
    }
}