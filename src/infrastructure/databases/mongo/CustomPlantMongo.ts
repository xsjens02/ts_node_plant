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
     * Creates a new CustomPlant document in MongoDB.
     * Converts userId and all nested object _id fields to ObjectId before saving.
     * Returns the saved CustomPlant.
     */
    async create(entity: CustomPlant): Promise<CustomPlant> {
        const entityWithObjectIds: CustomPlant = {
            ...entity,
            userId: new ObjectId(entity.userId),

            genericPlant: {
                ...entity.genericPlant,
                _id: new ObjectId(entity.genericPlant._id),
            },

            latestMetric: entity.latestMetric ? 
            {
                ...entity.latestMetric,
                _id: new ObjectId(entity.latestMetric._id),
                customPlantId: new ObjectId(entity.latestMetric.customPlantId),
            }
            : undefined,
        };

        return await super.create(entityWithObjectIds);
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