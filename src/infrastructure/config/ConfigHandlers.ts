import { container } from "tsyringe";
import { IHandler } from "../controllers/rest/handlers/interfaces/IHandler.js";
import { JWTAuthHandler } from "../controllers/rest/handlers/JWTAuthHandler.js";
import { IRestController } from "../controllers/rest/interfaces/IRestController.js";
import { ICookieService } from "../services/cookies/interfaces/ICookieService.js";
import { IJWTService } from "../services/tokens/interfaces/IJWTService.js";
import { CustomPlant } from "../../domain/CustomPlant.js";
import { GenericPlant } from "../../domain/GenericPlant.js";
import { Metric } from "../../domain/Metric.js";
import { IoTConfig } from "../../domain/IoTConfig.js";
import { User } from "../../domain/User.js";

// Function for creating instance of JWTAuthHandler
function buildAuthHandler(authLevel: number): JWTAuthHandler {
    const cookieService = container.resolve<ICookieService>('CookieService');
    const jwtService = container.resolve<IJWTService>('JWTService');
    const cookieName = container.resolve<string>('LoginCookieName');
    return new JWTAuthHandler(cookieService, jwtService, cookieName, authLevel);
}

// Function for creating uniform auth handlers for controller CRUD endpoints 
function buildUniformHandlers<T>(handler: IHandler): Partial<Record<keyof IRestController<T>, IHandler>> {
    return {
        create: handler,
        get: handler,
        getAll: handler,
        update: handler,
        delete: handler
    };
}

export function configure() {
    // ----- User Handlers -----
    const userAuthHandlers = {
        create: buildAuthHandler(10),
        get: buildAuthHandler(20),
        getAll: buildAuthHandler(10),
        update: buildAuthHandler(20),
        delete: buildAuthHandler(10)
    }
    container.registerInstance<Partial<Record<keyof IRestController<User>, IHandler>>>('UserAuthHandlers', userAuthHandlers);

    // ----- File Handler -----
    const fileAuthHandler = buildAuthHandler(20);
    container.registerInstance<IHandler>('FileAuthHandler', fileAuthHandler);

    // ----- Custom Plant Handlers -----
    const customPlantHandler = buildAuthHandler(20);
    const customPlantAuthHandlers = buildUniformHandlers<CustomPlant>(customPlantHandler);
    container.registerInstance<Partial<Record<keyof IRestController<CustomPlant>, IHandler>>>('CustomPlantAuthHandlers', customPlantAuthHandlers);

    // ----- Generic Plant Handlers -----
    const genericPlantHandler = buildAuthHandler(20);
    const genericPlantAuthHandlers = buildUniformHandlers<GenericPlant>(genericPlantHandler);
    container.registerInstance<Partial<Record<keyof IRestController<GenericPlant>, IHandler>>>('GenericPlantAuthHandlers', genericPlantAuthHandlers);

    // ----- Metric Handlers -----
    const metricHandler = buildAuthHandler(20);
    const metricAuthHandlers = buildUniformHandlers<Metric>(metricHandler);
    container.registerInstance<Partial<Record<keyof IRestController<Metric>, IHandler>>>('MetricAuthHandlers', metricAuthHandlers);

    // ----- IoT Config Handlers -----
    const iotConfigHandler = buildAuthHandler(20);
    const iotConfigAuthHandlers = buildUniformHandlers<IoTConfig>(iotConfigHandler);
    container.registerInstance<Partial<Record<keyof IRestController<IoTConfig>, IHandler>>>('IoTConfigAuthHandlers', iotConfigAuthHandlers);
}