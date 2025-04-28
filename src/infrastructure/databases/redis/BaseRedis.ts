import { ObjectId } from "mongodb";
import { Identification } from "../../../domain/Identification.js";
import { IRedisService } from "./interfaces/IRedisService.js";
import { ICache } from "../interfaces/cache/ICache.js";
import { RedisClientType, RedisFunctions, RedisModules, RedisScripts } from "redis";

export class BaseRedis<T extends Identification> implements ICache<T> {
    protected entityName: string;
    protected client: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
    protected ttlSeconds: number;

    constructor(redisService: IRedisService, entityName: string, ttlSeconds: number = 3600) {
        this.client = redisService.getClient();
        this.entityName = entityName.toLowerCase();
        this.ttlSeconds = ttlSeconds;
    }

    async create(entity: T): Promise<T | null> {
        const key = `${this.entityName}:${entity._id.toString()}`;
        if (await this.objExists(entity._id.toString())) return null;

        const serializedEntity = JSON.stringify(entity);
        await this.client.set(key, serializedEntity, { EX: this.ttlSeconds});
        return await this.get(entity._id.toString());
    }

    async get(id: string): Promise<T | null> {
        const key = `${this.entityName}:${id}`;
        
        const entityString = await this.client.get(key);
        if (!entityString) return null;

        try {
            const entity = JSON.parse(entityString);
            return { _id: new ObjectId(id), ...entity } as T;
        } catch (e) {
            return null;
        }
    }

    async delete(id: string): Promise<boolean> {
        if (!await this.objExists(id)) return false;

        const result = await this.client.del(`${this.entityName}:${id}`);
        return result > 0;
    }

    protected async objExists(id: string): Promise<boolean> {
        const exists = await this.client.exists(`${this.entityName}:${id}`);
        return exists > 0;
    }
}