import { RedisClientType, RedisFunctions, RedisModules, RedisScripts } from "redis";

export interface IRedisService {
    connect(): Promise<void>;
    getClient(): RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
}