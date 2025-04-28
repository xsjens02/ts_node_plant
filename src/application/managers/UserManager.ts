import { inject, injectable } from "tsyringe";
import { User } from "../../domain/User.js";
import { IHashingService } from "../../infrastructure/services/hashing/interfaces/IHashingService.js";
import { BaseUseCaseManager } from "./BaseUseCaseManager.js";
import { IUserRepository } from "../../infrastructure/repositories/interfaces/IUserRepository.js";
import { IUseCaseManager } from "./interfaces/IUseCaseManager.js";

@injectable()
export class UserManager extends BaseUseCaseManager<User> implements IUseCaseManager<User> {
    private encryptionService: IHashingService;

    constructor(
        @inject('UserRepository') userRepository: IUserRepository, 
        @inject('EncryptionService') encryptionService: IHashingService
    ) {
        super(userRepository)
        this.encryptionService = encryptionService
    }

    async create(entity: User): Promise<User | null> {
        const hashedPassword = await this.encryptionService.encrypt(entity.password);
        entity.password = hashedPassword;

        const newUser = await this.repository.create(entity);
        if (!newUser) return null;

        newUser.password = "";
        return newUser;
    }

    async get(id: string): Promise<User | null> {
        const user = await this.repository.get(id);
        if (!user) return null;

        user.password = "";
        return user;
    }

    async getAll(): Promise<User[]> {
        const userList = await this.repository.getAll();
        if (!userList.length) return userList;

        return userList.map(user => ({ ...user, password: "" }));
    }

    async update(id: string, entity: User): Promise<boolean> {
        const hashedPassword = await this.encryptionService.encrypt(entity.password);
        entity.password = hashedPassword;

        return await this.repository.update(id, entity);
    }
}