import { BaseRedis } from "./BaseRedis.js";
import { IRedisService } from "./interfaces/IRedisService.js";
import { inject, injectable } from "tsyringe";
import { ICache } from "../interfaces/cache/ICache.js";
import { GenericPlant } from "../../../domain/GenericPlant.js";

@injectable()
export class GenericPlantRedis extends BaseRedis<GenericPlant> implements ICache<GenericPlant> {

    constructor(@inject('RedisService') redisService: IRedisService) {
        super(redisService, 'generic_plant');
    }
}