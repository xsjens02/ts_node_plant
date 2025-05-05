import { CustomPlant } from "../../../../domain/CustomPlant.js";
import { IPersistence } from "./IPersistence.js";

export interface ICustomPlantPersistence extends IPersistence<CustomPlant> {
    getAllByUser(userId: string): Promise<CustomPlant[]>;
}