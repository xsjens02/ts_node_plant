import { inject, injectable } from "tsyringe";
import { User } from "../../domain/User.js";
import { IHashingService } from "../../infrastructure/services/hashing/interfaces/IHashingService.js";
import { BaseUseCaseManager } from "./BaseUseCaseManager.js";
import { IUserRepository } from "../../infrastructure/repositories/interfaces/IUserRepository.js";
import { IUseCaseManager } from "./interfaces/IUseCaseManager.js";

@injectable()
export class UserManager extends BaseUseCaseManager<User> implements IUseCaseManager<User> {
    // Service used for hashing passwords
    private encryptionService: IHashingService;

    // Injects user repository and encryption service, and passes the repository to the base manager
    constructor(
        @inject('UserRepository') userRepository: IUserRepository, 
        @inject('EncryptionService') encryptionService: IHashingService
    ) {
        super(userRepository);
        this.encryptionService = encryptionService;
    }

    // Create a new user with a hashed password
    async create(entity: User): Promise<User | null> {
        const hashedPassword = await this.encryptionService.encrypt(entity.password);
        entity.password = hashedPassword;

        const newUser = await this.repository.create(entity);
        if (!newUser) return null;

        // Remove password from response for security
        newUser.password = "";
        return newUser;
    }

    // Get a user by ID and remove the password before returning
    async get(id: string): Promise<User | null> {
        const user = await this.repository.get(id);
        if (!user) return null;

        user.password = "";
        return user;
    }

    // Get all users and remove passwords from each
    async getAll(): Promise<User[]> {
        const userList = await this.repository.getAll();
        if (!userList.length) return userList;

        return userList.map(user => ({ ...user, password: "" }));
    }

    // Update a user. If a password is provided, hash it before saving
    async update(id: string, entity: User): Promise<boolean> {
        if (entity.password && entity.password.trim() !== "") {
            const hashedPassword = await this.encryptionService.encrypt(entity.password);
            entity.password = hashedPassword;
        } else {
            // If password is empty or not provided, don't update it
            delete (entity as any).password;
        }

        return await this.repository.update(id, entity);
    }
}