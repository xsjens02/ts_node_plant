import express from 'express';
import { container } from 'tsyringe';
import { IRestController } from '../infrastructure/controllers/rest/interfaces/IRestController.js';
import { CustomPlant } from '../domain/CustomPlant.js';

export function customPlantRoutes() {
    const router = express.Router();
    const customPlantController = container.resolve<IRestController<CustomPlant>>('CustomPlantRController');

    router.route("/")
        .post((req, res) => customPlantController.create(req, res)) 
        .get((req, res) => customPlantController.getAll(req, res)); 

    router.route("/:id")
        .get((req, res) => customPlantController.get(req, res)) 
        .put((req, res) => customPlantController.update(req, res)) 
        .delete((req, res) => customPlantController.delete(req, res));
    
    return router;
}