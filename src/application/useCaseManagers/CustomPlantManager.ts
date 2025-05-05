import { injectable, inject } from "tsyringe";
import { CustomPlant } from "../../domain/CustomPlant.js";
import { IRepository } from "../../infrastructure/repositories/interfaces/IRepository.js";
import { BaseUseCaseManager } from "./BaseUseCaseManager.js";
import { IUseCaseManager } from "./interfaces/IUseCaseManager.js";


@injectable()
export class CustomPlantManager extends BaseUseCaseManager<CustomPlant> implements IUseCaseManager<CustomPlant> {

    constructor(@inject('CustomPlantRepository') customPlantRepo: IRepository<CustomPlant>) {
        super(customPlantRepo);
    }
}