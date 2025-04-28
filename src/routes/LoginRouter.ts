import express from 'express';
import { container } from 'tsyringe';
import { ILoginController } from '../infrastructure/controllers/interfaces/ILoginController.js';

export function loginRoutes() {
    const router = express.Router();
    const loginController = container.resolve<ILoginController>('LoginController');

    router.route("/")
        .post((req, res) => loginController.login(req, res)); 
    
    return router;
}