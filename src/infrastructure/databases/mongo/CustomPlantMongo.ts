import { injectable, inject } from "tsyringe";
import { BaseMongo } from "./BaseMongo.js";
import { IMongoService } from "./interfaces/IMongoService.js";
import { CustomPlant } from "../../../domain/CustomPlant.js";
import { ICustomPlantPersistence } from "../interfaces/persistence/ICustomPlantPersistence.js";
import { ObjectId } from "mongodb";

@injectable()
export class CustomPlantMongo extends BaseMongo<CustomPlant> implements ICustomPlantPersistence {
    
    constructor(@inject('MongoService') mongoService: IMongoService) {
        super(mongoService, "custom_plants");
    }

    /**
     * Retrieves all CustomPlant entities for a given user by userId.
     * Uses MongoDB ObjectId to query the collection.
     */
    async getAllByUser(userId: string): Promise<CustomPlant[]> {
        return await this.collection
            .find({ userId: new ObjectId(userId) })
            .toArray();
    }
}