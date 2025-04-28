import express from 'express';
import { container } from 'tsyringe';
import { IController } from '../infrastructure/controllers/interfaces/IController.js';
import { Product } from '../domain/Product.js';

export function productRoutes() {
    const router = express.Router();
    const productController = container.resolve<IController<Product>>('ProductController');

    router.route("/")
        .post((req, res) => productController.create(req, res)) 
        .get((req, res) => productController.getAll(req, res)); 

    router.route("/:id")
        .get((req, res) => productController.get(req, res)) 
        .put((req, res) => productController.update(req, res)) 
        .delete((req, res) => productController.delete(req, res));
    
    return router;
}