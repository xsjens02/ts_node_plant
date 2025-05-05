import express from 'express';
import { container } from 'tsyringe';
import { IRestController } from '../infrastructure/controllers/rest/interfaces/IRestController.js';
import { IoTConfig } from '../domain/IoTConfig.js';

export function iotConfigRoutes() {
    const router = express.Router();
    const iotConfigController = container.resolve<IRestController<IoTConfig>>('IoTConfigRController');

    router.route("/")
        .post((req, res) => iotConfigController.create(req, res)) 
        .get((req, res) => iotConfigController.getAll(req, res)); 

    router.route("/:id")
        .get((req, res) => iotConfigController.get(req, res)) 
        .put((req, res) => iotConfigController.update(req, res)) 
        .delete((req, res) => iotConfigController.delete(req, res));
    
    return router;
}