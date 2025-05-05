import { container } from "tsyringe";
import { IRepository } from "../repositories/interfaces/IRepository.js";
import { IUserRepository } from "../repositories/interfaces/IUserRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { CustomPlantRepository } from "../repositories/CustomPlantRepository.js";
import { GenericPlantRepository } from "../repositories/GenericPlantRepository.js";
import { MetricRepository } from "../repositories/MetricRepository.js";
import { IoTConfigRepository } from "../repositories/IoTConfigRepository.js";
import { CustomPlant } from "../../domain/CustomPlant.js";
import { GenericPlant } from "../../domain/GenericPlant.js";
import { IoTConfig } from "../../domain/IoTConfig.js";
import { Metric } from "../../domain/Metric.js";

export function configure() {
    // ----- Repository Instances -----
    container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
    container.registerSingleton<IRepository<CustomPlant>>('CustomPlantRepository', CustomPlantRepository);
    container.registerSingleton<IRepository<GenericPlant>>('GenericPlantRepository', GenericPlantRepository);
    container.registerSingleton<IRepository<Metric>>('MetricRepository', MetricRepository);
    container.registerSingleton<IRepository<IoTConfig>>('IoTConfigRepository', IoTConfigRepository);
}