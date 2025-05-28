import bcrypt from "bcrypt";
import { IHashingService } from "./interfaces/IHashingService.js";

export class BcryptService implements IHashingService {
    private saltRounds: number;

    /**
     * Initializes the hashing service.
     * - saltRounds: Number of salt rounds for bcrypt hashing
     */
    constructor(saltRounds: number) {
        this.saltRounds = saltRounds;
    }

    /**
     * Hashes a password using bcrypt with the configured salt rounds.
     */
    async encrypt(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    /**
     * Compares a plain password with a hashed password.
     * Returns true if they match, false otherwise.
     */
    async compare(password: string, userPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, userPassword);
    }
}