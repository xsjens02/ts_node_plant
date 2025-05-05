import { injectable, inject } from "tsyringe";
import { IPersistence } from "../interfaces/persistence/IPersistence.js";
import { BaseMongo } from "./BaseMongo.js";
import { IMongoService } from "./interfaces/IMongoService.js";
import { IoTConfig } from "../../../domain/IoTConfig.js";

@injectable()
export class IoTConfigMongo extends BaseMongo<IoTConfig> implements IPersistence<IoTConfig> {
    
    constructor(@inject('MongoService') mongoService: IMongoService) {
        super(mongoService, "iot_configs");
    }
}