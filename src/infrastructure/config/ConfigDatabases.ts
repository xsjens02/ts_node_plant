import { container } from "tsyringe";
import { MongoConfig } from "../databases/mongo/config/MongoConfig.js";
import { IMongoService } from "../databases/mongo/interfaces/IMongoService.js";
import { MongoService } from "../databases/mongo/MongoService.js";
import { RedisConfig } from "../databases/redis/config/RedisConfig.js";
import { IRedisService } from "../databases/redis/interfaces/IRedisService.js";
import { RedisService } from "../databases/redis/RedisService.js";
import { ICache } from "../databases/interfaces/cache/ICache.js";
import { IUserCache } from "../databases/interfaces/cache/IUserCache.js";
import { UserRedis } from "../databases/redis/UserRedis.js";
import { IUserPersistence } from "../databases/interfaces/persistence/IUserPersistence.js";
import { UserMongo } from "../databases/mongo/UserMongo.js";
import { IPersistence } from "../databases/interfaces/persistence/IPersistence.js";
import { CustomPlant } from "../../domain/CustomPlant.js";
import { CustomPlantMongo } from "../databases/mongo/CustomPlantMongo.js";
import { GenericPlantMongo } from "../databases/mongo/GenericPlantMongo.js";
import { GenericPlant } from "../../domain/GenericPlant.js";
import { Metric } from "../../domain/Metric.js";
import { MetricMongo } from "../databases/mongo/MetricMongo.js";
import { IoTConfig } from "../../domain/IoTConfig.js";
import { IoTConfigMongo } from "../databases/mongo/IoTConfigMongo.js";
import { CustomPlantRedis } from "../databases/redis/CustomPlantRedis.js";
import { GenericPlantRedis } from "../databases/redis/GenericPlantRedis.js";
import { MetricRedis } from "../databases/redis/MetricRedis.js";
import { IoTConfigRedis } from "../databases/redis/IoTConfigRedis.js";

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

    // ----- Cache Redis Instances -----
    container.registerSingleton<IUserCache>('UserRedis', UserRedis);
    container.registerSingleton<ICache<CustomPlant>>('CustomPlantRedis', CustomPlantRedis);
    container.registerSingleton<ICache<GenericPlant>>('GenericPlantRedis', GenericPlantRedis);
    container.registerSingleton<ICache<Metric>>('MetricRedis', MetricRedis);
    container.registerSingleton<ICache<IoTConfig>>('IoTConfigRedis', IoTConfigRedis);

    // ----- Persistence Mongo Instances -----
    container.registerSingleton<IUserPersistence>('UserMongo', UserMongo);
    container.registerSingleton<IPersistence<CustomPlant>>('CustomPlantMongo', CustomPlantMongo);
    container.registerSingleton<IPersistence<GenericPlant>>('GenericPlantMongo', GenericPlantMongo);
    container.registerSingleton<IPersistence<Metric>>('MetricMongo', MetricMongo);
    container.registerSingleton<IPersistence<IoTConfig>>('IoTConfigMongo', IoTConfigMongo);

    // ----- Seeding -----
    //await populateGenericPlants();
}