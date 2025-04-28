import bcrypt from "bcrypt";
import { IHashingService } from "./interfaces/IHashingService.js";

export class BcryptService implements IHashingService {
    private saltRounds: number;

    constructor(saltRounds: number) {
        this.saltRounds = saltRounds;
    }

    async encrypt(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async compare(password: string, userPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, userPassword);
    }
}