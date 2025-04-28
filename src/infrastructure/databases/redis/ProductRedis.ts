import { Product } from "../../../domain/Product.js";
import { BaseRedis } from "./BaseRedis.js";
import { IRedisService } from "./interfaces/IRedisService.js";
import { inject, injectable } from "tsyringe";
import { ICache } from "../interfaces/cache/ICache.js";

@injectable()
export class ProductRedis extends BaseRedis<Product> implements ICache<Product> {

    constructor(@inject('RedisService') redisService: IRedisService) {
        super(redisService, 'product');
    }
}