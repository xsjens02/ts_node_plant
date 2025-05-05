import express from 'express';
import { container } from 'tsyringe';
import { IRestController } from '../infrastructure/controllers/rest/interfaces/IRestController.js';
import { GenericPlant } from '../domain/GenericPlant.js';

export function genericPlantRoutes() {
    const router = express.Router();
    const genericPlantController = container.resolve<IRestController<GenericPlant>>('GenericPlantRController');

    router.route("/")
        .post((req, res) => genericPlantController.create(req, res)) 
        .get((req, res) => genericPlantController.getAll(req, res)); 

    router.route("/:id")
        .get((req, res) => genericPlantController.get(req, res)) 
        .put((req, res) => genericPlantController.update(req, res)) 
        .delete((req, res) => genericPlantController.delete(req, res));
    
    return router;
}