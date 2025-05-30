import { injectable, inject } from "tsyringe";
import { ICache } from "../databases/interfaces/cache/ICache.js";
import { BaseRepository } from "./BaseRepository.js";
import { CustomPlant } from "../../domain/CustomPlant.js";
import { ICustomPlantRepository } from "./interfaces/ICustomPlantRepository.js";
import { ICustomPlantPersistence } from "../databases/interfaces/persistence/ICustomPlantPersistence.js";

@injectable()
export class CustomPlantRepository extends BaseRepository<CustomPlant> implements ICustomPlantRepository {
    // Persistence service for CustomPlant-specific data access
    private customPlantPersistence: ICustomPlantPersistence;
    
    constructor(
        @inject('CustomPlantRedis') customPlantCache: ICache<CustomPlant>, 
        @inject('CustomPlantMongo') customPlantPersistence: ICustomPlantPersistence
    ) {
        // Pass cache and persistence services to the base repository
        super(customPlantCache, customPlantPersistence);
        this.customPlantPersistence = customPlantPersistence;
    }

    // Retrieve all CustomPlant entities associated with a specific user
    async getAllByUser(userId: string): Promise<CustomPlant[]> {
        return await this.customPlantPersistence.getAllByUser(userId);
    }
}