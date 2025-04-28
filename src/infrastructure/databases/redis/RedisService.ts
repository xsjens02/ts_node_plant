import { RedisClientType, RedisModules, RedisFunctions, RedisScripts, createClient } from "redis";
import { IRedisService } from "./interfaces/IRedisService.js";
import { inject, injectable } from "tsyringe";
import { RedisConfig } from "./config/RedisConfig.js";

@injectable()
export class RedisService implements IRedisService {
    private client?: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
    private url: string;

    constructor(@inject('RedisConfig') config: RedisConfig) {
        this.url = config.connectionUrl;
    }

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

    getClient(): RedisClientType<RedisModules, RedisFunctions, RedisScripts> {
        if (!this.client) {
            throw new Error("Redis is not connected. Please call connect() first.");
        }
        return this.client;
    }
}