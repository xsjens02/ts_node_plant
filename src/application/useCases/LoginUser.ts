import { injectable, inject } from "tsyringe";
import { User } from "../../domain/User.js";
import { IHashingService } from "../../infrastructure/services/hashing/interfaces/IHashingService.js";
import { ILoginUser } from "./interfaces/ILoginUser.js";
import { IUserRepository } from "../../infrastructure/repositories/interfaces/IUserRepository.js";

@injectable()
export class LoginUser implements ILoginUser {
    private userRepo: IUserRepository;
    private encryptionService: IHashingService;

    constructor(
        @inject('UserRepository') userRepo: IUserRepository, 
        @inject('EncryptionService') encryptionService: IHashingService
    ) {
        this.userRepo = userRepo;
        this.encryptionService = encryptionService;
    }

    async validateLogin(username: string, password: string): Promise<User | null> {
        const user = await this.userRepo.getByUsername(username);
        if (!user) return null;

        const match = await this.encryptionService.compare(password, user.password);
        if (!match) return null;

        user.password = "";
        return user;
    }
}