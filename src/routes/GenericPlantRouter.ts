import express from 'express';
import { container } from 'tsyringe';
import { IRestController } from '../infrastructure/controllers/rest/interfaces/IRestController.js';
import { GenericPlant } from '../domain/GenericPlant.js';

export function genericPlantRoutes() {
    const router = express.Router();

    // Resolve the generic plant controller using dependency injection
    const genericPlantController = container.resolve<IRestController<GenericPlant>>('GenericPlantRController');

    // Route: /api/genericplants
    // Handles creation and retrieval of all generic plant entries
    router.route("/")
        .post((req, res) => genericPlantController.create(req, res))   // Create a new generic plant
        .get((req, res) => genericPlantController.getAll(req, res));   // Get all generic plants

    // Route: /api/genericplants/:id
    // Handles retrieval, updating, and deletion of a specific generic plant by ID
    router.route("/:id")
        .get((req, res) => genericPlantController.get(req, res))       // Get a specific generic plant
        .put((req, res) => genericPlantController.update(req, res))    // Update a generic plant
        .delete((req, res) => genericPlantController.delete(req, res));// Delete a generic plant
    
    return router;
}