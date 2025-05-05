import { container } from "tsyringe";
import { IRepository } from "../repositories/interfaces/IRepository.js";
import { IUserRepository } from "../repositories/interfaces/IUserRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { CustomPlantRepository } from "../repositories/CustomPlantRepository.js";
import { GenericPlantRepository } from "../repositories/GenericPlantRepository.js";
import { MetricRepository } from "../repositories/MetricRepository.js";
import { IoTConfigRepository } from "../repositories/IoTConfigRepository.js";
import { GenericPlant } from "../../domain/GenericPlant.js";
import { IoTConfig } from "../../domain/IoTConfig.js";
import { ICustomPlantRepository } from "../repositories/interfaces/ICustomPlantRepository.js";
import { IMetricRepository } from "../repositories/interfaces/IMetricRepository.js";

export function configure() {
    // ----- Repository Instances -----
    container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
    container.registerSingleton<ICustomPlantRepository>('CustomPlantRepository', CustomPlantRepository);
    container.registerSingleton<IRepository<GenericPlant>>('GenericPlantRepository', GenericPlantRepository);
    container.registerSingleton<IMetricRepository>('MetricRepository', MetricRepository);
    container.registerSingleton<IRepository<IoTConfig>>('IoTConfigRepository', IoTConfigRepository);
}