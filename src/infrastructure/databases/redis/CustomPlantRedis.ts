import { BaseRedis } from "./BaseRedis.js";
import { IRedisService } from "./interfaces/IRedisService.js";
import { inject, injectable } from "tsyringe";
import { ICache } from "../interfaces/cache/ICache.js";
import { CustomPlant } from "../../../domain/CustomPlant.js";

@injectable()
export class CustomPlantRedis extends BaseRedis<CustomPlant> implements ICache<CustomPlant> {

    constructor(@inject('RedisService') redisService: IRedisService) {
        super(redisService, 'custom_plant');
    }
}