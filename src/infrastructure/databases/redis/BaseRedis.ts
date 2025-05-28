import { ObjectId } from "mongodb";
import { Identification } from "../../../domain/Identification.js";
import { IRedisService } from "./interfaces/IRedisService.js";
import { ICache } from "../interfaces/cache/ICache.js";
import { RedisClientType, RedisFunctions, RedisModules, RedisScripts } from "redis";

export class BaseRedis<T extends Identification> implements ICache<T> {
    // Redis key prefix for the entity type T
    protected entityName: string;
    // Redis client instance to interact with Redis server
    protected client: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
    // Time-to-live in seconds for cached entities
    protected ttlSeconds: number;

    /**
     * Initializes the Redis cache for the given entity type.
     * - redisService: Service providing the Redis client
     * - entityName: Name of the entity, used as Redis key prefix
     * - ttlSeconds: Expiry time in seconds (default: 3600)
     */
    constructor(redisService: IRedisService, entityName: string, ttlSeconds: number = 3600) {
        this.client = redisService.getClient();
        this.entityName = entityName.toLowerCase();
        this.ttlSeconds = ttlSeconds;
    }

    /**
     * Creates a new cached entity in Redis.
     * Returns the saved entity or null if it already exists.
     */
    async create(entity: T): Promise<T | null> {
        const key = `${this.entityName}:${entity._id.toString()}`;
        if (await this.objExists(entity._id.toString())) return null;

        const serializedEntity = JSON.stringify(entity);
        await this.client.set(key, serializedEntity, { EX: this.ttlSeconds });
        return await this.get(entity._id.toString());
    }

    /**
     * Retrieves an entity from Redis by its id.
     * Returns the entity or null if not found or parse error.
     */
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

    /**
     * Deletes an entity from Redis by id.
     * Returns true if deletion was successful, false otherwise.
     */
    async delete(id: string): Promise<boolean> {
        if (!await this.objExists(id)) return false;

        const result = await this.client.del(`${this.entityName}:${id}`);
        return result > 0;
    }

    /**
     * Checks if an entity exists in Redis by id.
     * Returns true if exists, false otherwise.
     */
    protected async objExists(id: string): Promise<boolean> {
        const exists = await this.client.exists(`${this.entityName}:${id}`);
        return exists > 0;
    }
}