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

    /**
     * Retrieves a Metric entity by id from Redis.
     * Parses the stored JSON and converts string _id and customPlantId fields to ObjectId.
     * Returns the entity or null if not found or parse fails.
     */
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

    /**
     * Converts specific string fields (_id, customPlantId) in the object to MongoDB ObjectId.
     * Returns the updated object.
     */
    private convertObjId(parsedObj: object): object | null {
        for (const key in parsedObj) {
            const value = parsedObj[key];
            if ((key === '_id' || key == 'customPlantId') && typeof value === "string")
                parsedObj[key] = new ObjectId(value);
        }
        return parsedObj;
    }
}