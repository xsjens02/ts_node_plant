import express from 'express';
import { container } from 'tsyringe';
import { ISignUpController } from '../infrastructure/controllers/interfaces/ISignUpController.js';

export function signUpRoutes() {
    const router = express.Router();
    const sigUpController = container.resolve<ISignUpController>('SignUpController');

    router.route("/")
        .post((req, res) => sigUpController.signAndLogin(req, res)); 
    
    return router;
}