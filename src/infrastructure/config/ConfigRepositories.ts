import { container } from "tsyringe";
import { Product } from "../../domain/Product.js";
import { IRepository } from "../repositories/interfaces/IRepository.js";
import { IUserRepository } from "../repositories/interfaces/IUserRepository.js";
import { ProductRepository } from "../repositories/ProductRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";

export function configure() {
    // ----- Repository Instances -----
    container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
    container.registerSingleton<IRepository<Product>>('ProductRepository', ProductRepository);
}