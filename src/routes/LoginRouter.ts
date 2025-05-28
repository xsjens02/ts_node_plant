import express from 'express';
import { container } from 'tsyringe';
import { ILoginRController } from '../infrastructure/controllers/rest/interfaces/ILoginRController.js';

export function loginRoutes() {
    const router = express.Router();

    // Resolve the login controller using dependency injection
    const loginController = container.resolve<ILoginRController>('LoginRController');

    // Route: /api/login
    // Handles user authentication
    router.route("/")
        .post((req, res) => loginController.login(req, res)); // Authenticate user credentials and issue token/session
    
    return router;
}