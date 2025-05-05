import { BaseRedis } from "./BaseRedis.js";
import { IRedisService } from "./interfaces/IRedisService.js";
import { inject, injectable } from "tsyringe";
import { ICache } from "../interfaces/cache/ICache.js";
import { Metric } from "../../../domain/Metric.js";

@injectable()
export class MetricRedis extends BaseRedis<Metric> implements ICache<Metric> {

    constructor(@inject('RedisService') redisService: IRedisService) {
        super(redisService, 'metric');
    }
}