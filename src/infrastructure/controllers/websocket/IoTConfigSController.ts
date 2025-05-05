import { injectable, inject } from "tsyringe";
import { BaseSocketController } from "./BaseSocketController.js";
import { ISocketController } from "./interfaces/ISocketController.js";
import { IUseCaseManager } from "../../../application/useCaseManagers/interfaces/IUseCaseManager.js";
import { IoTConfig } from "../../../domain/IoTConfig.js";

@injectable()
export class IoTConfigSController extends BaseSocketController<IoTConfig> implements ISocketController<IoTConfig> {

    constructor(@inject('IoTConfigUseCaseManager') iotConfigManager: IUseCaseManager<IoTConfig>,) {
        super(iotConfigManager, 'iot_config');
    }
}