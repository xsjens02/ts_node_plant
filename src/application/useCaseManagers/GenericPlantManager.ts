import { injectable, inject } from "tsyringe";
import { IRepository } from "../../infrastructure/repositories/interfaces/IRepository.js";
import { GenericPlant } from "../../domain/GenericPlant.js";
import { BaseUseCaseManager } from "./BaseUseCaseManager.js";
import { IUseCaseManager } from "./interfaces/IUseCaseManager.js";

@injectable()
export class GenericPlantManager extends BaseUseCaseManager<GenericPlant> implements IUseCaseManager<GenericPlant> {

    constructor(@inject('GenericPlantRepository') genericPlantRepo: IRepository<GenericPlant>) {
        super(genericPlantRepo);
    }
}