import express from 'express';
import { container } from 'tsyringe';
import { ISignUpRController } from '../infrastructure/controllers/rest/interfaces/ISignUpRController.js';

export function signUpRoutes() {
    const router = express.Router();
    const sigUpController = container.resolve<ISignUpRController>('SignUpRController');

    router.route("/")
        .post((req, res) => sigUpController.signAndLogin(req, res)); 
    
    return router;
}