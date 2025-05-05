import { BaseRedis } from "./BaseRedis.js";
import { IRedisService } from "./interfaces/IRedisService.js";
import { inject, injectable } from "tsyringe";
import { ICache } from "../interfaces/cache/ICache.js";
import { Metric } from "../../../domain/Metric.js";
import { ObjectId } from "mongodb";

@injectable()
export class MetricRedis extends BaseRedis<Metric> implements ICache<Metric> {

    constructor(@inject('RedisService') redisService: IRedisService) {
        super(redisService, 'metric');
    }

    async get(id: string): Promise<Metric | null> {
        const key = `${this.entityName}:${id}`;
                
        const entityString = await this.client.get(key);
        if (!entityString) return null;

        try {
            const parsedObj = JSON.parse(entityString);
            const entity = this.convertObjId(parsedObj);
            return entity as Metric;
        } catch (e) {
            return null;
        }
    }

    private convertObjId(parsedObj: object): object | null {
        for (const key in parsedObj) {
            const value = parsedObj[key];
            if(key === '_id' &&typeof value === "string")
                parsedObj[key] = new ObjectId(value);
            if(key === 'customPlantId' && typeof value === "string")
                parsedObj[key] = new ObjectId(value);
        }
        return parsedObj;
    }
}