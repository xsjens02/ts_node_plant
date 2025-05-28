import { injectable, inject } from "tsyringe";
import { User } from "../../domain/User.js";
import { IUserCache } from "../databases/interfaces/cache/IUserCache.js";
import { IUserPersistence } from "../databases/interfaces/persistence/IUserPersistence.js";
import { BaseRepository } from "./BaseRepository.js";
import { IUserRepository } from "./interfaces/IUserRepository.js";

@injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository{
    // Cache service for User entities
    private userCache: IUserCache;
    // Persistence service for User entities (e.g., database access)
    private userPersistence: IUserPersistence;

    constructor(
        @inject('UserRedis') userCache: IUserCache, 
        @inject('UserMongo') userPersistence: IUserPersistence
    ) {
        // Pass cache and persistence to base repository
        super(userCache, userPersistence);
        this.userCache = userCache;
        this.userPersistence = userPersistence;
    }

    /**
     * Retrieve a User by username.
     * Checks cache first; if not found, fetches from persistence and caches the result.
     */
    async getByUsername(username: string): Promise<User | null> {
        const cachedUser = await this.userCache.getByUsername(username); 
        if (cachedUser) return cachedUser;

        const persistenceUser = await this.userPersistence.getByUsername(username);
        if (persistenceUser) await this.userCache.create(persistenceUser);

        return persistenceUser;
    }
}