import { CustomPlant } from "../../../domain/CustomPlant.js";
import { IRepository } from "./IRepository.js";

export interface ICustomPlantRepository extends IRepository<CustomPlant> {
    getAllByUser(userId: string): Promise<CustomPlant[]>;
}