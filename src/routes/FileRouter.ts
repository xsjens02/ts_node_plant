import express from 'express';
import { container } from 'tsyringe';
import { IFileRController } from '../infrastructure/controllers/rest/interfaces/IFileRController.js';

export function fileRoutes() {
    const router = express.Router();
    const fileController = container.resolve<IFileRController>('FileRController');

    router.route("/")
        .post((req, res) => fileController.upload(req, res)) 
        .delete((req, res) => fileController.delete(req, res));
    
    return router;
}