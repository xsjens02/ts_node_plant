import { injectable, inject } from "tsyringe";
import { IRepository } from "../../infrastructure/repositories/interfaces/IRepository.js";
import { IoTConfig } from "../../domain/IoTConfig.js";
import { BaseUseCaseManager } from "./BaseUseCaseManager.js";
import { IUseCaseManager } from "./interfaces/IUseCaseManager.js";

@injectable()
export class IoTConfigManager extends BaseUseCaseManager<IoTConfig> implements IUseCaseManager<IoTConfig> {

    constructor(@inject('IoTConfigRepository') iotConfigRepo: IRepository<IoTConfig>) {
        super(iotConfigRepo);
    }
}