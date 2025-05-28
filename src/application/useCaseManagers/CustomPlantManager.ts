import { injectable, inject } from "tsyringe";
import { CustomPlant } from "../../domain/CustomPlant.js";
import { BaseUseCaseManager } from "./BaseUseCaseManager.js";
import { ICustomPlantManager } from "./interfaces/ICustomPlantManager.js";
import { ICustomPlantRepository } from "../../infrastructure/repositories/interfaces/ICustomPlantRepository.js";


@injectable()
export class CustomPlantManager extends BaseUseCaseManager<CustomPlant> implements ICustomPlantManager {
    // Specific repository for CustomPlant operations
    private customPlantRepo: ICustomPlantRepository;

    // Injects the CustomPlantRepository and passes it to the base manager
    constructor(@inject('CustomPlantRepository') customPlantRepo: ICustomPlantRepository) {
        super(customPlantRepo);
        this.customPlantRepo = customPlantRepo;
    }

    // Get all custom plants for a specific user
    async getAllUserPlants(userId: string): Promise<CustomPlant[]> {
        return await this.customPlantRepo.getAllByUser(userId);
    }
}