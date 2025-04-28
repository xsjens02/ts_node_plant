import { injectable, inject } from "tsyringe";
import { Product } from "../../../domain/Product.js";
import { IPersistence } from "../interfaces/persistence/IPersistence.js";
import { BaseMongo } from "./BaseMongo.js";
import { IMongoService } from "./interfaces/IMongoService.js";

@injectable()
export class ProductMongo extends BaseMongo<Product> implements IPersistence<Product> {
    
    constructor(@inject('MongoService') mongoService: IMongoService) {
        super(mongoService, "products");
    }
}