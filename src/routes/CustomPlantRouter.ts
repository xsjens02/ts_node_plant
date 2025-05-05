import express from 'express';
import { container } from 'tsyringe';
import { ICustomPlantRController } from '../infrastructure/controllers/rest/interfaces/ICustomPlantRController.js';

export function customPlantRoutes() {
    const router = express.Router();
    const customPlantController = container.resolve<ICustomPlantRController>('CustomPlantRController');

    router.route("/")
        .post((req, res) => customPlantController.create(req, res)) 
        .get((req, res) => customPlantController.getAll(req, res)); 

    router.route("/:id")
        .get((req, res) => customPlantController.get(req, res)) 
        .put((req, res) => customPlantController.update(req, res)) 
        .delete((req, res) => customPlantController.delete(req, res));
    
    router.route("/user/:id")
        .get((req, res) => customPlantController.getAllByUser(req, res));
    
    return router;
}