import { injectable, inject } from "tsyringe";
import { BaseRestController } from "./BaseRestController.js";
import { IUseCaseManager } from "../../../application/useCaseManagers/interfaces/IUseCaseManager.js";
import { IHandler } from "./handlers/interfaces/IHandler.js";
import { IRestController } from "./interfaces/IRestController.js";
import { CustomPlant } from "../../../domain/CustomPlant.js";


@injectable()
export class CustomPlantRController extends BaseRestController<CustomPlant> implements IRestController<CustomPlant> {

    constructor(
        @inject('CustomPlantUseCaseManager') customPlantManager: IUseCaseManager<CustomPlant>,
        @inject('CustomPlantAuthHandlers') authHandler: Partial<Record<keyof IRestController<CustomPlant>, IHandler>>
    ) {
        super(customPlantManager, authHandler);
    }
}