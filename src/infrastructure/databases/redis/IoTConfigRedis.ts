import { BaseRedis } from "./BaseRedis.js";
import { IRedisService } from "./interfaces/IRedisService.js";
import { inject, injectable } from "tsyringe";
import { ICache } from "../interfaces/cache/ICache.js";
import { IoTConfig } from "../../../domain/IoTConfig.js";

@injectable()
export class IoTConfigRedis extends BaseRedis<IoTConfig> implements ICache<IoTConfig> {

    constructor(@inject('RedisService') redisService: IRedisService) {
        super(redisService, 'iot_config');
    }
}