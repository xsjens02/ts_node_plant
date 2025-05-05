import { injectable, inject } from "tsyringe";
import { User } from "../../../domain/User.js";
import { IUserPersistence } from "../interfaces/persistence/IUserPersistence.js";
import { BaseMongo } from "./BaseMongo.js";
import { IMongoService } from "./interfaces/IMongoService.js";
import { EAuthRole } from "../../services/tokens/enums/EAuthRole.js";

@injectable()
export class UserMongo extends BaseMongo<User> implements IUserPersistence {

    constructor(@inject('MongoService') mongoService: IMongoService) {
        super(mongoService, "users");
        this.initBaseUser();
    }

    async getByUsername(username: string): Promise<User | null> {
        return await this.collection.findOne({ userName: username });
    }

    async initBaseUser(): Promise<void> {
        const adminUser: User = {
            name: "initUser",
            role: EAuthRole.ADMIN,
            email: "email@example.com",
            userName: "admin",
            password: "$2b$10$qVsw9jfky.ybBmPjej/MUOT86iP50iaBQWnnK/h2LwxJUdU6SszOi"
        }
        await this.create(adminUser);
    }
}