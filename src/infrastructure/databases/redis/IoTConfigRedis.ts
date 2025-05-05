import { BaseRedis } from "./BaseRedis.js";
import { IRedisService } from "./interfaces/IRedisService.js";
import { inject, injectable } from "tsyringe";
import { ICache } from "../interfaces/cache/ICache.js";
import { IoTConfig } from "../../../domain/IoTConfig.js";
import { ObjectId } from "mongodb";

@injectable()
export class IoTConfigRedis extends BaseRedis<IoTConfig> implements ICache<IoTConfig> {

    constructor(@inject('RedisService') redisService: IRedisService) {
        super(redisService, 'iot_config');
    }

    async get(id: string): Promise<IoTConfig | null> {
        const key = `${this.entityName}:${id}`;
                
        const entityString = await this.client.get(key);
        if (!entityString) return null;

        try {
            const parsedObj = JSON.parse(entityString);
            const entity = this.convertObjId(parsedObj);
            return entity as IoTConfig;
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