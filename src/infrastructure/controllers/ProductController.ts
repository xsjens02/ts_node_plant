import { injectable, inject } from "tsyringe";
import { Product } from "../../domain/Product.js";
import { BaseController } from "./BaseController.js";
import { IHandler } from "./handlers/interfaces/IHandler.js";
import { IUseCaseManager } from "../../application/managers/interfaces/IUseCaseManager.js";
import { IController } from "./interfaces/IController.js";

@injectable()
export class ProductController extends BaseController<Product> implements IController<Product> {

    constructor(
        @inject('ProductUseCaseManager') productManager: IUseCaseManager<Product>,
        @inject('ProductAuthHandlers') authHandler: Partial<Record<keyof IController<Product>, IHandler>>
    ) {
        super(productManager, authHandler);
    }
}