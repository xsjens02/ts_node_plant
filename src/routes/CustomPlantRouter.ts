import express from 'express';
import { container } from 'tsyringe';
import { ICustomPlantRController } from '../infrastructure/controllers/rest/interfaces/ICustomPlantRController.js';

export function customPlantRoutes() {
    const router = express.Router();

    // Resolve the custom plant controller using dependency injection
    const customPlantController = container.resolve<ICustomPlantRController>('CustomPlantRController');

    // Route: /api/customplants
    // Handles creation and retrieval of all custom plants
    router.route("/")
        .post((req, res) => customPlantController.create(req, res))  // Create a new custom plant
        .get((req, res) => customPlantController.getAll(req, res));  // Get all custom plants

    // Route: /api/customplants/:id
    // Handles retrieval, update, and deletion of a specific custom plant by ID
    router.route("/:id")
        .get((req, res) => customPlantController.get(req, res))      // Get a specific custom plant
        .put((req, res) => customPlantController.update(req, res))   // Update a custom plant
        .delete((req, res) => customPlantController.delete(req, res)); // Delete a custom plant

    // Route: /api/customplants/user/:id
    router.route("/user/:id")
        .get((req, res) => customPlantController.getAllByUser(req, res));  // Get all custom plants for a specific user

    return router;
}