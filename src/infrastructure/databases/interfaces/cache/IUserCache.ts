import { User } from "../../../../domain/User.js";
import { ICache } from "./ICache.js";

export interface IUserCache extends ICache<User> {
    getByUsername(username: string): Promise<User | null>;
}