import { injectable, inject } from "tsyringe";
import { User } from "../../../domain/User.js";
import { IUserPersistence } from "../interfaces/persistence/IUserPersistence.js";
import { BaseMongo } from "./BaseMongo.js";
import { IMongoService } from "./interfaces/IMongoService.js";

@injectable()
export class UserMongo extends BaseMongo<User> implements IUserPersistence {

    constructor(@inject('MongoService') mongoService: IMongoService) {
        super(mongoService, "users");
    }

    async getByUsername(username: string): Promise<User | null> {
        return await this.collection.findOne({ userName: username });
    }
}