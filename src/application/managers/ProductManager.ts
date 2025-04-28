import { inject, injectable } from "tsyringe";
import { Product } from "../../domain/Product.js";
import { IRepository } from "../../infrastructure/repositories/interfaces/IRepository.js";
import { BaseUseCaseManager } from "./BaseUseCaseManager.js";
import { IUseCaseManager } from "./interfaces/IUseCaseManager.js";

@injectable()
export class ProductManager extends BaseUseCaseManager<Product> implements IUseCaseManager<Product> {

    constructor(@inject('ProductRepository') productRepo: IRepository<Product>) {
        super(productRepo);
    }
}