import { injectable, inject } from "tsyringe";
import { BaseRestController } from "./BaseRestController.js";
import { IUseCaseManager } from "../../../application/useCaseManagers/interfaces/IUseCaseManager.js";
import { IHandler } from "./handlers/interfaces/IHandler.js";
import { IRestController } from "./interfaces/IRestController.js";
import { IoTConfig } from "../../../domain/IoTConfig.js";


@injectable()
export class IoTConfigRController extends BaseRestController<IoTConfig> implements IRestController<IoTConfig> {

    constructor(
        @inject('IoTConfigUseCaseManager') iotConfigManager: IUseCaseManager<IoTConfig>,
        @inject('IoTConfigAuthHandlers') authHandler: Partial<Record<keyof IRestController<IoTConfig>, IHandler>>
    ) {
        super(iotConfigManager, authHandler);
    }
}