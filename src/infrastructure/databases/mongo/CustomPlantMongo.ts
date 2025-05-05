import { injectable, inject } from "tsyringe";
import { IPersistence } from "../interfaces/persistence/IPersistence.js";
import { BaseMongo } from "./BaseMongo.js";
import { IMongoService } from "./interfaces/IMongoService.js";
import { CustomPlant } from "../../../domain/CustomPlant.js";

@injectable()
export class CustomPlantMongo extends BaseMongo<CustomPlant> implements IPersistence<CustomPlant> {
    
    constructor(@inject('MongoService') mongoService: IMongoService) {
        super(mongoService, "custom_plants");
    }
}