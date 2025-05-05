import { injectable, inject } from "tsyringe";
import { BaseRestController } from "./BaseRestController.js";
import { IHandler } from "./handlers/interfaces/IHandler.js";
import { IRestController } from "./interfaces/IRestController.js";
import { CustomPlant } from "../../../domain/CustomPlant.js";
import { ICustomPlantManager } from "../../../application/useCaseManagers/interfaces/ICustomPlantManager.js";
import { ICustomPlantRController } from "./interfaces/ICustomPlantRController.js";


@injectable()
export class CustomPlantRController extends BaseRestController<CustomPlant> implements ICustomPlantRController {
    private customPlantManager: ICustomPlantManager;

    constructor(
        @inject('CustomPlantUseCaseManager') customPlantManager: ICustomPlantManager,
        @inject('CustomPlantAuthHandlers') authHandler: Partial<Record<keyof IRestController<CustomPlant>, IHandler>>
    ) {
        super(customPlantManager, authHandler);
        this.customPlantManager = customPlantManager;
    }

    async getAllByUser(req: any, res: any): Promise<Response> {
        return await this.handleRequest(
            req, 
            res, 
            "get",
            async (req) => await this.customPlantManager.getAllUserPlants(req.params.id), 
            this.validateReqId
        );
    }
}