import { User } from "../../../../domain/User.js";
import { IPersistence } from "./IPersistence.js";

export interface IUserPersistence extends IPersistence<User> {
    getByUsername(username: string): Promise<User | null>;
}