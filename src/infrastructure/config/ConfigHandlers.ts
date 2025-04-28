import { container } from "tsyringe";
import { Product } from "../../domain/Product.js";
import { IHandler } from "../controllers/handlers/interfaces/IHandler.js";
import { JWTAuthHandler } from "../controllers/handlers/JWTAuthHandler.js";
import { IController } from "../controllers/interfaces/IController.js";
import { ICookieService } from "../services/cookies/interfaces/ICookieService.js";
import { IJWTService } from "../services/tokens/interfaces/IJWTService.js";

// Function for creating instance of JWTAuthHandler
function buildAuthHandler(authLevel: number): JWTAuthHandler {
    const cookieService = container.resolve<ICookieService>('CookieService');
    const jwtService = container.resolve<IJWTService>('JWTService');
    const cookieName = container.resolve<string>('LoginCookieName');
    return new JWTAuthHandler(cookieService, jwtService, cookieName, authLevel);
}

// Function for creating uniform auth handlers for controller CRUD endpoints 
function buildUniformHandlers<T>(handler: IHandler): Partial<Record<keyof IController<T>, IHandler>> {
    return {
        create: handler,
        get: handler,
        getAll: handler,
        update: handler,
        delete: handler
    };
}

export function configure() {
    // ----- Product Handlers -----
    const productHandler = buildAuthHandler(20);
    const productAuthHandlers = buildUniformHandlers<Product>(productHandler);
    container.registerInstance<Partial<Record<keyof IController<Product>, IHandler>>>('ProductAuthHandlers', productAuthHandlers);

    // ----- User Handlers -----
    const userAuthHandlers = {
        create: buildAuthHandler(10),
        get: buildAuthHandler(20),
        getAll: buildAuthHandler(10),
        update: buildAuthHandler(20),
        delete: buildAuthHandler(10)
    }
    container.registerInstance<Partial<Record<keyof IController<Product>, IHandler>>>('UserAuthHandlers', userAuthHandlers);

    // ----- File Handler -----
    const fileAuthHandler = buildAuthHandler(20);
    container.registerInstance<IHandler>('FileAuthHandler', fileAuthHandler);
}