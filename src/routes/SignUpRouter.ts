import express from 'express';
import { container } from 'tsyringe';
import { ISignUpRController } from '../infrastructure/controllers/rest/interfaces/ISignUpRController.js';

export function signUpRoutes() {
    const router = express.Router();

    // Resolve the signup controller using dependency injection
    const sigUpController = container.resolve<ISignUpRController>('SignUpRController');

    // Route: /api/signup
    // Handles user registration and automatic login after signup
    router.route("/")
        .post((req, res) => sigUpController.signAndLogin(req, res)); // Register a new user and log them in
    
    return router;
}