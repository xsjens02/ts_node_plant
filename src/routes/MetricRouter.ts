import express from 'express';
import { container } from 'tsyringe';
import { IMetricRController } from '../infrastructure/controllers/rest/interfaces/IMetricRController.js';

export function metricRoutes() {
    const router = express.Router();
    const metricController = container.resolve<IMetricRController>('MetricRController');

    router.route("/")
        .post((req, res) => metricController.create(req, res)) 
        .get((req, res) => metricController.getAll(req, res)); 

    router.route("/:id")
        .get((req, res) => metricController.get(req, res)) 
        .put((req, res) => metricController.update(req, res)) 
        .delete((req, res) => metricController.delete(req, res));
    
    router.route("/plant/:id")
        .get((req, res) => metricController.getAllByCustomPlant(req, res));
    
    router.route("/plant/latest/:id")
        .get((req, res) => metricController.getLatestByCustomPlant(req, res));
    
    return router;
}