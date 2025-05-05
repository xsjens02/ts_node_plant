import { CustomPlant } from "../../../../domain/CustomPlant.js";
import { IRestController } from "./IRestController.js";

export interface ICustomPlantRController extends IRestController<CustomPlant> {
    getAllByUser(req: any, res: any): Promise<Response>;
}