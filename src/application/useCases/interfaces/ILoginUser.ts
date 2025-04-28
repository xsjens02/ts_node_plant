import { User } from "../../../domain/User.js";

export interface ILoginUser {
    validateLogin(username: string, password: string): Promise<User | null>;
}