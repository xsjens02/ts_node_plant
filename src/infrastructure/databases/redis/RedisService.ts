import { RedisClientType, RedisModules, RedisFunctions, RedisScripts, createClient } from "redis";
import { IRedisService } from "./interfaces/IRedisService.js";
import { inject, injectable } from "tsyringe";
import { RedisConfig } from "./config/RedisConfig.js";

@injectable()
export class RedisService implements IRedisService {
    private client?: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
    private url: string;

    /**
     * Initializes the Redis service with the given configuration.
     * - config: Configuration object containing Redis connection URL
     */
    constructor(@inject('RedisConfig') config: RedisConfig) {
        this.url = config.connectionUrl;
    }

    /**
     * Connects to the Redis server if not already connected.
     * Sets up error handling and establishes the client connection.
     * Throws an error if connection fails.
     */
    async connect(): Promise<void> {
        if (this.client) return;

        try {
            this.client = createClient<RedisModules, RedisFunctions, RedisScripts>({url: this.url});
            this.client.on('error', (err) => console.error('Redis Client Error', err));
            await this.client.connect();
        } catch(e) {
            console.error("Error trying to connect to Redis", e);
            throw e;
        }
    }

    /**
     * Returns the connected Redis client instance.
     * Throws an error if called before connect().
     */
    getClient(): RedisClientType<RedisModules, RedisFunctions, RedisScripts> {
        if (!this.client) {
            throw new Error("Redis is not connected. Please call connect() first.");
        }
        return this.client;
    }
}