import { injectable, inject } from "tsyringe";
import { ICache } from "../databases/interfaces/cache/ICache.js";
import { IPersistence } from "../databases/interfaces/persistence/IPersistence.js";
import { BaseRepository } from "./BaseRepository.js";
import { IRepository } from "./interfaces/IRepository.js";
import { IoTConfig } from "../../domain/IoTConfig.js";

@injectable()
export class IoTConfigRepository extends BaseRepository<IoTConfig> implements IRepository<IoTConfig> {
    
    constructor(
        @inject('IoTConfigRedis') iotConfigCache: ICache<IoTConfig>, 
        @inject('IoTConfigMongo') iotConfigPersistence: IPersistence<IoTConfig>
    ) {
        super(iotConfigCache, iotConfigPersistence);
    }
}