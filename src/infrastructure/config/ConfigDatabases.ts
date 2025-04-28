import { container } from "tsyringe";
import { MongoConfig } from "../databases/mongo/config/MongoConfig.js";
import { IMongoService } from "../databases/mongo/interfaces/IMongoService.js";
import { MongoService } from "../databases/mongo/MongoService.js";
import { RedisConfig } from "../databases/redis/config/RedisConfig.js";
import { IRedisService } from "../databases/redis/interfaces/IRedisService.js";
import { RedisService } from "../databases/redis/RedisService.js";
import { ICache } from "../databases/interfaces/cache/ICache.js";
import { Product } from "../../domain/Product.js";
import { ProductRedis } from "../databases/redis/ProductRedis.js";
import { IUserCache } from "../databases/interfaces/cache/IUserCache.js";
import { UserRedis } from "../databases/redis/UserRedis.js";
import { IUserPersistence } from "../databases/interfaces/persistence/IUserPersistence.js";
import { UserMongo } from "../databases/mongo/UserMongo.js";
import { IPersistence } from "../databases/interfaces/persistence/IPersistence.js";
import { ProductMongo } from "../databases/mongo/ProductMongo.js";

export async function configure() {
    // ----- Redis Setup -----
    const redisConfig: RedisConfig = { 
        connectionUrl: process.env.REDIS_CON_STR 
    };
    container.registerInstance<RedisConfig>('RedisConfig', redisConfig);
    container.registerSingleton<IRedisService>("RedisService", RedisService);
    await container.resolve<IRedisService>('RedisService').connect();

    // ----- Mongo Setup -----
    const mongoConfig: MongoConfig = { 
        connectionUrl: process.env.MONGO_CON_STR, 
        databaseName: process.env.MONGO_DB_NAME 
    };
    container.registerInstance<MongoConfig>('MongoConfig', mongoConfig);
    container.registerSingleton<IMongoService>('MongoService', MongoService);
    await container.resolve<IMongoService>('MongoService').connect();

    // ----- Cache Instances -----
    container.registerSingleton<IUserCache>('UserRedis', UserRedis);
    container.registerSingleton<ICache<Product>>('ProductRedis', ProductRedis);

    // ----- Persistence Instances -----
    container.registerSingleton<IUserPersistence>('UserMongo', UserMongo);
    container.registerSingleton<IPersistence<Product>>('ProductMongo', ProductMongo);
}