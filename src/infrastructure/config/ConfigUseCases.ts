import { container } from "tsyringe";
import { UserManager } from "../../application/useCaseManagers/UserManager.js";
import { ILoginUser } from "../../application/useCases/interfaces/ILoginUser.js";
import { LoginUser } from "../../application/useCases/LoginUser.js";
import { IUseCaseManager } from "../../application/useCaseManagers/interfaces/IUseCaseManager.js";
import { User } from "../../domain/User.js";
import { IFileManager } from "../../application/useCaseManagers/interfaces/IFileManager.js";
import { FileManager } from "../../application/useCaseManagers/FileManager.js";
import { CustomPlantManager } from "../../application/useCaseManagers/CustomPlantManager.js";
import { GenericPlantManager } from "../../application/useCaseManagers/GenericPlantManager.js";
import { MetricManager } from "../../application/useCaseManagers/MetricManager.js";
import { IoTConfigManager } from "../../application/useCaseManagers/IoTConfigManager.js";
import { GenericPlant } from "../../domain/GenericPlant.js";
import { IoTConfig } from "../../domain/IoTConfig.js";
import { ICustomPlantManager } from "../../application/useCaseManagers/interfaces/ICustomPlantManager.js";
import { IMetricManager } from "../../application/useCaseManagers/interfaces/IMetricManager.js";

export function configure() {
    // ----- Use Case Manager Instances -----
    container.registerSingleton<IUseCaseManager<User>>('UserUseCaseManager', UserManager);
    container.registerSingleton<ICustomPlantManager>('CustomPlantUseCaseManager', CustomPlantManager);
    container.registerSingleton<IUseCaseManager<GenericPlant>>('GenericPlatUseCaseManager', GenericPlantManager);
    container.registerSingleton<IMetricManager>('MetricUseCaseManager', MetricManager);
    container.registerSingleton<IUseCaseManager<IoTConfig>>('IoTConfigUseCaseManager', IoTConfigManager);
    container.registerSingleton<IFileManager>('FileManager', FileManager);

    // ----- Use Case Instances -----
    container.registerSingleton<ILoginUser>('LoginUserUseCase', LoginUser);
}