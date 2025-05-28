import express from 'express';
import { container } from 'tsyringe';
import { IRestController } from '../infrastructure/controllers/rest/interfaces/IRestController.js';
import { IoTConfig } from '../domain/IoTConfig.js';

export function iotConfigRoutes() {
    const router = express.Router();

    // Resolve the IoT configuration controller using dependency injection
    const iotConfigController = container.resolve<IRestController<IoTConfig>>('IoTConfigRController');

    // Route: /api/iotconfigs
    // Handles creation and retrieval of all IoT configuration entries
    router.route("/")
        .post((req, res) => iotConfigController.create(req, res))    // Create a new IoT configuration
        .get((req, res) => iotConfigController.getAll(req, res));    // Get all IoT configurations

    // Route: /api/iotconfigs/:id
    // Handles retrieval, updating, and deletion of a specific IoT configuration by ID
    router.route("/:id")
        .get((req, res) => iotConfigController.get(req, res))        // Get a specific IoT configuration
        .put((req, res) => iotConfigController.update(req, res))     // Update an existing IoT configuration
        .delete((req, res) => iotConfigController.delete(req, res)); // Delete an IoT configuration
    
    return router;
}