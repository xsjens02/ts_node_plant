import { injectable, inject } from "tsyringe";
import { User } from "../../domain/User.js";
import { IHashingService } from "../../infrastructure/services/hashing/interfaces/IHashingService.js";
import { ILoginUser } from "./interfaces/ILoginUser.js";
import { IUserRepository } from "../../infrastructure/repositories/interfaces/IUserRepository.js";

@injectable()
export class LoginUser implements ILoginUser {
    // Repository for fetching user data
    private userRepo: IUserRepository;

    // Service for comparing hashed passwords
    private encryptionService: IHashingService;

    // Injects the user repository and hashing service
    constructor(
        @inject('UserRepository') userRepo: IUserRepository, 
        @inject('EncryptionService') encryptionService: IHashingService
    ) {
        this.userRepo = userRepo;
        this.encryptionService = encryptionService;
    }

    // Validates user login credentials
    async validateLogin(username: string, password: string): Promise<User | null> {
        const user = await this.userRepo.getByUsername(username);
        if (!user) return null;

        // Check if the provided password matches the stored hashed password
        const match = await this.encryptionService.compare(password, user.password);
        if (!match) return null;

        // Remove password before returning the user object
        user.password = "";
        return user;
    }
}