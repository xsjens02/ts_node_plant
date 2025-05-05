import { injectable, inject } from "tsyringe";
import { ICache } from "../databases/interfaces/cache/ICache.js";
import { IPersistence } from "../databases/interfaces/persistence/IPersistence.js";
import { BaseRepository } from "./BaseRepository.js";
import { IRepository } from "./interfaces/IRepository.js";
import { GenericPlant } from "../../domain/GenericPlant.js";

@injectable()
export class GenericPlantRepository extends BaseRepository<GenericPlant> implements IRepository<GenericPlant> {
    
    constructor(
        @inject('GenericPlantRedis') genericPlantCache: ICache<GenericPlant>, 
        @inject('GenericPlantMongo') genericPlantPersistence: IPersistence<GenericPlant>
    ) {
        super(genericPlantCache, genericPlantPersistence);
    }
}