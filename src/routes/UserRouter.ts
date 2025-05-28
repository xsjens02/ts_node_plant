import express from 'express';
import { container } from 'tsyringe';
import { IRestController } from '../infrastructure/controllers/rest/interfaces/IRestController.js';
import { User } from '../domain/User.js';

export function userRoutes() {
    const router = express.Router();

    // Resolve the user controller using dependency injection
    const userController = container.resolve<IRestController<User>>('UserRController');

    // Route: /api/users
    // Handles creation and retrieval of all users
    router.route("/")
        .post((req, res) => userController.create(req, res))   // Create a new user
        .get((req, res) => userController.getAll(req, res));   // Get all users

    // Route: /api/users/:id
    // Handles retrieval, updating, and deletion of a specific user by ID
    router.route("/:id")
        .get((req, res) => userController.get(req, res))       // Get user by ID
        .put((req, res) => userController.update(req, res))    // Update user data
        .delete((req, res) => userController.delete(req, res));// Delete user
    
    return router;
}