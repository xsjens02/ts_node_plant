import { injectable, inject } from "tsyringe";
import { ICache } from "../databases/interfaces/cache/ICache.js";
import { IPersistence } from "../databases/interfaces/persistence/IPersistence.js";
import { BaseRepository } from "./BaseRepository.js";
import { IRepository } from "./interfaces/IRepository.js";
import { CustomPlant } from "../../domain/CustomPlant.js";

@injectable()
export class CustomPlantRepository extends BaseRepository<CustomPlant> implements IRepository<CustomPlant> {
    
    constructor(
        @inject('CustomPlantRedis') customPlantCache: ICache<CustomPlant>, 
        @inject('CustomPlantMongo') customPlantPersistence: IPersistence<CustomPlant>
    ) {
        super(customPlantCache, customPlantPersistence);
    }
}