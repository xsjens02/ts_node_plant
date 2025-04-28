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

    async create(entity: User): Promise<User | null> {
        const createdUser = await super.create(entity);
        if (createdUser)
            await this.client.set(`username:${createdUser.userName}`, createdUser._id.toString(), { EX: this.ttlSeconds });

        return createdUser;
    }

    async delete(id: string): Promise<boolean> {
        if (!await this.objExists(id)) return false;

        const user = await this.get(id);
        const result = await this.client.del(`${this.entityName}:${id}`);
        if (await this.registeredByUsername(user.userName))
            await this.client.del(`username:${user.userName}`);
        return result > 0;
    }

    async getByUsername(username: string): Promise<User | null> {
        const userId = await this.client.get(`username:${username}`);
        if (!userId) return null;

        return this.get(userId);
    }

    private async registeredByUsername(username: string): Promise<boolean> {
        const exists = await this.client.exists(`username:${username}`);
        return exists > 0;
    }
}