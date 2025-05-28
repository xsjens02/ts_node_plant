import { User } from "../../../domain/User.js";
import { BaseRedis } from "./BaseRedis.js"
import { injectable, inject } from "tsyringe";
import { IRedisService } from "./interfaces/IRedisService.js";
import { IUserCache } from "../interfaces/cache/IUserCache.js";

@injectable()
export class UserRedis extends BaseRedis<User> implements IUserCache {

    constructor(@inject('RedisService') redisService: IRedisService) {
        super(redisService, 'user');
    }

    /**
     * Creates a new User in Redis cache.
     * Also stores a mapping from username to userId for quick lookup.
     * Returns the created User or null if user already exists.
     */
    async create(entity: User): Promise<User | null> {
        const createdUser = await super.create(entity);
        if (createdUser)
            await this.client.set(`username:${createdUser.userName}`, createdUser._id.toString(), { EX: this.ttlSeconds });

        return createdUser;
    }

    /**
     * Deletes a User by id from Redis cache.
     * Also removes the username-to-userId mapping if it exists.
     * Returns true if deletion was successful, false otherwise.
     */
    async delete(id: string): Promise<boolean> {
        if (!await this.objExists(id)) return false;

        const user = await this.get(id);
        const result = await this.client.del(`${this.entityName}:${id}`);
        if (await this.registeredByUsername(user.userName))
            await this.client.del(`username:${user.userName}`);
        return result > 0;
    }

    /**
     * Retrieves a User by username using the username-to-userId mapping.
     * Returns the User or null if not found.
     */
    async getByUsername(username: string): Promise<User | null> {
        const userId = await this.client.get(`username:${username}`);
        if (!userId) return null;

        return this.get(userId);
    }

    /**
     * Checks if a username mapping exists in Redis.
     * Returns true if exists, false otherwise.
     */
    private async registeredByUsername(username: string): Promise<boolean> {
        const exists = await this.client.exists(`username:${username}`);
        return exists > 0;
    }
}