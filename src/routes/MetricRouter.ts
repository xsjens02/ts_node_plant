import express from 'express';
import { container } from 'tsyringe';
import { IMetricRController } from '../infrastructure/controllers/rest/interfaces/IMetricRController.js';

export function metricRoutes() {
    const router = express.Router();

    // Resolve the metric controller using dependency injection
    const metricController = container.resolve<IMetricRController>('MetricRController');

    // Route: /api/metrics
    // Handles creation and retrieval of all metric entries
    router.route("/")
        .post((req, res) => metricController.create(req, res))   // Create a new metric entry
        .get((req, res) => metricController.getAll(req, res));   // Get all metrics

    // Route: /api/metrics/:id
    // Handles retrieval, update, and deletion of a specific metric by ID
    router.route("/:id")
        .get((req, res) => metricController.get(req, res))       // Get a specific metric
        .put((req, res) => metricController.update(req, res))    // Update a metric
        .delete((req, res) => metricController.delete(req, res));// Delete a metric

    // Route: /api/metrics/plant/:id
    router.route("/plant/:id")
        .get((req, res) => metricController.getAllByCustomPlant(req, res));  // Get all metrics associated with a specific custom plant

    // Route: /api/metrics/plant/latest/:id
    router.route("/plant/latest/:id")
        .get((req, res) => metricController.getLatestByCustomPlant(req, res));  // Get the latest metric for a specific custom plant
    
    return router;
}