import express from 'express';
import { container } from 'tsyringe';
import { ILoginRController } from '../infrastructure/controllers/rest/interfaces/ILoginRController.js';

export function loginRoutes() {
    const router = express.Router();
    const loginController = container.resolve<ILoginRController>('LoginRController');

    router.route("/")
        .post((req, res) => loginController.login(req, res)); 
    
    return router;
}