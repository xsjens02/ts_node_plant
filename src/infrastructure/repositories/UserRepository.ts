import { injectable, inject } from "tsyringe";
import { User } from "../../domain/User.js";
import { IUserCache } from "../databases/interfaces/cache/IUserCache.js";
import { IUserPersistence } from "../databases/interfaces/persistence/IUserPersistence.js";
import { BaseRepository } from "./BaseRepository.js";
import { IUserRepository } from "./interfaces/IUserRepository.js";

@injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository{
    private userCache: IUserCache;
    private userPersistence: IUserPersistence;

    constructor(
        @inject('UserRedis') userCache: IUserCache, 
        @inject('UserMongo') userPersistence: IUserPersistence
    ) {
        super(userCache, userPersistence);
        this.userCache = userCache;
        this.userPersistence = userPersistence;
    }

    async getByUsername(username: string): Promise<User | null> {
        const cachedUser = await this.userCache.getByUsername(username); 
        if (cachedUser) return cachedUser;

        const persistenceuser = await this.userPersistence.getByUsername(username);
        if (persistenceuser) await this.userCache.create(persistenceuser);

        return persistenceuser;
    }
}