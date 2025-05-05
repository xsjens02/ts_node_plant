import { container } from "tsyringe";
import { IRestController } from "../controllers/rest/interfaces/IRestController.js";
import { User } from "../../domain/User.js";
import { ILoginRController } from "../controllers/rest/interfaces/ILoginRController.js";
import { IFileRController } from "../controllers/rest/interfaces/IFileRController.js";
import { ISignUpRController } from "../controllers/rest/interfaces/ISignUpRController.js";
import { FileRController } from "../controllers/rest/FileRController.js";
import { LoginRController } from "../controllers/rest/LoginRController.js";
import { SignUpRController } from "../controllers/rest/SignUpRController.js";
import { UserRController } from "../controllers/rest/UserRController.js";
import { CustomPlant } from "../../domain/CustomPlant.js";
import { GenericPlant } from "../../domain/GenericPlant.js";
import { Metric } from "../../domain/Metric.js";
import { IoTConfig } from "../../domain/IoTConfig.js";
import { CustomPlantRController } from "../controllers/rest/CustomPlantRController.js";
import { GenericPlantRController } from "../controllers/rest/GenericPlantRController.js";
import { MetricRController } from "../controllers/rest/MetricRController.js";
import { IoTConfigRController } from "../controllers/rest/IoTConfigRController.js";
import { ISocketController } from "../controllers/websocket/interfaces/ISocketController.js";
import { MetricSController } from "../controllers/websocket/MetricSController.js";
import { IoTConfigSController } from "../controllers/websocket/IoTConfigSController.js";
import { ICustomPlantRController } from "../controllers/rest/interfaces/ICustomPlantRController.js";
import { IMetricRController } from "../controllers/rest/interfaces/IMetricRController.js";

export function configure() {
    // ----- Rest Controller Instances -----
    container.registerSingleton<ISignUpRController>('SignUpRController', SignUpRController);
    container.registerSingleton<ILoginRController>('LoginRController', LoginRController);
    container.registerSingleton<IRestController<User>>('UserRController', UserRController);
    container.registerSingleton<IFileRController>('FileRController', FileRController);
    container.registerSingleton<ICustomPlantRController>('CustomPlantRController', CustomPlantRController);
    container.registerSingleton<IRestController<GenericPlant>>('GenericPlantRController', GenericPlantRController);
    container.registerSingleton<IMetricRController>('MetricRController', MetricRController);
    container.registerSingleton<IRestController<IoTConfig>>('IoTConfigRController', IoTConfigRController);

    // ----- Websocket Controller Instances -----
    container.registerSingleton<ISocketController<Metric>>('MetricSController', MetricSController);
    container.registerSingleton<ISocketController<IoTConfig>>('IoTConfigSController', IoTConfigSController);
}