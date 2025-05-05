import { BaseRedis } from "./BaseRedis.js";
import { IRedisService } from "./interfaces/IRedisService.js";
import { inject, injectable } from "tsyringe";
import { ICache } from "../interfaces/cache/ICache.js";
import { CustomPlant } from "../../../domain/CustomPlant.js";
import { ObjectId } from "mongodb";

@injectable()
export class CustomPlantRedis extends BaseRedis<CustomPlant> implements ICache<CustomPlant> {

    constructor(@inject('RedisService') redisService: IRedisService) {
        super(redisService, 'custom_plant');
    }

    async get(id: string): Promise<CustomPlant | null> {
        const key = `${this.entityName}:${id}`;
                
        const entityString = await this.client.get(key);
        if (!entityString) return null;

        try {
            const parsedObj = JSON.parse(entityString);
            const entity = this.convertObjId(parsedObj);
            return entity as CustomPlant;
        } catch (e) {
            return null;
        }
    }

    private convertObjId(parsedObj: object): object | null {
        for (const key in parsedObj) {
            const value = parsedObj[key];
            if(key === '_id' &&typeof value === "string")
                parsedObj[key] = new ObjectId(value);
            else if(typeof value === 'object' && value !== null)
                this.convertObjId(value)
        }
        return parsedObj;
    }
}