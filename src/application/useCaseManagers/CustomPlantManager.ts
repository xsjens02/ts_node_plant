import { injectable, inject } from "tsyringe";
import { CustomPlant } from "../../domain/CustomPlant.js";
import { BaseUseCaseManager } from "./BaseUseCaseManager.js";
import { ICustomPlantManager } from "./interfaces/ICustomPlantManager.js";
import { ICustomPlantRepository } from "../../infrastructure/repositories/interfaces/ICustomPlantRepository.js";


@injectable()
export class CustomPlantManager extends BaseUseCaseManager<CustomPlant> implements ICustomPlantManager {
    private customPlantRepo: ICustomPlantRepository;

    constructor(@inject('CustomPlantRepository') customPlantRepo: ICustomPlantRepository) {
        super(customPlantRepo);
        this.customPlantRepo = customPlantRepo;
    }

    async getAllUserPlants(userId: string): Promise<CustomPlant[]> {
        return await this.customPlantRepo.getAllByUser(userId);
    }
}