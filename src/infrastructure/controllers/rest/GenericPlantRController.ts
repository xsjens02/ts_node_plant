import { injectable, inject } from "tsyringe";
import { BaseRestController } from "./BaseRestController.js";
import { IUseCaseManager } from "../../../application/useCaseManagers/interfaces/IUseCaseManager.js";
import { IHandler } from "./handlers/interfaces/IHandler.js";
import { IRestController } from "./interfaces/IRestController.js";
import { GenericPlant } from "../../../domain/GenericPlant.js";


@injectable()
export class GenericPlantRController extends BaseRestController<GenericPlant> implements IRestController<GenericPlant> {

    constructor(
        @inject('GenericPlatUseCaseManager') genericPlantManager: IUseCaseManager<GenericPlant>,
        @inject('GenericPlantAuthHandlers') authHandler: Partial<Record<keyof IRestController<GenericPlant>, IHandler>>
    ) {
        super(genericPlantManager, authHandler);
    }
}