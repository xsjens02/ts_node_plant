import { injectable, inject } from "tsyringe";
import { IPersistence } from "../interfaces/persistence/IPersistence.js";
import { BaseMongo } from "./BaseMongo.js";
import { IMongoService } from "./interfaces/IMongoService.js";
import { GenericPlant } from "../../../domain/GenericPlant.js";

@injectable()
export class GenericPlantMongo extends BaseMongo<GenericPlant> implements IPersistence<GenericPlant> {
    
    constructor(@inject('MongoService') mongoService: IMongoService) {
        super(mongoService, "generic_plants");
    }
}