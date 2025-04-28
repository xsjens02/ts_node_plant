import { User } from "../../../domain/User.js";
import { IRepository } from "./IRepository.js";

export interface IUserRepository extends IRepository<User> {
    getByUsername(username: string): Promise<User | null>;
}