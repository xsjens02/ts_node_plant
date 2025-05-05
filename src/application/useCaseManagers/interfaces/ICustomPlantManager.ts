import { IUseCaseManager } from "./IUseCaseManager.js";
import { CustomPlant } from "../../../domain/CustomPlant.js";

export interface ICustomPlantManager extends IUseCaseManager<CustomPlant>{
    getAllUserPlants(userId: string): Promise<CustomPlant[]>;
}