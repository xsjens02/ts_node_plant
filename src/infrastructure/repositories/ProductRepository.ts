import { injectable, inject } from "tsyringe";
import { Product } from "../../domain/Product.js";
import { ICache } from "../databases/interfaces/cache/ICache.js";
import { IPersistence } from "../databases/interfaces/persistence/IPersistence.js";
import { BaseRepository } from "./BaseRepository.js";
import { IRepository } from "./interfaces/IRepository.js";

@injectable()
export class ProductRepository extends BaseRepository<Product> implements IRepository<Product> {
    
    constructor(
        @inject('ProductRedis') productCache: ICache<Product>, 
        @inject('ProductMongo') productPersistence: IPersistence<Product>
    ) {
        super(productCache, productPersistence);
    }
}