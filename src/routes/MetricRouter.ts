import express from 'express';
import { container } from 'tsyringe';
import { IRestController } from '../infrastructure/controllers/rest/interfaces/IRestController.js';
import { Metric } from '../domain/Metric.js';

export function metricRoutes() {
    const router = express.Router();
    const metricController = container.resolve<IRestController<Metric>>('MetricRController');

    router.route("/")
        .post((req, res) => metricController.create(req, res)) 
        .get((req, res) => metricController.getAll(req, res)); 

    router.route("/:id")
        .get((req, res) => metricController.get(req, res)) 
        .put((req, res) => metricController.update(req, res)) 
        .delete((req, res) => metricController.delete(req, res));
    
    return router;
}